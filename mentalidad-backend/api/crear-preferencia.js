// === api/crear-preferencia.js ===
import mercadopago from 'mercadopago';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const { nombre, email, tipoCompra } = req.body;
  if (!nombre || !email || !tipoCompra) return res.status(400).json({ error: 'Faltan datos' });

  const precios = {
    solo: { title: 'Mindset (solo)', price: 12 },
    bonus1: { title: 'Bonus #1 - Mindset + Productividad + Metas Efectivas', price: 18 },
    bonus2: { title: 'Bonus #2 - Mindset + Productividad', price: 15 },
    bonus3: { title: 'Bonus #3 - Mindset + Metas Efectivas', price: 15 },
  };

  const item = precios[tipoCompra];
  if (!item) return res.status(400).json({ error: 'Tipo de compra inválido' });

  const token = process.env.MP_ACCESS_TOKEN_PROD;
  mercadopago.configure({ access_token: token });

  const preference = {
    items: [
      {
        title: item.title,
        quantity: 1,
        unit_price: item.price,
        currency_id: 'USD',
      },
    ],
    payer: { email },
    notification_url: 'https://ebook-mentalidad.vercel.app/api/webhook',
    back_urls: {
      success: 'https://ebook-mentalidad.vercel.app/gracias',
      failure: 'https://ebook-mentalidad.vercel.app/error',
    },
    auto_return: 'approved',
    metadata: { nombre, email, tipoCompra },
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point });
  } catch (err) {
    console.error('❌ Error al crear preferencia:', err);
    return res.status(500).json({ error: 'No se pudo crear la preferencia' });
  }
}
