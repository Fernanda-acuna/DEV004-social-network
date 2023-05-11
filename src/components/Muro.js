// import { onNavigate } from "./components/main"

import { doc } from "firebase/firestore/lite";
import { addpost, borrarTexto, exit, listarPublicaciones, authStateChangedEvent } from "../lib/auth";
import { onNavigate } from "../lib/router";
import { addDoc, onSnapshot, orderBy, startAt } from "firebase/firestore";

import { auth } from "../lib/firebase/firebase";
const user = auth.currentUser;
//console.log(user);

export function muro() {
    const contenedorMuro = document.createElement("section")
    contenedorMuro.classList.add("contenedorMuro")

    //boton para cerrar la sesion
    const btnExit = document.createElement('button');
    btnExit.classList = "botonSalir";
    btnExit.textContent = 'Cerrar sesión';
    btnExit.addEventListener('click', () => {
        exit().then((resp) => {
            onNavigate('/')
        })
    });
    //contenedorMuro.appendChild(btnExit) MOSTRADO ABAJO

    const logoMuro = document.createElement("img");
    logoMuro.classList.add("logoMarchantesMuro");
    logoMuro.src = "../imagenes/logo-marchantes.png";
    // contenedorMuro.appendChild(logoMuro); MOSTRADO ABAJO

    // input del texto/post
    //function AreaPost() {
    const contenedorAreaPost = document.createElement("section");
    contenedorMuro.appendChild(contenedorAreaPost);

    const areaDelPost = document.createElement("textarea");
    //const lugarDelPost = document.getElementById("registrateAqui");
    areaDelPost.className = "areaDelPost";
    areaDelPost.placeholder = "Escribe aqui...";
    areaDelPost.id = "areaDelPost";


    //CREACION DEL BOTON PUBLICAR
    const botonPost = document.createElement("button");
    botonPost.id = "botonPost";
    botonPost.classList = "btnPublicar";
    botonPost.textContent = "Publicar";
    botonPost.setAttribute("type", "submit")
    //contenedorMuro.appendChild(botonPost); MOSTRADO ABAJO
    botonPost.addEventListener('click', () => {
        const publicacion = areaDelPost.value;
        addpost(publicacion)
        console.log(addpost.publicacion)
    });

    contenedorMuro.appendChild(areaDelPost);
    //  };


    // //CREACION DEL BOTON PUBLICAR
    // const botonPost = document.createElement("button");
    // botonPost.type = "submit";
    // botonPost.classList = "btnPublicar";
    // botonPost.textContent = "Publicar";
    // //contenedorMuro.appendChild(botonPost); MOSTRADO ABAJO
    // botonPost.addEventListener('click', () => {
    //     const publicacion = areaDelPost.value;
    //     addpost(publicacion)
    //     console.log(addpost.publicacion)
    //     //contenedorBtns.appendChild(botonPost)

    // });

    //  }

    //llamar a la funcion en firestore, desde auth, INNERHTML<<<
    //contenedor para mostrar los post creados
    const contenedorPosts = document.createElement("section");
    contenedorPosts.classList.add("contenedorPosts");


    // listarPublicaciones((resultado) => {
    //     resultado.forEach(element => {
    //         const showPostList = document.createElement("article");
    //         showPostList.classList = "listaDePost";

    //         //con los template literal puedo mostrar el texto y el email
    //         showPostList.textContent = `${element.data().text} -Publicado por ${element.data().email}`;
    //         //console.log(element.data());
    //         contenedorPosts.appendChild(showPostList);
    //     });
    // });

    listarPublicaciones((resultado) => {
        resultado.forEach((element) => {
          // Verificar si el autor del post es el usuario actual
          if (element.data().userId === authStateChangedEvent.currentUser) {
            // Crear el artículo que mostrará el texto del post
            const showPostList = document.createElement("article");
            showPostList.classList = "listaDePost";
            showPostList.textContent = `${element.data().text} -Publicado por ${element.data().email}`;
      
            // Crear el botón de "Eliminar"
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => {
              // Llamar a la función para eliminar el post
              borrarTexto(element.id)
                .then(() => {
                  console.log("El post ha sido eliminado correctamente");
                })
                .catch((error) => {
                  console.error("Error al eliminar el post:", error);
                });
            });
      
            // Agregar el botón al artículo
            showPostList.appendChild(deleteButton);
      
            // Agregar el artículo al contenedor de posts
            contenedorPosts.appendChild(showPostList);
          }
        });
      });
      

       // if (postEmail === currentUserEmail) {
            //     // el post fue publicado por el usuario actual, agregar el botón de eliminar
            //     const botonEliminar = document.createElement("button");
            //     botonEliminar.classList = "botonEliminar";
            //     botonEliminar.textContent = "Eliminar";
            //     botonEliminar.addEventListener("click", () => {
            //         eliminarPost(element.text);
            //         showPostList.remove();
            //     });
            //     showPostList.appendChild(botonEliminar);
           // }

     



    contenedorMuro.appendChild(btnExit);
    contenedorMuro.appendChild(logoMuro);
    contenedorMuro.appendChild(contenedorAreaPost);
    contenedorAreaPost.appendChild(areaDelPost);
    contenedorAreaPost.appendChild(botonPost);
    //contenedorMuro.appendChild(areaDelPost);
    //contenedorMuro.appendChild(botonPost);
    contenedorMuro.appendChild(contenedorPosts);
    //contenedorMuro.appendChild(contenedorBtns);
    //contenedorPosts.appendChild(showPostList);
    //contenedorMuro.appendChild(contenedorPosts);



    return contenedorMuro
}