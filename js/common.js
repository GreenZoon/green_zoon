async function loadComponent(id, file) {
    const target = document.getElementById(id);

    if (!target) {
        return null;
    }

    try {
        const response = await fetch(`${file}?v=${Date.now()}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            console.warn(
                `[common] ${file} 로드 실패:`,
                response.status,
                response.statusText
            );

            return null;
        }

        const html = await response.text();

        target.innerHTML = html;

        window.GreenZonePaths
            ?.normalize(target);

        if (id === "header" || id === "menu") {
            window.GreenZoneAuth?.syncUI(target);
        }

        return target;
        
    } catch (error) {
        console.warn(
            `[common] ${file} 로드 오류:`,
            error
        );

        return null;
    }
}

// -------------------search--------------------------

document.addEventListener("click", (event) => {
    const openButton = event.target.closest(".search_open_btn");
    const closeButton = event.target.closest(".search_close_btn");
    const keywordButton = event.target.closest(".keyword_button");


    if (openButton) {
        const searchForm = document.querySelector("#header_search");

        if (!searchForm) {
            return;
        }

        searchForm.classList.add("is_open");

        document.querySelectorAll(".search_open_btn").forEach((button) => {
            button.setAttribute("aria-expanded", "true");
        });

        searchForm.querySelector(".search_input")?.focus();

        return;
    }


    if (closeButton) {
        closeHeaderSearch();
    }

    if (!keywordButton) {
        return;
    }

    const searchInput = document.querySelector("#search_input");

    if (!searchInput) {
        return;
    }

    searchInput.value = keywordButton.textContent.trim();
    searchInput.focus();

});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeHeaderSearch();
    }
});

function closeHeaderSearch() {
    const searchForm = document.querySelector("#header_search");
    searchForm?.classList.remove("is_open");
    document.querySelectorAll(".search_open_btn").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
    });
}

const sitePath =
    (path) =>
        window.GreenZonePaths
            ?.resolve(path) || path;


/* 메인 화면에서 모양만 있던 카드 링크를 실제 페이지로 연결 */
function connectMainContentLinks() {
    const routes = {
        "공지사항": "sub_page/Community/Notice.html",
        "이용후기": "sub_page/Community/Reviews.html",
        "정보 공유": "sub_page/Community/Information.html",
        "작업일정": "sub_page/Community/Schedule.html",
        "자주하는 질문": "sub_page/Community/FAQ.html"
    };

    document.querySelectorAll('.mobile_gallery_box[href="#"]').forEach(function (link) {
        link.href = sitePath("sub_page/Gallery/Work_gallery.html");
    });

    document.querySelectorAll('.video_card[href="#"]').forEach(function (link) {
        link.href = sitePath("sub_page/Gallery/Video_gallery.html");
    });

    document.querySelectorAll('.section_4 .box_4').forEach(function (card) {
        const link = card.querySelector('.box_in_wrap[href="#"]');
        const route = routes[card.dataset.keyword];
        if (link && route) link.href = sitePath(route);
    });

    document.querySelectorAll('.mobile_event_box[href="#"]').forEach(function (link) {
        link.href = sitePath("sub_page/Community/Event.html");
    });

    const awardLink = document.querySelector('.section_3 .tit_wrap a[href="#"]');
    if (awardLink) awardLink.href = sitePath("sub_page/Introduction/Awards.html");

    const companyLink = document.querySelector('.section_5 .tit_wrap a[href="#"]');
    if (companyLink) companyLink.href = sitePath("sub_page/Introduction/Introduction_main.html");
}

connectMainContentLinks();

loadComponent(
    "header",
    sitePath("components/header_v2.html")
);

loadComponent(
    "footer",
    sitePath("components/footer.html")
);

loadComponent(
    "menu",
    sitePath("components/menu.html")
);

loadComponent(
    "Request_Cleaning",
    sitePath("components/sub_pag/Request_Cleaning.html")
);
