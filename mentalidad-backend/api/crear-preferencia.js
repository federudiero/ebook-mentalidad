import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end(); // <- Preflight

  if (req.method !== 'POST') return res.status(405).json({ message: 'Método no permitido' });

  const { nombre, email } = req.body;

  const preference = {
    items: [{
      title: 'Libro Mentalidad',
      quantity: 1,
      unit_price: 5.00,
      currency_id: 'ARS',
    }],
    payer: { email },
    notification_url: 'https://ebook-mentalidad.vercel.app/api/webhook',
    back_urls: {
      success: 'https://ebook-mentalidad.vercel.app/gracias',
      failure: 'https://ebook-mentalidad.vercel.app/error',
    },
    auto_return: 'approved',
    metadata: { nombre, email }
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log('✅ Preferencia creada:', response.body);
    res.status(200).json({ init_point: response.body.sandbox_init_point }); // usar sandbox mientras testeás
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
}

const response = await mercadopago.preferences.create(preference);
console.log('✅ Preferencia creada:', response.body);
res.status(200).json({ init_point: response.body.init_point });