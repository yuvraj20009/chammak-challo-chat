import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export async function createRoom() {

    const code = Math.random()
        .toString(36)
        .substring(2,8)
        .toUpperCase();

    await setDoc(doc(db,"rooms",code),{

        createdAt: Date.now()

    });

    return code;

}