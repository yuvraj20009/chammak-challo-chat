import "./style.css";
import { createChatPanel } from "./chatPanel";

console.log("🚀 Chammak Challo Loaded");

const button = document.createElement("div");

button.id = "cc-chat-button";

button.innerHTML = "💬";

document.body.appendChild(button);

button.onclick = () => {

    createChatPanel();

};