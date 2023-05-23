// importamos la funcion que vamos a testear
// import { myFunction, AreaPost } from '../src/lib/index';
// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

// Import the necessary modules and functions
import { createUser } from '../src/lib/auth'; 
import { contenedorRegister } from '../src/components/Register';
// Import the function being tested

// Mock the DOM elements and functions
document.getElementById = jest.fn();
const preventDefault = jest.fn();
const addEventListener = jest.spyOn(document, 'addEventListener').mockImplementation((event, callback) => {
  callback({ preventDefault });
});

// Mock the createUser function
jest.mock('../src/lib/auth', () => ({
  createUser: jest.fn().mockResolvedValue(),
}));

// Import the module containing the function to be tested
// Import the module containing the event listener

describe('contenedorRegister', () => {
  it('should call preventDefault on form submission', () => {
    // Call the event listener
    contenedorRegister.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    // Assert that preventDefault was called
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should call createRegister with the correct arguments', () => {
    // Set up the mock input values
    const emailR = 'test@example.com';
    const passwordR = 'password123';

    // Mock the getElementById function to return the mock input values
    document.getElementById.mockReturnValueOnce({ value: emailR });
    document.getElementById.mockReturnValueOnce({ value: passwordR });

    // Call the event listener
    contenedorRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailR = document.getElementById('emailUsuarioRegistro').value;
      const passwordR = document.getElementById('passwordUsuarioRegistro').value;

      createUser(emailR, passwordR);
    });

    // Assert that createUser was called with the correct arguments
    expect(createUser).toHaveBeenCalledWith(emailR, passwordR);
  });

  it('should handle successful user creation', async () => {
    // Mock the createUser function to resolve
    createUser.mockResolvedValueOnce();

    // Call the event listener
    contenedorRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailR = document.getElementById('emailUsuarioRegistro').value;
      const passwordR = document.getElementById('passwordUsuarioRegistro').value;

      createUser(emailR, passwordR);
    });

    // Assert that the createUser function was called
    expect(createUser).toHaveBeenCalled();

    // Add any assertions for the expected behavior after successful user creation
    // For example, you can assert that onNavigate('/muro') is called
  });
});
