const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  let body;
  try {
    const rawBody = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => resolve(data));
      req.on('error', err => reject(err));
    });

    body = JSON.parse(rawBody);
    console.log('📦 Webhook recibido:', JSON.stringify(body, null, 2));
  } catch (err) {
    console.error('❌ Error al parsear body:', err);
    return res.status(400).end('Invalid body');
  }

  const paymentIdRaw = body?.data?.id;
  if (!paymentIdRaw) {
    console.warn('❌ No se encontró data.id');
    return res.status(200).end();
  }

  const paymentId = parseInt(paymentIdRaw, 10);
  if (!paymentId || isNaN(paymentId)) {
    console.warn('❌ ID de pago inválido:', paymentIdRaw);
    return res.status(200).end();
  }

  try {
    const token = body.live_mode === false
      ? process.env.MP_ACCESS_TOKEN_SANDBOX
      : process.env.MP_ACCESS_TOKEN_PROD;

    mercadopago.configure({ access_token: token });

    const payment = await mercadopago.payment.findById(paymentId);
    console.log('✅ Estado del pago:', payment.body.status);

    if (payment.body.status === 'approved') {
      const { nombre, email, tipo_compra: tipoCompra } = payment.body.metadata || {};

      if (!nombre || !email || !tipoCompra) {
        console.warn('❌ Metadata incompleta');
        return res.status(200).end();
      }

      const linksByTipo = {
        solo: [
          {
            nombre: 'Mentalidad',
            link: 'https://drive.google.com/uc?export=download&id=1Irc0OhGMd4grhYA2PFAC71QlYFrm8y0p'
          }
        ],
        bonus1: [
          {
            nombre: 'Mentalidad',
            link: 'https://drive.google.com/uc?export=download&id=1Irc0OhGMd4grhYA2PFAC71QlYFrm8y0p'
          },
          {
            nombre: 'Productividad Extrema',
            link: 'https://drive.google.com/uc?export=download&id=1GwiTx-wGoDIhhFhTntDD6QGAKneQWRm-'
          },
          {
            nombre: 'Metas Efectivas',
            link: 'https://drive.google.com/uc?export=download&id=1OGy7vKi_nigfHMXT7u5uvOYvfYtSxI-z'
          }
        ],
        bonus2: [
         
          {
            nombre: 'Productividad Extrema',
            link: 'https://drive.google.com/uc?export=download&id=1GwiTx-wGoDIhhFhTntDD6QGAKneQWRm-'
          }
        ],
        bonus3: [
          
          {
            nombre: 'Metas Efectivas',
            link: 'https://drive.google.com/uc?export=download&id=1OGy7vKi_nigfHMXT7u5uvOYvfYtSxI-z'
          }
        ],
      };

      const pack = linksByTipo[tipoCompra];
      if (!pack) return res.status(400).end('Tipo de compra inválido');

      const listaLinks = pack
        .map(doc => `📘 ${doc.nombre}: ${doc.link}`)
        .join('\n');

      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_PASS = process.env.GMAIL_PASS;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Mentalidad" <${GMAIL_USER}>`,
        to: email,
        subject: '📘 Tu pack del libro Mentalidad',
        text: `Hola ${nombre},\n\nGracias por tu compra. Acá tenés los enlaces para descargar tus libros:\n\n${listaLinks}\n\n⚠️ Estos enlaces son exclusivos para vos. No los compartas.\n\n¡Disfrutalos!`,
      });

      console.log(`✅ Enlaces enviados a ${email}`);
    }

    res.status(200).end();
  } catch (err) {
    console.error('❌ Error al procesar el webhook:', err);
    res.status(500).end();
  }
};
