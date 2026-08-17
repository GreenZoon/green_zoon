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

            const response = await fetch(
                resolvePath("components/sub_pag/Introduction_sub_menu.html"),
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

        const mobileMenu = window.matchMedia("(max-width: 768px)");

        function closeCompanyMenu(except) {

            target
                .querySelectorAll(".company_tit[aria-expanded='true']")
                .forEach(function (title) {

                    if (title !== except) {
                        title.setAttribute("aria-expanded", "false");
                    }

                });

        }

        target.addEventListener("click", function (event) {

            if (!mobileMenu.matches) {
                return;
            }

            const title = event.target.closest(".company_tit");

            if (!title || !target.contains(title)) {
                return;
            }

            const drop = title.nextElementSibling;

            if (!drop || !drop.classList.contains("company_drop")) {
                return;
            }

            const isOpen = title.getAttribute("aria-expanded") === "true";

            event.preventDefault();

            if (isOpen) {
                title.setAttribute("aria-expanded", "false");
                return;
            }

            closeCompanyMenu(title);
            title.setAttribute("aria-expanded", "true");

        });

        document.addEventListener("click", function (event) {

            if (!target.contains(event.target)) {
                closeCompanyMenu();
            }

        });

        mobileMenu.addEventListener("change", function () {

            closeCompanyMenu();

        });
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
