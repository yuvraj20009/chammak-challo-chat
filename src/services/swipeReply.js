export function enableSwipeReply(startReply) {

    let startX = 0;
    let current = null;

    document.addEventListener("pointerdown", (e) => {

        const message = e.target.closest(".message");

        if (!message) return;

        current = message;

        startX = e.clientX;

    });

    document.addEventListener("pointermove", (e) => {

        if (!current) return;

        const diff = e.clientX - startX;

        if (diff <= 0) return;

        current.style.transition = "none";
        current.style.transform =
            `translateX(${Math.min(diff,80)}px)`;

    });

    document.addEventListener("pointerup", () => {

        if (!current) return;

        const moved =
            parseInt(
                current.style.transform
                    .replace(/[^\d]/g,"")
            ) || 0;

        current.style.transition =
            "transform .2s";

        current.style.transform =
            "translateX(0px)";

        if(moved>60){

            startReply({

                id: current.dataset.id,

                sender: current.dataset.sender,

                text:
                current.querySelector(".text")
                ?.innerText || ""

            });

        }

        current=null;

    });

}