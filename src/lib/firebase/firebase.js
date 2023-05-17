
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration ESTAS SON LAS CREDENCIALES
//SDK: software development kit
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn7VynXXNO9tVNMUJvhtLRmhaY_eRPuIo",
  authDomain: "marchantes-fer.firebaseapp.com",
  projectId: "marchantes-fer",
  storageBucket: "marchantes-fer.appspot.com",
  messagingSenderId: "24312054812",
  appId: "1:24312054812:web:94fc446f2d3d2c89e38bd9",
  measurementId: "G-W41MZ269F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
