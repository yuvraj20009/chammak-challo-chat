import { realtimeDb } from "../firebase";

import {
    ref,
    set,
    onValue,
    remove,
    onDisconnect
} from "firebase/database";

export function joinPresence(roomCode, username) {

    const userRef = ref(
        realtimeDb,
        `presence/${roomCode}/${username}`
    );

    set(userRef, true);

    onDisconnect(userRef).remove();

}

export function leavePresence(roomCode, username) {

    const userRef = ref(
        realtimeDb,
        `presence/${roomCode}/${username}`
    );

    remove(userRef);

}

export function listenPresence(roomCode, callback) {

    const roomRef = ref(
        realtimeDb,
        `presence/${roomCode}`
    );

    onValue(roomRef, (snapshot) => {

        const users = snapshot.val() || {};

        callback(Object.keys(users));

    });

}