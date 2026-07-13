import "./style.css";

import { Chat } from "./components/Chat";
import { startChat } from "./services/chat";
import { createRoom } from "./services/room";
import { joinRoom } from "./services/joinRoom";

const extensionMode =
    new URLSearchParams(window.location.search).get("extension") === "true";

document.body.innerHTML = `
<div class="container ${extensionMode ? "extension-mode" : ""}">

    <div class="logo">
        chammakchallo
        <span>CHAT</span>
    </div>

    <h1>
        Until we are under
        <br>
        the same roof
    </h1>

    <p>
        A love dedicated project ❤️
    </p>

    <input
        id="nameInput"
        placeholder="Your Name"
    />

    <input
        id="roomInput"
        placeholder="Enter Kamra Code"
    />

    <button id="joinBtn">
        Join Kamra
    </button>

    <button id="createBtn">
        Create Kamra
    </button>

</div>
`;

document
.getElementById("createBtn")
.addEventListener("click", async () => {

    const username =
        document.getElementById("nameInput").value.trim();

    if (!username) {

        alert("Please enter your name ❤️");
        return;

    }

    localStorage.setItem("username", username);

    const roomCode = await createRoom();

    document.body.innerHTML = Chat(roomCode);

    startChat(roomCode);

});

document
.getElementById("joinBtn")
.addEventListener("click", async () => {

    const username =
        document.getElementById("nameInput").value.trim();

    if (!username) {

        alert("Please enter your name ❤️");
        return;

    }

    localStorage.setItem("username", username);

    const code =
        document.getElementById("roomInput").value.trim();

    const result =
        await joinRoom(code);

    if (!result.success) {

        alert("Kamra not found 💔");
        return;

    }

    const roomCode = result.room;

    document.body.innerHTML = Chat(roomCode);

    startChat(roomCode);

});