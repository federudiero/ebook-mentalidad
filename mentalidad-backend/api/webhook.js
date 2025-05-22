import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  const mpSignature = req.headers['x-signature-id'];
  const { query } = req;

  if (req.method !== 'POST') return res.status(405).end();

  if (query.type !== 'payment') return res.status(200).end();

  try {
    const paymentId = req.body.data.id;

    const mp = await import('mercadopago');
    mp.default.configure({ access_token: process.env.MP_ACCESS_TOKEN });

    const payment = await mp.default.payment.findById(paymentId);

    if (payment.body.status === 'approved') {
      const nombre = payment.body.metadata.nombre;
      const email = payment.body.metadata.email;

      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_PASS = process.env.GMAIL_PASS;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      const filePath = path.join(__dirname, '..', 'Mentalidad.pdf');
      const pdfBuffer = readFileSync(filePath);

      await transporter.sendMail({
        from: `"Mentalidad" <${GMAIL_USER}>`,
        to: email,
        subject: '📘 Tu copia del libro Mentalidad',
        text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook.\n\n¡Disfrutalo!`,
        attachments: [{ filename: 'Mentalidad.pdf', content: pdfBuffer }],
      });
    }

    res.status(200).end();
  } catch (err) {
    console.error('Error en webhook:', err);
    res.status(500).end();
  }
}
