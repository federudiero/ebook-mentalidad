import React, { useState } from 'react';
import { Container, Accordion, Row, Col, Button, Card, Navbar, Nav, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MentalidadDeluxeLanding.css';




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

  const abrirModal = (titulo, texto) => setContenidoModal({ titulo, texto }) || setShow(true);
  const cerrarModal = () => setShow(false);

  const handleCompra = async () => {
  if (!nombre || !email) {
    alert('Completá tus datos');
    return;
  }

  setLoading(true);
  try {
    const res = await fetch('/api/crear-preferencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email }),
    });
    const data = await res.json();
    window.location.href = data.init_point;
  } catch (err) {
    console.error('Error:', err);
    alert('Error al iniciar pago.');
  }
  setLoading(false);
};

  
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-warning fs-3">Mentalidad</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#beneficios">Beneficios</Nav.Link>
              <Nav.Link href="#capitulos">Capítulos</Nav.Link>
              <Nav.Link href="#testimonios">Testimonios</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
              <Nav.Link href="#comprar">Comprar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
  className="text-white bg-dark text-center"
  style={{
    paddingTop: '160px',
    paddingBottom: '80px',
  }}
>
  <Container>
    <h1 className="display-3 fw-bold mb-4">
      🔥 ¿Y si el verdadero bloqueo en tu vida no está fuera… sino en tu cabeza?
    </h1>
    <p className="lead mb-3">
      Un entrenamiento que cambia tu manera de pensar, actuar y vivir.
    </p>
    <p className="lead mb-4">
      Vivís estancado, sabés que tenés potencial, pero no entendés por qué seguís repitiendo los mismos resultados una y otra vez…
    </p>
    <Button variant="warning" size="lg" href="#comprar" className="px-5 py-3 fw-semibold shadow-sm rounded-pill">
      Quiero mi copia
    </Button>

    <div className="d-flex justify-content-center mt-5">
      <img
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
          <h2 className="text-center mb-5 fw-bold display-6">⚡️ Descubrí el poder de tu mente con el ebook que ya está transformando vidas</h2>
          <Row>
            {["Reprograma tu forma de pensar", "Rompe tus creencias limitantes", "Activa tu propósito", "Toma el control de tu vida"].map((b, i) => (
              <Col md={6} lg={3} key={i} className="mb-4">
                <Card className="text-center text-white h-100 border-0 bg-dark shadow rounded-4 p-3 card-hover">
                  <Card.Body>
                    <Card.Text className="fw-semibold fs-5">{b}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>



      <section id="capitulos" className="py-5 bg-light text-dark">
        <Container className="text-center">
          <h2 className="fw-bold mb-5">🧠 ENTRENAMIENTO DE MENTALIDAD</h2>
          <p className="lead mb-5">Un entrenamiento que cambia tu manera de pensar, actuar y vivir.</p>
         
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
              <Button
                key={i}
                variant="warning"
                className="text-dark fw-semibold rounded-pill px-4 py-2 shadow"
                onClick={() => abrirModal(titulo, resumenCapitulos[titulo])}
              >
                {titulo}
              </Button>
            ))}
          </div>
        </Container>
      </section>
         


      <section className="py-5 text-white bg-dark text-center">
        <Container>
          <h2 className="text-center fw-bold mb-4 display-6">La buena noticia es…</h2>
          <p className="lead text-center mx-auto" style={{ maxWidth: '800px' }}>
            Que todos podemos adoptar estos patrones de pensamiento, es totalmente alcanzable y aplicable en nuestra vida diaria.
            <br /><br />
            A través de este libro, descubrirás que hacer dinero es una habilidad que se puede aprender y perfeccionar, independientemente de tu situación o educación. Muchas personas desconocen que detrás de la riqueza de las personas millonarias se encuentra un patrón de pensamiento y un método que utilizan para enriquecerse.
            <br /><br />
            Por lo tanto, si deseas transformar tu vida, es fundamental que aprendas a pensar, actuar y crear riqueza como estas personas, incluso partiendo desde cero.
          </p>
          <div className="text-center mt-5">
          <img
  src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745949187/ebook/Imagen_de_WhatsApp_2025-04-26_a_las_21.42.07_4cd72e1c_spp4vt.jpg"
  alt="Inspiración"
  className="img-fluid rounded-4 shadow-lg"
  style={{ maxWidth: '500px', width: '100%' }}
/>

          </div>
        </Container>
      </section>


      <section className="py-5 bg-warning text-dark">
  <Container>
    <h2 className="text-center fw-bold mb-5 display-6">¿Qué vas a aprender en este libro?</h2>
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
          <div
            className="p-4 bg-light rounded-4 h-100 d-flex shadow"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div className="me-3 fs-4 text-success">✓</div>
            <p className="mb-0" style={{ fontWeight: 500 }}>{text}</p>
          </div>
        </Col>
      ))}
    </Row>
    <h2 className="text-center fw-bold mt-5 mb-4 display-6">🚀 Empezá hoy tu transformación</h2>
    <p className="lead text-center mt-5 fw-semibold">
      Este no es solo un libro. Es un cambio de mentalidad que te acompañará toda la vida.
    </p>
  </Container>
  <Button variant="dark" size="lg" href="#comprar">Quiero mi copia</Button>
</section>


<section className="py-5 bg-dark text-white" id="bonos">
  <Container>
    <h2 className="text-center mb-5 display-5 fw-bold">¿QUÉ OBTIENES AL REALIZAR LA COMPRA?</h2>
    <Row className="align-items-center">
      <Col md={6} className="mb-4 mb-md-0">
        <Card className="bg-warning border-1 text-dark mb-4 shadow">
          <Card.Body>
            <h5 className="fw-bold">📘 Libro en PDF</h5>
            <p>Recibirás en tu correo electrónico el libro "Mentalidad" en formato PDF para que puedas disfrutarlo en cualquier dispositivo.</p>
          </Card.Body>
        </Card>
        <Card className="bg-warning border-1 text-dark mb-4 shadow">
          <Card.Body>
            <h5 className="fw-bold">🔄 Acceso a actualizaciones sin costo</h5>
            <p>Acceso ilimitado a todas las actualizaciones del libro y material complementario sin costo adicional.</p>
          </Card.Body>
        </Card>
        <Card className="bg-warning border-1 text-dark mb-4 shadow">
          <Card.Body>
            <h5 className="fw-bold">💬 Canal de soporte</h5>
            <p>Podés contactarte con nosotros a través de WhatsApp o redes. Estamos disponibles para ayudarte siempre que lo necesites.</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6} className="text-center">
        <div className="bg-white rounded-4 shadow-lg p-3">
          <img
            src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745949036/ebook/ChatGPT_Image_29_abr_2025_14_47_45_qpvbsi.png"
            alt="Ebooks incluidos"
            className="img-fluid rounded-3"
            style={{ maxWidth: '350px', width: '100%' }}
          />
        </div>
      </Col>
    </Row>
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
          Puedes utilizar tarjetas de crédito, débito, PayPal y otros métodos de pago dependiendo del país.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>¿Cómo es el proceso de compra?</Accordion.Header>
        <Accordion.Body>
          Hacés clic en el botón de compra, seguís los pasos e ingresás tus datos. Luego recibirás el enlace de descarga en tu correo electrónico.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Si tengo algún inconveniente, ¿dónde puedo escribir?</Accordion.Header>
        <Accordion.Body>
          Podés escribirnos a contacto@blancaspiedras.com o por WhatsApp y te ayudaremos lo antes posible.
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





      <section className="py-5 bg-dark text-white">
        <Container className="bg-light text-dark p-5 rounded-4 shadow-lg" style={{ maxWidth: '1000px' }}>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-4 mb-lg-0">
              <img src="https://res.cloudinary.com/doxadkm4r/image/upload/v1745440177/ebook/ChatGPT_Image_23_abr_2025_17_28_54_scorez.png" alt="Ebooks incluidos" className="img-fluid rounded-3" style={{ maxHeight: '300px' }} />
            </Col>
            <Col lg={6}>
              <h3 className="fw-bold mb-3">INCLUYE:</h3>
              <ul className="list-unstyled lead">
                <li><span className="text-success fw-semibold">Bonus #1</span>: Cómo crear un negocio exitoso desde cero <span className="text-muted">(Valorado en 12 USD)</span></li>
                <li><span className="text-success fw-semibold">Bonus #2</span>: 7 maneras de generar ingresos en internet <span className="text-muted">(Valorado en 15 USD)</span></li>
                <li><span className="text-success fw-semibold">Bonus #3</span>: 12 hacks letales de persuasión para vender más <span className="text-muted">(Valorado en 11 USD)</span></li>
                <li><span className="text-success fw-semibold">Bonus #4</span>: Guía completa para invertir como un experto <span className="text-muted">(Valorado en 12 USD)</span></li>
                <li><span className="text-success fw-semibold">Bonus #5</span>: Estrategias para gestionar tu dinero inteligentemente <span className="text-muted">(Valorado en 10 USD)</span></li>
              </ul>
              <div className="text-center mt-4">
                <Button variant="warning" size="lg" href="#comprar" className="fw-bold text-uppercase">¡Sí, quiero el libro y los bonus!</Button>
              </div>
             
            </Col>
          </Row>
        </Container>
      </section>
    

<section id="contacto" className="py-5 bg-light text-dark">
        <Container>
          <h2 className="text-center mb-5 fw-bold display-6">¿Tienes preguntas?</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Tu nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="tucorreo@ejemplo.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Escribe tu mensaje..." />
                </Form.Group>
                <Button variant="dark" type="submit">Enviar mensaje</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>


<section id="comprar" className="py-5 bg-warning text-dark">
  <Container className="my-5 py-5" style={{ maxWidth: '600px' }}>
    <h2 className="text-center fw-bold mb-4 display-5">¿Estás listo para cambiar tu mentalidad?</h2>
    <p className="lead text-center mb-4">Este no es solo un libro. Es una nueva forma de vivir. Da el primer paso ahora.</p>

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
      <Button variant="dark" size="lg" onClick={() => handleCompra('paypal')} disabled={loading}>
        {loading ? 'Procesando...' : 'Comprar con PayPal'}
      </Button>
      <Button variant="secondary" size="lg" onClick={() => handleCompra('mercadoPago')} disabled={loading}>
        {loading ? 'Procesando...' : 'Comprar con Mercado Pago'}
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
    </>
  );
}
