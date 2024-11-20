import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDmkV84PFXpuu_rxwLlSBoknNJ-z2-WGnc",
    authDomain: "chatlh-79ba0.firebaseapp.com",
    projectId: "chatlh-79ba0",
    storageBucket: "chatlh-79ba0.firebasestorage.app",
    messagingSenderId: "839817589463",
    appId: "1:839817589463:web:437b37bbadc79b769ab692",
    measurementId: "G-45F6NXFGCT"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);