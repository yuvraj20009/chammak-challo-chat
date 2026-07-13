import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBe-3Hka6U0WiHIUj8eEq8qcNjtjutfe48",
    authDomain: "chammakchallochat.firebaseapp.com",
    projectId: "chammakchallochat",
    storageBucket: "chammakchallochat.firebasestorage.app",
    messagingSenderId: "463131022047",
    appId: "1:463131022047:web:ea0198a13c4ab4b89c4f6a",
    databaseURL:
        "https://chammakchallochat-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const realtimeDb = getDatabase(app);