import { db } from "../firebase";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";

export async function sendMessage(
    roomCode,
    text,
    sender,
    image = null
) {

    if (!text.trim() && !image) return;

    await addDoc(
        collection(db, "rooms", roomCode, "messages"),
        {
            text,
            sender,
            image,
            createdAt: serverTimestamp()
        }
    );

}

export function listenMessages(roomCode, callback) {

    const q = query(
        collection(db, "rooms", roomCode, "messages"),
        orderBy("createdAt")
    );

    onSnapshot(q, (snapshot) => {

        const messages = [];

        snapshot.forEach((doc) => {

            messages.push({
                id: doc.id,
                ...doc.data()
            });

        });

        callback(messages);

    });

}