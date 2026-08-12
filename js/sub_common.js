/* =========================================================
   SUB PAGE COMMON
========================================================= */


/* =========================================================
   COMPONENT LOAD
========================================================= */

async function loadComponent(id, file) {

    const target = document.getElementById(id);

    if (!target) {
        return;
    }


    try {

        const response = await fetch(
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


        const html = await response.text();

        target.innerHTML = html;


        /* -----------------------------
           HEADER 경로 보정
        ----------------------------- */

        if (id === "header") {

            const logo = target.querySelector(".logo");

            if (logo) {

                logo.src = "../../img/logo.svg";


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

        console.error(error);

        return null;

    }

}



/* =========================================================
   HEADER SEARCH
========================================================= */

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


        /* -----------------------------
           검색창 열기
        ----------------------------- */

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


        /* -----------------------------
           검색창 닫기
        ----------------------------- */

        if (closeButton) {

            closeHeaderSearch();

            return;

        }


        /* -----------------------------
           추천 검색어
        ----------------------------- */

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

        }

    }
);



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
   REQUEST CLEANING
   PC / MOBILE 위치 이동
========================================================= */


/*
    모바일 기준

    section_g
    ↓
    Request_Cleaning
    ↓
    section_g_2


    PC / TABLET 기준

    section_g
    ↓
    section_g_2
    ↓
    Request_Cleaning
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


        /*
            이미 원하는 위치에 있으면
            DOM을 다시 움직이지 않음
        */

        if (
            targetSection
                .nextElementSibling
            === requestCleaning
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


    /*
        이미 영상 아래에 있으면
        DOM을 다시 움직이지 않음
    */

    if (
        videoSection
            .nextElementSibling
        === requestCleaning
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


/*
    기존처럼 resize마다 실행하지 않음.

    768px 경계를

    PC → MOBILE
    MOBILE → PC

    로 넘어가는 순간에만 실행.
*/


function handleRequestBreakpoint() {

    moveRequestCleaning();

}



if (
    typeof requestMobileMedia
        .addEventListener
    === "function"
) {

    requestMobileMedia.addEventListener(
        "change",
        handleRequestBreakpoint
    );

}


/*
    구형 브라우저 대응
*/

else if (
    typeof requestMobileMedia
        .addListener
    === "function"
) {

    requestMobileMedia.addListener(
        handleRequestBreakpoint
    );

}



/* =========================================================
   COMPONENT INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {


        /*
            서로 독립적인 컴포넌트이므로
            한 번에 로드
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
            Request_Cleaning이 실제 DOM에
            들어온 이후 딱 한 번 초기 위치 계산
        */

        moveRequestCleaning();

    }
);