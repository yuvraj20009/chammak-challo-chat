import { toggleHeartReaction } from "./message";

export function enableReactions(roomCode, myName) {

    document.addEventListener("dblclick", async (e) => {

        const bubble = e.target.closest(".message");

        if (!bubble) return;

        const messageId = bubble.dataset.id;

        if (!messageId) return;

        const reacted =
            bubble.dataset.reacted === "true";

        try {

            await toggleHeartReaction(

                roomCode,
                messageId,
                myName,
                reacted

            );

        }

        catch (err) {

            console.error(err);

        }

    });

}