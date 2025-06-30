import React, { useState } from 'react';
import { Container, Accordion, Row, Col, Button, Card, Navbar, Nav, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MentalidadDeluxeLanding.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';








export default function MentalidadLanding() {
  const resumenCapitulos = {
    "La Rueda de la Vida": "Una herramienta para evaluar tu vida en 8 áreas fundamentales: salud, desarrollo personal, dinero, amor, familia, propósito, amistad y ocio. Identifica tus desequilibrios y comienza a trabajar en ellos.",
    "La vida es un videojuego (GTA Edition)": "Aprende a jugar la vida como un videojuego: explora, gana experiencia, rodéate de aliados, invierte bien y enfócate en misiones principales.",
    "Cómo ser un hombre responsable": "Ser responsable es dejar de culpar al entorno y tomar el control total de tu vida. Cumplí tu palabra, controlá tus emociones y tomá acción.",
    "SER – HACER – TENER": "La fórmula del cambio: primero definís quién querés ser, luego actuás como esa persona, y así obtenés lo que deseás.",
    "Rompe tu caja de creencias": "Tus creencias limitantes te frenan. Cuestioná tus pensamientos automáticos y reemplazalos por otros que te empoderen.",
    "Mentalidad de abundancia": "Creé que hay suficiente para todos. Agradecé lo que tenés, dejá de compararte y empezá a actuar con generosidad y confianza.",
    "Resultados extraordinarios": "No se trata de suerte: claridad, mentalidad de crecimiento, disciplina y acción masiva son la clave para lograr lo extraordinario.",
    "La curva del éxito": "El camino al éxito no es lineal. Habrá subidas y bajadas, pero la clave es la perseverancia, la resiliencia y el aprendizaje constante.",
    "Memento Mori": "Recordar que vas a morir te impulsa a vivir con intención. No postergues tu propósito. Viví con fuego y hacé que tu vida valga."
  };

  const [show, setShow] = useState(false);
  const [contenidoModal, setContenidoModal] = useState({ titulo: '', texto: '' });
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTipoCompra, setShowTipoCompra] = useState(false);
const [tipoCompra, setTipoCompra] = useState('');

  const abrirModal = (titulo, texto) => setContenidoModal({ titulo, texto }) || setShow(true);
  const cerrarModal = () => setShow(false);


  const isEmailValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const MySwal = withReactContent(Swal);


 const handleCompra = (e) => {
  e.preventDefault();
  if (!nombre || !email) {
    MySwal.fire({
      icon: 'warning',
      title: 'Faltan datos',
      text: 'Completá tu nombre y tu email antes de continuar.',
    });
    return;
  }
  if (!isEmailValid(email)) {
    MySwal.fire({
      icon: 'error',
      title: 'Email inválido',
      text: 'Ingresá un correo electrónico válido.',
    });
    return;
  }
  setShowTipoCompra(true);
};

 const confirmarCompra = async () => {
  if (!tipoCompra) {
    await MySwal.fire({
      icon: 'warning',
      title: 'Elegí una opción de compra',
      text: 'Seleccioná una opción antes de continuar.',
    });
    return;
  }

  setLoading(true);
  setShowTipoCompra(false);

  try {
    const res = await fetch('https://ebook-mentalidad.vercel.app/api/crear-preferencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, tipoCompra }),
    });

    const data = await res.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo generar el link de pago.',
      });
    }
  } catch (err) {
    console.error('Error:', err);
    await MySwal.fire({
      icon: 'error',
      title: 'Ocurrió un problema',
      text: 'Error al iniciar el pago.',
    });
  }

  setLoading(false);
};



  
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
  <Container>
    <Navbar.Brand href="#">
      <img
        src="https://res.cloudinary.com/doxadkm4r/image/upload/v1750086883/ebook/ChatGPT_Image_16_jun_2025_12_14_28_rzww4g.png"
        alt="Logo MINDSET"
        height="48"
        className="d-inline-block align-middle"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="#beneficios">Beneficios</Nav.Link>
        <Nav.Link href="#capitulos">Capítulos</Nav.Link>
        <Nav.Link href="#testimonios">Testimonios</Nav.Link>  
        <Nav.Link href="#comprar">Comprar</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      
    <div
      className="text-white bg-dark text-center"
      style={{ paddingTop: '160px', paddingBottom: '80px' }}
    >
      <Container>
        <h1 className="display-3 fw-bold mb-4 position-relative" style={{ minHeight: '140px' }}>
          🔥{' '}
          <span style={{ color: 'white', position: 'relative', zIndex: 2 }}>
            <Typewriter
              words={[
                '¿Y si el verdadero bloqueo en tu vida no está fuera… sino en tu cabeza?',
              ]}
              loop={1}
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={1500}
            />
          </span>
          <span
            className="position-absolute"
            style={{
              visibility: 'hidden',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            ¿Y si el verdadero bloqueo en tu vida no está fuera… sino en tu cabeza?
          </span>
        </h1>

        <p className="lead mb-3">
          Un entrenamiento que cambia tu manera de pensar, actuar y vivir.
        </p>
        <p className="lead mb-4">
          Vivís estancado, sabés que tenés potencial, pero no entendés por qué
          seguís repitiendo los mismos resultados una y otra vez…
        </p>

        <Button
          variant="warning"
          size="lg"
          href="#comprar"
          className="px-5 py-3 fw-semibold shadow-sm rounded-pill"
        >
          Quiero mi copia
        </Button>

        <div className="d-flex justify-content-center mt-5">
          <motion.img
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg"
            alt="Ilustración del libro"
            className="img-fluid rounded-4 shadow-lg"
            style={{ maxWidth: '320px' }}
          />
        </div>
      </Container>
    </div>


     <section id="beneficios" className="py-5 bg-warning text-dark">
  <Container>
    <h2 className="text-center mb-5 fw-bold display-6">
      ⚡️ Descubrí el poder de tu mente con el ebook que ya está transformando vidas
    </h2>
    <Row>
      {[
        "Reprograma tu forma de pensar",
        "Rompe tus creencias limitantes",
        "Activa tu propósito",
        "Toma el control de tu vida",
      ].map((b, i) => (
        <Col md={6} lg={3} key={i} className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="text-center text-white h-100 border-0 bg-dark shadow rounded-4 p-3 card-hover">
              <Card.Body>
                <Card.Text className="fw-semibold fs-5">{b}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </Container>
</section>


      <section id="capitulos" className="py-5 bg-light text-dark">
        <Container className="text-center">
          <h2 className="fw-bold mb-5">🧠 ENTRENAMIENTO DE MENTALIDAD</h2>
          <p className="lead mb-5">Un entrenamiento que cambia tu manera de pensar, actuar y vivir.</p>
         
         <motion.div
  className="d-flex flex-wrap justify-content-center align-items-center gap-3"
  style={{ maxWidth: '800px', margin: '0 auto' }}
>
  {[
    "La Rueda de la Vida",
    "La vida es un videojuego (GTA Edition)",
    "Cómo ser un hombre responsable",
    "SER – HACER – TENER",
    "Rompe tu caja de creencias",
    "Mentalidad de abundancia",
    "Resultados extraordinarios",
    "La curva del éxito",
    "Memento Mori"
  ].map((titulo, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      viewport={{ once: true }}
    >
      <Button
        variant="warning"
        className="text-dark fw-semibold rounded-pill px-4 py-2 shadow"
        onClick={() => abrirModal(titulo, resumenCapitulos[titulo])}
      >
        {titulo}
      </Button>
    </motion.div>
  ))}
</motion.div>
        </Container>
      </section>
         


   <section className="py-5 text-white bg-dark text-center">
 <Container>
  <motion.h2
    className="text-center fw-bold mb-4 display-6"
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    La buena noticia es…
  </motion.h2>

  <motion.p
    className="lead text-center mx-auto"
    style={{ maxWidth: '800px' }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.9, delay: 0.2 }}
    viewport={{ once: true }}
  >
    Que tu mentalidad puede transformarse y convertirse en tu mayor herramienta de cambio. No importa en qué punto estés hoy: siempre podés empezar a crear una nueva versión de vos.
    <br /><br />
    Este libro no es solo lectura, es un entrenamiento diseñado para ayudarte a reconfigurar cómo pensás, actuás y enfrentás los desafíos. Vas a descubrir que todo cambio externo comienza por un cambio interno.
    <br /><br />
    Si aprendés a pensar como alguien que ya logró sus metas, tus acciones y resultados inevitablemente se alinearán con esa nueva identidad. El verdadero crecimiento comienza cuando decidís dejar de ser espectador y empezás a tomar el control de tu vida.
  </motion.p>

  <motion.div
    className="text-center mt-5"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    viewport={{ once: true }}
  >
    <img
      src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg"
      alt="Entrenamiento Mentalidad"
      className="img-fluid rounded-4 shadow-lg"
      style={{ maxWidth: '500px', width: '100%' }}
    />
  </motion.div>
</Container>

</section>


  <section className="py-5 bg-warning text-dark">
  <Container>
    <motion.h2
      className="text-center fw-bold mb-5 display-6"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      ¿Qué vas a aprender en este libro?
    </motion.h2>

    <Row className="g-4">
      {[
        "Cómo salir de patrones mentales negativos y construir una mentalidad poderosa.",
        "Qué es la verdadera responsabilidad personal y cómo dejar de culpar a tu entorno.",
        "El poder del modelo SER – HACER – TENER para lograr resultados sostenibles.",
        "Cómo romper con tus creencias limitantes y crear nuevas que te empoderen.",
        "Las claves para activar una mentalidad de abundancia y atraer oportunidades.",
        "La fórmula para obtener resultados extraordinarios y mantener la disciplina.",
        "Por qué la curva del éxito nunca es lineal y cómo avanzar incluso cuando caes.",
        "La urgencia de vivir con intención (Memento Mori) y dejar de postergar tu propósito."
      ].map((text, idx) => (
        <Col md={6} key={idx}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="p-4 bg-light rounded-4 h-100 d-flex shadow"
              style={{
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="me-3 fs-4 text-success">✓</div>
              <p className="mb-0" style={{ fontWeight: 500 }}>{text}</p>
            </div>
          </motion.div>
        </Col>
      ))}
    </Row>

    <motion.h2
      className="text-center fw-bold mt-5 mb-4 display-6"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      🚀 Empezá hoy tu transformación
    </motion.h2>

    <motion.p
      className="lead text-center mt-5 fw-semibold"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      Este no es solo un libro. Es un cambio de mentalidad que te acompañará toda la vida.
    </motion.p>

    <motion.div
      className="text-center mt-4"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <Button variant="dark" size="lg" href="#comprar">
        Quiero mi copia
      </Button>
    </motion.div>
  </Container>
</section>

<section className="py-5 bg-dark text-white" id="bonos">
  <Container>
    <motion.h2
      className="text-center fw-bold mb-5 display-5"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      🎁 ¿QUÉ OBTIENES AL REALIZAR LA COMPRA?
    </motion.h2>

    <Row className="align-items-center">
      <Col lg={6}>
        <motion.ul
          className="timeline list-unstyled"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.25,
              },
            },
          }}
        >
          {[
            {
              icon: '📘',
              title: 'Libro en PDF',
              text: 'Accedé al libro "Mentalidad" en PDF y leelo desde cualquier dispositivo.',
            },
            {
              icon: '🔄',
              title: 'Actualizaciones gratis',
              text: 'Vas a recibir todas las versiones futuras y bonus sin costo extra.',
            },
            {
              icon: '💬',
              title: 'Canal de soporte directo',
              text: 'Te acompañamos vía WhatsApp o redes para ayudarte cuando lo necesites.',
            },
          ].map((item, i) => (
            <motion.li
              key={i}
              className="d-flex align-items-start mb-4"
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="me-3 fs-3"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ffc107',
                  color: '#000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {item.icon}
              </div>
              <div>
                <h5 className="fw-bold mb-1">{item.title}</h5>
                <p className="mb-0">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Col>

      <Col lg={6}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <img
            src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745949036/ebook/ChatGPT_Image_29_abr_2025_14_47_45_qpvbsi.png"
            alt="Pack Mentalidad"
            className="img-fluid rounded-4 shadow-lg"
            style={{ maxWidth: '400px' }}
          />
          <p className="mt-3 fw-semibold text-white">
            Todo esto llega directo a tu correo al completar la compra.
          </p>
        </motion.div>
      </Col>
    </Row>

    <div className="text-center mt-5">
      <Button variant="warning" size="lg" className="fw-bold px-5 py-3 rounded-pill text-dark shadow" href="#comprar">
  Obtener mi pack ahora
</Button>
    </div>
  </Container>
</section>


<section className="py-5 bg-light text-dark">
  <Container style={{ maxWidth: '850px' }}>
    <h2 className="text-center fw-bold mb-5">Preguntas Frecuentes</h2>
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>¿El libro está disponible en formato físico o digital?</Accordion.Header>
        <Accordion.Body>
          El libro está disponible únicamente en formato digital. Después de la compra, podrás descargarlo fácilmente en tu dispositivo favorito.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>¿Cómo puedo descargar el libro y los bonus después de haber comprado?</Accordion.Header>
        <Accordion.Body>
          Recibirás un correo electrónico con el enlace de descarga del libro y los bonus. Solo deberás hacer clic en el enlace y seguir las instrucciones.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>¿Qué métodos de pago hay disponibles?</Accordion.Header>
        <Accordion.Body>
          Puedes utilizar tarjetas de crédito, débito en Mercado pago.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>¿Cómo es el proceso de compra?</Accordion.Header>
        <Accordion.Body>
         completa tus datos para elegir solo el libro de Mindset o los  bonus haz clic en el boton comprar, te llevara directo a mercado pago.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Si tengo algún inconveniente, ¿dónde puedo escribir?</Accordion.Header>
        <Accordion.Body>
          Podés escribirnos a Mindset@gmail.com o por WhatsApp y te ayudaremos lo antes posible.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </Container>
</section>




<section id="testimonios" className="py-5 bg-warning text-dark">
  <Container>
    <h2 className="text-center mb-5 fw-bold display-6">Lo que dicen quienes lo leyeron</h2>
    <Row>
      {[
        {
          texto: "Este libro me ayudó a salir de mi estancamiento mental.",
          nombre: "María L.",
          imagen: "https://randomuser.me/api/portraits/women/44.jpg",
          estrellas: 5,
        },
        {
          texto: "Cada capítulo fue una cachetada necesaria.",
          nombre: "José M.",
          imagen: "https://randomuser.me/api/portraits/men/36.jpg",
          estrellas: 4,
        },
        {
          texto: "No es solo un libro, es un entrenamiento de vida.",
          nombre: "Lucía F.",
          imagen: "https://randomuser.me/api/portraits/women/65.jpg",
          estrellas: 5,
        },
        {
          texto: "Gracias a este libro tomé el control de mi vida.",
          nombre: "Andrés R.",
          imagen: "https://randomuser.me/api/portraits/men/52.jpg",
          estrellas: 5,
        },
      ].map((testimonio, i) => (
        <Col md={6} lg={3} key={i} className="mb-4">
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3 bg-light text-center">
            <Card.Img
              variant="top"
              src={testimonio.imagen}
              alt={`Foto de ${testimonio.nombre}`}
              className="rounded-circle mx-auto mb-3"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Text className="fst-italic mb-3">"{testimonio.texto}"</Card.Text>
              <div className="text-warning mb-2">
                {Array.from({ length: testimonio.estrellas }).map((_, idx) => (
                  <i key={idx} className="bi bi-star-fill"></i>
                ))}
              </div>
              <div className="fw-semibold">{testimonio.nombre}</div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</section>

<section className="py-5 bg-dark text-center text-white">
  <Container>
    <h2 className="fw-bold display-5 mb-5">🧠 Entrenamientos que cambian tu mentalidad</h2>

    {/* Contenedor responsive */}
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 position-relative" style={{ minHeight: '420px' }}>
      
      {/* Productividad Extrema */}
      <img
        src="https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.22.10_wxcqgo.jpg"
        alt="Productividad Extrema"
        className="book-image"
        style={{
          width: '200px',
          transform: 'rotate(-6deg)',
          opacity: 0.8,
          zIndex: 1
        }}
      />

      {/* Mindset */}
      <img
        src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg"
        alt="Mindset"
        className="book-image shadow-lg"
        style={{
          width: '240px',
          zIndex: 2,
          transform: 'scale(1.05)'
        }}
      />

      {/* Metas Efectivas */}
      <img
        src="https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.09.56_qkjyzx.jpg"
        alt="Metas Efectivas"
        className="book-image"
        style={{
          width: '200px',
          transform: 'rotate(6deg)',
          opacity: 0.8,
          zIndex: 1
        }}
      />
    </div>

    <p className="lead mt-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
      Estos tres ebooks forman un sistema completo para transformar tu enfoque, alcanzar tus metas y desarrollar la mentalidad de las personas que logran lo que se proponen.
    </p>

    <Button variant="warning" size="lg" className="mt-4 fw-bold rounded-pill px-5" href="#comprar">
      Quiero acceder al pack completo
    </Button>
  </Container>
</section>

<section className="py-5 bg-light text-dark">
  <Container>
    <h2 className="text-center fw-bold mb-5 display-5">📚 Más entrenamientos que transforman</h2>

    <div
      className="grid-section"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
      }}
    >
      {/* Metas Efectivas */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="position-relative rounded-4 overflow-hidden"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.09.56_qkjyzx.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div className="position-relative h-100 d-flex flex-column justify-content-center align-items-start p-4 text-white">
          <h3 className="fw-bold mb-3">📘 Metas Efectivas</h3>
          <p className="lead">Transformá tus sueños en logros reales.</p>
          <ul className="mb-3">
            <li>✅ Método SMARTER</li>
            <li>✅ Compromiso real</li>
            <li>✅ Foco con propósito</li>
          </ul>
          <Button variant="warning" className="fw-bold rounded-pill px-4">Ver opciones</Button>
        </div>
      </motion.div>

      {/* Productividad Extrema */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="position-relative rounded-4 overflow-hidden"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.22.10_wxcqgo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div className="position-relative h-100 d-flex flex-column justify-content-center align-items-start p-4 text-white">
          <h3 className="fw-bold mb-3">📘 Productividad Extrema</h3>
          <p className="lead">Lográ más en menos tiempo con enfoque total.</p>
          <ul className="mb-3">
            <li>✅ Eliminar distracciones</li>
            <li>✅ Diseñar días de alto impacto</li>
            <li>✅ Energía y enfoque</li>
          </ul>
          <Button variant="warning" className="fw-bold rounded-pill px-4">Ver opciones</Button>
        </div>
      </motion.div>
    </div>

    <div className="text-center mt-5">
      <Button variant="dark" size="lg" className="fw-bold px-5 py-3 rounded-pill" href="#comprar">
        ¡Quiero estos entrenamientos!
      </Button>
    </div>
  </Container>
</section>


<section id="comprar" className="py-5 bg-warning text-dark">
  <Container className="my-5 py-5" style={{ maxWidth: '1000px' }}>
    <h2 className="text-center fw-bold mb-4 display-5">¿Estás listo para cambiar tu mentalidad?</h2>
    <p className="lead text-center mb-5">Este no es solo un libro. Es una nueva forma de vivir. Da el primer paso ahora.</p>

    {/* PACKS VISUALES */}
    <Row className="mb-5 g-4">
      {[
       
        {
          nombre: 'Mentalidad + metas Efectivas + Productividad',
          precio: '18 USD',
          incluye: ['Mentalidad', 'Productividad', 'Metas Efectivas'],
          imagenes: [
            'https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg',
            'https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.22.10_wxcqgo.jpg',
            'https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.09.56_qkjyzx.jpg'
          ]
        },
         {
          nombre: 'Mentalidad Solo',
          precio: '12 USD',
          incluye: ['Mentalidad'],
          imagenes: ['https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg']
        },
        {
          nombre: 'Productividad',
          precio: '8 USD',
          incluye: [ 'Productividad'],
          imagenes: [
            
            'https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.22.10_wxcqgo.jpg'
          ]
        },
        {
          nombre: 'Metas Efectivas',
          precio: '8 USD',
          incluye: [ 'Metas Efectivas'],
          imagenes: [
            'https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg',
            'https://res.cloudinary.com/doxadkm4r/image/upload/v1750881368/ebook/WhatsApp_Image_2025-06-21_at_13.09.56_qkjyzx.jpg'
          ]
        }
      ].map((pack, idx) => (
        <Col md={6} key={idx}>
          <div
            className="rounded-4 p-4 h-100 text-center border border-dark-subtle"
            style={{
              backgroundColor: 'transparent',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
            }}
          >
            <h5 className="fw-bold mb-3">{pack.nombre}</h5>
            <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
              {pack.imagenes.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Libro ${i}`}
                  className="rounded-3 shadow-sm"
                  style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                />
              ))}
            </div>
            <p className="mb-2"><strong>Incluye:</strong> {pack.incluye.join(' + ')}</p>
            <p className="fw-semibold fs-5">{pack.precio}</p>
          </div>
        </Col>
      ))}
    </Row>

    <h5 className="text-center mb-4">Completá tus datos para elegir tu bonus y comenzar tu compra</h5>

    <Form className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Tu nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribí tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={loading}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Tu correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </Form.Group>
    </Form>

    <div className="d-flex justify-content-center gap-3 flex-wrap">
      <Button
        variant="dark"
        size="lg"
        onClick={handleCompra}
        disabled={loading}
        className="px-5 py-3 fw-bold rounded-pill"
      >
        {loading ? 'Procesando...' : 'Comprar ahora'}
      </Button>
    </div>
  </Container>
</section>


      <a href="https://wa.me/543518120950" className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 9999 }} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" width="60" height="60" style={{ borderRadius: '50%' }} />
      </a>

      <Modal show={show} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{contenidoModal.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{contenidoModal.texto}</p>
        </Modal.Body>
      </Modal>


   <Modal
      show={showTipoCompra}
      onHide={() => setShowTipoCompra(false)}
      centered
      scrollable
      dialogClassName="modal-compra-ajustada"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>🛒 Elegí tu opción de compra</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Row className="g-3">
          {[
            { value: 'solo', label: '📘 Solo el libro', precio: 'USD 12' },
            { value: 'bonus1', label: '📚 Mindset + Productividad + Metas', desc: 'Mindset + Productividad + Metas', precio: 'USD 18' },
            { value: 'bonus2', label: '🚀 Productividad', desc: 'Productividad', precio: 'USD 8' },
            { value: 'bonus3', label: '🎯 Metas Efectivas', desc: 'Metas Efectivas', precio: 'USD 8' }
          ].map(({ value, label, desc, precio }) => (
            <Col xs={12} key={value}>
              <div
                onClick={() => setTipoCompra(value)}
                className={`border rounded-4 p-3 shadow-sm d-flex align-items-center justify-content-between cursor-pointer ${
                  tipoCompra === value ? 'border-success bg-success bg-opacity-25' : 'bg-white'
                }`}
                style={{ transition: 'all 0.3s', cursor: 'pointer' }}
              >
                <div>
                  <div className="fw-bold">{label}</div>
                  {desc && <div className="small text-muted">{desc}</div>}
                </div>
                <div className="fw-semibold">{precio}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="secondary" onClick={() => setShowTipoCompra(false)}>Cancelar</Button>
        <Button variant="success" onClick={confirmarCompra} disabled={!tipoCompra}>Confirmar compra</Button>
      </Modal.Footer>
    </Modal>



    </>
  );
}
