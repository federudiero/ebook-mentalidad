const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Recolección del body manual por si no viene parseado
  let rawData = '';
  req.on('data', chunk => {
    rawData += chunk;
  });

  req.on('end', async () => {
    let body;
    try {
      body = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    } catch (err) {
      console.error('❌ Error al parsear body JSON:', err);
      return res.status(400).end('Body inválido');
    }

    const paymentIdRaw = body?.data?.id;
    const paymentId = parseInt(paymentIdRaw, 10);

    if (!paymentId || isNaN(paymentId)) {
      console.warn('❌ ID de pago inválido:', paymentIdRaw);
      return res.status(200).end();
    }

    try {
      console.log('📩 Webhook recibido:', JSON.stringify(body, null, 2));

      const token = body.live_mode === false
        ? process.env.MP_ACCESS_TOKEN_SANDBOX
        : process.env.MP_ACCESS_TOKEN_PROD;

      mercadopago.configure({ access_token: token });

      const payment = await mercadopago.payment.findById(paymentId);
      if (!payment?.body?.status) {
        console.warn('❌ No se pudo obtener el estado del pago:', payment);
        return res.status(200).end();
      }

      console.log('✅ Estado actual del pago:', payment.body.status);

      if (payment.body.status === 'approved') {
        const { nombre, email, tipo_compra: tipoCompra } = payment.body.metadata || {};

        if (!nombre || !email || !tipoCompra) {
          console.warn('❌ Faltan datos en metadata:', payment.body.metadata);
          return res.status(200).end();
        }

        const GMAIL_USER = process.env.GMAIL_USER;
        const GMAIL_PASS = process.env.GMAIL_PASS;

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS,
          },
        });

        const filesByTipo = {
          solo: ['Mindset.pdf'],
          bonus1: ['Mindset.pdf', 'Productividad Extrema.pdf', 'Metas Efectivas.pdf'],
          bonus2: ['Mindset.pdf', 'Productividad Extrema.pdf'],
          bonus3: ['Mindset.pdf', 'Metas Efectivas.pdf'],
        };

        const filenames = filesByTipo[tipoCompra] || [];
        const attachments = [];

        for (const filename of filenames) {
          const filePath = path.join(__dirname, '../pdf', filename);
          if (fs.existsSync(filePath)) {
            attachments.push({
              filename,
              content: fs.readFileSync(filePath),
            });
          } else {
            console.warn(`⚠️ Archivo no encontrado: ${filePath}`);
          }
        }

        if (attachments.length === 0) {
          console.warn('❌ No se adjuntaron archivos. Revisa los nombres y rutas.');
          return res.status(200).end();
        }

        await transporter.sendMail({
          from: `"Mentalidad" <${GMAIL_USER}>`,
          to: email,
          subject: '📘 Tu compra del libro Mentalidad',
          text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook.\n\n¡Disfrutalo!`,
          attachments,
        });

        console.log(`✅ Correo enviado a ${email} con: ${attachments.map(a => a.filename).join(', ')}`);
      } else {
        console.log('⏳ Pago aún no aprobado:', payment.body.status);
      }

      res.status(200).end();
    } catch (err) {
      console.error('❌ Error en webhook:', err);
      res.status(500).end();
    }
  });
};
