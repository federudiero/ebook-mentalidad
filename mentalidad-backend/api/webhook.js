import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query, body } = req;

  // 🔐 Solo procesamos si el tipo es "payment"
  if (query.type !== 'payment') return res.status(200).end();

  // 🔍 Log para revisar el cuerpo recibido
  console.log('🔔 Webhook recibido:', JSON.stringify(body, null, 2));

  // 🔎 Validación de ID
  const paymentId = body?.data?.id;
  if (!paymentId || isNaN(paymentId)) {
    console.warn('⚠️ ID inválido en Webhook:', paymentId);
    return res.status(200).end(); // No cortar, pero no procesar
  }

  try {
    const mp = await import('mercadopago');
    mp.default.configure({ access_token: process.env.MP_ACCESS_TOKEN });

    const payment = await mp.default.payment.findById(paymentId);

    if (payment.body.status === 'approved') {
      const { nombre, email } = payment.body.metadata || {};

      if (!email || !nombre) {
        console.warn('⚠️ Metadata incompleta:', payment.body.metadata);
        return res.status(200).end();
      }

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

      console.log('✅ Correo enviado a', email);
    } else {
      console.log('🔁 Pago no aprobado aún. Estado:', payment.body.status);
    }

    res.status(200).end();
  } catch (err) {
    console.error('❌ Error en webhook:', err);
    res.status(500).end();
  }
}
