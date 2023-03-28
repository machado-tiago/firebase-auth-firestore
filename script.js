//  import { initializeApp } from "firebase/app"; //necessário usar um bundler de módulo (webpack/rollup)
//  import { getFirestore } from "firebase/firestore";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc, query, where, updateDoc } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import {getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyDCdkJOcohdZYF9sKhvRn2zlnegPh6AjuA",
    authDomain: "colegio-e4950.firebaseapp.com",
    projectId: "colegio-e4950",
    storageBucket: "colegio-e4950.appspot.com",
    messagingSenderId: "352170248734",
    appId: "1:352170248734:web:84a822e7091d48278c7c0f",
    measurementId: "G-ZT3HWZPNNL"
});

const db = getFirestore(app);
const collection_turma1 = collection(db, 'turma1')

await getDocs(collection_turma1)
    .then((snapshot)=>{
        snapshot.forEach(doc => {
            console.log(doc.data());
    });;
})                                     

const consulta = query(collection_turma1, where("nome","==","Tiago"));
await getDocs(consulta)
   .then((snapshot)=>{
       snapshot.forEach(doc=>{
           console.log(doc.data());
       })
})

await setDoc(
    doc(collection_turma1, "NovoDoc"),{
        nome: "Camilo",
        nota1: 9.0,
        nota2: 3
    }
);

const documento = doc(db,"turma1","NovoDoc");
await updateDoc(documento, {
    nota1:10
})

const auth = getAuth(app);
createUserWithEmailAndPassword(auth, "tiago@gmail.com.net", "tiago123")
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });