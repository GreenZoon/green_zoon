(function () {

    "use strict";

    async function loadIntroductionMenu() {

        const target = document.getElementById("Introduction_sub_menu");

        if (!target || !window.GreenZonePaths) {
            return;
        }

        try {

            const response = await fetch(
                window.GreenZonePaths.resolve(
                    "components/Introduction_sub_menu.html"
                ),
                {
                    cache: "no-cache"
                }
            );

            if (!response.ok) {
                console.warn(
                    "기업소개 하위 메뉴를 불러오지 못했습니다.",
                    response.status
                );
                return;
            }

            target.innerHTML = await response.text();
            window.GreenZonePaths.normalize(target);

        } catch (error) {

            console.warn(
                "기업소개 하위 메뉴 로드 오류:",
                error
            );
            return;

        }

        const currentGroup =
            document.body.dataset.companyGroup || "intro";

        target
            .querySelector(`[data-company-group='${currentGroup}']`)
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
