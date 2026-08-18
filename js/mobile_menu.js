/* =========================================================
   SITE PATH
   GitHub Pages의 프로젝트 경로와 커스텀 도메인을 함께 지원
========================================================= */

(function () {

    const script =
        document.currentScript;

    const baseUrl =
        script?.src
            ? new URL("../", script.src)
            : new URL("./", window.location.href);

    function resolve(path) {

        if (
            !path ||
            path.startsWith("#") ||
            /^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(path)
        ) {
            return path;
        }

        return new URL(
            path.replace(/^\/+/, ""),
            baseUrl
        ).href;
    }

    function normalize(root = document) {

        root
            .querySelectorAll(
                "[href^='/'], [src^='/'], [action^='/']"
            )
            .forEach((element) => {

                ["href", "src", "action"]
                    .forEach((attribute) => {

                        const value =
                            element.getAttribute(attribute);

                        if (
                            value &&
                            value.startsWith("/")
                        ) {
                            element.setAttribute(
                                attribute,
                                resolve(value)
                            );
                        }
                    });
            });
    }

window.GreenZonePaths = {
        baseUrl,
        resolve,
        normalize
    };

    normalize(document);

})();


/* =========================================================
   AUTH STATE
   정식 서버 인증 연동 전까지 로그인 화면과 접근 제어를 한곳에서 관리
========================================================= */

(function () {

    "use strict";

    if (window.GreenZoneAuth) {
        return;
    }

    const AUTH_KEY = "greenZoneAuthUser";

    function read(storage) {
        try {
            const value = storage.getItem(AUTH_KEY);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.warn("[auth] 로그인 정보를 읽지 못했습니다.", error);
            return null;
        }
    }

    function getUser() {
        return read(window.sessionStorage) || read(window.localStorage);
    }

    function clear() {
        window.sessionStorage.removeItem(AUTH_KEY);
        window.localStorage.removeItem(AUTH_KEY);
    }

    function login(user, remember) {
        clear();
        const storage = remember ? window.localStorage : window.sessionStorage;
        storage.setItem(AUTH_KEY, JSON.stringify(user));
        document.dispatchEvent(new CustomEvent("greenzone:authchange", { detail: user }));
        syncUI(document);
    }

    function logout() {
        clear();
        document.dispatchEvent(new CustomEvent("greenzone:authchange", { detail: null }));
        syncUI(document);
    }

    function loginUrl(returnTo) {
        const base = window.GreenZonePaths?.resolve("user_page/Login.html") || "../user_page/Login.html";
        const url = new URL(base, window.location.href);

        if (returnTo) {
            url.searchParams.set("returnTo", returnTo);
        }

        return url.href;
    }

    function requireLogin(returnTo) {
        if (getUser()) {
            return true;
        }

        window.location.replace(loginUrl(returnTo || window.location.href));
        return false;
    }

    function syncUI(root) {
        const user = getUser();
        const profileUrl = window.GreenZonePaths?.resolve("user_page/user_Profile_page.html") || "../user_page/user_Profile_page.html";
        const currentLoginUrl = loginUrl(
            window.location.pathname.endsWith("/Login.html") ? "" : window.location.href
        );

        (root || document).querySelectorAll("[data-auth-link]").forEach(function (link) {
            link.href = user ? profileUrl : currentLoginUrl;
            link.setAttribute("aria-label", user ? "내 정보" : "로그인");
        });

        (root || document).querySelectorAll("[data-auth-icon]").forEach(function (icon) {
            icon.classList.toggle("login", !user);
            icon.classList.toggle("user", Boolean(user));
        });

        (root || document).querySelectorAll("[data-auth-label]").forEach(function (label) {
            label.textContent = user ? "내 정보" : "로그인";
        });

        (root || document).querySelectorAll("[data-auth-user-name]").forEach(function (label) {
            label.textContent = user ? `${user.name || "그린죤 사용자"} 계정` : "그린죤 방문자";
        });
    }

    window.GreenZoneAuth = {
        getUser,
        isLoggedIn: function () { return Boolean(getUser()); },
        login,
        logout,
        loginUrl,
        requireLogin,
        syncUI
    };

})();


// =========================================================
// SUB PAGE BACK
// =========================================================

function createSubBack() {

    if (
        !window.location.pathname.includes("/sub_page/") ||
        document.querySelector(".sub_back")
    ) {
        return;
    }


    const header =
        document.getElementById("header");


    const reference =
        header ||
        document.getElementById("menu");


    if (!reference) {
        return;
    }


    const button =
        document.createElement("button");


    button.type = "button";
    button.className = "sub_back";
    button.textContent = "뒤로가기";
    button.setAttribute(
        "aria-label",
        "이전 페이지로 돌아가기"
    );


    button.addEventListener(
        "click",
        function () {

            window.history.back();

        }
    );


    reference.insertAdjacentElement(
        "afterend",
        button
    );


    function syncSubBackTop() {

        if (!header) {
            return;
        }


        const headerHeight =
            header.offsetHeight;


        if (headerHeight === 0) {
            return;
        }


        button.style.setProperty(
            "--sub_back_top",
            `${headerHeight}px`
        );

    }


    syncSubBackTop();


    if (header && "ResizeObserver" in window) {

        const headerResizeObserver =
            new ResizeObserver(
                syncSubBackTop
            );


        headerResizeObserver.observe(
            header
        );

    }


    window.addEventListener(
        "resize",
        syncSubBackTop
    );

}


createSubBack();


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
                        title: "기업소개",
                        href: "/sub_page/Introduction/Introduction_main.html"
                    },
                    {
                        title: "대표 인사말",
                        href: "/sub_page/Introduction/CEO_message.html"
                    },
                    {
                        title: "찾아오시는 길",
                        href: "/sub_page/Introduction/Directions.html"
                    }
                ]
            },

            {
                title: "기업 정보",

                children: [
                    {
                        title: "회사 연혁",
                        href: "/sub_page/Introduction/Company_history.html"
                    },
                    {
                        title: "각 지점 정보",
                        href: "/sub_page/Introduction/Branches.html"
                    }
                ]
            },

            {
                title: "허가 및 인증서",

                children: [
                    {
                        title: "허가증 및 인증서",
                        href: "/sub_page/Introduction/Certificates.html"
                    },
                    {
                        title: "수상내역",
                        href: "/sub_page/Introduction/Awards.html"
                    },
                    {
                        title: "협력/거래처",
                        href: "/sub_page/Introduction/Clients.html"
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
                        title: "페트릭",
                        href: "/sub_page/Cleaning/Fabric_cleaning.html"
                    }

                ]
            },


            {
                title: "비둘기 퇴치",
                href: "/sub_page/Bird/Bird_control.html"
            },


            {
                title: "행사 청소",

                children: [
                    {
                        title: "시/도 행사 청소",
                        href: "/sub_page/Event_cleane/City_event.html"
                    },
                    {
                        title: "전시회 청소",
                        href: "/sub_page/Event_cleane/Exhibition.html"
                    },
                    {
                        title: "경기장 청소",
                        href: "/sub_page/Event_cleane/Stadium.html"
                    },
                    {
                        title: "계절 청소",
                        href: "/sub_page/Event_cleane/Seasonal.html"
                    }
                ]
            },


            {
                title: "선박",

                children: [
                    {
                        title: "시 선박",
                        href: "/sub_page/Ship/Ship.html"
                    },
                    {
                        title: "유람선",
                        href: "/sub_page/Ship/Cruise.html"
                    },
                    {
                        title: "군함",
                        href: "/sub_page/Ship/Naval.html"
                    }
                ]
            },


            {
                title: "외벽",

                children: [
                    {
                        title: "상가건물 외벽",
                        href: "/sub_page/Exterior/Commercial.html"
                    },
                    {
                        title: "사무실 외벽",
                        href: "/sub_page/Exterior/Office.html"
                    },
                    {
                        title: "관공서 외벽",
                        href: "/sub_page/Exterior/Government.html"
                    },
                    {
                        title: "공장 외벽",
                        href: "/sub_page/Exterior/Factory.html"
                    },
                    {
                        title: "외벽 시설물",
                        href: "/sub_page/Exterior/Facility.html"
                    }
                ]
            },


            {
                title: "시설물 관리",

                children: [
                    {
                        title: "동상/조형물",
                        href: "/sub_page/Facility/Statue.html"
                    },
                    {
                        title: "교각",
                        href: "/sub_page/Facility/Bridge.html"
                    },
                    {
                        title: "녹 제거",
                        href: "/sub_page/Facility/Rust_removal.html"
                    },
                    {
                        title: "터널",
                        href: "/sub_page/Facility/Tunnel.html"
                    }
                ]
            },

            {
                title: "미화원 파견",
                href: "/sub_page/Dispatch/Dispatch.html"
            }

        ]
    },


    {
        title: "저수조 청소업",

        children: [
            {
                title: "연못 청소",
                href: "/sub_page/Water_tank/Pond.html"
            },
            {
                title: "저수조 청소",
                href: "/sub_page/Water_tank/Water_tank.html"
            }
        ]
    },


    {
        title: "소독업",

        children: [
            {
                title: "소독",
                href: "/sub_page/Disinfection/Disinfection.html"
            },
            {
                title: "방역",
                href: "/sub_page/Disinfection/Quarantine.html"
            }
        ]
    },


    /*
        교육사업은 디자인 자리만 남겨 둔 상태입니다.
        실제 콘텐츠가 확정되면 아래 항목을 활성화합니다.

        {
            title: "교육사업",
            children: []
        },
    */


    {
        title: "갤러리",

        children: [
            {
                title: "작업 갤러리",
                href: "/sub_page/Gallery/Work_gallery.html"
            },
            {
                title: "작업 동영상",
                href: "/sub_page/Gallery/Video_gallery.html"
            },
            {
                title: "행사사진",
                href: "/sub_page/Gallery/Event_gallery.html"
            }
        ]
    },


    {
        title: "커뮤니티",

        children: [
            {
                title: "공지사항",
                href: "/sub_page/Community/Notice.html"
            },
            {
                title: "작업일정",
                href: "/sub_page/Community/Schedule.html"
            },
            {
                title: "이벤트",
                href: "/sub_page/Community/Event.html"
            },
            {
                title: "정보공유",
                href: "/sub_page/Community/Information.html"
            },
            {
                title: "자주하는 질문",
                href: "/sub_page/Community/FAQ.html"
            },
            {
                title: "이용후기",
                href: "/sub_page/Community/Reviews.html"
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

            link.href =
                window.GreenZonePaths.resolve(
                    item.href || "#"
                );

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

        link.href =
            window.GreenZonePaths.resolve(
                item.href || "#"
            );

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


function closeMobileMenu() {

    document
        .querySelector("#mobile_menu")
        ?.classList.remove("is_open");

    document
        .querySelector(".mobile_menu_open_btn")
        ?.setAttribute(
            "aria-expanded",
            "false"
        );

    document.body.classList.remove(
        "menu_open"
    );

}

window.closeMobileMenu =
    closeMobileMenu;


// =========================================================
// CLICK
// =========================================================

document.addEventListener("click", (event) => {
    const hoverCapableMenu = window.matchMedia("(hover: hover) and (pointer: fine)");

    const closeButton =
        event.target.closest(
            ".mobile_menu_close_btn"
        );

    if (closeButton) {

        closeMobileMenu();

        return;
    }


    /* ---------------------------------
       햄버거
    --------------------------------- */

    const menuButton =
        event.target.closest(
            ".mobile_menu_open_btn"
        );

    if (menuButton) {

        const mobileMenu =
            document.querySelector("#mobile_menu");

        if (!mobileMenu) {
            return;
        }

        const isOpen =
            mobileMenu.classList.toggle("is_open");

        document.body.classList.toggle(
            "menu_open",
            isOpen
        );

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
            const firstDepth1 = document.querySelector("[data-mobile-depth1='0']");
            if (firstDepth1) {
                setMobileMenuActive("#mobile_depth_1", firstDepth1);
                renderMobileDepth2(0);
                const firstDepth2 = document.querySelector("[data-mobile-depth2='0']");
                if (firstDepth2) {
                    setMobileMenuActive("#mobile_depth_2", firstDepth2);
                    renderMobileDepth3(0, 0);
                }
            }
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

        if (hoverCapableMenu.matches) return;

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

        if (hoverCapableMenu.matches) return;

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

        return;
    }

    const scheduleTab = event.target.closest("[data-schedule-tab]");
    if (scheduleTab) {
        document.querySelectorAll("[data-schedule-tab]").forEach((button) => {
            const active = button === scheduleTab;
            button.classList.toggle("is_active", active);
            button.setAttribute("aria-selected", String(active));
        });

        const selectedCard = document.querySelector(".mobile_schedule_card.is_selected");
        if (selectedCard) {
            selectedCard.querySelector("p").textContent = scheduleTab.dataset.scheduleTab === "work"
                ? "공장 바닥 청소"
                : "목욕탕 곰팡이 청소";
            selectedCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }

    }

});


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    }
);

/* 마우스가 있는 기기에서는 1·2뎁스를 호버로 미리 봅니다. 터치 기기는 클릭 동작을 유지합니다. */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointerover", (event) => {
        const depth1Button = event.target.closest("[data-mobile-depth1]");
        if (depth1Button) {
            const depth1Index = Number(depth1Button.dataset.mobileDepth1);
            setMobileMenuActive("#mobile_depth_1", depth1Button);
            renderMobileDepth2(depth1Index);
            return;
        }

        const depth2Button = event.target.closest("[data-mobile-depth2]");
        if (depth2Button) {
            const depth1Index = Number(depth2Button.dataset.parentDepth1);
            const depth2Index = Number(depth2Button.dataset.mobileDepth2);
            setMobileMenuActive("#mobile_depth_2", depth2Button);
            renderMobileDepth3(depth1Index, depth2Index);
        }
    });
}
