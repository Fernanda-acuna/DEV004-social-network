import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { addDoc, collection, getFirestore, query, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { onNavigate } from './router';

// const auth = getAuth();
// const db = getFirestore();
// const auth = getAuth();
// const db = getFirestore();

//inicia sesion con mail y clave
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   console.log("funciona")
  //   // Signed in
  //   const user = userCredential.user;
  //   console.log(user)
  //   onNavigate("/muro");
  //   // ...
  // })
  // .catch((error) => {
  //   console.log("error")
  //   const errorCode = error.code;
  //   const errorMessage = error.message;

  // });

}

//crear usuario
export const createUser = (emailR, passwordR) => {
  return createUserWithEmailAndPassword(auth, emailR, passwordR)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      onNavigate('/muro')
      alert('Usuario registrado con éxito')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert('Verifica los datos, fue imposible registrarte')

    });
}

export const exit = () => signOut(auth);
export const provider = new GoogleAuthProvider();

//login con google
export const loginGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

//  funcion que agrega post
export function addpost(data) {
  return addDoc(collection(db, 'Publicacion'), {
    text: data,
    email: auth.currentUser.email,

  });
}

export function listarPublicaciones(callback) {
  const queryPost = query(collection(db, 'Publicacion'));

  onSnapshot(queryPost, callback);
}
//funcion Borrar post
export async function borrarTexto(docId) {
  console.log('DOC ID: ', docId);
  // TODO: Averiguar cual funcion borra posts
  await deleteDoc(doc(db, 'Publicacion', docId));
}

export async function editoPost(docId) {
  //Editar posts
  const textoAEditar = doc(db, 'Publicacion', docId);
  // console.log();
  await updateDoc(textoAEditar, {
    Publicacion: true,
  });
}
