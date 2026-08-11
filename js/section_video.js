document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".section_video");

    if (!section) return;


    /* ---------------------------------
       HTML 요소
    --------------------------------- */

    const viewport =
        section.querySelector(".video_viewport");

    const track =
        section.querySelector(".video_track");

    const cards =
        section.querySelectorAll(".video_card");

    const dots =
        section.querySelectorAll(".video_dot");

    const prevButton =
        section.querySelector(".video_prev");

    const nextButton =
        section.querySelector(".video_next");


    if (!viewport || !track || cards.length === 0) {
        return;
    }


    /* ---------------------------------
       상태값
    --------------------------------- */

    let currentSlideIndex = 0;

    let currentTranslateX = 0;
    let dragStartTranslateX = 0;

    let isDragging = false;
    let hasDragged = false;

    let startX = 0;
    let currentX = 0;


    /* ---------------------------------
       간격
    --------------------------------- */

    function getGap() {

        const trackStyle =
            window.getComputedStyle(track);

        return parseFloat(trackStyle.gap) || 0;
    }


    /* ---------------------------------
       카드 크기 설정
    --------------------------------- */

    function setCardWidth() {

        const gap = getGap();


        if (window.innerWidth <= 480) {

            track.style.setProperty(
                "--video-card-width",
                "200px"
            );

            return;
        }


        const viewportWidth =
            viewport.clientWidth;


        const cardWidth =
            (viewportWidth - gap * 2) / 3;


        track.style.setProperty(
            "--video-card-width",
            `${cardWidth}px`
        );
    }


    /* ---------------------------------
       카드 한 칸 이동 거리
    --------------------------------- */

    function getCardMoveDistance() {

        const firstCard = cards[0];

        if (!firstCard) return 0;


        const cardWidth =
            firstCard.getBoundingClientRect().width;


        return cardWidth + getGap();
    }


    /* ---------------------------------
       최대 이동 거리
    --------------------------------- */

    function getMaxTranslateX() {

        const trackWidth =
            track.scrollWidth;

        const viewportWidth =
            viewport.clientWidth;


        return Math.max(
            0,
            trackWidth - viewportWidth
        );
    }


    /* ---------------------------------
       마지막 이동 가능 인덱스
    --------------------------------- */

    function getLastSlideIndex() {

        const moveDistance =
            getCardMoveDistance();


        if (moveDistance <= 0) {
            return 0;
        }


        return Math.ceil(
            getMaxTranslateX() /
            moveDistance
        );
    }


    /* ---------------------------------
       인덱스 → 이동 거리
    --------------------------------- */

    function getTranslateByIndex(index) {

        const moveDistance =
            getCardMoveDistance();


        const requestedTranslate =
            index * moveDistance;


        return Math.min(
            requestedTranslate,
            getMaxTranslateX()
        );
    }


    /* ---------------------------------
       페이지네이션
    --------------------------------- */

    function updateDots() {

        if (dots.length === 0) {
            return;
        }


        const maxTranslate =
            getMaxTranslateX();


        const progress =
            maxTranslate > 0
                ? currentTranslateX / maxTranslate
                : 0;


        const activeDotIndex =
            Math.round(
                progress * (dots.length - 1)
            );


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is_active",
                index === activeDotIndex
            );

        });
    }


    /* ---------------------------------
       화살표 상태
    --------------------------------- */

    function updateArrowState() {

        const maxTranslate =
            getMaxTranslateX();


        if (prevButton) {

            prevButton.disabled =
                currentTranslateX <= 1;
        }


        if (nextButton) {

            nextButton.disabled =
                currentTranslateX >=
                maxTranslate - 1;
        }
    }


    /* ---------------------------------
       특정 카드 위치로 이동
    --------------------------------- */

    function moveToSlide(
        index,
        useAnimation = true
    ) {

        const lastIndex =
            getLastSlideIndex();


        currentSlideIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    lastIndex
                )
            );


        currentTranslateX =
            getTranslateByIndex(
                currentSlideIndex
            );


        track.style.transition =
            useAnimation
                ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";


        track.style.transform =
            `translate3d(-${currentTranslateX}px, 0, 0)`;


        updateDots();
        updateArrowState();
    }


    /* ---------------------------------
       화살표 클릭

       한 번 클릭 = 한 카드
       빠르게 여러 번 클릭 가능
    --------------------------------- */

    prevButton?.addEventListener(
        "click",
        () => {

            moveToSlide(
                currentSlideIndex - 1
            );

        }
    );


    nextButton?.addEventListener(
        "click",
        () => {

            moveToSlide(
                currentSlideIndex + 1
            );

        }
    );


    /* ---------------------------------
       도트 클릭

       도트는 전체 길이를
       비율로 나누어 큰 단위로 이동
    --------------------------------- */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                const maxTranslate =
                    getMaxTranslateX();


                const ratio =
                    dots.length <= 1
                        ? 0
                        : index /
                          (dots.length - 1);


                const targetTranslate =
                    maxTranslate * ratio;


                const moveDistance =
                    getCardMoveDistance();


                const targetIndex =
                    moveDistance > 0
                        ? Math.round(
                            targetTranslate /
                            moveDistance
                        )
                        : 0;


                moveToSlide(targetIndex);

            }
        );

    });


    /* ---------------------------------
       포인터 X
    --------------------------------- */

    function getPointerX(event) {

        if (
            event.touches &&
            event.touches.length > 0
        ) {

            return event.touches[0].clientX;
        }


        if (
            event.changedTouches &&
            event.changedTouches.length > 0
        ) {

            return event.changedTouches[0].clientX;
        }


        return event.clientX;
    }


    /* ---------------------------------
       드래그 시작
    --------------------------------- */

    function startDrag(event) {

        if (
            event.target.closest(
                ".video_arrow"
            )
        ) {
            return;
        }


        isDragging = true;
        hasDragged = false;


        startX =
            getPointerX(event);

        currentX =
            startX;


        dragStartTranslateX =
            currentTranslateX;


        viewport.classList.add(
            "is_dragging"
        );


        track.style.transition =
            "none";
    }


    /* ---------------------------------
       드래그 중

       움직인 거리만큼 그대로 이동
       여러 카드를 한 번에 넘길 수 있음
    --------------------------------- */

    function moveDrag(event) {

        if (!isDragging) {
            return;
        }


        currentX =
            getPointerX(event);


        const dragDistance =
            currentX - startX;


        if (
            Math.abs(dragDistance) > 5
        ) {

            hasDragged = true;
        }


        const maxTranslate =
            getMaxTranslateX();


        let nextTranslate =
            dragStartTranslateX -
            dragDistance;


        nextTranslate =
            Math.max(
                0,
                Math.min(
                    nextTranslate,
                    maxTranslate
                )
            );


        currentTranslateX =
            nextTranslate;


        track.style.transform =
            `translate3d(-${currentTranslateX}px, 0, 0)`;


        updateDots();
        updateArrowState();


        if (event.cancelable) {
            event.preventDefault();
        }
    }


    /* ---------------------------------
       드래그 종료

       드래그한 위치에서
       가장 가까운 카드에 스냅
    --------------------------------- */

    function endDrag() {

        if (!isDragging) {
            return;
        }


        isDragging = false;


        viewport.classList.remove(
            "is_dragging"
        );


        const moveDistance =
            getCardMoveDistance();


        if (moveDistance <= 0) {
            return;
        }


        const nearestIndex =
            Math.round(
                currentTranslateX /
                moveDistance
            );


        moveToSlide(
            nearestIndex
        );


        window.setTimeout(
            () => {

                hasDragged = false;

            },
            50
        );
    }


    /* ---------------------------------
       마우스
    --------------------------------- */

    viewport.addEventListener(
        "mousedown",
        startDrag
    );

    window.addEventListener(
        "mousemove",
        moveDrag
    );

    window.addEventListener(
        "mouseup",
        endDrag
    );


    /* ---------------------------------
       터치
    --------------------------------- */

    viewport.addEventListener(
        "touchstart",
        startDrag,
        { passive: true }
    );


    viewport.addEventListener(
        "touchmove",
        moveDrag,
        { passive: false }
    );


    viewport.addEventListener(
        "touchend",
        endDrag,
        { passive: true }
    );


    viewport.addEventListener(
        "touchcancel",
        endDrag,
        { passive: true }
    );


    /* ---------------------------------
       드래그 후 링크 클릭 방지
    --------------------------------- */

    cards.forEach((card) => {

        card.addEventListener(
            "click",
            (event) => {

                if (hasDragged) {
                    event.preventDefault();
                }

            }
        );

    });


    /* ---------------------------------
       기본 이미지 드래그 방지
    --------------------------------- */

    track.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );


    /* ---------------------------------
       리사이즈
    --------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            setCardWidth();

            moveToSlide(
                currentSlideIndex,
                false
            );

        }
    );


    /* ---------------------------------
       최초 실행
    --------------------------------- */

    setCardWidth();

    moveToSlide(
        0,
        false
    );

});