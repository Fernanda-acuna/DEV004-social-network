import { onNavigate } from "../lib/router";
import { createUser } from '../lib/auth';
import { exit } from "../lib/auth";
// import { back } from '../lib/auth';



export function createRegister() {
  const contenedorRegister = document.createElement("section");
  contenedorRegister.classList.add("contenedorRegister");

  const textoRegistro = document.createElement("p");
  textoRegistro.classList = "textoRegistro";
  contenedorRegister.appendChild(textoRegistro);
  textoRegistro.textContent = "Ingrese su mail y clave para registrarse en la app"


  //como hacer un contenedor paara estos 2 input juntos?
  const mailRegistro = document.createElement("input");
  mailRegistro.classList = "mailInput";
  contenedorRegister.appendChild(mailRegistro);
  mailRegistro.placeholder = "Email";
  mailRegistro.type = "email";
  mailRegistro.id = "emailUsuarioRegistro";

  //input de la clave
  const claveRegistro = document.createElement("input");
  claveRegistro.classList = "claveInput";
  contenedorRegister.appendChild(claveRegistro);
  claveRegistro.placeholder = "Contraseña";
  claveRegistro.type = "password";
  claveRegistro.id = "passwordUsuarioRegistro";

  // Logo
  const logoRegistro = document.createElement("img");
  logoRegistro.classList.add("logoMarchantes");
  logoRegistro.src = "../imagenes/logo-marchantes.png";
  contenedorRegister.appendChild(logoRegistro);

  // Creación de un elemento button y asignación a la variable button
  const registrarseAqui = document.createElement("button");
  //Le damos la clase para el css. quitandole el add, me funciono
  registrarseAqui.classList = "registrarseAqui";
  contenedorRegister.appendChild(registrarseAqui);
  // Asignación del texto "registrarse" al elemento button(que queremos que diga el boton en su interior)
  registrarseAqui.textContent = "Registrarse";



  //boton para volver al inicio 
  const botonVolver = document.createElement('button');
  botonVolver.classList = "botonVolver";
  botonVolver.textContent = '⬅︎ Volver atrás';
  botonVolver.addEventListener('click', () => {
    exit().then((resp) => {
      onNavigate('/')
    })
  })
  contenedorRegister.appendChild(botonVolver)

  //obtener el valor mediante el event listener
  registrarseAqui.addEventListener("click", () => {
    const emailR = document.getElementById("emailUsuarioRegistro").value;
    const passwordR = document.getElementById("passwordUsuarioRegistro").value;
    console.log("click")
    createUser(emailR, passwordR).then((rep) => {
      onNavigate('/muro')
    }).catch((err) => {
      alert('Verifica los datos, fue imposible registrarte')
    })
  })
  // const auth = getAuth();

  return contenedorRegister
}
