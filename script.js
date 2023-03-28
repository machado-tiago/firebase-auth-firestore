import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc, query, where, updateDoc } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
//  import { initializeApp } from "firebase/app"; //necessário usar um bundler de módulo (webpack/rollup)
//  import { getFirestore } from "firebase/firestore";

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

function criarUsuarioEmail(auth,email,senha) {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
      })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      });
}

function login_email(auth, email, senha) {
    signInWithEmailAndPassword(auth, email,senha)
        .then(loggedUser =>{
            console.log(auth.currentUser.email)
        }).catch(error =>{
            console.log(error.message)
        })
}
// criarUsuarioEmail(auth, "teste@teste.com", "teste123")

// login_email(auth, "teste@teste.com","teste123");
// let user = getAuth(app).currentUser;
// console.log(user);

auth.onAuthStateChanged(user=>{
    if (user) {
        console.log(user)
    }
})

function logout() {
    auth.signOut().then(()=>{
        console.log("Logout realizado!")
    }
    ).catch(error=>{
        console.log(error);
    })
}

setTimeout(logout,5000);