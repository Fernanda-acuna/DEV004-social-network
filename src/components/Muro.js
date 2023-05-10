// import { onNavigate } from "./components/main"

import { doc } from "firebase/firestore/lite";
import { addpost, exit, listarPublicaciones } from "../lib/auth";
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
    const areaDelPost = document.createElement("textarea");
    const lugarDelPost = document.getElementById("registrateAqui");
    areaDelPost.classList = "areaDelPost";
    areaDelPost.placeholder = "Escribe aqui..."

    
    //contenedorMuro.appendChild(areaDelPost); MOSTRADO ABAJO

    // //contenedor de 3 botones
    const contenedorBtns = document.createElement("section");
    contenedorBtns.innerHTML = `<button id="botonEliminar">Eliminar</button>`
    `<button id="botonEditar>"Editar"</button>`
    // contenedorBtns.classlist = "contenedorBtns";
    // contenedorMuro.appendChild(contenedorBtns);
    // // contenedorBtns.appendChild(botonPost) 

    //CREACION DEL BOTON EDITAR(aun sin css)
    // const botonEditar = document.createElement("button");
    // botonEditar.classList = "btnEditar";
    // botonEditar.textContent = "Editar";
    // //CREACION DEL BOTON ELIMINAR(aun sin css)
    // const botonEliminar = document.createElement("button");
    // botonEliminar.classList = "btnEliminar";
    // botonEditar.textContent = "Eliminar";

    //CREACION DEL BOTON PUBLICAR
    const botonPost = document.createElement("button");
    botonPost.type = "submit";
    botonPost.classList = "btnPublicar";
    botonPost.textContent = "Publicar";
    //contenedorMuro.appendChild(botonPost); MOSTRADO ABAJO
    botonPost.addEventListener('click', () => {
        const publicacion = areaDelPost.value;
        addpost(publicacion)
        console.log(addpost.publicacion)
        contenedorBtns.appendChild(botonPost) 

    });

    //llamar a la funcion en firestore, desde auth, INNERHTML<<<
    //contenedor para mostrar los post creados
    const contenedorPosts = document.createElement("section");
    contenedorPosts.classList.add("contenedorPosts");

        listarPublicaciones((resultado) => {
            resultado.forEach(element => {
                const showPostList = document.createElement("article");
                showPostList.classList = "listaDePost";

                //con los template literal puedo mostrar el texto y el email
                showPostList.textContent = `${element.data().text} - ${element.data().email}`;
                //console.log(element.data());
         
                
                contenedorPosts.appendChild(showPostList);
              

            });
        });





    //});
    contenedorMuro.appendChild(btnExit);
    contenedorMuro.appendChild(logoMuro);
    contenedorMuro.appendChild(areaDelPost);
    //contenedorMuro.appendChild(botonPost);
    contenedorMuro.appendChild(contenedorPosts);
    contenedorMuro.appendChild(contenedorBtns);
   
    //contenedorMuro.appendChild(contenedorPosts);

    return contenedorMuro
}