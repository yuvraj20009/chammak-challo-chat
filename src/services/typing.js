import { realtimeDb } from "../firebase";

import {
    ref,
    set,
    remove,
    onValue,
    onDisconnect
} from "firebase/database";


export function startTyping(roomCode, username) {

    console.log(
        "⌨️ START TYPING:",
        roomCode,
        username
    );


    const typingRef = ref(
        realtimeDb,
        `typing/${roomCode}/${username}`
    );


    set(typingRef, true);


    onDisconnect(typingRef).remove();

}



export function stopTyping(roomCode, username) {

    console.log(
        "🛑 STOP TYPING:",
        roomCode,
        username
    );


    remove(
        ref(
            realtimeDb,
            `typing/${roomCode}/${username}`
        )
    );

}



export function listenTyping(roomCode, callback) {


    console.log(
        "👀 LISTENING TO:",
        `typing/${roomCode}`
    );


    const roomRef = ref(
        realtimeDb,
        `typing/${roomCode}`
    );


    onValue(roomRef, (snapshot) => {


        console.log(
            "🔥 TYPING DATA FROM FIREBASE:",
            snapshot.val()
        );


        callback(
            snapshot.val() || {}
        );


    });

}