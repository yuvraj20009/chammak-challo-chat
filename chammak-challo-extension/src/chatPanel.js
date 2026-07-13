export function createChatPanel() {

    if (document.getElementById("cc-chat-panel")) return;

    const panel = document.createElement("div");

    panel.id = "cc-chat-panel";

    panel.innerHTML = `
        <div id="cc-header">
            <span>❤️ Chammak Challo</span>
            <button id="cc-close">✕</button>
        </div>

        <iframe
            id="cc-frame"
            src="https://chammak-challo-chat.vercel.app/?extension=true"
            allow="clipboard-read; clipboard-write"
        ></iframe>

        <div id="cc-resize"></div>
    `;

    document.body.appendChild(panel);

    const frame = panel.querySelector("#cc-frame");

    frame.onload = () => {

        frame.contentWindow.postMessage(
            {
                type: "EXTENSION_READY"
            },
            "*"
        );

    };

    const header = panel.querySelector("#cc-header");
    const resize = panel.querySelector("#cc-resize");

    // -----------------------------
    // Restore previous size/position
    // -----------------------------

    chrome.storage.local.get("ccWindow", (data) => {

        const saved = data.ccWindow;

        if (!saved) return;

        panel.style.left = saved.left + "px";
        panel.style.top = saved.top + "px";
        panel.style.width = saved.width + "px";
        panel.style.height = saved.height + "px";

        panel.style.right = "auto";
        panel.style.bottom = "auto";

    });

    function saveState() {

        chrome.storage.local.set({

            ccWindow: {

                left: panel.offsetLeft,
                top: panel.offsetTop,
                width: panel.offsetWidth,
                height: panel.offsetHeight

            }

        });

    }

    // -----------------------------
    // Close
    // -----------------------------

    panel.querySelector("#cc-close").onclick = () => {

        saveState();

        panel.remove();

    };

    // -----------------------------
    // Dragging
    // -----------------------------

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;

    header.style.cursor = "move";

    header.addEventListener("mousedown", (e) => {

        dragging = true;

        startX = e.clientX;
        startY = e.clientY;

        startLeft = panel.offsetLeft;
        startTop = panel.offsetTop;

        panel.style.right = "auto";
        panel.style.bottom = "auto";

        e.preventDefault();

    });

    // -----------------------------
    // Resizing
    // -----------------------------

    let resizing = false;

    let startWidth = 0;
    let startHeight = 0;

    resize.addEventListener("mousedown", (e) => {

        resizing = true;

        startX = e.clientX;
        startY = e.clientY;

        startWidth = panel.offsetWidth;
        startHeight = panel.offsetHeight;

        e.preventDefault();

    });

    document.addEventListener("mousemove", (e) => {

        if (dragging) {

            let left = startLeft + (e.clientX - startX);
            let top = startTop + (e.clientY - startY);

            left = Math.max(
                0,
                Math.min(left, window.innerWidth - panel.offsetWidth)
            );

            top = Math.max(
                0,
                Math.min(top, window.innerHeight - panel.offsetHeight)
            );

            panel.style.left = left + "px";
            panel.style.top = top + "px";

        }

        if (resizing) {

            let width = startWidth + (e.clientX - startX);
            let height = startHeight + (e.clientY - startY);

            width = Math.max(260, Math.min(width, window.innerWidth));
            height = Math.max(350, Math.min(height, window.innerHeight));

            panel.style.width = width + "px";
            panel.style.height = height + "px";

        }

    });

    document.addEventListener("mouseup", () => {

        if (dragging || resizing) {

            saveState();

        }

        dragging = false;
        resizing = false;

    });

}