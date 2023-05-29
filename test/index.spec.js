/* eslint-disable max-len */
// import {describe, expect, test} from '@jest/globals';
import { createHome } from '../src/components/Home';
// import { signInWithEmail } from '../src/lib/auth';

// traerme la funcion mockeada de signinconemail
global.alert = () => { };
jest.mock('../src/lib/firebase/firebase', () => ({
  signInWithEmail: jest.fn(),
  onGetContent: jest.fn(),
  onNavigate: jest.fn(),
}));
describe('login', () => {
  it('al hacer click en el boton, este redirige', (done) => {
    // const mockSignIn = jest.fn(() => Promise.resolve({ user: { email: 'usuario@mail.com' } }))
    // donde se inserta la vista de Login
    const section = createHome();
    document.body.appendChild(section);
    // donde estan las rutas
    // addRoutes({
    //   '/home': () => { },
    // });
    // mock del metodo
    // section.signInWithEmail.mockResolvedValueOnce({ user: { email: 'usuario@mail.com' } });
    // vista de Login

    // inputs de formulario completados
    // section.querySelector('#email').value = 'usuario@mail.com';
    // section.querySelector('#password').value = 'usu123';
    // envio de formulario
    section.querySelector('.iniciarSesionBtn').dispatchEvent(new Event('click'));
    // pasos completados debe dirigirnos a home
    // investigar desde la linea 31 - 35
    setTimeout(() => {
      expect(window.location.pathname).toBe('/');

      done();
    }, 0);
  });
});
// jest.mock('../src/lib/router');
// // // import * as firebase from '../src/lib/firebase/firebase';
// describe('home component', () => {
//   it('debe redigir a register', () => {
//     // const onNavigateMock = onNavigate as jest.Mock
//     createHome();
//     expect(document).toBeDefined();
//     console.log(document.children.item(0));
//     const element = document.getElementById('registrateAqui');
//     console.log(element);
//     expect(element).toBeDefined();
//     const event = new MouseEvent('click', {
//       view: window,
//       bubbles: true,
//       cancelable: true,
//     });
//     element.dispatchEvent(event);
//     expect(onNavigate).toBeCalledWith('/register');
//   });
// });
// para llamar las alertas.
// global.alert = () => { };

// const contenedorHome = createHome();
// console.log(contenedorHome);
// describe('Pruebas de login', () => {
//   beforeEach(() => {
//   signInWithGoogle = jest.fn();
//    authentication.signInWithPassword = jest.fn();
//     onNavigate.navigateTo = jest.fn(() => console.log('mock de navigateTo usado'));
//   });

//   it('Autenticación con correo electrónico y contraseña correcta, debería redireccionar a /home', () => {
//     // preparamos el mock
//     authentication.signInWithPassword.mockResolvedValueOnce({ user: { email: 'ssinuco@gmail.com' } });

//     // Paso 1: Visualizar el formulario de login.
//     const divLogin = Login();

//     // Paso 2: Completamos el formulario con un correo electrónico y contraseña correctos.
//     contenedorHome.querySelector('#username').value = 'ssinuco@gmail.com';
//     contenedorHome.querySelector('#password').value = '123456';

//     // Paso 3: Enviamos el formulario dando clic en el botón `Login`.
//     contenedorHome.querySelector('#loginForm').dispatchEvent(new Event('submit'));

//     // Paso 4: Verificamos visualmente que la aplicación redija a `/home`.
//     return Promise.resolve().then(() => expect(onNavigate.navigateTo).toHaveBeenCalledWith('/muro'));
//   });
// });

// // test('example', () => {
// //   const mock = jest.fn();
// //   console.log(mock);
// //   mock();
// //   expect(mock).toHaveBeenCalled();
// // });
//  describe('myFunction', () => {
//     it('consigue renderizar home', () => {
//         document.body.append(home());
//     })
//  });
