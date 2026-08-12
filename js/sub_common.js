/* =========================================================
   SUB PAGE SLIDER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const slideWraps =
            document.querySelectorAll(
                ".slide_wrap"
            );


        slideWraps.forEach(
            function (wrap) {


                const slider =
                    wrap.querySelector(
                        ".sub_pag_slide_wrap"
                    );


                if (!slider) {
                    return;
                }


                const clippingMask =
                    slider.querySelector(
                        ".sub_pag_clipping_mask"
                    );


                const slideTrack =
                    slider.querySelector(
                        ".img_con_wrap"
                    );


                if (
                    !clippingMask ||
                    !slideTrack
                ) {

                    return;

                }


                const prevButton =
                    slider.querySelector(
                        ".left_arrow_2"
                    );


                const nextButton =
                    slider.querySelector(
                        ".right_arrow_2"
                    );


                const pagination =
                    wrap.querySelector(
                        ".slide_pagination"
                    );


                const dots =
                    pagination
                        ? Array.from(
                            pagination.querySelectorAll(
                                ".slide_dot"
                            )
                        )
                        : [];


                const originalSlides =
                    Array.from(
                        slideTrack.querySelectorAll(
                            ".sub_pag_img_wrap"
                        )
                    );


                const slideCount =
                    originalSlides.length;


                if (slideCount === 0) {
                    return;
                }



                /* =================================================
                   CLONE
                ================================================= */

                const firstClone =
                    originalSlides[0]
                        .cloneNode(true);


                const lastClone =
                    originalSlides[
                        slideCount - 1
                    ].cloneNode(true);


                firstClone.classList.add(
                    "is_clone"
                );


                lastClone.classList.add(
                    "is_clone"
                );


                slideTrack.appendChild(
                    firstClone
                );


                slideTrack.insertBefore(
                    lastClone,
                    slideTrack.firstChild
                );


                const allSlides =
                    Array.from(
                        slideTrack.querySelectorAll(
                            ".sub_pag_img_wrap"
                        )
                    );



                /* =================================================
                   STATE
                ================================================= */

                let currentIndex = 1;

                let isMoving = false;

                let isDragging = false;

                let hasDragged = false;


                let startX = 0;

                let currentX = 0;

                let dragStartPosition = 0;


                let slideWidth = 0;


                let resizeFrame = null;



                /* =================================================
                   WIDTH
                ================================================= */

                function updateSlideSize() {


                    const newWidth =
                        clippingMask.clientWidth;


                    /*
                        실제 width 변화가 없으면
                        아무것도 다시 계산하지 않음
                    */

                    if (
                        !newWidth ||
                        newWidth === slideWidth
                    ) {

                        return;

                    }


                    slideWidth =
                        newWidth;


                    allSlides.forEach(
                        function (slide) {


                            slide.style.width =
                                `${slideWidth}px`;


                            slide.style.flex =
                                `0 0 ${slideWidth}px`;

                        }
                    );


                    slideTrack.style.width =
                        `${
                            slideWidth *
                            allSlides.length
                        }px`;


                    /*
                        크기 변경 후
                        현재 슬라이드 위치만 즉시 재정렬
                    */

                    setPosition(
                        currentIndex,
                        false
                    );

                }



                /* =================================================
                   POSITION
                ================================================= */

                function getPosition(index) {

                    return (
                        slideWidth *
                        index
                    );

                }



                function setPosition(
                    index,
                    animate = true
                ) {


                    currentIndex =
                        index;


                    if (animate) {


                        slideTrack.style.transition =
                            "transform 0.4s ease";


                        isMoving = true;

                    }


                    else {


                        slideTrack.style.transition =
                            "none";


                        isMoving = false;

                    }


                    const position =
                        getPosition(
                            currentIndex
                        );


                    slideTrack.style.transform =
                        `translate3d(-${position}px, 0, 0)`;


                    updateDots();

                }



                /* =================================================
                   DOTS
                ================================================= */

                function updateDots() {


                    let realIndex =
                        currentIndex - 1;


                    if (realIndex < 0) {


                        realIndex =
                            slideCount - 1;

                    }


                    if (
                        realIndex >=
                        slideCount
                    ) {


                        realIndex = 0;

                    }


                    dots.forEach(
                        function (
                            dot,
                            index
                        ) {


                            const active =
                                index ===
                                realIndex;


                            /*
                                기존 CSS와 새 CSS 둘 다 대응
                            */

                            dot.classList.toggle(
                                "is_active",
                                active
                            );


                            dot.classList.toggle(
                                "is_active_4",
                                active
                            );

                        }
                    );

                }



                /* =================================================
                   TRANSITION END
                ================================================= */

                slideTrack.addEventListener(
                    "transitionend",
                    function (event) {


                        if (
                            event.propertyName !==
                            "transform"
                        ) {

                            return;

                        }


                        isMoving = false;


                        /* -----------------------------------------
                           마지막 clone → 실제 첫 슬라이드
                        ----------------------------------------- */

                        if (
                            currentIndex ===
                            allSlides.length - 1
                        ) {


                            currentIndex = 1;


                            setPosition(
                                currentIndex,
                                false
                            );


                            return;

                        }


                        /* -----------------------------------------
                           첫 clone → 실제 마지막 슬라이드
                        ----------------------------------------- */

                        if (
                            currentIndex === 0
                        ) {


                            currentIndex =
                                slideCount;


                            setPosition(
                                currentIndex,
                                false
                            );

                        }

                    }
                );



                /* =================================================
                   NEXT
                ================================================= */

                if (nextButton) {


                    nextButton.addEventListener(
                        "click",
                        function () {


                            if (isMoving) {
                                return;
                            }


                            setPosition(
                                currentIndex + 1,
                                true
                            );

                        }
                    );

                }



                /* =================================================
                   PREV
                ================================================= */

                if (prevButton) {


                    prevButton.addEventListener(
                        "click",
                        function () {


                            if (isMoving) {
                                return;
                            }


                            setPosition(
                                currentIndex - 1,
                                true
                            );

                        }
                    );

                }



                /* =================================================
                   DOT CLICK
                ================================================= */

                dots.forEach(
                    function (
                        dot,
                        index
                    ) {


                        dot.addEventListener(
                            "click",
                            function () {


                                if (isMoving) {
                                    return;
                                }


                                setPosition(
                                    index + 1,
                                    true
                                );

                            }
                        );

                    }
                );



                /* =================================================
                   POINTER
                ================================================= */

                function getPointerX(event) {


                    if (
                        event.touches &&
                        event.touches.length
                    ) {


                        return (
                            event
                                .touches[0]
                                .clientX
                        );

                    }


                    if (
                        event.changedTouches &&
                        event.changedTouches.length
                    ) {


                        return (
                            event
                                .changedTouches[0]
                                .clientX
                        );

                    }


                    return event.clientX;

                }



                /* =================================================
                   DRAG START
                ================================================= */

                function startDrag(event) {


                    if (
                        isMoving ||
                        slideWidth === 0
                    ) {

                        return;

                    }


                    isDragging = true;

                    hasDragged = false;


                    startX =
                        getPointerX(event);


                    currentX =
                        startX;


                    dragStartPosition =
                        getPosition(
                            currentIndex
                        );


                    slideTrack.style.transition =
                        "none";


                    slideTrack.classList.add(
                        "is_dragging"
                    );

                }



                /* =================================================
                   DRAG MOVE
                ================================================= */

                function moveDrag(event) {


                    if (!isDragging) {
                        return;
                    }


                    currentX =
                        getPointerX(event);


                    const dragDistance =
                        currentX -
                        startX;


                    if (
                        Math.abs(
                            dragDistance
                        ) > 5
                    ) {


                        hasDragged =
                            true;

                    }


                    const nextPosition =
                        dragStartPosition -
                        dragDistance;


                    slideTrack.style.transform =
                        `translate3d(-${nextPosition}px, 0, 0)`;


                    if (
                        event.cancelable
                    ) {


                        event.preventDefault();

                    }

                }



                /* =================================================
                   DRAG END
                ================================================= */

                function endDrag(event) {


                    if (!isDragging) {
                        return;
                    }


                    isDragging = false;


                    slideTrack.classList.remove(
                        "is_dragging"
                    );


                    const endX =
                        getPointerX(event);


                    const dragDistance =
                        endX -
                        startX;


                    const threshold =
                        slideWidth *
                        0.15;


                    if (
                        dragDistance <
                        -threshold
                    ) {


                        setPosition(
                            currentIndex + 1,
                            true
                        );

                    }


                    else if (
                        dragDistance >
                        threshold
                    ) {


                        setPosition(
                            currentIndex - 1,
                            true
                        );

                    }


                    else {


                        setPosition(
                            currentIndex,
                            true
                        );

                    }


                    window.setTimeout(
                        function () {


                            hasDragged =
                                false;

                        },
                        100
                    );

                }



                /* =================================================
                   MOUSE
                ================================================= */

                clippingMask.addEventListener(
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



                /* =================================================
                   TOUCH
                ================================================= */

                clippingMask.addEventListener(
                    "touchstart",
                    startDrag,
                    {
                        passive: true
                    }
                );


                clippingMask.addEventListener(
                    "touchmove",
                    moveDrag,
                    {
                        passive: false
                    }
                );


                clippingMask.addEventListener(
                    "touchend",
                    endDrag,
                    {
                        passive: true
                    }
                );


                clippingMask.addEventListener(
                    "touchcancel",
                    endDrag,
                    {
                        passive: true
                    }
                );



                /* =================================================
                   IMAGE DRAG BLOCK
                ================================================= */

                slideTrack.addEventListener(
                    "dragstart",
                    function (event) {


                        event.preventDefault();

                    }
                );



                /* =================================================
                   LINK BLOCK AFTER DRAG
                ================================================= */

                slideTrack.addEventListener(
                    "click",
                    function (event) {


                        if (!hasDragged) {
                            return;
                        }


                        const link =
                            event.target.closest(
                                "a"
                            );


                        if (link) {


                            event.preventDefault();

                        }

                    }
                );



                /* =================================================
                   RESIZE
                ================================================= */


                /*
                    window resize마다 계산하지 않고

                    clippingMask 실제 크기가 변했을 때만
                    ResizeObserver가 알려줌.
                */


                function scheduleResize() {


                    if (resizeFrame) {


                        cancelAnimationFrame(
                            resizeFrame
                        );

                    }


                    resizeFrame =
                        requestAnimationFrame(
                            function () {


                                resizeFrame = null;


                                updateSlideSize();

                            }
                        );

                }



                if (
                    "ResizeObserver"
                    in window
                ) {


                    const resizeObserver =
                        new ResizeObserver(
                            function () {


                                scheduleResize();

                            }
                        );


                    resizeObserver.observe(
                        clippingMask
                    );

                }


                /*
                    ResizeObserver가 없는
                    오래된 브라우저용 fallback
                */

                else {


                    window.addEventListener(
                        "resize",
                        scheduleResize
                    );

                }



                /* =================================================
                   FIRST INIT
                ================================================= */


                /*
                    브라우저가 첫 레이아웃을
                    계산한 다음 실행
                */

                requestAnimationFrame(
                    function () {


                        updateSlideSize();


                        setPosition(
                            currentIndex,
                            false
                        );

                    }
                );

            }
        );

    }
);