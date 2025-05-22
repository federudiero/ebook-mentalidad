import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN_TEST, // Token de prueba
});

export default async function handler(req, res) {
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
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago' });
  }
}
