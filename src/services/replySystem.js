import { sendMessage } from "./message";

// Store the currently selected message for reply
let replyingTo = null;

export function setReplyingTo(message) {
    replyingTo = message;
}

export function getReplyingTo() {
    return replyingTo;
}

export function clearReplyingTo() {
    replyingTo = null;
}

// Send a reply to a message
export async function sendReply(
    roomCode,
    text,
    sender,
    replyToId,
    replyToSender,
    image = null
) {
    if (!text.trim() && !image) return;

    await sendMessage(
        roomCode,
        text,
        sender,
        image,
        {
            messageId: replyToId,
            senderName: replyToSender
        }
    );
}

// Display reply indicator in message rendering
export function getRepliedMessageHTML(repliedTo) {
    if (!repliedTo) return "";

    return `
        <div class="repliedTo">
            <div class="replyLine"></div>
            <div class="replyContent">
                <div class="replySender">${repliedTo.senderName}</div>
                <div class="replyText">${
                    repliedTo.text 
                        ? repliedTo.text.substring(0, 50) + (repliedTo.text.length > 50 ? "..." : "")
                        : "[Image]"
                }</div>
            </div>
        </div>
    `;
}