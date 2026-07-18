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
        console.log(
            "원본 main_tit 개수:",
            (html.match(/class\s*=\s*["'][^"']*\bmain_tit\b[^"']*["']/g) || []).length
        );

        target.innerHTML = html;

        console.log(
            "삽입 후 DOM main_tit 개수:",
            target.querySelectorAll(".main_tit").length
        );
    } catch (error) {
        console.error(error);
    }
}

loadComponent("header", "./components/header_v2.html");
loadComponent("footer", "./components/footer.html");
loadComponent("menu", "./components/menu.html");


fetch("./components/header_v2.html?v=" + Date.now(), {
    cache: "no-store"
})
    .then(response => response.text())
    .then(html => {
        console.log("새 파일 main_tit:", (html.match(/main_tit/g) || []).length);
        console.log("새 파일 길이:", html.length);
        console.log("COMMON-JS-V2 실행됨");
    });

