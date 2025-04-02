import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAfoCpLf95gtV2Uv1TXQkzBdpJaVtttpao",
  authDomain: "a-little-note-for-you.firebaseapp.com",
  databaseURL: "https://a-little-note-for-you-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "a-little-note-for-you",
  storageBucket: "a-little-note-for-you.firebasestorage.app",
  messagingSenderId: "654538900689",
  appId: "1:654538900689:web:4c317a3071f0709b7931f0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child };
