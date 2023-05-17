import { addpost, borrarTexto, exit, listarPublicaciones, editoPost } from '../lib/auth';

import { onNavigate } from '../lib/router/index';
import { addDoc, arrayRemove, onSnapshot, orderBy, startAt } from 'firebase/firestore';

import { addpost, borrarTexto, exit, listarPublicaciones, editoPost } from '../lib/auth';
import { onNavigate } from '../lib/router';

import { auth } from '../lib/firebase/firebase';
import { auth } from '../lib/firebase/firebase';
const user = auth.currentUser;
//console.log(user);

export function muro() {
    const contenedorMuro = document.createElement('section');
    contenedorMuro.classList.add('contenedorMuro');
    const contenedorMuro = document.createElement('section');
    contenedorMuro.classList.add('contenedorMuro');

    //boton para cerrar la sesion
    const btnExit = document.createElement('button');
    btnExit.classList = 'botonSalir';
    btnExit.classList = 'botonSalir';
    btnExit.textContent = 'Cerrar sesión';
    btnExit.addEventListener('click', () => {
        exit().then((resp) => {
            onNavigate('/')
        });
        });
    });
    //contenedorMuro.appendChild(btnExit) MOSTRADO ABAJO

    const logoMuro = document.createElement('img');
    logoMuro.classList.add('logoMarchantesMuro');
    logoMuro.src = '../imagenes/logo-marchantes.png';
    const logoMuro = document.createElement('img');
    logoMuro.classList.add('logoMarchantesMuro');
    logoMuro.src = '../imagenes/logo-marchantes.png';
    // contenedorMuro.appendChild(logoMuro); MOSTRADO ABAJO

    // input del texto/post
    const contenedorAreaPost = document.createElement('div');
    contenedorAreaPost.classList = 'ContenedorAreaPost';
    const contenedorAreaPost = document.createElement('div');
    contenedorAreaPost.classList = 'ContenedorAreaPost';
    // contenedorMuro.appendChild(contenedorAreaPost);MOSTRADO ABAJO
    //text area del muro
    const areaDelPost = document.createElement('textarea');
    areaDelPost.className = 'areaDelPost';
    areaDelPost.placeholder = 'Escribe aqui...';
    areaDelPost.id = 'areaDelPost';
    const areaDelPost = document.createElement('textarea');
    areaDelPost.className = 'areaDelPost';
    areaDelPost.placeholder = 'Escribe aqui...';
    areaDelPost.id = 'areaDelPost';

    //CREACION DEL BOTON PUBLICAR
    const botonPost = document.createElement('button');
    const botonPost = document.createElement('button');
    // botonPost.id = "botonPost";
    botonPost.classList = 'btnPublicar';
    botonPost.textContent = 'Publicar';
    botonPost.setAttribute('type', 'submit')
    botonPost.classList = 'btnPublicar';
    botonPost.textContent = 'Publicar';
    botonPost.setAttribute('type', 'submit');
    //contenedorMuro.appendChild(botonPost); MOSTRADO ABAJO
    botonPost.addEventListener('click', () => {
        const publicacion = areaDelPost.value;
        addpost(publicacion)
            .then(() => {
                //se limpia mi textarea
                areaDelPost.value = '';
                console.log('clear textarea');
                areaDelPost.value = '';
                console.log('clear textarea');
            })
            .catch((error) => {
                console.error('nothing');
            });
        console.log(addpost.publicacion);
        console.log(addpost.publicacion);
    });

    // contenedorAreaPost.appendChild(botonPost);
    //  };

    //contenedor para mostrar los post creados
    const contenedorPosts = document.createElement('section');
    contenedorPosts.classList.add('contenedorPosts');
    const contenedorPosts = document.createElement('section');
    contenedorPosts.classList.add('contenedorPosts');

    listarPublicaciones((resultado) => {
        resultado.forEach((element) => {
            // Crea el artículo que mostrará el texto del post
            const showPostList = document.createElement('article');
            showPostList.classList = 'listaDePost';
            const showPostList = document.createElement('article');
            showPostList.classList = 'listaDePost';
            showPostList.textContent = `${element.data().text} -Publicado por ${element.data().email}`;


            // //edicion del post
            // const contieneTextoEditar = document.createElement("div");
            // contieneTextoEditar.classList = "parrEditar";
            // const areaEdita = document.createElement("textArea");
            // areaEdita.classList = "areaEdita";
            // areaEdita.value = `${element.data().text}`;
            // areaEdita.style.display = "none";
            // contieneTextoEditar.appendChild(areaEdita);
            //edicion del post

            //creo un div para el input de edicion
            const contieneTextoEditar = document.createElement('div');
            contieneTextoEditar.classList = 'parrEditar';
            const contieneTextoEditar = document.createElement('div');
            contieneTextoEditar.classList = 'parrEditar';
            // creo la textarea para el texto en edicion
            const areaEdita = document.createElement('textarea');
            areaEdita.classList = 'areaEdita';
            const areaEdita = document.createElement('textarea');
            areaEdita.classList = 'areaEdita';
            areaEdita.value = element.data().text;
            areaEdita.style.display = 'none';
            areaEdita.style.display = 'none';
            contieneTextoEditar.appendChild(areaEdita);

            if (auth.currentUser.email === element.data().email) {
                // Crear el botón de "Eliminar"
                const deleteButton = document.createElement('button');
                const deleteButton = document.createElement('button');
                deleteButton.classList = 'fa-regular fa-trash-can';
                //deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener('click', () => {
                deleteButton.addEventListener('click', () => {
                    // Llamar a la función para eliminar el post
                    borrarTexto(element.id)
                        .then(() => {
                            onNavigate('/muro');
                            console.log('El post ha sido eliminado correctamente');
                            console.log('El post ha sido eliminado correctamente');
                        })
                        .catch((error) => {
                            console.error('Error al eliminar el post:', error);
                            console.error('Error al eliminar el post:', error);
                        });
                });
                const botonEditar = document.createElement('button');
                const botonEditar = document.createElement('button');
                botonEditar.classList = 'fa-regular fa-pen-to-square';
                //botonEditar = document.querySelector(".showPostList");
                botonEditar.addEventListener('click', () => {
                botonEditar.addEventListener('click', () => {
                    editoPost(element.id);
                    console.log('dentro de botonEditar');
                    contieneTextoEditar.removeChild(contieneTextoEditar.firstChild);
                    areaEdita.style.display = 'block';
                    areaEdita.style.display = 'block';
                    contieneTextoEditar.insertBefore(areaEdita, contieneTextoEditar.firstChild);
                });
                const botonGuardar = document.createElement('button');
                const botonGuardar = document.createElement('button');
                botonGuardar.classList = 'fa-solid fa-circle-check';
                contieneTextoEditar.appendChild(botonGuardar);
                botonGuardar.addEventListener('click', () => {
                    editoPost(element.id);
                    console.log('dentro de botonGuardar')
                        .then(() => {
                            contieneTextoEditar.removeChild(contieneTextoEditar.firstChild);

                            // onNavigate('/muro')
                            console.log('El post ha sido actualizado');
                        })
                        .catch((error) => {
                            console.error('error al actualizar:', error);
                        });
                    // console.log(editoPost);
                });
                contieneTextoEditar.appendChild(botonGuardar);
                contenedorPosts.appendChild(contieneTextoEditar);

                // Agregar el botón al artículo
                showPostList.appendChild(deleteButton);
                showPostList.appendChild(botonEditar);
            }
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
    return contenedorMuro;
}

