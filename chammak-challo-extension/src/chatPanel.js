export function createChatPanel() {
    if (document.getElementById("cc-chat-panel")) return;

    const panel = document.createElement("div");

    panel.id = "cc-chat-panel";

    panel.innerHTML = `
        <div id="cc-header">
            <span>Chammak Challo</span>
            <button id="cc-close">✕</button>
        </div>

        <iframe
            id="cc-frame"
            src="https://chammak-challo-chat.vercel.app/?extension=true"
            allow="clipboard-read; clipboard-write"
        ></iframe>
    `;

    document.body.appendChild(panel);

    document.getElementById("cc-close").onclick = () => {
        panel.remove();
    };
}