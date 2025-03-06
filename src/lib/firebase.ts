import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "NEXT_API_KEY",
    authDomanin: "NEXT_AUTH_DOMAIN",
    projectId: "NEXT_PROJECT_ID",
    storageBucket: "NEXT_STORAGE_BUCKET",
    messageSenderId: "NEXT_MESSAGING_SENDER_ID",
    appId: "NEXT_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();