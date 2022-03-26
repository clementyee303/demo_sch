import firebase from 'firebase/compat/app';

const firebaseConfig = {

  apiKey: "AIzaSyD0HSZFdz-TvLS4MIhuvyz8C-LSQ1OE4J8",

  authDomain: "demosch.firebaseapp.com",

  projectId: "demosch",

  storageBucket: "demosch.appspot.com",

  messagingSenderId: "528425014464",

  appId: "1:528425014464:web:a23994a0f6146e10ba0925"

};


//Initialise Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;