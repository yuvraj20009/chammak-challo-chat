export function renderMessages(
    messages,
    myName
) {

    let html = "";

    messages.forEach((message) => {

        const mine =
            message.sender === myName;

        const time =
            message.createdAt?.toDate
                ? message.createdAt
                    .toDate()
                    .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                : "";

        // Build reactions HTML
        let reactionsHTML = "";
        if (message.reactions && Object.keys(message.reactions).length > 0) {
            reactionsHTML = '<div class="reactions">';
            Object.entries(message.reactions).forEach(([emoji, users]) => {
                reactionsHTML += `
                    <div class="reaction" title="${users.join(', ')}">
                        <span>${emoji}</span>
                        <span class="reactionCount">${users.length}</span>
                    </div>
                `;
            });
            reactionsHTML += '</div>';
        }

        // Build seen indicator
        let seenHTML = "";
        if (mine && message.seenBy && message.seenBy.length > 0) {
            seenHTML = `<div class="seenIndicator" title="Seen by: ${message.seenBy.join(', ')}">👁️ ${message.seenBy.length}</div>`;
        }

        // Build reply indicator
        let replyHTML = "";
        if (message.replyTo) {
            replyHTML = `
                <div class="repliedTo">
                    <div class="replyLine"></div>
                    <div class="replyContent">
                        <div class="replySender">${message.replyTo.senderName}</div>
                        <div class="replyText">${
                            message.replyTo.text 
                                ? message.replyTo.text.substring(0, 50) + (message.replyTo.text.length > 50 ? "..." : "")
                                : "[Image]"
                        }</div>
                    </div>
                </div>
            `;
        }

        // Build edited indicator
        let editedHTML = "";
        if (message.edited) {
            editedHTML = '<span class="editedBadge">(edited)</span>';
        }

        html += `

<div class="messageRow ${mine ? "mine" : "other"}">

${mine ? "" : `

<div class="avatar">

<img
src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(message.sender)}"
/>

</div>

`}

<div
class="message ${mine ? "mineBubble" : "otherBubble"}"
data-id="${message.id}"
data-sender="${message.sender}"
>

${replyHTML}

<div class="messageTop">

<div class="sender">
${message.sender}
</div>

<div class="time">
${time} ${editedHTML}
</div>

</div>

${message.image ? `

<img
class="chatImage"
src="${message.image}"
data-image="${message.image}"
/>

` : ""}

${message.text ? `

<div class="text">

${message.text}

</div>

` : ""}

${reactionsHTML}

${seenHTML}

</div>

</div>

`;

    });

    return html;

}