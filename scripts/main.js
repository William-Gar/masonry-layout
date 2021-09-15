/* Start Button Up *********************************/
let buttonUp = document.getElementById("button-up");

window.addEventListener("scroll", () => {
  document.documentElement.scrollTop > 400
    ? buttonUp.classList.add("button-up--status")
    : buttonUp.classList.remove("button-up--status");
});
/* End Button Up **********************************/

/* Start Modal ***********************************/
let identifier;
let previous;
let next;
let button;
let inject;
let flecha;
//Container que recibirá el código de inject en la función capturar
let containerModal = document.getElementById("container-modal");

//Veo mediante su segunda clase que tipo de galeria es, si la de paisajes, mascotas u otros.
let type = document.getElementById("gallery");
let section;

window.addEventListener("load", desplazar(type));

function desplazar(tipo) {
  section = tipo.classList[1];
}

let galeria = document.getElementsByClassName("gallery__link");
let totalImagenes = galeria.length;

for (let i = 0; i < galeria.length; i++) {
  galeria[i].addEventListener("click", capturar);
}

function capturar() {
  identifier = parseInt(this.id);

  inject = `
    <div class="modal" id="image${identifier}">
      <a class="modal__previous modal__button" id="previous">
        <img src="assets/arrow-left.svg" alt="previous" />
      </a>
      <img class="modal__img"
      src="images/${section}/${identifier}.jpg"
      alt="${section}-img-${identifier}" />
      <a class="modal__next modal__button" id="next">
        <img src="assets/arrow-right.svg" alt="next" />
      </a>
      <a class="modal__close" id="modal__close">
        <img src="assets/x-square.svg" alt="close" />
      </a>
    </div>
  `;

  containerModal.innerHTML = inject;

  //Cerrar el Modal mediante el boton X.
  let close = document.getElementById("modal__close");

  close.addEventListener("click", cerrar);

  //Cerrar el Modal mediante la tecla esc.
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrar();
    }
  });

  //Cambiar imágenes con los botones del Modal.
  let buttonsModal = document.getElementsByClassName("modal__button");
  for (let i = 0; i < buttonsModal.length; i++) {
    buttonsModal[i].addEventListener("click", () => {
      flecha = "";
    });
    buttonsModal[i].addEventListener("click", buttonM);
  }
}

//Cambiar imágenes con las flechas izquierda y derecha del teclado.
window.addEventListener("keydown", (e) => {
  if (identifier > 0) {
    flecha = e.key;
  }
  if (flecha === "ArrowLeft" || flecha === "ArrowRight") {
    buttonM();
  }
});

function buttonM() {
  button = this.id;
  previous = identifier - 1;
  next = identifier + 1;

  if (identifier == totalImagenes) {
    next = 1;
    previous = totalImagenes - 1;
  }
  if (identifier == 1) {
    previous = totalImagenes;
    next = 2;
  }

  let modalImg = document.querySelector(".modal__img");
  let modal = document.querySelector(".modal");

  if (button === "previous" || flecha === "ArrowLeft") {
    modalImg.setAttribute("src", `images/${section}/${previous}.jpg`);
    modalImg.setAttribute("alt", `${section}-img-${previous}`);
    modal.setAttribute("id", `image${previous}`);
    identifier = previous;
  }
  if (button === "next" || flecha === "ArrowRight") {
    modalImg.setAttribute("src", `images/${section}/${next}.jpg`);
    modalImg.setAttribute("alt", `${section}-img-${next}`);
    modal.setAttribute("id", `image${next}`);
    identifier = next;
  }
}

function cerrar() {
  containerModal.innerHTML = "";
  identifier = 0;
  flecha = "";
}
/* End Modal *************************************/
