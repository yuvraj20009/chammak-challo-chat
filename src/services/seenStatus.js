import { db } from "../firebase";

import {
    doc,
    updateDoc,
    arrayUnion,
    getDoc
} from "firebase/firestore";

// Mark a message as seen by current user
export async function markMessageAsSeen(
    roomCode,
    messageId,
    username
) {
    try {
        const messageRef = doc(
            db,
            "rooms",
            roomCode,
            "messages",
            messageId
        );

        const docSnap = await getDoc(messageRef);
        
        if (docSnap.exists()) {
            const seenBy = docSnap.data().seenBy || [];
            
            // Only update if user hasn't already seen it
            if (!seenBy.includes(username)) {
                await updateDoc(messageRef, {
                    seenBy: arrayUnion(username)
                });
            }
        }
    } catch (err) {
        console.error("Error marking message as seen:", err);
    }
}

// Get count of users who have seen a message
export function getSeenCount(seenBy) {
    return seenBy ? seenBy.length : 0;
}

// Check if current user has seen the message
export function isMessageSeen(seenBy, username) {
    return seenBy ? seenBy.includes(username) : false;
}