import { deleteMessage, editMessage } from "./message";


export function enableContextMenu(roomCode, myName) {

    console.log("✅ Context menu enabled");


    let holdTimer;


    document.addEventListener("mousedown", (e)=>{


        const message =
            e.target.closest(".message");


        if(!message){
            return;
        }


        console.log("🖱 Message pressed");


        console.log(
            "Sender:",
            message.dataset.sender,
            "Mine:",
            myName
        );


        if(message.dataset.sender !== myName){

            console.log("❌ Not your message");
            return;

        }



        holdTimer = setTimeout(()=>{


            console.log("🔥 HOLD DETECTED");


            showMenu(
                message,
                roomCode
            );


        },600);



    });



    document.addEventListener("mouseup",()=>{


        clearTimeout(holdTimer);


    });



    document.addEventListener("touchstart",(e)=>{


        const message =
            e.target.closest(".message");


        if(!message)
            return;



        if(message.dataset.sender !== myName)
            return;



        console.log("📱 Touch hold started");



        holdTimer=setTimeout(()=>{


            console.log("🔥 TOUCH HOLD DETECTED");


            showMenu(
                message,
                roomCode
            );


        },600);



    });



    document.addEventListener("touchend",()=>{


        clearTimeout(holdTimer);


    });



}


function showMenu(message, roomCode){

    console.log("📂 Opening menu");

    const old = document.getElementById("contextMenu");

    if(old) old.remove();

    const menu = document.createElement("div");

    menu.id = "contextMenu";

    menu.innerHTML = `
        <button id="editMessage">✏️ Edit</button>
        <button id="deleteMessage">🗑 Delete</button>
    `;

    // FORCE the menu to be visible
const rect = message.getBoundingClientRect();

menu.style.position = "fixed";
menu.style.left = rect.left + rect.width/2 - 60 + "px";
menu.style.top = rect.bottom + 8 + "px";
    menu.style.zIndex = "999999";
    menu.style.display = "block";
    menu.style.background = "#171717";
    menu.style.border = "1px solid #444";
    menu.style.borderRadius = "16px";
    menu.style.padding = "8px";
    menu.style.boxShadow = "0 10px 30px rgba(0,0,0,.7)";

    document.body.appendChild(menu);

    console.log("✅ Menu element:", menu);

    document.getElementById("deleteMessage").onclick = async () => {

        await deleteMessage(
            roomCode,
            message.dataset.id
        );

        menu.remove();

    };

   document.getElementById("editMessage").onclick = () => {

    window.dispatchEvent(

        new CustomEvent("startEdit", {

            detail: {

                id: message.dataset.id,

                text: message.querySelector(".text").innerText

            }

        })

    );

    menu.remove();

};
   setTimeout(() => {
    document.addEventListener("mousedown", closeOutside);
},100);
}function closeOutside(e){

    const menu = document.getElementById("contextMenu");

    if(!menu) return;

    if(menu.contains(e.target)) return;

    menu.remove();

   document.removeEventListener(
    "mousedown",
    closeOutside
);

}