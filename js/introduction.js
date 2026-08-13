(function () {

    "use strict";

    async function loadIntroductionMenu() {

        const target = document.getElementById("Introduction_sub_menu");

        if (!target || !window.GreenZonePaths) {
            return;
        }

        const response = await fetch(
            window.GreenZonePaths.resolve(
                "components/sub_pag/Introduction_sub_menu.html"
            ),
            {
                cache: "no-cache"
            }
        );

        if (!response.ok) {
            console.error("기업소개 하위 메뉴를 불러오지 못했습니다.");
            return;
        }

        target.innerHTML = await response.text();
        window.GreenZonePaths.normalize(target);

        target
            .querySelector("[data-company-group='intro']")
            ?.classList.add("is_active");

        const currentPage = document.body.dataset.companyPage;

        target
            .querySelector(`[data-company-page='${currentPage}']`)
            ?.setAttribute("aria-current", "page");
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            loadIntroductionMenu,
            {
                once: true
            }
        );

    } else {

        loadIntroductionMenu();
    }

})();
