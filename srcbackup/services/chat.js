import { uploadImage } from "./uploadImage";
import { sendMessage, listenMessages } from "./message";

import {
    joinPresence,
    leavePresence,
    listenPresence
} from "./presense";

import {
    startTyping,
    stopTyping,
    listenTyping
} from "./typing";

export function startChat(roomCode) {

    const myName = localStorage.getItem("username");

    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const imageBtn = document.getElementById("imageBtn");
    const imageInput = document.getElementById("imageInput");
    const copyBtn = document.getElementById("copyBtn");
    const leaveBtn = document.getElementById("leaveBtn");

    const messagesDiv = document.querySelector(".messages");
    const onlineDiv = document.getElementById("onlineCount");
    const typingDiv = document.getElementById("typingIndicator");

    const imageViewer = document.getElementById("imageViewer");
    const viewerImage = document.getElementById("viewerImage");

    messageInput.focus();

    joinPresence(roomCode, myName);

    /* ================= ONLINE ================= */

    listenPresence(roomCode, (users) => {

        onlineDiv.innerHTML =
            users.length <= 1
                ? "🟡 Waiting for someone..."
                : `🟢 ${users.length} People Online`;

    });

    /* ================= TYPING ================= */

    let typingTimeout;

    messageInput.addEventListener("input", () => {

        startTyping(roomCode, myName);

        clearTimeout(typingTimeout);

        typingTimeout = setTimeout(() => {

            stopTyping(roomCode, myName);

        }, 1000);

    });

    listenTyping(roomCode, (users) => {

        const typingUsers = Object.keys(users || {})
            .filter(user => user !== myName);

        typingDiv.innerHTML =
            typingUsers.length
                ? `✍️ ${typingUsers[0]} is typing...`
                : "";

    });

    /* ================= COPY ROOM ================= */

    copyBtn.addEventListener("click", async () => {

        await navigator.clipboard.writeText(roomCode);

        copyBtn.innerHTML = "✅";

        setTimeout(() => {

            copyBtn.innerHTML = "📋";

        }, 1500);

    });

    /* ================= LEAVE ================= */

    leaveBtn.addEventListener("click", () => {

        leavePresence(roomCode, myName);

        stopTyping(roomCode, myName);

        location.reload();

    });

    /* ================= SEND TEXT ================= */

    async function send() {

        const text = messageInput.value.trim();

        if (!text) return;

        await sendMessage(
            roomCode,
            text,
            myName
        );

        stopTyping(roomCode, myName);

        messageInput.value = "";

        messageInput.focus();

    }

    sendBtn.addEventListener("click", send);

    messageInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            send();

        }

    });

    /* ================= IMAGE ================= */

    imageBtn.addEventListener("click", () => {

        imageInput.click();

    });

    imageInput.addEventListener("change", async () => {

        const file = imageInput.files[0];

        if (!file) return;

        imageBtn.innerHTML = "⏳";

        try {

            const imageUrl = await uploadImage(file);

            await sendMessage(
                roomCode,
                "",
                myName,
                imageUrl
            );

        } catch (err) {

            console.error(err);

            alert("Image upload failed.");

        }

        imageBtn.innerHTML = "📷";

        imageInput.value = "";

    });

    /* ================= LISTEN ================= */

    listenMessages(roomCode, (messages) => {

        messagesDiv.innerHTML = "";

        if (!messages.length) {

            messagesDiv.innerHTML = `

<div class="empty">

    Start your conversation ❤️

</div>

`;

            return;

        }

        messages.forEach((message) => {

            const mine = message.sender === myName;

            const time = message.createdAt?.toDate
                ? message.createdAt
                    .toDate()
                    .toLocaleTimeString([], {

                        hour: "2-digit",
                        minute: "2-digit"

                    })
                : "";

            messagesDiv.innerHTML += `

<div class="messageRow ${mine ? "mine" : "other"}">

    ${mine ? "" : `

<div class="avatar">

<img
src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(message.sender)}"
/>

</div>

`}

<div class="message ${mine ? "mineBubble" : "otherBubble"}">

<div class="messageTop">

<div class="sender">

${message.sender}

</div>

<div class="time">

${time}

</div>

</div>

${message.image ? `

<img
class="chatImage"
src="${message.image}"
onclick="window.open('${message.image}','_blank')"
/>

` : ""}

${message.text ? `

<div class="text">

${message.text}

</div>

` : ""}

</div>

</div>

`;

        });

        messagesDiv.scrollTop =
            messagesDiv.scrollHeight;

    });

}