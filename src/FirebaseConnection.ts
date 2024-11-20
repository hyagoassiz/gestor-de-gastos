import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBa3qsXRypCiP8iWFji575kd_53VzI_BaA",
  authDomain: "cashcontrol-65d7c.firebaseapp.com",
  projectId: "cashcontrol-65d7c",
  storageBucket: "cashcontrol-65d7c.appspot.com",
  messagingSenderId: "1055946286332",
  appId: "1:1055946286332:web:d3c97307e7099efd042379",
  measurementId: "G-9BRE55DD2P",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };
