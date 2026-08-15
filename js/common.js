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

        const isOpen = searchForm.classList.toggle("is_open");

        openButton.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {
            searchForm.querySelector(".search_input")?.focus();
        }

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
    const openButton = document.querySelector(".search_open_btn");

    searchForm?.classList.remove("is_open");
    openButton?.setAttribute("aria-expanded", "false");
}

const sitePath =
    (path) =>
        window.GreenZonePaths
            ?.resolve(path) || path;

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
    sitePath("components/Request_Cleaning.html")
);
