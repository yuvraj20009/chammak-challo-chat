// Remove this line if it exists:
// export { startChat };

// Keep only this export:
export function Chat(roomCode) {
    return `
        <div class="chat">
            <div class="chatHeader">
                <div class="chatTitle">chammakchallo</div>
                <div class="headerBottom">
                    <div class="roomCode">Kamra Code: ${roomCode}</div>
                    <div class="headerButtons">
                        <button id="copyBtn" title="Copy room code">📋</button>
                        <button id="leaveBtn" title="Leave chat">🚪</button>
                    </div>
                </div>
            </div>

            <div class="messages">
                <div class="empty">No messages yet...</div>
            </div>

            <div id="onlineCount"></div>
            <div id="typingIndicator"></div>

            <div class="chatInput">
                <input
                    id="messageInput"
                    placeholder="Type a message..."
                    autocomplete="off"
                />
                <button id="imageBtn">📷</button>
                <button id="sendBtn">Send</button>
            </div>

            <input
                id="imageInput"
                type="file"
                accept="image/*"
                style="display: none;"
            />

            <div class="imageViewer" id="imageViewer">
                <img id="viewerImage" />
            </div>
        </div>
    `;
}