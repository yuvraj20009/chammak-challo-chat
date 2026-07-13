import { realtimeDb } from "../firebase";

import {
    ref,
    set,
    onValue,
    remove
} from "firebase/database";

let ignoreEvent = false;

// ------------------------------------
// VIDEO STATE
// ------------------------------------

export function sendVideoState(roomCode, state) {

    set(
        ref(realtimeDb, `video/${roomCode}`),
        state
    );

}

export function listenVideoState(roomCode, callback) {

    onValue(
        ref(realtimeDb, `video/${roomCode}`),
        (snapshot) => {

            const data = snapshot.val();

            if (!data) return;

            if (ignoreEvent) {

                ignoreEvent = false;
                return;

            }

            callback(data);

        }
    );

}

export function ignoreNextVideoEvent() {

    ignoreEvent = true;

}

// ------------------------------------
// VIDEO INVITE
// ------------------------------------

export function sendVideoInvite(roomCode, sender) {

    set(
        ref(realtimeDb, `videoInvites/${roomCode}`),
        {
            sender,
            accepted: false,
            createdAt: Date.now()
        }
    );

}

export function listenVideoInvite(roomCode, callback) {

    onValue(
        ref(realtimeDb, `videoInvites/${roomCode}`),
        (snapshot) => {

            const data = snapshot.val();

            if (!data) return;

            callback(data);

        }
    );

}

export function acceptVideoInvite(roomCode) {

    set(
        ref(realtimeDb, `videoInvites/${roomCode}/accepted`),
        true
    );

}

export function listenVideoAccepted(roomCode, callback) {

    onValue(
        ref(realtimeDb, `videoInvites/${roomCode}/accepted`),
        (snapshot) => {

            if (snapshot.val() === true) {

                callback();

            }

        }
    );

}

export function clearVideoInvite(roomCode) {

    remove(
        ref(realtimeDb, `videoInvites/${roomCode}`)
    );

}