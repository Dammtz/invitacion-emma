/* =========================================================
   CONFIGURACIÓN DE LA INVITACIÓN
========================================================= */

const CONFIG = {
  // 27 de septiembre de 2026 - 12:00 PM
  fechaEvento: new Date("2026-09-27T12:00:00-06:00"),

  // Después ponemos aquí el número que recibirá confirmaciones
  whatsapp: "525615066690",

  // Después ponemos la dirección exacta
  direccion: "Independencia, Naucalpan de Juárez, Estado de México"
};


/* =========================================================
   CUENTA REGRESIVA
========================================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


function actualizarCuentaRegresiva() {

  const ahora = new Date();

  const diferencia =
    CONFIG.fechaEvento.getTime() - ahora.getTime();


  /* Si ya llegó la fecha */

  if (diferencia <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }


  /* Conversiones */

  const segundo = 1000;
  const minuto = segundo * 60;
  const hora = minuto * 60;
  const dia = hora * 24;


  const dias =
    Math.floor(diferencia / dia);

  const horas =
    Math.floor((diferencia % dia) / hora);

  const minutos =
    Math.floor((diferencia % hora) / minuto);

  const segundos =
    Math.floor((diferencia % minuto) / segundo);


  /* Pintar valores */

  daysElement.textContent =
    String(dias).padStart(2, "0");

  hoursElement.textContent =
    String(horas).padStart(2, "0");

  minutesElement.textContent =
    String(minutos).padStart(2, "0");

  secondsElement.textContent =
    String(segundos).padStart(2, "0");
}


/* Ejecutar inmediatamente */

actualizarCuentaRegresiva();


/* Actualizar cada segundo */

setInterval(
  actualizarCuentaRegresiva,
  1000
);


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const elementosAnimados = document.querySelectorAll(
  `
  .section__mini-title,
  .section__title,
  .countdown__item,
  .invitation__card,
  .date-card,
  .schedule__item,
  .location__card,
  .detail-card,
  .gallery__item,
  .rsvp__card
  `
);


/* Agregamos clase inicial */

elementosAnimados.forEach((elemento) => {
  elemento.classList.add("reveal");
});


/* Observer */

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("reveal--visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.15
  }

);


/* Observar elementos */

elementosAnimados.forEach((elemento) => {
  observer.observe(elemento);
});


/* =========================================================
   BOTÓN CÓMO LLEGAR
========================================================= */

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/SGMzAS5ujhqC39vW7";

const directionsButton = document.getElementById("directionsButton");

if (directionsButton) {
  directionsButton.addEventListener("click", function () {
    window.open(GOOGLE_MAPS_URL, "_blank");
  });
}


/* =========================================================
   CONFIRMACIÓN DE ASISTENCIA
========================================================= */

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

  rsvpForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre =
      document
        .getElementById("guestName")
        .value
        .trim();

    const personas =
      document
        .getElementById("guestCount")
        .value;

    const mensaje =
      document
        .getElementById("message")
        .value
        .trim();


    if (!nombre || !personas) {

      mostrarNotificacion(
        "Por favor completa tu nombre y número de personas."
      );

      return;
    }


    let texto = `¡Hola! 🎉

Confirmo mi asistencia al cumpleaños de Emma Amairani.

👤 Nombre: ${nombre}
👪 Personas: ${personas}`;


    if (mensaje) {

      texto += `

💛 Mensaje para Emma:
${mensaje}`;

    }


    texto += `

📅 ¡Nos vemos el 27 de septiembre!

🤠 ¡Hasta el infinito y más allá! 🚀`;


    if (!CONFIG.whatsapp) {

      mostrarNotificacion(
        "Falta configurar el número de WhatsApp."
      );

      return;
    }


    const whatsappURL =
      `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;


    window.open(
      whatsappURL,
      "_blank"
    );

  });

}

/* =========================================================
   NOTIFICACIÓN PERSONALIZADA
========================================================= */

function mostrarNotificacion(mensaje) {

  /* Eliminar anterior */

  const anterior =
    document.querySelector(".toast");

  if (anterior) {
    anterior.remove();
  }


  /* Crear */

  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = mensaje;


  document.body.appendChild(toast);


  /* Mostrar */

  requestAnimationFrame(() => {

    toast.classList.add("toast--visible");

  });


  /* Ocultar */

  setTimeout(() => {

    toast.classList.remove("toast--visible");


    setTimeout(() => {

      toast.remove();

    }, 400);

  }, 3500);

}


/* =========================================================
   SCROLL SUAVE EN LINKS INTERNOS
========================================================= */

const internalLinks =
  document.querySelectorAll('a[href^="#"]');


internalLinks.forEach((link) => {

  link.addEventListener(
    "click",
    function (event) {

      const destino =
        this.getAttribute("href");


      if (
        !destino ||
        destino === "#"
      ) {
        return;
      }


      const elemento =
        document.querySelector(destino);


      if (elemento) {

        event.preventDefault();

        elemento.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

});