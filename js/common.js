async function loadComponent(id, file) {
    const target = document.getElementById(id);

    if (!target) {
        console.error(`#${id} 요소를 찾지 못했습니다.`);
        return;
    }

    try {
        const response = await fetch(`${file}?v=${Date.now()}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(
                `${file} 로드 실패: ${response.status} ${response.statusText}`
            );
        }

        const html = await response.text();

        console.log("불러온 파일:", response.url);

        target.innerHTML = html;
        
    } catch (error) {
        console.error(error);
    }
}

fetch("./components/header_v2.html?v=" + Date.now(), {
    cache: "no-store"
})
    .then(response => response.text())
    .then(html => {
        console.log("새 파일 길이:", html.length);
        console.log("COMMON-JS-V2 실행됨");
    });



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

loadComponent("header", "./components/header_v2.html");
loadComponent("footer", "./components/footer.html");
loadComponent("menu", "./components/menu.html");