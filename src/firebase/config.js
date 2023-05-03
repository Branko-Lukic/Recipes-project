import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgFiJROTo9HR1keD_gDkEzlxm0EDjorPw",
  authDomain: "recipes-project-ee519.firebaseapp.com",
  projectId: "recipes-project-ee519",
  storageBucket: "recipes-project-ee519.appspot.com",
  messagingSenderId: "95771491031",
  appId: "1:95771491031:web:e009325ac2e268a7080e92",
  measurementId: "G-PB7S2103YF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
