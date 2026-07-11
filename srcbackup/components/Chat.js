export function Chat(roomCode) {

    return `

<div class="chat">

    <div class="chatHeader">

        <div class="chatTitle">
            ❤️ Chammakchallo Chat
        </div>

        <div class="headerBottom">

            <div>

                <div class="roomCode">
                    Kamra: ${roomCode}
                </div>

                <div id="onlineCount" class="onlineCount">
                    🟡 Waiting for someone...
                </div>

            </div>

            <div class="headerButtons">

                <button id="copyBtn">📋</button>

                <button id="leaveBtn">🚪</button>

            </div>

        </div>

    </div>

    <div class="messages"></div>

    <div id="typingIndicator" class="typingIndicator"></div>

    <div class="chatInput">

        <input
            id="messageInput"
            placeholder="Type a message..."
        />

        <input
            type="file"
            id="imageInput"
            accept="image/*"
            hidden
        />

        <button id="imageBtn">
            📷
        </button>

        <button id="sendBtn">
            ➤
        </button>

    </div>

</div>

<div id="imageViewer" class="imageViewer">

    <img id="viewerImage"/>

</div>

`;

}