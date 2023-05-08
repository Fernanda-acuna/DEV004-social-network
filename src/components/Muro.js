// import { onNavigate } from "./components/main"

import { doc } from "firebase/firestore/lite";
import { addpost, exit, listarPublicaciones } from "../lib/auth";
import { onNavigate } from "../lib/router";
import { addDoc, onSnapshot, orderBy, startAt } from "firebase/firestore";

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
    })
    //contenedorMuro.appendChild(btnExit) MOSTRADO ABAJO

    const logoMuro = document.createElement("img");
    logoMuro.classList.add("logoMarchantesMuro");
    logoMuro.src = "../imagenes/logo-marchantes.png";
    // contenedorMuro.appendChild(logoMuro); MOSTRADO ABAJO

    // input del texto/post
    const areaDelPost = document.createElement("textarea");
    const lugarDelPost = document.getElementById("registrateAqui");
    areaDelPost.classList = "areaDelPost";
    areaDelPost.placeholder = "Escribe aqui..."
    //contenedorMuro.appendChild(areaDelPost); MOSTRADO ABAJO

    //CREACION DEL BOTON PUBLICAR
    const botonPost = document.createElement("button");
    botonPost.type = "submit";
    botonPost.classlist = "areaDePost";
    botonPost.textContent = "Publicar";
    //contenedorMuro.appendChild(botonPost); MOSTRADO ABAJO
    botonPost.addEventListener('click', () => {
        const publicacion = areaDelPost.value;
        addpost(publicacion)
        console.log(addpost.publicacion)

    });

    //llamar a la funcion en firestore, desde auth, INNERHTML<<<
    //contenedor para mostrar los post creados
    const contenedorPosts = document.createElement("section");
    contenedorPosts.classList.add("contenedorPosts");

        listarPublicaciones((resultado) => {
            //const publicacionesMuro = []
            resultado.forEach(element => {
                const showPostList = document.createElement("div");
                showPostList.classList = "listaDePost";

                showPostList.textContent = element.data().text;
                //showPostList.emailContent = element.data().email;
                //console.log("element", element);
                //console.log("text", element.data());
                
                contenedorPosts.appendChild(showPostList)
                //console.log(element.id)
                //console.log(element.data())
                // publicacionesMuro.push({ element })

            });
        });

    //contenedorMuro.appendChild(contenedorPosts) MOSTRADO ABAJO

    // listarPublicaciones((resultado) => {
    //     const publicacionesMuro = []
    //     resultado.forEach(element => {

    //         //console.log(element.id)
    //         console.log(element.data())
    //         publicacionesMuro.push({element})

    //     });
    //console.log(res)





    //});
    contenedorMuro.appendChild(btnExit);
    contenedorMuro.appendChild(logoMuro);
    contenedorMuro.appendChild(areaDelPost);
    contenedorMuro.appendChild(botonPost);
    contenedorMuro.appendChild(contenedorPosts);
   
    //contenedorMuro.appendChild(contenedorPosts);

    return contenedorMuro
}