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
            `[sub_common] ${id}`,
            error
        );


        return null;

    }

}



/* =========================================================
   HEADER SEARCH
========================================================= */

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



/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    document
        .querySelector("#mobile_menu")
        ?.classList.remove("is_open");


    document
        .querySelector(".mobile_menu_open_btn")
        ?.setAttribute(
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

        if (
            event.target.closest(
                ".search_close_btn"
            )
        ) {

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

            return;

        }



        /* MOBILE MENU */

        const menuOpen =
            event.target.closest(
                ".mobile_menu_open_btn"
            );


        if (menuOpen) {

            const menu =
                document.querySelector(
                    "#mobile_menu"
                );


            if (!menu) {
                return;
            }


            const isOpen =
                menu.classList.toggle(
                    "is_open"
                );


            menuOpen.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "menu_open",
                isOpen
            );


            return;

        }



        if (
            event.target.closest(
                ".mobile_menu_close_btn"
            )
        ) {

            closeMobileMenu();

        }

    }
);



document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeHeaderSearch();

            closeMobileMenu();

        }

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

    const request =
        document.getElementById(
            "Request_Cleaning"
        );


    const pin =
        document.querySelector(
            ".request_cleaning_pin"
        );


    const video =
        document.querySelector(
            ".service_video"
        );


    if (
        !request ||
        !video
    ) {

        return;

    }



    /* MOBILE */

    if (
        requestMobileMedia.matches &&
        pin
    ) {

        if (
            pin.nextElementSibling !==
            request
        ) {

            pin.insertAdjacentElement(
                "afterend",
                request
            );

        }


        return;

    }



    /* PC / TABLET */

    if (
        video.nextElementSibling !==
        request
    ) {

        video.insertAdjacentElement(
            "afterend",
            request
        );

    }

}



if (
    typeof requestMobileMedia.addEventListener ===
    "function"
) {

    requestMobileMedia.addEventListener(
        "change",
        moveRequestCleaning
    );

}

else {

    requestMobileMedia.addListener(
        moveRequestCleaning
    );

}



/* =========================================================
   SUB GALLERY SLIDER

   버튼 / 도트 클릭만 사용.
   크기 계산 없음.
========================================================= */

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


            const track =
                wrap.querySelector(
                    ".img_con_wrap"
                );


            if (!track) {
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


            const prev =
                wrap.querySelector(
                    ".left_arrow_2"
                );


            const next =
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


            wrap.dataset.sliderInitialized =
                "true";



            /* POSITION */

            function render() {

                track.style.transform =
                    `translateX(-${currentIndex * 100}%)`;


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



            /* NEXT */

            next?.addEventListener(
                "click",
                function () {

                    currentIndex++;


                    if (
                        currentIndex >=
                        slides.length
                    ) {

                        currentIndex = 0;

                    }


                    render();

                }
            );



            /* PREV */

            prev?.addEventListener(
                "click",
                function () {

                    currentIndex--;


                    if (
                        currentIndex < 0
                    ) {

                        currentIndex =
                            slides.length - 1;

                    }


                    render();

                }
            );



            /* DOT */

            dots.forEach(
                function (
                    dot,
                    index
                ) {

                    dot.addEventListener(
                        "click",
                        function () {

                            currentIndex =
                                index;


                            render();

                        }
                    );

                }
            );



            render();

        }
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