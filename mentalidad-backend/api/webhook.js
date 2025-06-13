const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query, body } = req;
  if (query.type !== 'payment') return res.status(200).end();

  console.log('🔔 Webhook recibido:', JSON.stringify(body, null, 2));

  const paymentId = body?.data?.id;
  if (!paymentId || isNaN(paymentId)) return res.status(200).end();

  try {
    const isSandbox = body.live_mode === false;
    const token = isSandbox
      ? process.env.MP_ACCESS_TOKEN_SANDBOX
      : process.env.MP_ACCESS_TOKEN_PROD;

    mercadopago.configure({ access_token: token });
    const payment = await mercadopago.payment.findById(paymentId);

    if (payment.body.status === 'approved') {
      const { nombre, email, tipoCompra } = payment.body.metadata || {};
      if (!email || !nombre || !tipoCompra) return res.status(200).end();

      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_PASS = process.env.GMAIL_PASS;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      let attachments = [];

      if (tipoCompra === 'conBonus') {
        attachments = [
          { filename: 'Mentalidad.pdf', content: fs.readFileSync(path.join(__dirname, '..', 'Mentalidad.pdf')) },
          { filename: 'Metas Efectivas.pdf', content: fs.readFileSync(path.join(__dirname, '..', 'Metas Efectivas.pdf')) },
          { filename: 'Mindset.pdf', content: fs.readFileSync(path.join(__dirname, '..', 'Mindset.pdf')) },
          { filename: 'Productividad Extrema.pdf', content: fs.readFileSync(path.join(__dirname, '..', 'Productividad Extrema.pdf')) }
        ];
      } else {
        attachments = [
          { filename: 'Mentalidad.pdf', content: fs.readFileSync(path.join(__dirname, '..', 'Mentalidad.pdf')) }
        ];
      }

      await transporter.sendMail({
        from: `"Mentalidad" <${GMAIL_USER}>`,
        to: email,
        subject: '📘 Tu copia del libro Mentalidad',
        text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook${tipoCompra === 'conBonus' ? ' y los bonus' : ''}.\n\n¡Disfrutalo!`,
        attachments,
      });

      console.log('✅ Correo enviado a', email);
    }

    res.status(200).end();
  } catch (err) {
    console.error('❌ Error en webhook:', err);
    res.status(500).end();
  }
};
