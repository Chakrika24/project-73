import * as firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyA47seEtXOfjrSGQMUxlzQs2D4EjT8NnKY",
    authDomain: "story-hub-f127d.firebaseapp.com",
    databaseURL: "https://story-hub-f127d-default-rtdb.firebaseio.com",
    projectId: "story-hub-f127d",
    storageBucket: "story-hub-f127d.appspot.com",
    messagingSenderId: "384416109540",
    appId: "1:384416109540:web:9f5408193adcb79d69edf1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase.firestore();
