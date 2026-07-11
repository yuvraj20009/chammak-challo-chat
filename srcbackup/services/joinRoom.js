import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function joinRoom(code) {

    code = code.trim().toUpperCase();

    const ref = doc(db, "rooms", code);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        return {
            success: false
        };

    }

    return {

        success: true,
        room: code

    };

}