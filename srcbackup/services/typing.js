import { realtimeDb } from "../firebase";

import {
    ref,
    set,
    remove,
    onValue,
    onDisconnect
} from "firebase/database";

export function startTyping(roomCode, username) {

    const typingRef = ref(
        realtimeDb,
        `typing/${roomCode}/${username}`
    );

    set(typingRef, true);

    onDisconnect(typingRef).remove();

}

export function stopTyping(roomCode, username) {

    remove(
        ref(
            realtimeDb,
            `typing/${roomCode}/${username}`
        )
    );

}

export function listenTyping(roomCode, callback) {

    const roomRef = ref(
        realtimeDb,
        `typing/${roomCode}`
    );

    onValue(roomRef, (snapshot) => {

        callback(snapshot.val() || {});

    });

}