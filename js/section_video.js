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


    let currentIndex = 0;

    let isDragging = false;

    let startX = 0;
    let startTranslate = 0;
    let currentTranslate = 0;


    function getVisibleCount() {

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


    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCount()
        );
    }


    function getMoveDistance(index) {

        return index * (
            getCardWidth() + getGap()
        );
    }


    function updatePagination() {

        const maxIndex = getMaxIndex();

        const progress =
            maxIndex === 0
                ? 0
                : currentIndex / maxIndex;


        const dotIndex =
            Math.round(
                progress * (dots.length - 1)
            );


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is_active",
                index === dotIndex
            );

        });
    }


    function updateButtons() {

        if (prevButton) {
            prevButton.disabled =
                currentIndex <= 0;
        }

        if (nextButton) {
            nextButton.disabled =
                currentIndex >= getMaxIndex();
        }
    }


    function updateSlider(animate = true) {

        currentTranslate =
            -getMoveDistance(currentIndex);


        track.style.transition =
            animate
                ? "transform 0.45s ease"
                : "none";


        track.style.transform =
            `translateX(${currentTranslate}px)`;


        updatePagination();
        updateButtons();
    }


    function goToIndex(index) {

        currentIndex = Math.max(
            0,
            Math.min(index, getMaxIndex())
        );


        updateSlider();
    }


    /* 화살표 - 한 장씩 */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                goToIndex(currentIndex - 1);

            }
        );
    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                goToIndex(currentIndex + 1);

            }
        );
    }


    /* pagination */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                const maxIndex =
                    getMaxIndex();


                const target =
                    Math.round(
                        (
                            index /
                            (dots.length - 1)
                        ) * maxIndex
                    );


                goToIndex(target);
            }
        );
    });


    /* -------------------------
       DRAG
    ------------------------- */


    viewport.addEventListener(
        "pointerdown",
        (event) => {

            isDragging = true;

            startX = event.clientX;

            startTranslate =
                currentTranslate;


            viewport.setPointerCapture(
                event.pointerId
            );


            track.style.transition =
                "none";


            viewport.classList.add(
                "is_dragging"
            );

        }
    );


    viewport.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) return;


            const diff =
                event.clientX - startX;


            track.style.transform =
                `translateX(${startTranslate + diff}px)`;

        }
    );


    function finishDrag(event) {

        if (!isDragging) return;


        isDragging = false;


        const diff =
            event.clientX - startX;


        const threshold =
            getCardWidth() * 0.15;


        if (diff < -threshold) {

            currentIndex++;

        }

        else if (diff > threshold) {

            currentIndex--;

        }


        currentIndex = Math.max(
            0,
            Math.min(
                currentIndex,
                getMaxIndex()
            )
        );


        viewport.classList.remove(
            "is_dragging"
        );


        updateSlider();

    }


    viewport.addEventListener(
        "pointerup",
        finishDrag
    );


    viewport.addEventListener(
        "pointercancel",
        finishDrag
    );


    /* 링크 드래그 방지 */

    cards.forEach((card) => {

        card.addEventListener(
            "dragstart",
            (event) => {

                event.preventDefault();

            }
        );

    });


    /* 화면 크기 변경 */

    window.addEventListener(
        "resize",
        () => {

            currentIndex = Math.min(
                currentIndex,
                getMaxIndex()
            );


            updateSlider(false);

        }
    );


    updateSlider(false);

});