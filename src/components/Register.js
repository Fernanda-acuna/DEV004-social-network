import { onNavigate } from '../lib/router';
import { createUser, exit } from '../lib/auth';

export function createRegister() {
  const contenedorRegister = document.createElement('form');
  contenedorRegister.classList.add('contenedorRegister');

  const textoRegistro = document.createElement('div');
  textoRegistro.classList = 'textoRegistro';
  // contenedorRegister.appendChild(textoRegistro);MOSTRADO ABAJO
  textoRegistro.textContent = 'Ingrese su mail y clave para registrarse en la app';

  const mailRegistro = document.createElement('input');
  mailRegistro.classList = 'mailInput';
  contenedorRegister.appendChild(mailRegistro);
  mailRegistro.placeholder = 'Email';
  mailRegistro.setAttribute('required', '');
  mailRegistro.type = 'email';
  mailRegistro.id = 'emailUsuarioRegistro';

  //input de la clave
  const claveRegistro = document.createElement('input');
  claveRegistro.classList = 'claveInput';
  contenedorRegister.appendChild(claveRegistro);
  claveRegistro.placeholder = 'Contraseña';
  claveRegistro.setAttribute('required', '');
  claveRegistro.type = 'password';
  claveRegistro.id = 'passwordUsuarioRegistro';

  // Logo
  const logoRegistro = document.createElement('img');
  logoRegistro.classList.add('logoMarchantes');
  logoRegistro.src = '../imagenes/logo-marchantes.png';
  // contenedorRegister.appendChild(logoRegistro); MOSTRADO ABAJO

  // Creación de un elemento button y asignación a la variable button
  const registrarseAqui = document.createElement('button');
  //Le damos la clase para el css. quitandole el add, me funciono
  registrarseAqui.classList = 'registrarseAqui';
  // contenedorRegister.appendChild(registrarseAqui);MOSTRADO ABAJO
  registrarseAqui.setAttribute('type', 'submit');
  // Asignación del texto "registrarse" al elemento button
  registrarseAqui.textContent = 'Registrarse';

  //boton para volver al inicio 
  const botonVolver = document.createElement('button');
  botonVolver.classList = 'botonVolver';
  botonVolver.textContent = '⬅︎ Volver atrás';
  botonVolver.addEventListener('click', () => {
    exit().then(() => {
      onNavigate('/')
    });
  });
  // contenedorRegister.appendChild(botonVolver) MOSTRADO ABAJO

  //obtener el valor mediante el event listener
  contenedorRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailR = document.getElementById('emailUsuarioRegistro').value;
    const passwordR = document.getElementById('passwordUsuarioRegistro').value;

    createUser(emailR, passwordR);
    // .then((rep) => {
    //   // onNavigate('/muro')

    // }).catch((err) => {
    //   console.log(err)
    //   alert('Verifica los datos, fue imposible registrarte')
    // })
  });

  contenedorRegister.appendChild(textoRegistro);
  contenedorRegister.appendChild(logoRegistro);
  contenedorRegister.appendChild(registrarseAqui);
  contenedorRegister.appendChild(botonVolver);
  return contenedorRegister;
}
