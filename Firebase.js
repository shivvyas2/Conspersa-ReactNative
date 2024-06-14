import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsCit9vW_Cbews4FeDIVuIHYxmzIIWqDY",
  authDomain: "alsm-2b18b.firebaseapp.com",
  projectId: "alsm-2b18b",
  storageBucket: "alsm-2b18b.appspot.com",
  messagingSenderId: "722787269093",
  appId: "1:722787269093:web:277e8f51cf4c5d615e970c"
};
  
// let app;

// if ( firebase.apps.length === 0){
//   app = firebase.initializeApp(firebaseConfig);
// }else{
//   app = firebase.app(); // or else it will keep on initializing

// }


// const db = app.firestore();
// const auth = firebase.auth();

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore();
const auth = firebase.auth();
// const storage = firebase.storage;


export{ db, auth };

