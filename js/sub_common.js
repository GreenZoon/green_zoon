/* =========================================================
   SUB PAGE COMMON
========================================================= */


/* =========================================================
   COMPONENT LOAD
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



        /* HEADER LOGO PATH */

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
   HEADER SEARCH
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
   MOBILE MENU
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
   GLOBAL CLICK
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
   REQUEST CLEANING
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
   SUB SLIDER
========================================================= */

const subSliderRefreshers = [];



function initSubSliders() {

    const slideWraps =
        document.querySelectorAll(
            ".slide_wrap"
        );


    slideWraps.forEach(
        function (wrap) {


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



            function startDrag(event) {

                isDragging = true;

                hasDragged = false;

                startX =
                    getPointerX(event);

            }



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



            function endDrag(event) {

                if (!isDragging) {
                    return;
                }


                isDragging = false;


                const endX =
                    getPointerX(event);


                const distance =
                    endX -
                    startX;


                const threshold =
                    Math.max(
                        40,
                        clippingMask.clientWidth *
                        0.12
                    );


                if (
                    distance <
                    -threshold
                ) {

                    goToSlide(
                        currentIndex + 1
                    );

                }

                else if (
                    distance >
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



            /* IMAGE DEFAULT DRAG */

            slideTrack.addEventListener(
                "dragstart",
                function (event) {

                    event.preventDefault();

                }
            );



            /* DRAG 후 LINK 방지 */

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
               RESIZE / ZOOM 이후 위치 재정렬
            ================================================= */

            function refreshSliderPosition() {

                slideTrack.style.transition =
                    "none";


                slideTrack.style.transform =
                    `translate3d(-${currentIndex * 100}%, 0, 0)`;


                updateDots();



                /*
                    브라우저가 새 viewport 계산을
                    완료한 뒤 transition 복구
                */

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            function () {

                                slideTrack.style.transition =
                                    "transform 0.4s ease";

                            }
                        );

                    }
                );

            }


            subSliderRefreshers.push(
                refreshSliderPosition
            );


            updateSlide(false);

        }
    );

}



/* =========================================================
   RESPONSIVE REFRESH
========================================================= */

let responsiveTimer = null;



function refreshResponsiveLayout() {

    moveRequestCleaning();


    subSliderRefreshers.forEach(
        function (refresh) {

            refresh();

        }
    );

}



function scheduleResponsiveRefresh() {

    window.clearTimeout(
        responsiveTimer
    );


    responsiveTimer =
        window.setTimeout(
            function () {

                refreshResponsiveLayout();

            },
            180
        );

}



/*
    브라우저 창 크기 변경
*/

window.addEventListener(
    "resize",
    scheduleResponsiveRefresh
);



/*
    확대 / 축소 대응

    지원하는 브라우저에서는
    visualViewport 변화도 같이 감지
*/

if (window.visualViewport) {

    window.visualViewport.addEventListener(
        "resize",
        scheduleResponsiveRefresh
    );

}



/*
    breakpoint 자체가 변경될 때도
    동일한 debounce 처리
*/

if (
    typeof requestMobileMedia.addEventListener ===
    "function"
) {

    requestMobileMedia.addEventListener(
        "change",
        scheduleResponsiveRefresh
    );

}

else if (
    typeof requestMobileMedia.addListener ===
    "function"
) {

    requestMobileMedia.addListener(
        scheduleResponsiveRefresh
    );

}



/* =========================================================
   INIT
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