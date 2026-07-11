import { addReaction } from "./message";

const EMOJIS = [
    "👍",
    "❤️",
    "😂",
    "😮",
    "😢"
];


export function enableAdvancedReactions(
    roomCode,
    myName
) {

    document.addEventListener(
        "contextmenu",
        (e) => {

            const message =
                e.target.closest(".message");


            if (!message) return;


            e.preventDefault();


            showReactionBar(
                e,
                message.dataset.id,
                roomCode,
                myName
            );

        }
    );

}



function showReactionBar(
    e,
    messageId,
    roomCode,
    myName
) {


    closeReactionBar();


    const bar =
        document.createElement("div");


    bar.id = "reactionBar";


    bar.innerHTML =

        EMOJIS.map(
            emoji =>
            `
            <button>
                ${emoji}
            </button>
            `
        ).join("")
        +
        `
        <button id="moreEmoji">
            ➕
        </button>
        `;



    document.body.appendChild(bar);



    const barWidth =
        260;


    let left =
        e.clientX - (barWidth / 2);


    if(left < 10)
        left = 10;


    if(left + barWidth > window.innerWidth)
        left =
        window.innerWidth - barWidth - 10;



    bar.style.left =
        left + "px";


    bar.style.top =
        Math.max(
            20,
            e.clientY - 70
        ) + "px";



    bar
    .querySelectorAll(
        "button"
    )
    .forEach(
        button => {


            button.onclick =
            async () => {


                if(
                    button.id ===
                    "moreEmoji"
                ){

                    openEmojiPicker(
                        bar,
                        messageId,
                        roomCode,
                        myName
                    );

                    return;

                }



                await addReaction(
                    roomCode,
                    messageId,
                    myName,
                    button.innerText
                );


                closeReactionBar();

            };


        }
    );



    setTimeout(() => {

        document.addEventListener(
            "click",
            outsideClick
        );

    },100);

}



function openEmojiPicker(
    bar,
    messageId,
    roomCode,
    myName
){


    const emoji =
        prompt(
            "Choose emoji"
        );


    if(emoji){

        addReaction(
            roomCode,
            messageId,
            myName,
            emoji
        );

    }


    closeReactionBar();

}



function outsideClick(e){


    const bar =
        document.getElementById(
            "reactionBar"
        );


    if(
        bar &&
        !bar.contains(e.target)
    ){

        closeReactionBar();

    }

}



function closeReactionBar(){

    const bar =
        document.getElementById(
            "reactionBar"
        );


    if(bar)
        bar.remove();


    document.removeEventListener(
        "click",
        outsideClick
    );

}