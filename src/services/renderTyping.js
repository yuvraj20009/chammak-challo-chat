export function renderTyping(users, myName, typingDiv) {

    if (!typingDiv) {
        console.error("❌ typingDiv not found");
        return;
    }

    console.log("Typing received:", users);

    const typingUsers = Object.keys(users || {})
        .filter(user => user !== myName);


    if (typingUsers.length === 0) {

        typingDiv.innerHTML = "";
        return;

    }


    typingDiv.innerHTML = `
        <div class="typingBox">
            ✍️ ${typingUsers.join(", ")} ${typingUsers.length > 1 ? "are" : "is"} typing...
        </div>
    `;

}