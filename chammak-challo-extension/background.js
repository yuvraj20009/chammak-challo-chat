console.log("🔥 Chammak Challo Background Running");

chrome.runtime.onInstalled.addListener(() => {

    console.log("✅ Extension Installed");

});

chrome.runtime.onMessage.addListener((message, sender) => {

    if (message.type !== "START_VIDEO_SYNC") return;

    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {

            if (!tabs.length) return;

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: "START_VIDEO_SYNC",
                    roomCode: message.roomCode
                }
            );

        }
    );

});