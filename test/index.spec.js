// importamos la funcion que vamos a testear

import { createUser } from '../src/lib/auth';

describe('crear un usuario', () => {
  it('debería ser una función que crea usuarios', () => {
    const usuarios = [
      { passwordR: 'contraseña123' },
      { emailR: 'test@mail.com' },
    ];
    const creacionDeUsuario = createUser(usuarios);
    expect(creacionDeUsuario).toEqual([
      { emailR: 'test@mail.com' },
      { passwordR: 'contraseña123' },
    ]);
  });
});
