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

// =========================================================
// MOBILE MENU DATA
// =========================================================

const mobileMenuData = [

    {
        title: "기업소개",

        children: [

            {
                title: "기업소개",

                children: [
                    {
                        title: "대표 인사말",
                        href: "#"
                    },
                    {
                        title: "찾아오시는 길",
                        href: "#"
                    }
                ]
            },

            {
                title: "기업 정보",

                children: [
                    {
                        title: "회사 연혁",
                        href: "#"
                    },
                    {
                        title: "각 지점 정보",
                        href: "#"
                    }
                ]
            },

            {
                title: "허가 및 인증서",

                children: [
                    {
                        title: "수상내역",
                        href: "#"
                    },
                    {
                        title: "협력/거래처",
                        href: "#"
                    }
                ]
            }

        ]
    },


    {
        title: "위생관리 용역업",

        children: [

            {
                title: "공장 청소",

                children: [

                    {
                        title: "기계 설비",
                        href: "/sub_page/Factory_cleane/Factory_equipment_cleane.html"
                    },

                    {
                        title: "설비 도색",
                        href: "/sub_page/Factory_cleane/Equipment_painting.html"
                    },

                    {
                        title: "라인 청소",
                        href: "/sub_page/Factory_cleane/Factory_line.html"
                    },

                    {
                        title: "공장 바닥",
                        href: "/sub_page/Factory_cleane/Factory_floor.html"
                    }

                ]
            },


            {
                title: "왁스 작업",
                href: "/sub_page/Cleaning/Wax_coating.html"
            },


            {
                title: "카펫 청소",

                children: [

                    {
                        title: "카펫 청소",
                        href: "/sub_page/Cleaning/Carpet_cleaning.html"
                    },

                    {
                        title: "페브릭",
                        href: "/sub_page/Cleaning/Fabric_cleaning.html"
                    }

                ]
            },


            {
                title: "비둘기 퇴치",
                href: "#"
            },


            {
                title: "행사 청소",

                children: [
                    {
                        title: "시/도 행사 청소",
                        href: "#"
                    },
                    {
                        title: "전시회 청소",
                        href: "#"
                    },
                    {
                        title: "경기장 청소",
                        href: "#"
                    },
                    {
                        title: "계절 청소",
                        href: "#"
                    }
                ]
            },


            {
                title: "선박",

                children: [
                    {
                        title: "시 선박",
                        href: "#"
                    },
                    {
                        title: "유람선",
                        href: "#"
                    },
                    {
                        title: "군함",
                        href: "#"
                    }
                ]
            },


            {
                title: "외벽",

                children: [
                    {
                        title: "상가건물 외벽",
                        href: "#"
                    },
                    {
                        title: "사무실 외벽",
                        href: "#"
                    },
                    {
                        title: "관공서 외벽",
                        href: "#"
                    },
                    {
                        title: "공장 외벽",
                        href: "#"
                    },
                    {
                        title: "외벽 시설물",
                        href: "#"
                    }
                ]
            },


            {
                title: "시설물 관리",

                children: [
                    {
                        title: "동상/조형물",
                        href: "#"
                    },
                    {
                        title: "교각",
                        href: "#"
                    },
                    {
                        title: "녹 제거",
                        href: "#"
                    },
                    {
                        title: "터널",
                        href: "#"
                    }
                ]
            },


            // {
            //     title: "미화원 파견",
            //     href: "#"
            // }

        ]
    },


    {
        title: "저수조 청소업",

        children: [
            {
                title: "연못 청소",
                href: "#"
            },
            {
                title: "저수조 청소",
                href: "#"
            }
        ]
    },


    {
        title: "소독업",

        children: [
            {
                title: "소독",
                href: "#"
            },
            {
                title: "방역",
                href: "#"
            }
        ]
    },


    /*
        네 모바일 디자인에는 '교육사업'이 있지만
        현재 PC menu.html에는 해당 메뉴가 없음.

        페이지가 정해지면 여기에 children 추가하면 됨.
    */
    {
        title: "교육사업",
        children: []
    },


    {
        title: "갤러리",

        children: [
            {
                title: "작업 갤러리",
                href: "#"
            },
            {
                title: "작업 동영상",
                href: "#"
            },
            {
                title: "행사사진",
                href: "#"
            }
        ]
    },


    {
        title: "커뮤니티",

        children: [
            {
                title: "공지사항",
                href: "#"
            },
            {
                title: "작업일정",
                href: "#"
            },
            {
                title: "이벤트",
                href: "#"
            },
            {
                title: "정보공유",
                href: "#"
            },
            {
                title: "자주하는 질문",
                href: "#"
            },
            {
                title: "이용후기",
                href: "#"
            }
        ]
    }

];


// =========================================================
// MOBILE MENU RENDER
// =========================================================

function renderMobileDepth1() {

    const depth1 =
        document.querySelector("#mobile_depth_1");

    if (!depth1) {
        return;
    }


    depth1.innerHTML = "";


    mobileMenuData.forEach((menu, index) => {

        const li =
            document.createElement("li");


        const button =
            document.createElement("button");


        button.type = "button";

        button.textContent = menu.title;

        button.dataset.mobileDepth1 = index;


        li.appendChild(button);

        depth1.appendChild(li);

    });

}


// =========================================================
// 2 DEPTH
// =========================================================

function renderMobileDepth2(depth1Index) {

    const depth2 =
        document.querySelector("#mobile_depth_2");

    const depth3 =
        document.querySelector("#mobile_depth_3");


    if (!depth2 || !depth3) {
        return;
    }


    depth2.innerHTML = "";

    depth3.innerHTML = "";


    const menu =
        mobileMenuData[depth1Index];


    if (!menu?.children) {
        return;
    }


    menu.children.forEach((item, index) => {

        const li =
            document.createElement("li");


        /*
            하위 3뎁스가 있는 메뉴
        */
        if (item.children?.length) {

            const button =
                document.createElement("button");


            button.type = "button";

            button.textContent = item.title;

            button.dataset.mobileDepth2 = index;

            button.dataset.parentDepth1 = depth1Index;


            li.appendChild(button);

        }


        /*
            바로 이동하는 메뉴
        */
        else {

            const link =
                document.createElement("a");


            link.textContent = item.title;

            link.href = item.href || "#";


            li.appendChild(link);

        }


        depth2.appendChild(li);

    });

}


// =========================================================
// 3 DEPTH
// =========================================================

function renderMobileDepth3(depth1Index, depth2Index) {

    const depth3 =
        document.querySelector("#mobile_depth_3");


    if (!depth3) {
        return;
    }


    depth3.innerHTML = "";


    const menu =
        mobileMenuData[depth1Index]?.children?.[depth2Index];


    if (!menu?.children) {
        return;
    }


    menu.children.forEach((item) => {

        const li =
            document.createElement("li");


        const link =
            document.createElement("a");


        link.textContent = item.title;

        link.href = item.href || "#";


        li.appendChild(link);

        depth3.appendChild(li);

    });

}


// =========================================================
// ACTIVE 상태
// =========================================================

function setMobileMenuActive(containerSelector, target) {

    const container =
        document.querySelector(containerSelector);


    if (!container) {
        return;
    }


    container
        .querySelectorAll(".is_active")
        .forEach((item) => {

            item.classList.remove("is_active");

        });


    target.classList.add("is_active");

}


// =========================================================
// CLICK
// =========================================================

document.addEventListener("click", (event) => {

    /* ---------------------------------
       햄버거
    --------------------------------- */

    const menuButton =
        event.target.closest(".mobile_menu_open_btn");


    if (menuButton) {

        const mobileMenu =
            document.querySelector("#mobile_menu");


        if (!mobileMenu) {

            console.log("mobile_menu를 찾지 못했습니다.");

            return;

        }


        const isOpen =
            mobileMenu.classList.toggle("is_open");


        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        /*
            처음 열었을 때만
            1뎁스 생성
        */

        if (
            isOpen &&
            !document.querySelector(
                "#mobile_depth_1 li"
            )
        ) {

            renderMobileDepth1();

        }


        return;

    }


    /* ---------------------------------
       1 DEPTH
    --------------------------------- */

    const depth1Button =
        event.target.closest(
            "[data-mobile-depth1]"
        );


    if (depth1Button) {

        const depth1Index =
            Number(
                depth1Button.dataset.mobileDepth1
            );


        setMobileMenuActive(
            "#mobile_depth_1",
            depth1Button
        );


        renderMobileDepth2(
            depth1Index
        );


        return;

    }


    /* ---------------------------------
       2 DEPTH
    --------------------------------- */

    const depth2Button =
        event.target.closest(
            "[data-mobile-depth2]"
        );


    if (depth2Button) {

        const depth1Index =
            Number(
                depth2Button.dataset.parentDepth1
            );


        const depth2Index =
            Number(
                depth2Button.dataset.mobileDepth2
            );


        setMobileMenuActive(
            "#mobile_depth_2",
            depth2Button
        );


        renderMobileDepth3(
            depth1Index,
            depth2Index
        );

    }

});

loadComponent("header", "./components/header_v2.html");
loadComponent("footer", "./components/footer.html");
loadComponent("menu", "./components/menu.html");
loadComponent("Request_Cleaning", "./components/Request_Cleaning.html");