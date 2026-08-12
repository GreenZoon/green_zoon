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


        target.innerHTML =
            await response.text();



        /* HEADER */

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


        /* SEARCH OPEN */

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



        /* SEARCH CLOSE */

        const searchCloseButton =
            event.target.closest(
                ".search_close_btn"
            );


        if (searchCloseButton) {

            closeHeaderSearch();

            return;

        }



        /* SEARCH KEYWORD */

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



        /* MOBILE MENU OPEN */

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



        /* MOBILE MENU CLOSE */

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
   5. ESC
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
   6. REQUEST CLEANING
========================================================= */

const requestMobileMedia =
    window.matchMedia(
        "(max-width: 768px)"
    );



function moveRequestCleaning() {

    const requestCleaning =
        document.getElementById(
            "Request_Cleaning"
        );


    const requestPin =
        document.querySelector(
            ".request_cleaning_pin"
        );


    const videoSection =
        document.querySelector(
            ".service_video"
        );


    if (
        !requestCleaning ||
        !videoSection
    ) {

        return;

    }



    /* MOBILE */

    if (
        requestMobileMedia.matches &&
        requestPin
    ) {

        if (
            requestPin.nextElementSibling ===
            requestCleaning
        ) {

            return;

        }


        requestPin.insertAdjacentElement(
            "afterend",
            requestCleaning
        );


        return;

    }



    /* PC / TABLET */

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
   BREAKPOINT CHANGE

   견적문의 위치만 변경
========================================================= */

if (
    typeof requestMobileMedia.addEventListener ===
    "function"
) {

    requestMobileMedia.addEventListener(
        "change",
        moveRequestCleaning
    );

}

else if (
    typeof requestMobileMedia.addListener ===
    "function"
) {

    requestMobileMedia.addListener(
        moveRequestCleaning
    );

}



/* =========================================================
   7. SUB PAGE SLIDER
========================================================= */

const subSliderShrinkRefreshers = [];



function initSubSliders() {

    const slideWraps =
        document.querySelectorAll(
            ".slide_wrap"
        );


    slideWraps.forEach(
        function (wrap) {


            /* 중복 초기화 방지 */

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


            const clippingMask =
                wrap.querySelector(
                    ".sub_pag_clipping_mask"
                );


            const slideTrack =
                wrap.querySelector(
                    ".img_con_wrap"
                );


            if (
                !slider ||
                !clippingMask ||
                !slideTrack
            ) {

                return;

            }



            const slides =
                Array.from(
                    slideTrack.querySelectorAll(
                        ":scope > .sub_pag_img_wrap"
                    )
                );


            const slideCount =
                slides.length;


            if (slideCount === 0) {
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


            const dots =
                Array.from(
                    wrap.querySelectorAll(
                        ".slide_pagination .slide_dot"
                    )
                );



            wrap.dataset.sliderInitialized =
                "true";



            /* =================================================
               STATE
            ================================================= */

            let currentIndex = 0;

            let isDragging = false;

            let hasDragged = false;

            let startX = 0;



            /* =================================================
               DOT
            ================================================= */

            function updateDots() {

                dots.forEach(
                    function (
                        dot,
                        index
                    ) {

                        const active =
                            index ===
                            currentIndex;


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
               POSITION
            ================================================= */

            function updateSlide(
                animate = true
            ) {

                slideTrack.style.transition =
                    animate
                        ? "transform 0.4s ease"
                        : "none";


                slideTrack.style.transform =
                    `translate3d(-${currentIndex * 100}%, 0, 0)`;


                updateDots();

            }



            /* =================================================
               GO TO
            ================================================= */

            function goToSlide(index) {

                if (index < 0) {

                    currentIndex =
                        slideCount - 1;

                }

                else if (
                    index >= slideCount
                ) {

                    currentIndex = 0;

                }

                else {

                    currentIndex = index;

                }


                updateSlide(true);

            }



            /* =================================================
               BUTTON
            ================================================= */

            prevButton?.addEventListener(
                "click",
                function () {

                    goToSlide(
                        currentIndex - 1
                    );

                }
            );


            nextButton?.addEventListener(
                "click",
                function () {

                    goToSlide(
                        currentIndex + 1
                    );

                }
            );



            /* =================================================
               DOT
            ================================================= */

            dots.forEach(
                function (
                    dot,
                    index
                ) {

                    dot.addEventListener(
                        "click",
                        function () {

                            goToSlide(index);

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

                isDragging = true;

                hasDragged = false;


                startX =
                    getPointerX(event);

            }



            /* =================================================
               DRAG MOVE

               실제 transform 계산 안 함.
               이동 거리만 체크.
            ================================================= */

            function moveDrag(event) {

                if (!isDragging) {
                    return;
                }


                const currentX =
                    getPointerX(event);


                if (
                    Math.abs(
                        currentX -
                        startX
                    ) > 5
                ) {

                    hasDragged = true;

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


                const endX =
                    getPointerX(event);


                const dragDistance =
                    endX -
                    startX;


                const threshold =
                    Math.max(
                        40,
                        clippingMask.clientWidth *
                        0.12
                    );



                /* 왼쪽 */

                if (
                    dragDistance <
                    -threshold
                ) {

                    goToSlide(
                        currentIndex + 1
                    );

                }



                /* 오른쪽 */

                else if (
                    dragDistance >
                    threshold
                ) {

                    goToSlide(
                        currentIndex - 1
                    );

                }


                window.setTimeout(
                    function () {

                        hasDragged = false;

                    },
                    80
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
                    passive: true
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
                function () {

                    isDragging = false;

                },
                {
                    passive: true
                }
            );



            /* =================================================
               IMAGE DEFAULT DRAG BLOCK
            ================================================= */

            slideTrack.addEventListener(
                "dragstart",
                function (event) {

                    event.preventDefault();

                }
            );



            /* =================================================
               DRAG 뒤 LINK 방지
            ================================================= */

            slideTrack.addEventListener(
                "click",
                function (event) {

                    if (!hasDragged) {
                        return;
                    }


                    const link =
                        event.target.closest("a");


                    if (link) {

                        event.preventDefault();

                    }

                }
            );



            /* =================================================
               WIDTH SHRINK REFRESH

               화면이 작아졌을 때만 호출됨.
            ================================================= */

            function refreshAfterShrink() {

                slideTrack.style.transition =
                    "none";


                slideTrack.style.transform =
                    `translate3d(-${currentIndex * 100}%, 0, 0)`;


                updateDots();



                requestAnimationFrame(
                    function () {

                        slideTrack.style.transition =
                            "transform 0.4s ease";

                    }
                );

            }


            subSliderShrinkRefreshers.push(
                refreshAfterShrink
            );



            /* 최초 위치 */

            updateSlide(false);

        }
    );

}



/* =========================================================
   8. WIDTH SHRINK ONLY
========================================================= */

let previousWindowWidth =
    window.innerWidth;


let shrinkTimer = null;



window.addEventListener(
    "resize",
    function () {


        const currentWindowWidth =
            window.innerWidth;


        /*
            넓어졌거나 동일하면
            아무 계산도 하지 않음.
        */

        if (
            currentWindowWidth >=
            previousWindowWidth
        ) {

            previousWindowWidth =
                currentWindowWidth;


            window.clearTimeout(
                shrinkTimer
            );


            return;

        }



        /*
            여기까지 왔다는 건
            실제 width가 줄어든 경우.
        */

        previousWindowWidth =
            currentWindowWidth;


        window.clearTimeout(
            shrinkTimer
        );


        shrinkTimer =
            window.setTimeout(
                function () {


                    subSliderShrinkRefreshers.forEach(
                        function (refresh) {

                            refresh();

                        }
                    );


                },
                180
            );

    }
);



/* =========================================================
   9. INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {


        initSubSliders();



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


        moveRequestCleaning();

    }
);