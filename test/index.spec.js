// importamos la funcion que vamos a testear
import { myFunction, AreaPost } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});

