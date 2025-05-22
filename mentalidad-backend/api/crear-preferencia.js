import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  // ✅ CORS universal para Vercel y navegadores modernos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Cierre inmediato de preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ❌ Métodos no permitidos
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // ✅ Captura de datos del cliente
  const { nombre, email } = req.body;

  // ⚠️ Validación mínima
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Faltan datos: nombre o email' });
  }

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
    return res.status(200).json({ init_point: response.body.sandbox_init_point });
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error);
    return res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
}
