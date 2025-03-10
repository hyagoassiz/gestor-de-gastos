import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5mYs5qhmL5RFWtJtsGquyjhITCfGpAIY",
  authDomain: "gestor-de-gastos-a3d1b.firebaseapp.com",
  projectId: "gestor-de-gastos-a3d1b",
  storageBucket: "gestor-de-gastos-a3d1b.firebasestorage.app",
  messagingSenderId: "1095188906435",
  appId: "1:1095188906435:web:ccc985f172613c44b33d76",
  measurementId: "G-SHW55T718X",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };
