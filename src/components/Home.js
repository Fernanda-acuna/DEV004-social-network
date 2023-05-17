import { onNavigate } from '../lib/router';
import { signInWithEmail, loginGoogle } from '../lib/auth';

export function createHome() {
  // Contenedor del home
  const contenedorGeneral = document.createElement('section');
  const contenedorGeneral = document.createElement('section');

  contenedorGeneral.id = 'contenedor-General';
  contenedorGeneral.classList.add('contenedorGeneral');
  contenedorGeneral.id = 'contenedor-General';
  contenedorGeneral.classList.add('contenedorGeneral');
  // contenedorGeneral.appendChild(contenedorGeneral);

  // Logo
  const logo = document.createElement('img');
  logo.classList.add('logoMarchantes');
  logo.src = '../imagenes/logo-marchantes.png';
  const logo = document.createElement('img');
  logo.classList.add('logoMarchantes');
  logo.src = '../imagenes/logo-marchantes.png';
  contenedorGeneral.appendChild(logo);

  //TEXTO PARA ingresar clave en EL INPUT DEL MAIL
  const txtIngresaMail = document.createElement('p');
  txtIngresaMail.classList = 'txtIngresaMail';
  txtIngresaMail.textContent = 'Ingresa tu mail';
  const txtIngresaMail = document.createElement('p');
  txtIngresaMail.classList = 'txtIngresaMail';
  txtIngresaMail.textContent = 'Ingresa tu mail';
  contenedorGeneral.appendChild(txtIngresaMail);


  // input del mail en inicio
  const mailInput = document.createElement('input');
  mailInput.classList = 'mailInput';
  const mailInput = document.createElement('input');
  mailInput.classList = 'mailInput';
  contenedorGeneral.appendChild(mailInput);
  mailInput.placeholder = 'ejemplo@email.com';
  mailInput.type = 'email';
  mailInput.id = 'emailUsuario';
  mailInput.placeholder = 'ejemplo@email.com';
  mailInput.type = 'email';
  mailInput.id = 'emailUsuario';


  //TEXTO DE INGRESAR CLAVE EN INPUT
  const txtIngresaClave = document.createElement('p');
  txtIngresaClave.classList = 'txtIngresaClave';
  txtIngresaClave.textContent = 'Ingresa tu clave';
  const txtIngresaClave = document.createElement('p');
  txtIngresaClave.classList = 'txtIngresaClave';
  txtIngresaClave.textContent = 'Ingresa tu clave';
  contenedorGeneral.appendChild(txtIngresaClave);


  //input de la clave
  const claveInput = document.createElement('input');
  claveInput.classList = 'claveInput';
  const claveInput = document.createElement('input');
  claveInput.classList = 'claveInput';
  contenedorGeneral.appendChild(claveInput);
  claveInput.placeholder = 'Contraseña';
  claveInput.type = 'password';
  claveInput.id = 'passwordUsuario';
  claveInput.placeholder = 'Contraseña';
  claveInput.type = 'password';
  claveInput.id = 'passwordUsuario';

//BOTON PARA INICIAR SESION CON GOOGLE
  const botonGoogle = document.createElement('img');
  botonGoogle.classList = 'botonGoogle';
  contenedorGeneral.appendChild(botonGoogle);
  botonGoogle.src = '../imagenes/btn_google_signin_light_normal_web@2x.png';
  botonGoogle.src = '../imagenes/btn_google_signin_light_normal_web@2x.png';
  // botonGoogle.textContent = "Inicia sesión con Google"
  botonGoogle.id = 'botonDeGoogle';
  botonGoogle.addEventListener('click', () => {
  botonGoogle.id = 'botonDeGoogle';
  botonGoogle.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        onNavigate('/muro');
      }).catch(() => {
        alert('No se pudo iniciar sesión con Google');
      });
  });

  // Texto e hipervínculo "Regístrate"
  const botonRegistro = document.createElement('section');
  botonRegistro.classList.add('botonRegistro');
  const botonRegistro = document.createElement('section');
  botonRegistro.classList.add('botonRegistro');
  botonRegistro.innerHTML = '¿No tienes una cuenta? <a href="#">Regístrate</a>.';
  contenedorGeneral.appendChild(botonRegistro);
  botonRegistro.id = 'registrateAqui';
  botonRegistro.style.textAlign = 'center';
  botonRegistro.addEventListener('click', () => {
    //const botonRegistrate = document.getElementById("registrateAqui").value;
    onNavigate('/register')
 
  })

  // Creación de un elemento button y asignación a la variable button
  const iniciarSesionBtn = document.createElement('button');
  iniciarSesionBtn.classList = 'iniciarSesionBtn';
  contenedorGeneral.appendChild(iniciarSesionBtn);
  // Asignación del texto "Iniciar sesión" al elemento button
  iniciarSesionBtn.textContent = 'Iniciar sesión';
  iniciarSesionBtn.addEventListener('click', () => {
    const email = document.getElementById('emailUsuario').value;
    const password = document.getElementById('passwordUsuario').value;

    signInWithEmail(email, password).then(() => {
      console.log('entré');
      onNavigate('/muro');
    }).catch(() => {
      alert('Verifica los datos ingresados');
    });
  });

  return contenedorGeneral;
}
