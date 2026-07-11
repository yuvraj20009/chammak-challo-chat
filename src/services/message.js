import { db } from "../firebase";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    arrayUnion,
    deleteDoc,
    getDoc
} from "firebase/firestore";



export async function sendMessage(
    roomCode,
    text,
    sender,
    image = null,
    replyTo = null
) {

    if (!text.trim() && !image) return;


    await addDoc(
        collection(
            db,
            "rooms",
            roomCode,
            "messages"
        ),
        {
            text,
            sender,
            image,

            reactions: {},

            seenBy: [],

            replyTo,

            edited: false,

            createdAt: serverTimestamp()
        }
    );

}





export async function editMessage(
    roomCode,
    messageId,
    newText
) {

    const messageRef = doc(
        db,
        "rooms",
        roomCode,
        "messages",
        messageId
    );


    await updateDoc(
        messageRef,
        {
            text: newText,
            edited: true,
            editedAt: serverTimestamp()
        }
    );

}





export async function deleteMessage(
    roomCode,
    messageId
) {

    const messageRef = doc(
        db,
        "rooms",
        roomCode,
        "messages",
        messageId
    );


    await deleteDoc(messageRef);

}





export async function markMessageAsSeen(
    roomCode,
    messageId,
    username
) {

    const messageRef = doc(
        db,
        "rooms",
        roomCode,
        "messages",
        messageId
    );


    const snap =
        await getDoc(messageRef);


    if (!snap.exists()) return;


    const seenBy =
        snap.data().seenBy || [];


    if (!seenBy.includes(username)) {


        await updateDoc(
            messageRef,
            {
                seenBy: arrayUnion(username)
            }
        );


    }

}





export async function addReaction(
    roomCode,
    messageId,
    username,
    emoji
) {


    const messageRef = doc(
        db,
        "rooms",
        roomCode,
        "messages",
        messageId
    );


    const snap =
        await getDoc(messageRef);


    if (!snap.exists()) return;


    const reactions =
        snap.data().reactions || {};



    if (!reactions[emoji]) {

        reactions[emoji] = [];

    }



    if (!reactions[emoji].includes(username)) {

        reactions[emoji].push(username);

    }



    await updateDoc(
        messageRef,
        {
            reactions
        }
    );


}





export async function removeReaction(
    roomCode,
    messageId,
    username,
    emoji
) {


    const messageRef = doc(
        db,
        "rooms",
        roomCode,
        "messages",
        messageId
    );


    const snap =
        await getDoc(messageRef);


    if (!snap.exists()) return;



    const reactions =
        snap.data().reactions || {};



    if (reactions[emoji]) {


        reactions[emoji] =
            reactions[emoji].filter(
                user => user !== username
            );



        if (reactions[emoji].length === 0) {

            delete reactions[emoji];

        }


    }



    await updateDoc(
        messageRef,
        {
            reactions
        }
    );


}





export function listenMessages(
    roomCode,
    callback
) {


    const q = query(

        collection(
            db,
            "rooms",
            roomCode,
            "messages"
        ),

        orderBy("createdAt")

    );



    onSnapshot(
        q,
        (snapshot)=>{


            const messages = [];



            snapshot.forEach(
                (docSnap)=>{


                    messages.push({

                        id: docSnap.id,

                        ...docSnap.data()

                    });


                }
            );



            callback(messages);


        }
    );


}