export function createChatPanel() {

    if (document.getElementById("cc-chat-panel")) return;

    const panel = document.createElement("div");

    panel.id = "cc-chat-panel";

    panel.innerHTML = `
        <div id="cc-header">
            <span>💬 Chammak Challo</span>
            <button id="cc-close">✕</button>
        </div>

        <div id="cc-messages">
            Welcome to Chammak Challo 🚀
        </div>

        <div id="cc-input-area">

            <input
                id="cc-message"
                placeholder="Type a message..."
            />

            <button id="cc-send">
                ➤
            </button>

        </div>
    `;

    document.body.appendChild(panel);

    document
        .getElementById("cc-close")
        .onclick = () => panel.remove();

}