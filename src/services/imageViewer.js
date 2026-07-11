export function enableImageViewer() {

    const viewer =

        document.getElementById(
            "imageViewer"
        );

    const image =

        document.getElementById(
            "viewerImage"
        );

    document.addEventListener(

        "click",

        (e) => {

            if (

                e.target.classList.contains(
                    "chatImage"
                )

            ) {

                image.src =

                    e.target.dataset.image;

                viewer.classList.add(
                    "show"
                );

            }

        }

    );

    viewer.addEventListener(

        "click",

        (e) => {

            if (e.target === viewer) {

                viewer.classList.remove(
                    "show"
                );

            }

        }

    );

    document.addEventListener(

        "keydown",

        (e) => {

            if (e.key === "Escape") {

                viewer.classList.remove(
                    "show"
                );

            }

        }

    );

}