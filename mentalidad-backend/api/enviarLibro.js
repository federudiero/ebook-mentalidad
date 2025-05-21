import nodemailer from 'nodemailer';
import { request } from 'undici'; // ⚠️ Importamos desde undici

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const { nombre, email } = req.body;
  if (!nombre || !email) return res.status(400).json({ message: 'Faltan datos' });

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  try {
    // ✅ Descargar el PDF desde Cloudinary usando undici
    const pdfUrl = 'https://res.cloudinary.com/doxadkm4r/image/upload/v1747868074/ebook/oymdsxtptii1lcxognkz.pdf';
    const { body } = await request(pdfUrl); // body es un ReadableStream
    const chunks = [];

    for await (const chunk of body) {
      chunks.push(chunk);
    }

    const pdfBuffer = Buffer.concat(chunks);

    const mailOptions = {
      from: `"Mentalidad" <${GMAIL_USER}>`,
      to: email,
      subject: '📘 Tu copia del libro Mentalidad',
      text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook.\n\n¡Disfrutalo!`,
      attachments: [
        {
          filename: 'Mentalidad.pdf',
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Correo enviado correctamente' });

  } catch (err) {
    console.error('Error al enviar correo:', err);
    return res.status(500).json({ message: 'Error al enviar el correo' });
  }
}
