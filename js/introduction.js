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

    function initAwardTabs() {

        const tabList = document.querySelector(".company_award_tabs[role='tablist']");

        if (!tabList) {
            return;
        }

        const tabs = Array.from(tabList.querySelectorAll("[role='tab'][data-award-year]"));
        const panels = Array.from(document.querySelectorAll(".company_award[data-award-panel]"));

        if (!tabs.length || !panels.length) {
            return;
        }

        function activateAward(year, moveFocus) {

            const selectedTab = tabs.find(function (tab) {
                return tab.dataset.awardYear === year;
            });

            const selectedPanel = panels.find(function (panel) {
                return panel.dataset.awardPanel === year;
            });

            if (!selectedTab || !selectedPanel) {
                return;
            }

            tabs.forEach(function (tab) {
                const isSelected = tab === selectedTab;
                tab.classList.toggle("on", isSelected);
                tab.setAttribute("aria-selected", String(isSelected));
                tab.tabIndex = isSelected ? 0 : -1;
            });

            panels.forEach(function (panel) {
                panel.hidden = panel !== selectedPanel;
            });

            if (moveFocus) {
                selectedTab.focus();
            }
        }

        tabList.addEventListener("click", function (event) {
            const tab = event.target.closest("[role='tab'][data-award-year]");

            if (!tab || !tabList.contains(tab)) {
                return;
            }

            activateAward(tab.dataset.awardYear, false);
        });

        tabList.addEventListener("keydown", function (event) {

            const currentIndex = tabs.indexOf(document.activeElement);

            if (currentIndex < 0) {
                return;
            }

            let nextIndex = currentIndex;

            if (event.key === "ArrowRight") {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            activateAward(tabs[nextIndex].dataset.awardYear, true);
        });

        const initialTab = tabs.find(function (tab) {
            return tab.getAttribute("aria-selected") === "true";
        }) || tabs[0];

        activateAward(initialTab.dataset.awardYear, false);
    }

    function initializeIntroductionPage() {
        loadIntroductionMenu();
        initAwardTabs();
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
