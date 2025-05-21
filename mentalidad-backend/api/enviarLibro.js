import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ message: 'Faltan datos' });
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

  const pdfPath = path.join(process.cwd(), 'public', 'Mentalidad.pdf');
  const pdfContent = fs.readFileSync(pdfPath);

  const mailOptions = {
    from: `"Mentalidad" <${GMAIL_USER}>`,
    to: email,
    subject: '📘 Tu copia del libro Mentalidad',
    text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook.\n\n¡Disfrutalo!`,
    attachments: [
      {
        filename: 'Mentalidad.pdf',
        content: pdfContent,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
}
