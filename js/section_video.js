document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".section_video");

    if (!section) return;


    const viewport = section.querySelector(".video_viewport");
    const track = section.querySelector(".video_track");

    const cards = [
        ...section.querySelectorAll(".video_card")
    ];

    const prevButton = section.querySelector(".video_prev");
    const nextButton = section.querySelector(".video_next");

    const dots = [
        ...section.querySelectorAll(".video_dot")
    ];


    let currentPage = 0;


    function getCardsPerPage() {

        if (window.innerWidth <= 480) {

            return 1;

        }

        return 3;

    }


    function getGap() {

        if (window.innerWidth <= 480) {

            return 7;

        }

        return 21;

    }


    function getCardWidth() {

        if (!cards.length) return 0;

        return cards[0].getBoundingClientRect().width;

    }


    function getPageCount() {

        return Math.ceil(
            cards.length / getCardsPerPage()
        );

    }


    function updateSlider() {

        const cardsPerPage = getCardsPerPage();

        const cardWidth = getCardWidth();

        const gap = getGap();


        const moveCount =
            currentPage * cardsPerPage;


        const moveDistance =
            moveCount * (cardWidth + gap);


        track.style.transform =
            `translateX(-${moveDistance}px)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is_active",
                index === currentPage
            );

        });


        if (prevButton) {

            prevButton.disabled =
                currentPage === 0;

        }


        if (nextButton) {

            nextButton.disabled =
                currentPage >= getPageCount() - 1;

        }

    }


    function goToPage(page) {

        const lastPage =
            getPageCount() - 1;


        currentPage =
            Math.max(
                0,
                Math.min(page, lastPage)
            );


        updateSlider();

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                goToPage(currentPage - 1);

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                goToPage(currentPage + 1);

            }
        );

    }


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                goToPage(index);

            }
        );

    });


    window.addEventListener(
        "resize",
        () => {

            currentPage = 0;

            updateSlider();

        }
    );


    updateSlider();

});