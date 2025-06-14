// === api/enviarLibro.js ===
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const { nombre, email, tipoCompra } = req.body;
  if (!nombre || !email || !tipoCompra) return res.status(400).json({ message: 'Faltan datos' });

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });

  const filesByTipo = {
    solo: ['Mindset.pdf'],
    bonus1: ['Mindset.pdf', 'Productividad.pdf', 'Metas.pdf'],
    bonus2: ['Mindset.pdf', 'Productividad.pdf'],
    bonus3: ['Mindset.pdf', 'Metas.pdf'],
  };

  const archivos = filesByTipo[tipoCompra] || [];
  const attachments = archivos.map(file => ({
    filename: file,
    content: readFileSync(path.join(__dirname, '..', file)),
  }));

  const mailOptions = {
    from: `"Mentalidad" <${GMAIL_USER}>`,
    to: email,
    subject: '📘 Tu compra del libro Mentalidad',
    text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés tu ebook.\n\n¡Disfrutalo!`,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (err) {
    console.error('Error al enviar correo:', err);
    return res.status(500).json({ message: 'Error al enviar el correo' });
  }
}
