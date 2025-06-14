
// === api/webhook.js ===
const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { query, body } = req;
  if (query.type !== 'payment') return res.status(200).end();

  const paymentId = body?.data?.id;
  if (!paymentId || isNaN(paymentId)) return res.status(200).end();

  try {
    const token = body.live_mode === false ? process.env.MP_ACCESS_TOKEN_SANDBOX : process.env.MP_ACCESS_TOKEN_PROD;
    mercadopago.configure({ access_token: token });
    const payment = await mercadopago.payment.findById(paymentId);

    if (payment.body.status === 'approved') {
      const { nombre, email, tipoCompra } = payment.body.metadata || {};
      if (!email || !nombre || !tipoCompra) return res.status(200).end();

      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_PASS = process.env.GMAIL_PASS;
      const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASS } });

      const filesByTipo = {
        solo: ['Mindset.pdf'],
        bonus1: ['Mindset.pdf', 'Productividad.pdf', 'Metas.pdf'],
        bonus2: ['Mindset.pdf', 'Productividad.pdf'],
        bonus3: ['Mindset.pdf', 'Metas.pdf'],
      };

      const attachments = (filesByTipo[tipoCompra] || []).map(filename => ({
        filename,
        content: fs.readFileSync(path.join(__dirname, '..', filename)),
      }));

      await transporter.sendMail({
        from: `"Mentalidad" <${GMAIL_USER}>`,
        to: email,
        subject: '📘 Tu compra del libro Mentalidad',
        text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook.\n\n¡Disfrutalo!`,
        attachments,
      });
    }

    res.status(200).end();
  } catch (err) {
    console.error('❌ Error en webhook:', err);
    res.status(500).end();
  }
};
