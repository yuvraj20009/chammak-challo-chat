export function renderTyping(

    users,

    myName,

    typingDiv

) {

    const typingUsers =

        Object.keys(users || {})

        .filter(

            user => user !== myName

        );

    typingDiv.innerHTML =

        typingUsers.length

            ? `✍️ ${typingUsers[0]} is typing...`

            : "";

}