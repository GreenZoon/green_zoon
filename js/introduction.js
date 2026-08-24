(function () {

    "use strict";

    async function loadIntroductionMenu() {

        const target = document.getElementById("Introduction_sub_menu");

        if (!target) {
            return;
        }

        const resolvePath = window.GreenZonePaths?.resolve || function (path) {
            return new URL("../../" + path.replace(/^\//, ""), window.location.href).href;
        };

        try {

            const menuUrl = new URL(
                resolvePath("components/sub_pag/Introduction_sub_menu.html"),
                window.location.href
            );

            /* GitHub Pages에서도 수정된 메뉴 조각을 즉시 반영합니다. */
            menuUrl.searchParams.set("v", String(Date.now()));

            const response = await fetch(menuUrl.href, {
                cache: "no-store"
            });

            if (!response.ok) {
                console.warn(
                    "기업소개 하위 메뉴를 불러오지 못했습니다.",
                    response.status
                );
                return;
            }

            target.innerHTML = await response.text();
            window.GreenZonePaths?.normalize(target);

        } catch (error) {

            console.warn(
                "기업소개 하위 메뉴 로드 오류:",
                error
            );
            return;

        }

        const currentPage = document.body.dataset.companyPage;

        target
            .querySelector(`[data-company-page='${currentPage}']`)
            ?.setAttribute("aria-current", "page");

        /* 기업소개 서브메뉴는 모든 화면에서 hover / focus-within으로 동작한다. */
    }

    function initializeIntroductionPage() {
        loadIntroductionMenu();
        removeEmptyCertificateCards();
    }

    function removeEmptyCertificateCards() {

        const cards = document.querySelectorAll(".company_docs .company_doc");

        cards.forEach(function (card) {

            const image = card.querySelector("img");

            if (!image) {
                card.remove();
                return;
            }

            image.addEventListener("error", function () {
                card.remove();
            }, {
                once: true
            });

            if (image.complete && image.naturalWidth === 0) {
                card.remove();
            }

        });
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeIntroductionPage,
            {
                once: true
            }
        );

    } else {

        initializeIntroductionPage();
    }

})();
