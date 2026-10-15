// script.js - Siglo XXI
// Inicializa Swiper por contenedor, la ventana de detalle de cada invento y las barras animadas.

document.documentElement.classList.add('js');

// Si una foto no está en la carpeta img/, se muestra un recuadro gris con el nombre
window.fotoFalta = function (img) {
  const caja = document.createElement('span');
  caja.className = 'ph';
  caja.textContent = img.alt;
  img.replaceWith(caja);
};

// --- DATOS DE CADA INVENTO (lo que se muestra al pulsar "Ver detalle") ---
const INVENTOS = {
  iphone: {
    nombre: 'El smartphone (iPhone)',
    foto: 'img/iphone.jpg',
    anio: 2007,
    categoria: 'Tecnologías / Software',
    inventor: 'Apple / Steve Jobs',
    funcion: 'Integrar teléfono, iPod e internet en una pantalla multitáctil intuitiva.',
    importancia: 'Creó la economía de aplicaciones, comercio móvil y fotografía permanente.',
    dato: { valor: '6.000.000.000+', texto: 'Smartphones activos en el planeta' },
    nota: 'La computadora ubicua de bolsillo · 2007 ➔ Actualidad'
  },
  facebook: {
    nombre: 'Facebook',
    foto: 'img/facebook.jpg',
    anio: 2004,
    categoria: 'Tecnologías / Software',
    inventor: 'Mark Zuckerberg y compañeros',
    funcion: 'Conectar personas y comunidades online.',
    importancia: 'Transformó la comunicación colectiva.',
    hoy: 'Más de 3.000 millones de usuarios activos.',
    nota: 'Nació como Facemash, una app de puntuación universitaria. Comunicación masiva + contenido creado por usuarios = la piedra angular de la Web 2.0.'
  },
  youtube: {
    nombre: 'YouTube',
    foto: 'img/youtube.jpg',
    anio: 2005,
    categoria: 'Tecnologías / Software',
    inventor: 'Hurley, Chen y Karim',
    funcion: 'Plataforma abierta de video digital.',
    importancia: 'Democratizó la creación de contenido.',
    hoy: '2° sitio web más visitado del mundo.',
    nota: 'Comenzó como un sitio de citas mediante videos. Comunicación masiva + contenido creado por usuarios = la piedra angular de la Web 2.0.'
  },
  chatgpt: {
    nombre: 'Inteligencia artificial generativa (ChatGPT)',
    foto: 'img/chatgpt.jpg',
    anio: 2022,
    categoria: 'Tecnologías / Software',
    inventor: 'OpenAI (sobre la arquitectura Transformer de Google, 2017)',
    funcion: 'IA generativa y síntesis: de asistentes pasivos a agentes generativos y creativos.',
    importancia: 'Adopción más rápida en la historia de la Web.',
    dato: { valor: '100 millones', texto: 'de usuarios en solo 2 meses' },
    pasos: {
      titulo: 'Evolución clave',
      items: [
        '2017 · Arquitectura Transformer (Google)',
        '2022 · Lanzamiento de ChatGPT (OpenAI)',
        'Hoy · Integración masiva en la economía'
      ]
    },
    hoy: 'Transforma la educación y el estudio, la medicina y el diagnóstico, el arte y el diseño visual, y la programación de software.'
  },
  crispr: {
    nombre: 'CRISPR-Cas9',
    foto: 'img/crispr.jpg',
    anio: 2012,
    categoria: 'Ciencias / Salud',
    premio: 'Premio Nobel de Química 2020',
    inventor: 'Jennifer Doudna & Emmanuelle Charpentier',
    funcion: 'Edición genómica precisa.',
    pasos: {
      titulo: 'Cómo funciona',
      items: [
        'Localiza: el ARN guía ubica la secuencia exacta de ADN.',
        'Corta: la enzima Cas9 realiza un corte limpio.',
        'Edita: se repara o sustituye la cadena genética.'
      ]
    },
    importancia: 'Abre la era del tratamiento genético definitivo para enfermedades hereditarias.',
    hoy: 'Primer tratamiento Casgevy aprobado para anemia falciforme (2023).'
  },
  arnm: {
    nombre: 'Vacunas de ARNm',
    foto: 'img/arnm.jpg',
    anio: 2020,
    categoria: 'Ciencias / Salud',
    premio: 'Nobel de Medicina 2023',
    inventor: 'Katalin Karikó & Drew Weissman',
    funcion: 'Medicina acelerada.',
    pasos: {
      titulo: 'Mecanismo de acción',
      items: [
        'El ARNm sintético ingresa al organismo.',
        'La célula produce la proteína inocua.',
        'El sistema inmune genera defensas.'
      ]
    },
    dato: { valor: '< 1 año', texto: 'de desarrollo de la vacuna ARNm COVID-19, frente a ~10 años del desarrollo estándar tradicional' },
    hoy: 'Investigación activa para vacunas avanzadas contra cáncer y virus mutantes.'
  },
  falcon9: {
    nombre: 'Cohetes reutilizables (Falcon 9)',
    foto: 'img/falcon9.jpg',
    anio: 2015,
    categoria: 'Espacio',
    inventor: 'SpaceX / Elon Musk',
    funcion: 'Primeras etapas de cohetes que regresan a la Tierra intactas.',
    importancia: 'Reducción dramática del costo por kilogramo puesto en órbita.',
    dato: { valor: '~30 %', texto: 'del costo de un lanzamiento, frente al 100 % de un cohete tradicional desechable' },
    hoy: 'Misiones constantes de internet Starlink y vuelos tripulados frecuentes.',
    nota: 'Democratizando el acceso comercial al espacio exterior'
  },
  bitcoin: {
    nombre: 'Bitcoin y blockchain',
    foto: 'img/bitcoin.jpg',
    anio: 2009,
    categoria: 'Finanzas',
    inventor: 'Satoshi Nakamoto (seudónimo)',
    funcion: 'Dinero digital entre pares sin intermediación bancaria.',
    importancia: 'Creó el libro contable inmutable y descentralizado (blockchain).',
    hoy: 'Reservorio de valor e infraestructura financiera global.',
    nota: '[B1] → [B2] → [B3] → [B4] · El nacimiento de la confianza sin intermediario central'
  }
};

document.addEventListener('DOMContentLoaded', function () {

  // --- FOTOS: revisa las que no cargaron ---
  document.querySelectorAll('img[data-foto]').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      window.fotoFalta(img);
    } else {
      img.addEventListener('error', function () { window.fotoFalta(img); });
    }
  });

  // --- ANIMACIÓN: las barras se llenan cuando aparecen en pantalla ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- VENTANA DE DETALLE (reemplaza la función pagarNequi de la cafetería) ---
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  function seccion(titulo, texto) {
    return '<div class="m-sec"><h5>' + titulo + '</h5><p>' + texto + '</p></div>';
  }

  window.verInvento = function (id) {
    const d = INVENTOS[id];
    if (!d || !modal) return;

    let html = '<div class="m-head"><img class="m-foto" src="' + d.foto + '" alt="' + d.nombre + '" onerror="fotoFalta(this)">' +
      '<div><h3>' + d.nombre + '</h3><small>' + d.anio + ' · ' + d.categoria + '</small></div></div>';

    if (d.premio) html += '<span class="m-premio">' + d.premio + '</span>';

    html += seccion('Inventor / equipo', d.inventor);
    html += seccion('Función', d.funcion);

    if (d.pasos) {
      html += '<div class="m-sec"><h5>' + d.pasos.titulo + '</h5><ol>' +
        d.pasos.items.map(function (p) { return '<li>' + p + '</li>'; }).join('') +
        '</ol></div>';
    }

    if (d.importancia) html += seccion('Importancia', d.importancia);
    if (d.dato) html += '<div class="m-dato"><strong>' + d.dato.valor + '</strong><span>' + d.dato.texto + '</span></div>';
    if (d.hoy) html += seccion('Hoy', d.hoy);
    if (d.nota) html += '<p class="m-nota">' + d.nota + '</p>';

    modalBody.innerHTML = html;
    modal.showModal();
  };

  // Cerrar al hacer clic fuera de la ventana
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.close();
    });
  }

  // Si Swiper no cargó (sin internet), el resto de la página sigue funcionando
  if (typeof Swiper === 'undefined') return;

  // --- SWIPER HERO (selector por contenedor) ---
  const heroEl = document.querySelector('.myswiper-1');
  if (heroEl) {
    new Swiper(heroEl, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: heroEl.querySelector('.swiper-pagination'), clickable: true },
      navigation: {
        nextEl: heroEl.querySelector('.swiper-button-next'),
        prevEl: heroEl.querySelector('.swiper-button-prev')
      }
    });
  }

  // --- SWIPERS DE INVENTOS (uno por pestaña) ---
  const swipers = {}; // almacenará por id
  document.querySelectorAll('.myswiper-2').forEach(function (container) {
    const id = container.id || ('swiper-' + Math.random().toString(36).slice(2, 8));

    swipers[id] = new Swiper(container, {
      slidesPerView: 2,
      spaceBetween: 20,
      rewind: true,        // vuelve al inicio al llegar al final (sirve aunque haya pocos inventos)
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev')
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        760: { slidesPerView: 2 }
      }
    });
  });

  // --- Cuando cambias de pestaña, actualiza el swiper correspondiente ---
  document.querySelectorAll('.tabinput').forEach(function (radio) {
    radio.addEventListener('change', function () {
      const swiperId = 'swiper' + radio.id.replace('tabs', ''); // tabs1 -> swiper1
      if (swipers[swiperId]) {
        // esperar un momento para que la pestaña sea visible y el swiper calcule medidas
        setTimeout(function () { swipers[swiperId].update(); }, 120);
      }
    });
  });

});
