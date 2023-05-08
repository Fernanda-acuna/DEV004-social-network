import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { addDoc, collection, getFirestore, query, onSnapshot, } from "firebase/firestore";
import { onNavigate } from "../lib/router";

const auth = getAuth();
const db = getFirestore();

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

export const createUser = (emailR, passwordR) => {
  return createUserWithEmailAndPassword(auth, emailR, passwordR)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      onNavigate('/muro')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      alert('Verifica los datos, fue imposible registrarte')

    });
}

export const exit = () => signOut(auth)

export const provider = new GoogleAuthProvider();

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

//  const publicaciones = (txt) => {
//codigo maris
// const docRef = addDoc(collection(db, "Publicacion"), {
//   // email: "",
//   Texto: txt
// });
// console.log("Document written with ID: ", docRef.id);

//  } codigo Glen
export function addpost(data) {

  return addDoc(collection(db, 'Publicacion'), {
    text: data,
    email: auth.currentUser.email,
  
  })
}

export function listarPublicaciones(callback) {
  const queryPost = query(collection(db, 'Publicacion'));
  onSnapshot(queryPost, callback);
}


