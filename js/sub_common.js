/* =========================================================
   SUB PAGE COMMON
========================================================= */


/* =========================================================
   1. COMPONENT LOAD
========================================================= */

async function loadComponent(id, file) {

    const target =
        document.getElementById(id);


    if (!target) {
        return null;
    }


    try {

        const response =
            await fetch(
                `${file}?v=${Date.now()}`,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `${file} 로드 실패: ${response.status}`
            );

        }


        const html =
            await response.text();


        target.innerHTML =
            html;



        /* =================================================
           HEADER 경로 보정
        ================================================= */

        if (id === "header") {

            const logo =
                target.querySelector(".logo");


            if (logo) {

                logo.src =
                    "../../img/logo.svg";


                const logoLink =
                    logo.closest("a");


                if (logoLink) {

                    logoLink.href =
                        "../../index.html";

                }

            }

        }


        return target;


    } catch (error) {

        console.error(
            `[sub_common] ${id} 로딩 오류`,
            error
        );


        return null;

    }

}



/* =========================================================
   2. HEADER SEARCH
========================================================= */

function closeHeaderSearch() {

    const searchForm =
        document.querySelector(
            "#header_search"
        );


    const openButton =
        document.querySelector(
            ".search_open_btn"
        );


    searchForm?.classList.remove(
        "is_open"
    );


    openButton?.setAttribute(
        "aria-expanded",
        "false"
    );

}



/* =========================================================
   3. MOBILE MENU
========================================================= */

function closeMobileMenu() {

    const mobileMenu =
        document.querySelector(
            "#mobile_menu"
        );


    const menuButton =
        document.querySelector(
            ".mobile_menu_open_btn"
        );


    mobileMenu?.classList.remove(
        "is_open"
    );


    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );


    document.body.classList.remove(
        "menu_open"
    );

}



/* =========================================================
   4. GLOBAL CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {


        /* =================================================
           SEARCH OPEN
        ================================================= */

        const searchOpenButton =
            event.target.closest(
                ".search_open_btn"
            );


        if (searchOpenButton) {

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


            searchOpenButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            if (isOpen) {

                searchForm
                    .querySelector(
                        ".search_input"
                    )
                    ?.focus();

            }


            return;

        }



        /* =================================================
           SEARCH CLOSE
        ================================================= */

        const searchCloseButton =
            event.target.closest(
                ".search_close_btn"
            );


        if (searchCloseButton) {

            closeHeaderSearch();

            return;

        }



        /* =================================================
           SEARCH KEYWORD
        ================================================= */

        const keywordButton =
            event.target.closest(
                ".keyword_button"
            );


        if (keywordButton) {

            const searchInput =
                document.querySelector(
                    "#search_input"
                );


            if (!searchInput) {
                return;
            }


            searchInput.value =
                keywordButton
                    .textContent
                    .trim();


            searchInput.focus();


            return;

        }



        /* =================================================
           MOBILE MENU OPEN
        ================================================= */

        const mobileMenuButton =
            event.target.closest(
                ".mobile_menu_open_btn"
            );


        if (mobileMenuButton) {

            const mobileMenu =
                document.querySelector(
                    "#mobile_menu"
                );


            if (!mobileMenu) {
                return;
            }


            const isOpen =
                mobileMenu.classList.toggle(
                    "is_open"
                );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "menu_open",
                isOpen
            );


            return;

        }



        /* =================================================
           MOBILE MENU CLOSE
        ================================================= */

        const mobileMenuCloseButton =
            event.target.closest(
                ".mobile_menu_close_btn"
            );


        if (mobileMenuCloseButton) {

            closeMobileMenu();

        }

    }
);



/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        closeHeaderSearch();

        closeMobileMenu();

    }
);



/* =========================================================
   5. REQUEST CLEANING POSITION
========================================================= */


/*
    PC / TABLET

    section_g
    ↓
    section_g_2
    ↓
    Request_Cleaning


    MOBILE

    section_g
    ↓
    Request_Cleaning
    ↓
    section_g_2
*/


const requestMobileMedia =
    window.matchMedia(
        "(max-width: 768px)"
    );



function moveRequestCleaning() {

    const requestCleaning =
        document.getElementById(
            "Request_Cleaning"
        );


    const targetSection =
        document.querySelector(
            ".section_g"
        );


    const videoSection =
        document.querySelector(
            ".section_g_2"
        );


    if (
        !requestCleaning ||
        !targetSection ||
        !videoSection
    ) {

        return;

    }



    /* =====================================================
       MOBILE
    ===================================================== */

    if (requestMobileMedia.matches) {

        if (
            targetSection.nextElementSibling ===
            requestCleaning
        ) {

            return;

        }


        targetSection.insertAdjacentElement(
            "afterend",
            requestCleaning
        );


        return;

    }



    /* =====================================================
       PC / TABLET
    ===================================================== */

    if (
        videoSection.nextElementSibling ===
        requestCleaning
    ) {

        return;

    }


    videoSection.insertAdjacentElement(
        "afterend",
        requestCleaning
    );

}



/* =========================================================
   REQUEST BREAKPOINT
========================================================= */

function handleRequestBreakpoint() {

    moveRequestCleaning();

}



if (
    typeof requestMobileMedia.addEventListener ===
    "function"
) {

    requestMobileMedia.addEventListener(
        "change",
        handleRequestBreakpoint
    );

}

else if (
    typeof requestMobileMedia.addListener ===
    "function"
) {

    requestMobileMedia.addListener(
        handleRequestBreakpoint
    );

}



/* =========================================================
   6. SUB PAGE SLIDER
========================================================= */

function initSubSliders() {

    const slideWraps =
        document.querySelectorAll(
            ".slide_wrap"
        );


    slideWraps.forEach(
        function (wrap) {


            /*
                같은 slider를 두 번 초기화하지 않음
            */

            if (
                wrap.dataset.sliderInitialized ===
                "true"
            ) {

                return;

            }


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


            const originalSlides =
                Array.from(
                    slideTrack.querySelectorAll(
                        ":scope > .sub_pag_img_wrap"
                    )
                );


            const slideCount =
                originalSlides.length;


            if (slideCount === 0) {
                return;
            }


            wrap.dataset.sliderInitialized =
                "true";



            const prevButton =
                slider.querySelector(
                    ".left_arrow_2"
                );


            const nextButton =
                slider.querySelector(
                    ".right_arrow_2"
                );


            const dots =
                Array.from(
                    wrap.querySelectorAll(
                        ".slide_pagination .slide_dot"
                    )
                );



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



            /* =================================================
               STATE
            ================================================= */

            let currentIndex = 1;

            let isMoving = false;

            let isDragging = false;

            let hasDragged = false;

            let startX = 0;

            let currentX = 0;



            /* =================================================
               POSITION
            ================================================= */


            /*
                핵심:

                JS에서 width 계산 안 함.
                slide 하나 = CSS에서 100%.

                따라서 위치도

                0%
                -100%
                -200%

                방식으로 이동.
            */

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


                slideTrack.style.transform =
                    `translate3d(-${currentIndex * 100}%, 0, 0)`;


                updateDots();

            }



            /* =================================================
               DOT
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


                        dot.classList.toggle(
                            "is_active",
                            active
                        );


                        /*
                            기존 CSS 호환
                        */

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



                    /* 마지막 clone */

                    if (
                        currentIndex ===
                        slideCount + 1
                    ) {

                        currentIndex = 1;


                        setPosition(
                            currentIndex,
                            false
                        );


                        return;

                    }



                    /* 첫 clone */

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
                            currentIndex + 1
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
                            currentIndex - 1
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
                                index + 1
                            );

                        }
                    );

                }
            );



            /* =================================================
               POINTER X
            ================================================= */

            function getPointerX(event) {

                if (
                    event.touches &&
                    event.touches.length > 0
                ) {

                    return (
                        event
                            .touches[0]
                            .clientX
                    );

                }


                if (
                    event.changedTouches &&
                    event.changedTouches.length > 0
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

                if (isMoving) {
                    return;
                }


                isDragging = true;

                hasDragged = false;


                startX =
                    getPointerX(event);


                currentX =
                    startX;


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

                    hasDragged = true;

                }



                /*
                    drag 중일 때만
                    현재 mask 폭 사용.

                    리사이즈 때 계산하는 게 아님.
                */

                const slideWidth =
                    clippingMask.clientWidth;


                const basePosition =
                    currentIndex *
                    slideWidth;


                const nextPosition =
                    basePosition -
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


                const slideWidth =
                    clippingMask.clientWidth;


                const threshold =
                    slideWidth *
                    0.15;



                /* 오른쪽으로 넘김 */

                if (
                    dragDistance >
                    threshold
                ) {

                    setPosition(
                        currentIndex - 1
                    );

                }



                /* 왼쪽으로 넘김 */

                else if (
                    dragDistance <
                    -threshold
                ) {

                    setPosition(
                        currentIndex + 1
                    );

                }



                /* 원래 위치 */

                else {

                    setPosition(
                        currentIndex
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
               DRAG 후 LINK CLICK 방지
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
               FIRST POSITION
            ================================================= */

            setPosition(
                currentIndex,
                false
            );

        }
    );

}



/* =========================================================
   7. INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {


        /*
            갤러리는 페이지 HTML 안에 있으므로
            컴포넌트 fetch를 기다릴 필요 없음.
        */

        initSubSliders();



        /*
            공통 컴포넌트 동시 로딩
        */

        await Promise.all([


            loadComponent(
                "header",
                "../../components/header_v2.html"
            ),


            loadComponent(
                "menu",
                "../../components/menu.html"
            ),


            loadComponent(
                "Factry_sub_menu",
                "../../components/sub_pag/Factry_sub_menu.html"
            ),


            loadComponent(
                "Request_Cleaning",
                "../../components/Request_Cleaning.html"
            ),


            loadComponent(
                "footer",
                "../../components/footer.html"
            )


        ]);



        /*
            견적문의가 실제로 로드된 이후
            위치 결정
        */

        moveRequestCleaning();

    }
);