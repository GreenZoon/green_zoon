async function loadComponent(id, file) {

    const target = document.getElementById(id);

    if (!target) {
        console.error(`#${id} 요소를 찾지 못했습니다.`);
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
            throw new Error(`${file} 로드 실패`);
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

                const logoLink = logo.closest("a");

                if (logoLink) {
                    logoLink.href = "../../index.html";
                }

            }

        }


        /* -----------------------------
           컴포넌트 로드 후 처리
        ----------------------------- */

        if (id === "header") {

            initMobileMenu();
            initHeaderSearch();

        }


        if (id === "Request_Cleaning") {

            moveRequestCleaning();

        }


    } catch (error) {

        console.error(error);

    }

}



/* =========================================================
   HEADER SEARCH
========================================================= */

function initHeaderSearch() {

    if (document.body.dataset.searchInitialized === "true") {
        return;
    }


    document.body.dataset.searchInitialized = "true";


    document.addEventListener("click", (event) => {

        const openButton =
            event.target.closest(".search_open_btn");

        const closeButton =
            event.target.closest(".search_close_btn");

        const keywordButton =
            event.target.closest(".keyword_button");


        /* 검색창 열기 */

        if (openButton) {

            const searchForm =
                document.querySelector("#header_search");


            if (!searchForm) {
                return;
            }


            const isOpen =
                searchForm.classList.toggle("is_open");


            openButton.setAttribute(
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


        /* 검색창 닫기 */

        if (closeButton) {

            closeHeaderSearch();

            return;
        }


        /* 추천 검색어 */

        if (!keywordButton) {
            return;
        }


        const searchInput =
            document.querySelector("#search_input");


        if (!searchInput) {
            return;
        }


        searchInput.value =
            keywordButton.textContent.trim();


        searchInput.focus();

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeHeaderSearch();
                closeMobileMenu();

            }

        }
    );

}


function closeHeaderSearch() {

    const searchForm =
        document.querySelector("#header_search");


    const openButton =
        document.querySelector(".search_open_btn");


    searchForm?.classList.remove("is_open");


    openButton?.setAttribute(
        "aria-expanded",
        "false"
    );

}



/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const openButton =
        document.querySelector(".mobile_menu_open_btn");


    const mobileMenu =
        document.querySelector("#mobile_menu");


    if (!openButton || !mobileMenu) {
        return;
    }


    if (openButton.dataset.menuInitialized === "true") {
        return;
    }


    openButton.dataset.menuInitialized = "true";


    openButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("is_open");


            openButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "menu_open",
                isOpen
            );

        }
    );


    /* 메뉴 안의 닫기 버튼 */

    mobileMenu.addEventListener(
        "click",
        (event) => {

            const closeButton =
                event.target.closest(
                    ".mobile_menu_close_btn"
                );


            if (closeButton) {

                closeMobileMenu();

            }

        }
    );

}


function closeMobileMenu() {

    const mobileMenu =
        document.querySelector("#mobile_menu");


    const openButton =
        document.querySelector(
            ".mobile_menu_open_btn"
        );


    mobileMenu?.classList.remove("is_open");


    openButton?.setAttribute(
        "aria-expanded",
        "false"
    );


    document.body.classList.remove(
        "menu_open"
    );

}



/* =========================================================
   REQUEST CLEANING 위치 이동
========================================================= */

function moveRequestCleaning() {

    const requestCleaning =
        document.getElementById(
            "Request_Cleaning"
        );


    if (!requestCleaning) {
        return;
    }


    /* 공장청소 대상 섹션 */

    const targetSection =
        document.querySelector(".section_g");


    /* 영상 섹션 */

    const videoSection =
        document.querySelector(".section_g_2");


    if (!targetSection || !videoSection) {
        return;
    }


    /*
        모바일

        공장 청소 대상
        ↓
        견적 문의
        ↓
        영상
    */

    if (window.innerWidth <= 768) {

        if (
            targetSection.nextElementSibling
            !== requestCleaning
        ) {

            targetSection.insertAdjacentElement(
                "afterend",
                requestCleaning
            );

        }


        return;
    }


    /*
        PC / TABLET

        공장 청소 대상
        ↓
        영상
        ↓
        견적 문의
    */

    if (
        videoSection.nextElementSibling
        !== requestCleaning
    ) {

        videoSection.insertAdjacentElement(
            "afterend",
            requestCleaning
        );

    }

}



/* =========================================================
   RESIZE
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer =
            setTimeout(
                () => {

                    moveRequestCleaning();

                },
                100
            );

    }
);



/* =========================================================
   COMPONENT LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadComponent(
            "header",
            "../../components/header_v2.html"
        );


        await loadComponent(
            "menu",
            "../../components/menu.html"
        );


        await loadComponent(
            "Factry_sub_menu",
            "../../components/sub_pag/Factry_sub_menu.html"
        );


        await loadComponent(
            "Request_Cleaning",
            "../../components/Request_Cleaning.html"
        );


        await loadComponent(
            "footer",
            "../../components/footer.html"
        );


        /*
            Request_Cleaning 컴포넌트가
            실제로 삽입된 뒤 다시 위치 계산
        */

        moveRequestCleaning();

    }
);


window.addEventListener("load", moveRequestCleaning);
window.addEventListener("resize", moveRequestCleaning);

loadComponent("header", "../../components/header_v2.html");
loadComponent("menu", "../../components/menu.html");
loadComponent("Factry_sub_menu", "../../components/sub_pag/Factry_sub_menu.html");
loadComponent("footer", "../../components/footer.html");
loadComponent("Request_Cleaning", "../../components/Request_Cleaning.html");

