export function Chat(roomCode) {

    return `

<div class="chat">

    <div class="chatHeader">

        <div class="chatTitle">

            ❤️ ChammakChallo Chat

        </div>

        <div class="headerBottom">

            <div>

                <div class="roomCode">

                    Kamra: ${roomCode}

                </div>

                <div
                    id="onlineCount"
                    class="onlineCount"
                >

                    🟡 Waiting for someone...

                </div>

            </div>

            <div class="headerButtons">

                <button id="copyBtn">

                    📋

                </button>

                <button id="leaveBtn">

                    🚪

                </button>

            </div>

        </div>

    </div>

    <div
        class="messages"
    ></div>

    <div
        id="typingIndicator"
        class="typingIndicator"
    ></div>

    <!-- EDIT / REPLY BAR -->

    <div
        id="actionBar"
        class="actionBar hidden"
    >

        <div class="actionContent">

            <div
                id="actionTitle"
                class="actionTitle"
            >

            </div>

            <div
                id="actionPreview"
                class="actionPreview"
            >

            </div>

        </div>

        <button
            id="cancelAction"
            class="cancelAction"
        >

            ✕

        </button>

    </div>

    <div class="chatInput">

        <button
            id="imageBtn"
            class="imageBtn"
        >

            📷

        </button>

        <input
            id="imageInput"
            type="file"
            accept="image/*"
            hidden
        />

        <input
            id="messageInput"
            placeholder="Type a message..."
        />

        <button
            id="sendBtn"
            class="sendBtn"
        >

            ➤

        </button>

    </div>

</div>

`;

}