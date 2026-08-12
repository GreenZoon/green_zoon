/* =========================================================
   SUB PAGE COMMON
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DUPLICATE INITIALIZATION GUARD
    ===================================================== */

    if (window.GreenZoneSubCommonInitialized) {
        return;
    }

    window.GreenZoneSubCommonInitialized = true;



    /* =====================================================
       COMPONENT LOAD
    ===================================================== */

    const COMPONENT_TIMEOUT = 8000;


    async function loadComponent(id, file) {

        const target =
            document.getElementById(id);


        if (!target) {
            return null;
        }


        const controller =
            new AbortController();


        const timeoutId =
            window.setTimeout(
                function () {

                    controller.abort();

                },
                COMPONENT_TIMEOUT
            );


        try {

            const response =
                await fetch(
                    file,
                    {
                        cache: "no-cache",
                        signal: controller.signal
                    }
                );


            if (!response.ok) {

                console.error(
                    `[sub_common] ${id} 로드 실패:`,
                    response.status,
                    file
                );

                return null;

            }


            const html =
                await response.text();


            target.innerHTML =
                html;


            window.GreenZonePaths
                ?.normalize(target);


            return target;


        } catch (error) {

            if (error.name === "AbortError") {

                console.warn(
                    `[sub_common] ${id} 로드 시간 초과:`,
                    file
                );

            } else {

                console.error(
                    `[sub_common] ${id} 로드 오류:`,
                    error
                );

            }


            return null;


        } finally {

            window.clearTimeout(
                timeoutId
            );

        }

    }



    /* =====================================================
       HEADER SEARCH
    ===================================================== */

    function closeHeaderSearch() {

        document
            .querySelector("#header_search")
            ?.classList.remove("is_open");


        document
            .querySelector(".search_open_btn")
            ?.setAttribute(
                "aria-expanded",
                "false"
            );

    }



    /* =====================================================
       PLACEHOLDER LINK
    ===================================================== */

    function preventPlaceholderLink(event) {

        const link =
            event.target.closest(
                'a[href=""], a[href="#"]'
            );


        if (!link) {
            return false;
        }


        event.preventDefault();

        return true;

    }



    /* =====================================================
       GLOBAL CLICK
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {


            preventPlaceholderLink(event);



            /* SEARCH OPEN */

            const searchOpen =
                event.target.closest(
                    ".search_open_btn"
                );


            if (searchOpen) {

                const searchForm =
                    document.querySelector(
                        "#header_search"
                    );


                if (!searchForm) {
                    return;
                }


                const isOpen =
                    searchForm.classList.toggle(
                        "is_open"
                    );


                searchOpen.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                if (isOpen) {

                    searchForm
                        .querySelector(".search_input")
                        ?.focus();

                }


                return;

            }



            /* SEARCH CLOSE */

            const searchClose =
                event.target.closest(
                    ".search_close_btn"
                );


            if (searchClose) {

                closeHeaderSearch();

                return;

            }



            /* SEARCH KEYWORD */

            const keyword =
                event.target.closest(
                    ".keyword_button"
                );


            if (keyword) {

                const input =
                    document.querySelector(
                        "#search_input"
                    );


                if (!input) {
                    return;
                }


                input.value =
                    keyword.textContent.trim();


                input.focus();

            }

        }
    );



    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeHeaderSearch();

            window.closeMobileMenu?.();

        }
    );



    /* =====================================================
       REQUEST CLEANING POSITION
    ===================================================== */

    const requestMobileMedia =
        window.matchMedia(
            "(max-width: 1024px)"
        );


    function moveRequestCleaning() {

        const request =
            document.getElementById(
                "Request_Cleaning"
            );


        if (!request) {
            return;
        }


        const pin =
            document.querySelector(
                ".request_cleaning_pin"
            );


        const video =
            document.querySelector(
                ".service_video"
            );



        /* MOBILE / IPAD */

        if (requestMobileMedia.matches) {

            if (
                pin &&
                pin.nextElementSibling !== request
            ) {

                pin.insertAdjacentElement(
                    "afterend",
                    request
                );

            }


            return;

        }



        /* PC */

        if (
            video &&
            video.nextElementSibling !== request
        ) {

            video.insertAdjacentElement(
                "afterend",
                request
            );

        }

    }



    /* =====================================================
       REQUEST RESPONSIVE CHANGE
    ===================================================== */

    if (
        typeof requestMobileMedia.addEventListener ===
        "function"
    ) {

        requestMobileMedia.addEventListener(
            "change",
            moveRequestCleaning
        );

    } else {

        requestMobileMedia.addListener(
            moveRequestCleaning
        );

    }



    /* =====================================================
       SUB GALLERY SLIDER

       메인페이지 슬라이더 방식 적용
       - 마우스 드래그
       - 모바일 터치
       - window에서 드래그 추적
    ===================================================== */

    function initSubSliders() {

        const sliders =
            document.querySelectorAll(
                ".slide_wrap"
            );


        sliders.forEach(
            function (wrap) {


                if (
                    wrap.dataset.sliderInitialized ===
                    "true"
                ) {

                    return;

                }


                const clippingMask =
                    wrap.querySelector(
                        ".sub_pag_clipping_mask"
                    );


                const track =
                    wrap.querySelector(
                        ".img_con_wrap"
                    );


                if (
                    !clippingMask ||
                    !track
                ) {

                    return;

                }


                const slides =
                    Array.from(
                        track.querySelectorAll(
                            ":scope > .sub_pag_img_wrap"
                        )
                    );


                if (slides.length === 0) {
                    return;
                }


                const prevButton =
                    wrap.querySelector(
                        ".left_arrow_2"
                    );


                const nextButton =
                    wrap.querySelector(
                        ".right_arrow_2"
                    );


                const dots =
                    Array.from(
                        wrap.querySelectorAll(
                            ".slide_pagination .slide_dot"
                        )
                    );


                let currentIndex = 0;

                let isDragging = false;
                let hasDragged = false;

                let dragDirection = null;

                let startX = 0;
                let startY = 0;

                let currentX = 0;
                let currentY = 0;

                let dragDistance = 0;

                let clickResetTimer = null;


                /*
                    메인 슬라이더와 같은 고정 기준.

                    화면 크기와 관계없이 50px 이상 움직이면
                    다음 또는 이전 슬라이드로 넘어감.
                */

                const dragThreshold = 50;


                wrap.dataset.sliderInitialized =
                    "true";


                wrap.style.cursor =
                    "grab";


                clippingMask.style.touchAction =
                    "pan-y";



                /* -----------------------------------------
                   SLIDER POSITION
                ----------------------------------------- */

                function showSlide(
                    index,
                    useAnimation = true
                ) {

                    if (index < 0) {

                        currentIndex =
                            slides.length - 1;

                    } else if (
                        index >= slides.length
                    ) {

                        currentIndex = 0;

                    } else {

                        currentIndex = index;

                    }


                    track.style.transition =
                        useAnimation
                            ? "transform 0.5s ease"
                            : "none";


                    track.style.transform =
                        `translateX(-${currentIndex * 100}%)`;


                    dots.forEach(
                        function (dot, dotIndex) {

                            const active =
                                dotIndex === currentIndex;


                            dot.classList.toggle(
                                "is_active",
                                active
                            );


                            dot.classList.toggle(
                                "is_active_4",
                                active
                            );


                            dot.setAttribute(
                                "aria-current",
                                active
                                    ? "true"
                                    : "false"
                            );

                        }
                    );

                }



                /* -----------------------------------------
                   NEXT
                ----------------------------------------- */

                function nextSlide() {

                    showSlide(
                        currentIndex + 1
                    );

                }



                /* -----------------------------------------
                   PREVIOUS
                ----------------------------------------- */

                function previousSlide() {

                    showSlide(
                        currentIndex - 1
                    );

                }



                /* -----------------------------------------
                   BUTTON
                ----------------------------------------- */

                nextButton?.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        nextSlide();

                    }
                );


                prevButton?.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        previousSlide();

                    }
                );



                /* -----------------------------------------
                   DOT
                ----------------------------------------- */

                dots.forEach(
                    function (dot, index) {

                        dot.addEventListener(
                            "click",
                            function (event) {

                                event.preventDefault();


                                if (
                                    index >=
                                    slides.length
                                ) {

                                    return;

                                }


                                showSlide(index);

                            }
                        );

                    }
                );



                /* -----------------------------------------
                   MOUSE / TOUCH POSITION
                ----------------------------------------- */

                function getPointerX(event) {

                    if (
                        event.touches &&
                        event.touches.length > 0
                    ) {

                        return event
                            .touches[0]
                            .clientX;

                    }


                    if (
                        event.changedTouches &&
                        event.changedTouches.length > 0
                    ) {

                        return event
                            .changedTouches[0]
                            .clientX;

                    }


                    return event.clientX;

                }


                function getPointerY(event) {

                    if (
                        event.touches &&
                        event.touches.length > 0
                    ) {

                        return event
                            .touches[0]
                            .clientY;

                    }


                    if (
                        event.changedTouches &&
                        event.changedTouches.length > 0
                    ) {

                        return event
                            .changedTouches[0]
                            .clientY;

                    }


                    return event.clientY;

                }



                /* -----------------------------------------
                   DRAG START
                ----------------------------------------- */

                function startDrag(event) {


                    /*
                        화살표와 페이지네이션 클릭은
                        드래그로 시작하지 않음
                    */

                    if (
                        event.target.closest(
                            ".arrow, .slide_pagination"
                        )
                    ) {

                        return;

                    }


                    /*
                        마우스 오른쪽 버튼 드래그 방지
                    */

                    if (
                        event.type === "mousedown" &&
                        event.button !== 0
                    ) {

                        return;

                    }


                    isDragging = true;
                    hasDragged = false;

                    dragDirection = null;


                    startX =
                        getPointerX(event);


                    startY =
                        getPointerY(event);


                    currentX = startX;
                    currentY = startY;

                    dragDistance = 0;


                    track.style.transition =
                        "none";


                    wrap.style.cursor =
                        "grabbing";

                }



                /* -----------------------------------------
                   DRAG MOVE

                   메인페이지처럼 실제 드래그한 거리만큼
                   슬라이드가 마우스와 함께 움직임
                ----------------------------------------- */

                function moveDrag(event) {

                    if (!isDragging) {
                        return;
                    }


                    currentX =
                        getPointerX(event);


                    currentY =
                        getPointerY(event);


                    const moveX =
                        currentX - startX;


                    const moveY =
                        currentY - startY;



                    /*
                        처음 움직인 방향으로
                        드래그와 세로 스크롤 구분
                    */

                    if (!dragDirection) {

                        const absoluteX =
                            Math.abs(moveX);


                        const absoluteY =
                            Math.abs(moveY);


                        if (
                            absoluteX < 5 &&
                            absoluteY < 5
                        ) {

                            return;

                        }


                        dragDirection =
                            absoluteX > absoluteY
                                ? "horizontal"
                                : "vertical";

                    }



                    /*
                        세로 이동이면 페이지 스크롤 유지
                    */

                    if (
                        dragDirection !==
                        "horizontal"
                    ) {

                        return;

                    }


                    dragDistance =
                        moveX;


                    if (
                        Math.abs(dragDistance) > 5
                    ) {

                        hasDragged = true;

                    }


                    const sliderWidth =
                        clippingMask.clientWidth;


                    const basePosition =
                        currentIndex *
                        sliderWidth;


                    track.style.transform =
                        `translateX(${-(basePosition) + dragDistance}px)`;


                    if (event.cancelable) {

                        event.preventDefault();

                    }

                }



                /* -----------------------------------------
                   DRAG END
                ----------------------------------------- */

                function endDrag() {

                    if (!isDragging) {
                        return;
                    }


                    isDragging = false;


                    wrap.style.cursor =
                        "grab";


                    if (
                        dragDirection === "horizontal" &&
                        dragDistance <= -dragThreshold
                    ) {

                        nextSlide();

                    } else if (
                        dragDirection === "horizontal" &&
                        dragDistance >= dragThreshold
                    ) {

                        previousSlide();

                    } else {

                        showSlide(currentIndex);

                    }


                    dragDistance = 0;
                    dragDirection = null;


                    /*
                        드래그 직후 발생하는 링크 클릭을 막고
                        잠시 뒤 상태를 초기화
                    */

                    if (hasDragged) {

                        window.clearTimeout(
                            clickResetTimer
                        );


                        clickResetTimer =
                            window.setTimeout(
                                function () {

                                    hasDragged = false;

                                },
                                300
                            );

                    }

                }



                /* -----------------------------------------
                   MOUSE DRAG

                   시작은 slide_wrap 전체
                   이동과 종료는 window 전체
                ----------------------------------------- */

                wrap.addEventListener(
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



                /* -----------------------------------------
                   MOBILE TOUCH

                   slide_wrap 전체에서 스와이프 가능
                ----------------------------------------- */

                wrap.addEventListener(
                    "touchstart",
                    startDrag,
                    {
                        passive: true
                    }
                );


                wrap.addEventListener(
                    "touchmove",
                    moveDrag,
                    {
                        passive: false
                    }
                );


                wrap.addEventListener(
                    "touchend",
                    endDrag,
                    {
                        passive: true
                    }
                );


                wrap.addEventListener(
                    "touchcancel",
                    endDrag,
                    {
                        passive: true
                    }
                );



                /* -----------------------------------------
                   IMAGE DEFAULT DRAG PREVENTION
                ----------------------------------------- */

                wrap.addEventListener(
                    "dragstart",
                    function (event) {

                        event.preventDefault();

                    }
                );



                /* -----------------------------------------
                   CLICK AFTER DRAG PREVENTION
                ----------------------------------------- */

                wrap.addEventListener(
                    "click",
                    function (event) {

                        if (!hasDragged) {
                            return;
                        }


                        event.preventDefault();

                        event.stopPropagation();


                        hasDragged = false;


                        window.clearTimeout(
                            clickResetTimer
                        );

                    },
                    true
                );



                /* -----------------------------------------
                   RESIZE
                ----------------------------------------- */

                window.addEventListener(
                    "resize",
                    function () {

                        showSlide(
                            currentIndex,
                            false
                        );

                    }
                );



                /* -----------------------------------------
                   FIRST RENDER
                ----------------------------------------- */

                showSlide(
                    0,
                    false
                );

            }
        );

    }



    /* =====================================================
       SITE PATH
    ===================================================== */

    function sitePath(path) {

        return (
            window.GreenZonePaths
                ?.resolve(path) ||
            path
        );

    }



    /* =====================================================
       COMPONENT INITIALIZATION
    ===================================================== */

    function loadSubComponents() {

        const componentJobs = [

            loadComponent(
                "header",
                sitePath(
                    "components/header_v2.html"
                )
            ),

            loadComponent(
                "menu",
                sitePath(
                    "components/menu.html"
                )
            ),

            loadComponent(
                "Factry_sub_menu",
                sitePath(
                    "components/sub_pag/Factry_sub_menu.html"
                )
            ),

            loadComponent(
                "Request_Cleaning",
                sitePath(
                    "components/Request_Cleaning.html"
                )
            ),

            loadComponent(
                "footer",
                sitePath(
                    "components/footer.html"
                )
            )

        ];


        Promise
            .allSettled(componentJobs)
            .then(
                function () {

                    moveRequestCleaning();

                }
            );

    }



    /* =====================================================
       INIT
    ===================================================== */

    function initializeSubPage() {

        moveRequestCleaning();

        initSubSliders();

        loadSubComponents();

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSubPage,
            {
                once: true
            }
        );

    } else {

        initializeSubPage();

    }

})();