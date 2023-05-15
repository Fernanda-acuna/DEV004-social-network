// import { onNavigate } from "./components/main"

import { doc } from "firebase/firestore/lite";
import { addpost, borrarTexto, exit, listarPublicaciones, editoPost} from "../lib/auth";
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
    const contenedorAreaPost = document.createElement("section");
    contenedorMuro.appendChild(contenedorAreaPost);
    //text area del muro
    const areaDelPost = document.createElement("textarea");
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
            .then(() => {
                //se limpia mi textarea
                areaDelPost.value = ""
                console.log("clear textarea");
            })
            .catch((error) => {
                console.error("nothing");
            });
        console.log(addpost.publicacion)
    });

    contenedorMuro.appendChild(areaDelPost);
    //  };

    //contenedor para mostrar los post creados
    const contenedorPosts = document.createElement("section");
    contenedorPosts.classList.add("contenedorPosts");

    listarPublicaciones((resultado) => {
        resultado.forEach((element) => {
            // Crea el artículo que mostrará el texto del post
            const showPostList = document.createElement("article");
            showPostList.classList = "listaDePost";
            showPostList.textContent = `${element.data().text} -Publicado por ${element.data().email}`;

            if (auth.currentUser.email === element.data().email) {
                // Crear el botón de "Eliminar"
                const deleteButton = document.createElement("button");
                deleteButton.classList = "fa-regular fa-trash-can";
                //codigo del icono editar
                //deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => {
                    // Llamar a la función para eliminar el post
                    console.log(element.id);
                    borrarTexto(element.id)
                        .then(() => {

                            onNavigate('/muro')
                            console.log("El post ha sido eliminado correctamente");
                        })
                        .catch((error) => {
                            console.error("Error al eliminar el post:", error);
                        });
                });
                const botonEditar = document.createElement("button");
                botonEditar.classList= "fa-regular fa-pen-to-square";
               //botonEditar = document.querySelector(".showPostList");
                botonEditar.addEventListener("click", () => {
                    editoPost(element.id)
                    
                        .then(() => {
                            onNavigate('/muro')
                            console.log("El post ha sido actualizado");
                        })
                        .catch((error) => {
                            console.log("error al actualizar:", error);
                        })
                        console.log(editoPost);
                })


                // Agregar el botón al artículo
                showPostList.appendChild(deleteButton);
                showPostList.appendChild(botonEditar);
            };
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
    return contenedorMuro
}