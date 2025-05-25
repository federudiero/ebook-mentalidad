import mercadopago from 'mercadopago';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const isSandbox = true;
  const token = isSandbox
    ? process.env.MP_ACCESS_TOKEN_SANDBOX
    : process.env.MP_ACCESS_TOKEN;

  mercadopago.configure({ access_token: token });

  try {
    const { nombre, email } = req.body;
    if (!nombre || !email) return res.status(400).json({ error: 'Faltan datos' });

    const preference = {
      items: [{
        title: 'Libro Mentalidad',
        quantity: 1,
        unit_price: 5.0,
        currency_id: 'ARS',
      }],
      payer: { email },
      notification_url: 'https://ebook-mentalidad.vercel.app/api/webhook',
      back_urls: {
        success: 'https://ebook-mentalidad.vercel.app/gracias',
        failure: 'https://ebook-mentalidad.vercel.app/error',
      },
      auto_return: 'approved',
      metadata: { nombre, email },
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.sandbox_init_point });
  } catch (err) {
    console.error('❌ Error al crear preferencia:', err);
    return res.status(500).json({ error: 'No se pudo crear la preferencia' });
  }
}
