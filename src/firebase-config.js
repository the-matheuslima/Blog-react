import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "blogereact.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: "blogereact.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGPSENDERID
    ,
    appId: import.meta.env.VITE_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();