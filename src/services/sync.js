import { realtimeDb } from "../firebase";
import {
    ref,
    set,
    onValue,
    remove
} from "firebase/database";

export function sendSyncRequest(roomCode, username) {

    set(
        ref(realtimeDb, `sync/${roomCode}`),
        {
            from: username,
            status: "pending"
        }
    );

}

export function listenSyncRequest(roomCode, username) {

    onValue(
        ref(realtimeDb, `sync/${roomCode}`),
        (snapshot) => {

            const data = snapshot.val();

            if (!data) return;

            if (
                data.status === "pending" &&
                data.from !== username
            ) {

                const accept = confirm(
                    `❤️ ${data.from} wants to sync the movie.\n\nAccept?`
                );

                if (accept) {

                    set(
                        ref(realtimeDb, `sync/${roomCode}`),
                        {
                            from: data.from,
                            status: "active"
                        }
                    );

                    alert("🟢 Video sync started!");

                } else {

                    remove(
                        ref(realtimeDb, `sync/${roomCode}`)
                    );

                }

            }

        }
    );

}