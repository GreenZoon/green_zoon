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


        const html =
            await response.text();


        target.innerHTML =
            html;



        /* =================================================
           HEADER 경로 보정
        ================================================= */

        if (id === "header") {

            const logo =
                target.querySelector(
                    ".logo"
                );


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



document.addEventListener(
    "click",
    function (event) {


        const openButton =
            event.target.closest(
                ".search_open_btn"
            );


        const closeButton =
            event.target.closest(
                ".search_close_btn"
            );


        const keywordButton =
            event.target.closest(
                ".keyword_button"
            );



        /* =================================================
           검색 열기
        ================================================= */

        if (openButton) {


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


            openButton.setAttribute(
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
           검색 닫기
        ================================================= */

        if (closeButton) {

            closeHeaderSearch();

            return;

        }



        /* =================================================
           추천 검색어
        ================================================= */

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



document.addEventListener(
    "click",
    function (event) {


        const menuButton =
            event.target.closest(
                ".mobile_menu_open_btn"
            );


        if (menuButton) {


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


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "menu_open",
                isOpen
            );


            return;

        }



        const closeButton =
            event.target.closest(
                ".mobile_menu_close_btn"
            );


        if (closeButton) {

            closeMobileMenu();

        }

    }
);



/* =========================================================
   REQUEST CLEANING POSITION
========================================================= */


/*
    PC / TABLET

    공장 청소 대상
    ↓
    영상
    ↓
    견적문의


    MOBILE

    공장 청소 대상
    ↓
    견적문의
    ↓
    영상
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
            targetSection
                .nextElementSibling ===
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
        videoSection
            .nextElementSibling ===
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
========================================================= */

function handleRequestBreakpoint() {

    moveRequestCleaning();

}



if (
    typeof requestMobileMedia
        .addEventListener ===
    "function"
) {

    requestMobileMedia.addEventListener(
        "change",
        handleRequestBreakpoint
    );

}

else {

    requestMobileMedia.addListener(
        handleRequestBreakpoint
    );

}



/* =========================================================
   PAGE INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {


        /*
            컴포넌트가 서로 독립적이기 때문에
            동시에 불러옴
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
            견적문의 HTML이 로드된 다음
            모바일 / PC 위치 결정
        */

        moveRequestCleaning();

    }
);