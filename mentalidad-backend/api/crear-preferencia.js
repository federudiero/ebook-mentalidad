import mercadopago from 'mercadopago';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const { nombre, email, tipoCompra } = req.body;
  if (!nombre || !email || !tipoCompra) return res.status(400).json({ error: 'Faltan datos' });

  const token = process.env.MP_ACCESS_TOKEN_PROD;
  mercadopago.configure({ access_token: token });

  const isBonus = tipoCompra === 'conBonus';

  const preference = {
    items: [{
      title: isBonus ? 'Libro Mentalidad + Bonus' : 'Libro Mentalidad',
      quantity: 1,
      unit_price: isBonus ? 8.0 : 5.0,
      currency_id: 'ARS',
    }],
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
