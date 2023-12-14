import { categorias } from "./datos.js";

const formulario = document.querySelector(".formulario");
let selectSexo = document.querySelector("#genero");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  datosHombre();
  validacion();
});

selectSexo.addEventListener("click", function (even) {
  even.preventDefault();
});

function datosHombre() {
  let inputPeso = parseFloat(document.querySelector("#inputPeso").value);
  let inputAltura = parseFloat(document.querySelector("#inputAltura").value);
  const calcularIMCResult = calculoIMC(inputPeso, inputAltura);

  if (inputPeso && inputAltura && selectSexo.value === "Hombre") {
    imprimirDatos(inputPeso, calcularIMCResult.toFixed(2));
  } else if (inputPeso && inputAltura && selectSexo.value === "Mujer") {
    imprimirDatos(inputPeso, calcularIMCResult.toFixed(2));
  }
}

function validacion() {
  let inputPeso = parseFloat(document.querySelector("#inputPeso").value);
  let inputAltura = parseFloat(document.querySelector("#inputAltura").value);
  if (
    isNaN(inputPeso) ||
    isNaN(inputAltura) ||
    inputPeso === "" ||
    inputAltura === "" ||
    inputPeso < 0 ||
    inputAltura < 0
  ) {
    MensajeError();
  } else {
  }
}

function MensajeError() {
  Swal.fire({
    icon: "error",
    text: "No puedes dejar los campos en blanco",
    showConfirmButton: false,
    timer: 1500,
  });
}
function calculoIMC(peso, altura) {
  return Number(peso / (altura * altura));
}

function imprimirDatos(peso, IMC) {
  for (const categoria of categorias) {
    for (const rangoValor of categoria.rango) {
      if (parseFloat(IMC) === rangoValor) {
        document.querySelector(".container_datos").innerHTML = `
          <div class="container__peso">
          <span class="container__titulo">Tu salud es:</span>
          <span class="container__dato">${categoria.salud}</span>
        </div>
        <div class="container__IMC">
          <span class="container__titulo">Tu IMC Personal</span>
          <span class="container__dato">${IMC} kg</span>
        </div>
        <div class="container__salud">
          <span class="container__titulo">Tu Peso Actual</span>
          <span class="container__dato">${peso} kg</span>
        </div>`;
        setTimeout(
          () => {
            let container = document.querySelector(
              ".container__recomendacion-grid"
            );
            container.textContent = "";
            for (let prueba of categoria.recomendacion) {
              let parrafo = document.createElement("p");
              parrafo.classList.add("container__resultado");
              parrafo.textContent = prueba;
              container.appendChild(parrafo);
            }
          }
        );
        return;
      }
    }
  }
}
