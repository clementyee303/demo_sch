import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyA5RgBMxpevxp9__4yM8gDLbZLVCQuu7p0",
    // authDomain: "democpp-e38a1.firebaseapp.com",
    authDomain: "democpp-e38a1.firebaseapp.com",
    projectId: "democpp-e38a1",
    storageBucket: "democpp-e38a1.appspot.com",
    messagingSenderId: "191532566192",
    appId: "1:191532566192:web:309f02e157bc90be79dd75"
  };

//Initialise Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;