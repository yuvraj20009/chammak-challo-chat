import "./style.css";
import { createChatPanel } from "./chatPanel";

console.log("🚀 Chammak Challo Loaded");

const button = document.createElement("div");

button.id = "cc-chat-button";
button.innerHTML = "💬";

document.body.appendChild(button);

button.onclick = () => {

    console.log("🟢 Button clicked");

    try {

        createChatPanel();

        console.log("✅ createChatPanel finished");

    } catch (err) {

        console.error("❌ createChatPanel crashed:", err);

    }

};

// --------------------------------------------------
// Website → Extension
// --------------------------------------------------

window.addEventListener("message", (event) => {

    if (event.data.type !== "START_VIDEO_SYNC") return;

  chrome.runtime.sendMessage({
    type: "START_VIDEO_SYNC",
    roomCode: event.data.roomCode
});
});
window.addEventListener("message", (event) => {

    console.log("📨 Message received:", event.data);

});