// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGy8yADU6kdMuFYcEuQPjO7sVibZN6rxs",
    authDomain: "trello-clone-da837.firebaseapp.com",
    projectId: "trello-clone-da837",
    storageBucket: "trello-clone-da837.appspot.com",
    messagingSenderId: "779397466925",
    appId: "1:779397466925:web:fc4e226c6f0b6ab03f61a4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { db };