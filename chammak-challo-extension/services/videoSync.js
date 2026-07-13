import { realtimeDb } from "../firebase";

import {
    ref,
    set,
    onValue
} from "firebase/database";

let ignoreEvent = false;

export function startVideoSync(roomCode) {

    const video = document.querySelector("video");

    if (!video) {

        console.log("❌ No video found");
        return;

    }

    console.log("🎬 Video Sync Started");

    video.addEventListener("play", () => {

        if (ignoreEvent) {

            ignoreEvent = false;
            return;

        }

        set(
            ref(realtimeDb, `rooms/${roomCode}/player`),
            {
                action: "play",
                time: video.currentTime,
                updatedAt: Date.now()
            }
        );

    });

    video.addEventListener("pause", () => {

        if (ignoreEvent) {

            ignoreEvent = false;
            return;

        }

        set(
            ref(realtimeDb, `rooms/${roomCode}/player`),
            {
                action: "pause",
                time: video.currentTime,
                updatedAt: Date.now()
            }
        );

    });

    video.addEventListener("seeked", () => {

        if (ignoreEvent) {

            ignoreEvent = false;
            return;

        }

        set(
            ref(realtimeDb, `rooms/${roomCode}/player`),
            {
                action: video.paused ? "pause" : "play",
                time: video.currentTime,
                updatedAt: Date.now()
            }
        );

    });

    onValue(

        ref(realtimeDb, `rooms/${roomCode}/player`),

        (snapshot) => {

            const data = snapshot.val();

            if (!data) return;

            if (
                Math.abs(video.currentTime - data.time) > 0.5
            ) {

                ignoreEvent = true;
                video.currentTime = data.time;

            }

            if (
                data.action === "play" &&
                video.paused
            ) {

                ignoreEvent = true;
                video.play();

            }

            if (
                data.action === "pause" &&
                !video.paused
            ) {

                ignoreEvent = true;
                video.pause();

            }

        }

    );

}