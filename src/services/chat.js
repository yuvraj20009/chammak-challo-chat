import { enableSwipeReply } from "./swipeReply";
import { uploadImage } from "./uploadImage";
import {
    sendMessage,
    listenMessages,
    markMessageAsSeen,
    editMessage
} from "./message";

import {
    joinPresence,
    leavePresence,
    listenPresence
} from "./presense";

import {
    startTyping,
    stopTyping,
    listenTyping
} from "./typing";

import { renderMessages } from "./renderMessages";
import { renderOnline } from "../ui/renderOnline";
import { renderTyping } from "../ui/renderTyping";

import { enableImageViewer } from "./imageViewer";
import { enableAdvancedReactions } from "./advancedReactions";
import { enableContextMenu } from "./contextMenu";


export function startChat(roomCode) {

    console.log("🔥 startChat running:", roomCode);


    const myName =
        localStorage.getItem("username");


    const messageInput =
        document.getElementById("messageInput");

    const sendBtn =
        document.getElementById("sendBtn");

    const imageBtn =
        document.getElementById("imageBtn");

    const imageInput =
        document.getElementById("imageInput");

    const copyBtn =
        document.getElementById("copyBtn");

    const leaveBtn =
        document.getElementById("leaveBtn");

    const messagesDiv =
        document.querySelector(".messages");

    const onlineDiv =
        document.getElementById("onlineCount");

    const typingDiv =
        document.getElementById("typingIndicator");
let editingMessageId = null;
let replyingTo = null;
let startX = 0;

window.addEventListener("startReply", (e) => {

    replyingTo = e.detail;

    const actionBar = document.getElementById("actionBar");
    const actionTitle = document.getElementById("actionTitle");
    const actionPreview = document.getElementById("actionPreview");

    actionTitle.innerText = "Replying to " + e.detail.senderName;
    actionPreview.innerText = e.detail.text || "📷 Photo";

    actionBar.classList.remove("hidden");

});

window.addEventListener("startReply", (e) => {

    replyingTo = e.detail;

    messageInput.placeholder =
        "Replying to " + replyingTo.sender;

    messageInput.focus();

});
window.addEventListener("startEdit", (e) => {

    editingMessageId = e.detail.id;

    messageInput.value = e.detail.text;

    messageInput.placeholder = "Editing message...";

    messageInput.focus();

});
 
    console.log("👤 Username:", myName);
    console.log("⌨️ Typing div:", typingDiv);



    if (!messageInput || !sendBtn) {

        console.error("Missing chat input elements");
        return;

    }



    messageInput.focus();



    enableImageViewer();


    enableAdvancedReactions(
        roomCode,
        myName
    );


    enableContextMenu(
        roomCode,
        myName
    );
enableSwipeReply((message) => {

    replyingTo = message;

    const actionBar =
        document.getElementById("actionBar");

    const actionTitle =
        document.getElementById("actionTitle");

    const actionPreview =
        document.getElementById("actionPreview");

    actionTitle.innerText =
        "Replying to " + message.sender;

    actionPreview.innerText =
        message.text || "[Image]";

    actionBar.classList.remove("hidden");

    messageInput.focus();

});




    // ---------- PRESENCE ----------


    joinPresence(
        roomCode,
        myName
    );


    listenPresence(
        roomCode,
        (users)=>{

            renderOnline(
                users,
                onlineDiv
            );

        }
    );






    // ---------- TYPING ----------


    let typingTimer;


    messageInput.addEventListener(
        "input",
        ()=>{


            startTyping(
                roomCode,
                myName
            );


            clearTimeout(
                typingTimer
            );


            typingTimer=setTimeout(()=>{


                stopTyping(
                    roomCode,
                    myName
                );


            },1000);


        }
    );



    listenTyping(
        roomCode,
        (users)=>{


            renderTyping(
                users,
                myName,
                typingDiv
            );


        }
    );






    // ---------- COPY ROOM ----------


    if(copyBtn){

        copyBtn.addEventListener(
            "click",
            async()=>{


                await navigator.clipboard.writeText(
                    roomCode
                );


                copyBtn.innerHTML="✅";


                setTimeout(()=>{

                    copyBtn.innerHTML="📋";

                },1500);


            }
        );

    }







    // ---------- LEAVE ----------


    if(leaveBtn){

        leaveBtn.addEventListener(
            "click",
            ()=>{


                leavePresence(
                    roomCode,
                    myName
                );


                stopTyping(
                    roomCode,
                    myName
                );


                location.reload();


            }
        );

    }








  // ---------- SEND MESSAGE ----------

async function send() {

    const text = messageInput.value.trim();

    if (!text) return;

    // EDIT MODE
    if (editingMessageId) {

        await editMessage(

            roomCode,

            editingMessageId,

            text

        );

        editingMessageId = null;

        messageInput.placeholder = "Type a message...";

        messageInput.value = "";

        messageInput.focus();

        return;

    }

    // NORMAL MESSAGE

   await sendMessage(
    roomCode,
    text,
    myName,
    null,
    replyingTo
);

replyingTo = null;

document
    .getElementById("actionBar")
    .classList.add("hidden");
replyingTo = null;

messageInput.placeholder = "Type a message...";

    stopTyping(

        roomCode,

        myName

    );

    messageInput.value = "";

    messageInput.focus();

}

sendBtn.addEventListener(

    "click",

    send

);

messageInput.addEventListener(

    "keydown",

    (e) => {

        if (e.key === "Enter") {

            send();

        }

    }

);
    // ---------- IMAGE UPLOAD ----------


    if(imageBtn && imageInput){


        imageBtn.addEventListener(
            "click",
            ()=>{

                imageInput.click();

            }
        );



        imageInput.addEventListener(
            "change",
            async()=>{


                const file =
                imageInput.files[0];


                if(!file) return;



                imageBtn.innerHTML="⏳";



                try{


                    const imageUrl =
                    await uploadImage(file);



                    await sendMessage(
                        roomCode,
                        "",
                        myName,
                        imageUrl
                    );


                }

                catch(err){

                    console.error(err);

                    alert(
                        "Image upload failed"
                    );

                }



                imageBtn.innerHTML="📷";

                imageInput.value="";


            }
        );

    }








    // ---------- MESSAGES ----------


    listenMessages(
        roomCode,
        (messages)=>{


            messagesDiv.innerHTML =
            renderMessages(
                messages,
                myName
            );
document.querySelectorAll(".message").forEach((message) => {

    let startX = 0;

    message.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

    });

    message.addEventListener("touchend", (e) => {

        const diff =
            e.changedTouches[0].clientX - startX;

        if (Math.abs(diff) > 70) {

            window.dispatchEvent(
                new CustomEvent("startReply", {

                    detail: {
                        id: message.dataset.id,
                        senderName: message.dataset.sender,
                        text: message.querySelector(".text")?.innerText || ""
                    }

                })
            );

        }

    });

});


            messagesDiv.scrollTop =
            messagesDiv.scrollHeight;



            messages.forEach(
                (msg)=>{


                    if(msg.sender !== myName){


                        markMessageAsSeen(
                            roomCode,
                            msg.id,
                            myName
                        );


                    }


                }
            );


        }
    );


}