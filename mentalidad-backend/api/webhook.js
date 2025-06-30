const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const os = require('os');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  let body = req.body;

  if (!body || !body.data) {
    try {
      const rawBody = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => (data += chunk));
        req.on('end', () => resolve(data));
        req.on('error', err => reject(err));
      });

      body = JSON.parse(rawBody);
    } catch (err) {
      console.error('❌ Error al parsear el cuerpo del webhook:', err);
      return res.status(400).end('Invalid body');
    }
  }

  const paymentIdRaw = body?.data?.id;
  const paymentId = parseInt(paymentIdRaw, 10);

  if (!paymentId || isNaN(paymentId)) {
    console.warn('❌ ID de pago inválido:', paymentIdRaw);
    return res.status(200).end();
  }

  try {
    const token = body.live_mode === false
      ? process.env.MP_ACCESS_TOKEN_SANDBOX
      : process.env.MP_ACCESS_TOKEN_PROD;

    mercadopago.configure({ access_token: token });

    const payment = await mercadopago.payment.findById(paymentId);
    console.log('✅ Estado del pago:', payment.body.status);

    if (payment.body.status === 'approved') {
      const { nombre, email, tipo_compra: tipoCompra } = payment.body.metadata || {};

      if (!nombre || !email || !tipoCompra) {
        console.warn('❌ Metadata incompleta:', payment.body.metadata);
        return res.status(200).end();
      }

      const filesByTipo = {
        solo: ['Mindset.pdf'],
        bonus1: ['Mindset.pdf', 'Productividad Extrema.pdf', 'Metas Efectivas.pdf'],
        bonus2: ['Mindset.pdf', 'Productividad Extrema.pdf'],
        bonus3: ['Mindset.pdf', 'Metas Efectivas.pdf'],
      };

      const files = filesByTipo[tipoCompra] || [];

      // Crear ZIP temporal
      const zipPath = path.join(os.tmpdir(), `mentalidad-${tipoCompra}-${Date.now()}.zip`);
      await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', resolve);
        archive.on('error', reject);

        archive.pipe(output);

        for (const file of files) {
          const filePath = path.join(__dirname, '../pdf', file);
          if (fs.existsSync(filePath)) {
            archive.file(filePath, { name: file });
          } else {
            console.warn(`⚠️ Archivo no encontrado: ${filePath}`);
          }
        }

        archive.finalize();
      });

      // Enviar mail con ZIP
      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_PASS = process.env.GMAIL_PASS;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Mentalidad" <${GMAIL_USER}>`,
        to: email,
        subject: '📘 Tu compra del libro Mentalidad',
        text: `Hola ${nombre},\n\nGracias por tu compra. Te enviamos tu ebook en un archivo comprimido adjunto.\n\n¡Disfrutalo!`,
        attachments: [
          {
            filename: 'Tu-Pack-Mentalidad.zip',
            content: fs.readFileSync(zipPath),
          },
        ],
      });

      console.log(`✅ ZIP enviado a ${email}`);
    }

    res.status(200).end();
  } catch (err) {
    console.error('❌ Error al procesar el webhook:', err);
    res.status(500).end();
  }
};
