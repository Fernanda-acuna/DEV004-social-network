/* eslint-disable no-unused-vars */
// import logoMarchantes from '../dist/assets/logo-marchantes.b857cd6b.png';
import {
  addpost, borrarTexto, exit, listarPublicaciones, editoPost,
} from '../lib/auth';
import { onNavigate } from '../lib/router';

import { auth } from '../lib/firebase/firebase';

const user = auth.currentUser;
// console.log(user);

export function muro() {
  const contenedorMuro = document.createElement('section');
  contenedorMuro.classList.add('contenedorMuro');

  // boton para cerrar la sesion
  const btnExit = document.createElement('button');
  btnExit.classList = 'botonSalir';
  btnExit.textContent = 'Cerrar sesión';
  btnExit.addEventListener('click', () => {
    exit().then(() => {
      onNavigate('/');
    });
  });
  // contenedorMuro.appendChild(btnExit) MOSTRADO ABAJO

  const logoMuro = document.createElement('img');
  logoMuro.classList.add('logoMarchantesMuro');
  logoMuro.src = logoMarchantes;
  // document.getElementsByClassName('logoMarchantesMuro').src = imgUrl;
  // contenedorMuro.appendChild(logoMuro); MOSTRADO ABAJO

  // input del texto/post
  const contenedorAreaPost = document.createElement('div');
  contenedorAreaPost.classList = 'ContenedorAreaPost';
  // contenedorMuro.appendChild(contenedorAreaPost);MOSTRADO ABAJO
  // text area del muro
  const areaDelPost = document.createElement('textarea');
  areaDelPost.className = 'areaDelPost';
  areaDelPost.placeholder = 'Escribe aqui...';
  areaDelPost.id = 'areaDelPost';

  // CREACION DEL BOTON PUBLICAR
  const botonPost = document.createElement('button');
  // botonPost.id = "botonPost";
  botonPost.classList = 'btnPublicar';
  botonPost.textContent = 'Publicar';
  botonPost.setAttribute('type', 'submit');
  // contenedorMuro.appendChild(botonPost); MOSTRADO ABAJO
  botonPost.addEventListener('click', () => {
    const publicacion = areaDelPost.value;
    addpost(publicacion)
      .then(() => {
        // se limpia mi textarea
        areaDelPost.value = '';
        console.log('clear textarea');
      })
      .catch(() => {
        console.error('nothing');
      });
    console.log(addpost.publicacion);
  });

  // contenedorAreaPost.appendChild(botonPost);
  //  };

  // contenedor para mostrar los post creados
  const contenedorPosts = document.createElement('section');
  contenedorPosts.classList.add('contenedorPosts');

  listarPublicaciones((resultado) => {
    console.log('dibujando');
    contenedorPosts.innerHTML = '';
    resultado.forEach((element) => {
      // Crea el artículo que mostrará el texto del post
      const showPostList = document.createElement('article');
      showPostList.classList = 'listaDePost';
      showPostList.textContent = `${element.data().text} -Publicado por ${element.data().email}`;

      // creo un div para el input de edicion
      const contieneTextoEditar = document.createElement('div');
      contieneTextoEditar.classList = 'parrEditar';
      // creo la textarea para el texto en edicion
      const areaEdita = document.createElement('textarea');
      areaEdita.classList = 'areaEdita';
      areaEdita.value = element.data().text;
      areaEdita.style.display = 'none';
      contieneTextoEditar.appendChild(areaEdita);

      if (auth.currentUser.email === element.data().email) {
        // Crear el botón de "Eliminar"
        const deleteButton = document.createElement('button');
        deleteButton.classList = 'fa-regular fa-trash-can';
        deleteButton.id = 'botonEliminar';
        deleteButton.addEventListener('click', () => {
          // Llamar a la función para eliminar el post
          borrarTexto(element.id)
            .then(() => {
              onNavigate('/muro');
              console.log('El post ha sido eliminado correctamente');
            })
            .catch((error) => {
              console.error('Error al eliminar el post:', error);
            });
        });
        const botonEditar = document.createElement('button');
        botonEditar.classList = 'fa-regular fa-pen-to-square';
        botonEditar.id = 'botonEditar';
        const botonGuardar = document.createElement('button');

        botonEditar.addEventListener('click', () => {
          // editoPost(element.id);
          contieneTextoEditar.removeChild(contieneTextoEditar.firstChild);
          areaEdita.style.display = 'block';
          contieneTextoEditar.insertBefore(areaEdita, contieneTextoEditar.firstChild);
          botonGuardar.style.display = 'block';
        });
        botonGuardar.classList = 'fa-solid fa-circle-check';
        botonGuardar.id = 'botonGuardar';
        botonGuardar.style.display = 'none';
        contieneTextoEditar.appendChild(botonGuardar);
        botonGuardar.addEventListener('click', () => {
          // editoPost(element.id);
          const actualizarPost = areaEdita.value;
          editoPost(element.id, actualizarPost);
          // areaEdita.value = showPostList;

          try {
            contieneTextoEditar.removeChild(contieneTextoEditar.firstChild);
            botonGuardar.style.display = 'none';
            console.log('El post ha sido actualizado');
          } catch (error) {
            console.error('error al actualizar:', error);
          }
        });
        contieneTextoEditar.appendChild(botonGuardar);
        contenedorPosts.appendChild(contieneTextoEditar);

        // Agregar el botón al artículo
        showPostList.appendChild(deleteButton);
        showPostList.appendChild(botonEditar);
      }
      // Agregar el artículo al contenedor de posts
      contenedorPosts.appendChild(showPostList);
    });
  });

  contenedorMuro.appendChild(btnExit);
  contenedorMuro.appendChild(logoMuro);
  contenedorMuro.appendChild(contenedorAreaPost);
  contenedorAreaPost.appendChild(areaDelPost);
  contenedorAreaPost.appendChild(botonPost);
  contenedorMuro.appendChild(contenedorPosts);
  return contenedorMuro;
}
