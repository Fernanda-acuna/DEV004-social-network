// importamos la funcion que vamos a testear
// import { myFunction, AreaPost } from '../src/lib/index';
import { muro } from '../src/components/Muro';
import { addRoutes } from '../src/lib/router/index.js';
// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

describe('función signOut', () => {
  it('deberia cerrar sesión', () => {
    // eslint-disable-next-line
    fireBase.signOutUser = jest.fn().mockResolvedValue();
    document.body.innerHTML = "<section id='root'></section>";
    addRoutes({
      '/': () => { },
    });
    const vistaMuro = muro();
    vistaMuro.querySelector('#btnExit').dispatchEvent(new Event('click'));
    return Promise.resolve().then(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});
