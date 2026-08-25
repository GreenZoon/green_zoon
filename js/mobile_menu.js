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
   MOBILE BOTTOM TAB
========================================================= */

(function () {

    function getCurrentTab() {
        const rootPath = window.GreenZonePaths?.baseUrl?.pathname || "/";
        const pagePath = window.location.pathname.startsWith(rootPath)
            ? window.location.pathname.slice(rootPath.length)
            : window.location.pathname.replace(/^\/+/, "");

        if (!pagePath || pagePath === "index.html") return "home";
        if (pagePath === "user_page/Online_application.html") return "request";
        if (pagePath.startsWith("sub_page/Community/")) return "community";
        if (pagePath.startsWith("sub_page/Gallery/") || pagePath === "Post.html") return "gallery";

        return "";
    }

    function syncMobileTab(root = document) {
        const tabs = root.matches?.(".mobile_tab")
            ? [root]
            : Array.from(root.querySelectorAll?.(".mobile_tab") || []);
        const currentTab = getCurrentTab();

        tabs.forEach(function (tab) {
            tab.querySelectorAll("[data-tab]").forEach(function (link) {
                const isActive = link.dataset.tab === currentTab;

                link.classList.toggle("is_active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }

    window.GreenZoneMobileTab = {
        sync: syncMobileTab
    };

    syncMobileTab(document);

    new MutationObserver(function (records) {
        records.forEach(function (record) {
            record.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) syncMobileTab(node);
            });
        });
    }).observe(document.documentElement, { childList: true, subtree: true });

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

    function getProfile(user) {
        if (!user) {
            return {};
        }

        try {
            const key = `greenZoneProfile:${user.email || "member"}`;
            const saved = window.localStorage.getItem(key);
            const oldAdminProfile = user.role === "admin"
                ? window.localStorage.getItem("greenZoneProfile")
                : null;

            return JSON.parse(saved || oldAdminProfile || "{}");
        } catch (error) {
            console.warn("[auth] 프로필 정보를 읽지 못했습니다.", error);
            return {};
        }
    }

    function getNickname(user = getUser()) {
        if (!user) {
            return "";
        }

        const profile = getProfile(user);
        const savedNickname = String(profile.name || "").trim();
        const authNickname = String(user.nickname || "").trim();

        return savedNickname || authNickname || "그린죤 사용자";
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
        const nickname = getNickname(user);
        const profileUrl = window.GreenZonePaths?.resolve("user_page/user_Profile_page.html") || "../user_page/user_Profile_page.html";
        const currentLoginUrl = loginUrl(
            window.location.pathname.endsWith("/Login.html") ? "" : window.location.href
        );

        (root || document).querySelectorAll("[data-auth-link]").forEach(function (link) {
            link.href = user ? profileUrl : currentLoginUrl;
            link.setAttribute("aria-label", user ? `${nickname} 내 정보` : "로그인");
        });

        (root || document).querySelectorAll("[data-auth-icon]").forEach(function (icon) {
            icon.classList.toggle("login", !user);
            icon.classList.toggle("user", Boolean(user));
        });

        (root || document).querySelectorAll("[data-auth-label]").forEach(function (label) {
            label.textContent = user ? nickname : "로그인";
        });

        (root || document).querySelectorAll("[data-auth-user-name]").forEach(function (label) {
            label.textContent = user ? `${nickname} 계정` : "그린죤 방문자";
        });
    }

    window.GreenZoneAuth = {
        getUser,
        getNickname,
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


}


function syncSubBackPosition() {

    const headerRoot = document.getElementById("header");

    if (!headerRoot) {
        return;
    }

    const header =
        headerRoot.querySelector(".header") ||
        headerRoot;

    const height =
        Math.round(header.getBoundingClientRect().height);

    if (height > 0) {
        document.documentElement.style.setProperty(
            "--mobile-header-height",
            `${height}px`
        );

        document.documentElement.style.setProperty(
            "--mobile-back-top",
            `${Math.max(height - 2, 0)}px`
        );

        document.documentElement.style.setProperty(
            "--mobile-menu-top",
            `${height}px`
        );

        document.documentElement.style.setProperty(
            "--mobile-menu-height",
            `${Math.max(window.innerHeight - height, 0)}px`
        );
    }

}


function watchSubBackPosition() {

    const header = document.getElementById("header");

    if (!header) {
        return;
    }

    syncSubBackPosition();

    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(syncSubBackPosition);
        observer.observe(header);
    }

    window.addEventListener("resize", syncSubBackPosition);

}


createSubBack();
watchSubBackPosition();


// =========================================================
// MOBILE MENU DATA
// =========================================================

const mobileMenuData = [

    {
        title: "기업소개",

        children: [

            {
                title: "기업소개",
                href: "/sub_page/Introduction/Introduction_main.html",

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
                href: "/sub_page/Introduction/Company_history.html",

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
                href: "/sub_page/Introduction/Certificates.html",

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
                href: "/sub_page/Factory_cleane/Factory_man.html",

                children: [

                    {
                        title: "공장 청소",
                        href: "/sub_page/Factory_cleane/Factory_man.html"
                    },

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
                href: "/sub_page/Cleaning/Carpet_cleaning.html",

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
                href: "/sub_page/Event_cleane/City_event.html",

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
                href: "/sub_page/Ship/Ship.html",

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
                href: "/sub_page/Exterior/Commercial.html",

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
                href: "/sub_page/Facility/Statue.html",

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

        if (item.href) {

            const link =
                document.createElement("a");

            link.textContent = item.title;

            link.href =
                window.GreenZonePaths.resolve(
                    item.href || "#"
                );

            link.dataset.mobileDepth2 = index;
            link.dataset.parentDepth1 = depth1Index;

            li.appendChild(link);

        }

        else {

            const button =
                document.createElement("button");

            button.type = "button";
            button.textContent = item.title;
            button.dataset.mobileDepth2 = index;
            button.dataset.parentDepth1 = depth1Index;

            li.appendChild(button);

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

let mobileMenuScrollY = 0;

function lockMobilePage() {
    if (document.body.classList.contains("menu_open")) return;

    mobileMenuScrollY = window.scrollY;
    document.body.style.top = "-" + mobileMenuScrollY + "px";
    document.body.classList.add("menu_open");
}

function unlockMobilePage() {
    if (!document.body.classList.contains("menu_open")) return;

    document.body.classList.remove("menu_open");
    document.body.style.top = "";
    window.scrollTo(0, mobileMenuScrollY);
}


function closeMobileMenu() {

    document
        .querySelector("#mobile_menu")
        ?.classList.remove("is_open");

    document
        .querySelectorAll(".mobile_menu_open_btn")
        .forEach(function (button) {
            button.setAttribute("aria-expanded", "false");
        });

    unlockMobilePage();

}

window.closeMobileMenu =
    closeMobileMenu;


// =========================================================
// MOBILE 2 WEEK SCHEDULE
// 기준 날짜가 속한 일요일부터 14일을 표시합니다.
// =========================================================

const mobileWorkSchedule = {
    "2026-03-08": "공장 청소",
    "2026-03-09": "식품공장 청소",
    "2026-03-10": "목욕탕 곰팡이 청소",
    "2026-03-11": "김해 공장 전체 청소",
    "2026-03-12": "새학년 맞이 대청소",
    "2026-03-13": "공장 물탱크 청소",
    "2026-03-14": "부산 물탱크 청소",
    "2026-03-15": "호텔 바닥 청소",
    "2026-03-16": "식품공장 청소",
    "2026-03-17": "공장 청소",
    "2026-03-18": "김해 공장 전체 청소",
    "2026-03-19": "공장 설비 청소",
    "2026-03-20": "외벽 청소",
    "2026-03-21": "행사 청소"
};

const mobileVisitSchedule = {
    "2026-03-08": "공장 청소 현장 확인",
    "2026-03-09": "학교 청소 현장 확인",
    "2026-03-10": "목욕탕 곰팡이 청소",
    "2026-03-11": "목욕탕 곰팡이 청소",
    "2026-03-12": "저수조 청소 방문",
    "2026-03-13": "공장 기계 설비 방문",
    "2026-03-14": "공장 입주 청소 방문",
    "2026-03-15": "호텔 바닥 견적 방문",
    "2026-03-16": "식품공장 견적 방문",
    "2026-03-17": "공장 청소 현장 확인",
    "2026-03-18": "김해 공장 방문",
    "2026-03-19": "설비 청소 현장 확인",
    "2026-03-20": "외벽 청소 현장 확인",
    "2026-03-21": "행사장 청소 방문"
};

function formatScheduleDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function parseScheduleDate(value) {
    const parts = String(value || "").split("-").map(Number);

    if (parts.length !== 3 || parts.some(Number.isNaN)) {
        return new Date();
    }

    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function renderMobileSchedule(track, type) {
    if (!track) return;

    const referenceValue = track.dataset.referenceDate || formatScheduleDate(new Date());
    const renderKey = `${referenceValue}-${type}`;

    if (track.dataset.renderedSchedule === renderKey) return;

    const referenceDate = parseScheduleDate(referenceValue);
    const firstDate = new Date(referenceDate);
    const schedule = type === "work" ? mobileWorkSchedule : mobileVisitSchedule;

    firstDate.setDate(firstDate.getDate() - firstDate.getDay());
    track.replaceChildren();

    for (let index = 0; index < 14; index += 1) {
        const date = new Date(firstDate);
        date.setDate(firstDate.getDate() + index);

        const dateValue = formatScheduleDate(date);
        const card = document.createElement("a");
        const day = document.createElement("strong");
        const description = document.createElement("p");

        card.className = "mobile_schedule_card";
        card.draggable = false;
        card.href = window.GreenZonePaths?.resolve(
            `sub_page/Community/Schedule.html?date=${dateValue}`
        ) || `/sub_page/Community/Schedule.html?date=${dateValue}`;
        card.dataset.scheduleDate = dateValue;
        card.setAttribute("aria-label", `${date.getMonth() + 1}월 ${date.getDate()}일 ${schedule[dateValue] || "일정 확인"}`);

        day.textContent = String(date.getDate()).padStart(2, "0");
        description.textContent = schedule[dateValue] || "일정 확인";

        if (date.getDay() === 0) day.classList.add("sunday");
        if (date.getDay() === 6) day.classList.add("saturday");

        if (dateValue === referenceValue) {
            card.classList.add("is_selected");
            card.setAttribute("aria-current", "date");
        } else {
            card.classList.add("is_disabled");
        }

        card.append(day, description);
        track.appendChild(card);
    }

    track.dataset.renderedSchedule = renderKey;
}

function prepareMobileSchedule(menu) {
    const track = menu?.querySelector(".mobile_schedule_cards");
    const activeTab = menu?.querySelector("[data-schedule-tab].is_active");
    const pageDate = new URLSearchParams(window.location.search).get("date");

    if (track && /^\d{4}-\d{2}-\d{2}$/.test(pageDate || "")) {
        track.dataset.referenceDate = pageDate;
    }

    renderMobileSchedule(track, activeTab?.dataset.scheduleTab || "visit");
}


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

        if (isOpen) {
            lockMobilePage();
            prepareMobileSchedule(mobileMenu);
        } else {
            unlockMobilePage();
        }

        document
            .querySelectorAll(".mobile_menu_open_btn")
            .forEach(function (button) {
                button.setAttribute("aria-expanded", String(isOpen));
            });

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

        const track = scheduleTab.closest(".mobile_schedule_area")
            ?.querySelector(".mobile_schedule_cards");

        renderMobileSchedule(track, scheduleTab.dataset.scheduleTab);

        const selectedCard = track?.querySelector(".mobile_schedule_card.is_selected");
        if (selectedCard) {
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

/* 마우스가 있는 기기에서는 호버로 다음 뎁스를 미리 봅니다. */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointerover", (event) => {
        const depth1Button = event.target.closest("[data-mobile-depth1]");

        if (depth1Button) {
            const depth1Index = Number(depth1Button.dataset.mobileDepth1);

            setMobileMenuActive("#mobile_depth_1", depth1Button);
            renderMobileDepth2(depth1Index);

            const firstDepth2 = document.querySelector(
                "#mobile_depth_2 [data-mobile-depth2='0']"
            );

            if (firstDepth2) {
                setMobileMenuActive("#mobile_depth_2", firstDepth2);
                renderMobileDepth3(depth1Index, 0);
            }

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

/* 터치는 브라우저 스크롤을 사용하고, 마우스만 포인터 캡처로 드래그합니다. */
document.addEventListener("pointerdown", function (event) {
    const track = event.target.closest(".mobile_schedule_cards");
    if (!track || event.pointerType !== "mouse" || event.button !== 0) return;

    const startX = event.clientX;
    const startScroll = track.scrollLeft;
    const draggedLink = event.target.closest("a");
    let moved = false;

    track.setPointerCapture(event.pointerId);
    track.classList.add("is_dragging");

    function move(moveEvent) {
        if (moveEvent.pointerId !== event.pointerId) return;

        const distance = moveEvent.clientX - startX;
        if (Math.abs(distance) > 4) moved = true;

        if (moved) moveEvent.preventDefault();
        track.scrollLeft = startScroll - distance;
    }

    function end(endEvent) {
        if (endEvent.pointerId !== event.pointerId) return;

        track.removeEventListener("pointermove", move);
        track.removeEventListener("pointerup", end);
        track.removeEventListener("pointercancel", end);
        track.removeEventListener("lostpointercapture", end);
        track.classList.remove("is_dragging");

        if (track.hasPointerCapture(event.pointerId)) {
            track.releasePointerCapture(event.pointerId);
        }

        if (moved && draggedLink) {
            draggedLink.addEventListener("click", function cancel(clickEvent) {
            clickEvent.preventDefault();
            this.removeEventListener("click", cancel);
            }, { once: true });
        }
    }

    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    track.addEventListener("lostpointercapture", end);
});


/* =========================================================
   SITE SEARCH
   헤더와 메인 검색은 같은 검색 목록과 이동 규칙을 사용합니다.
========================================================= */

(function () {

    "use strict";

    if (window.GreenZoneSearch) {
        return;
    }

    const recentSearchKey = "greenZoneRecentSearches";
    const searchEntries = [];

    /* 동적으로 불러온 헤더도 같은 함수로 검색창을 연다. */
    function openHeaderSearch() {
        const form = document.getElementById("header_search");

        if (!form) return;

        form.classList.add("is_open");

        document.querySelectorAll(".search_open_btn").forEach(function (button) {
            button.setAttribute("aria-expanded", "true");
        });

        renderRecentSearches();
        form.querySelector(".search_input")?.focus();
    }

    function closeHeaderSearch() {
        document.getElementById("header_search")?.classList.remove("is_open");

        document.querySelectorAll(".search_open_btn").forEach(function (button) {
            button.setAttribute("aria-expanded", "false");
        });
    }

    function toggleHeaderSearch() {
        const form = document.getElementById("header_search");

        if (!form) return;

        if (form.classList.contains("is_open")) {
            closeHeaderSearch();
            return;
        }

        openHeaderSearch();
    }

    function bindHeaderSearch(root) {
        const area = root || document;

        area.querySelectorAll(".search_open_btn").forEach(function (button) {
            if (button.dataset.searchBound === "true") return;
            button.dataset.searchBound = "true";
            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                toggleHeaderSearch();
            });
        });

        area.querySelectorAll(".search_close_btn").forEach(function (button) {
            if (button.dataset.searchBound === "true") return;
            button.dataset.searchBound = "true";
            button.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                closeHeaderSearch();
            });
        });
    }

    function normalizeKeyword(value) {
        return String(value || "")
            .toLocaleLowerCase("ko")
            .replace(/[\s\-_/.,()[\]{}]+/g, "");
    }

    function addEntry(title, href, keywords, search) {
        searchEntries.push({
            title,
            href,
            keywords: keywords || [],
            search: search || ""
        });
    }

    function collectMenuEntries(items, parents) {
        items.forEach(function (item) {
            const path = parents.concat(item.title);

            if (item.href) {
                addEntry(item.title, item.href, path);
            }

            if (item.children) {
                collectMenuEntries(item.children, path);
            }
        });
    }

    collectMenuEntries(mobileMenuData, []);

    addEntry("홈", "/index.html", ["메인", "메인페이지", "홈페이지"]);
    addEntry("공장 청소", "/sub_page/Factory_cleane/Factory_man.html", ["공장청소", "공장", "기계설비"]);
    addEntry("위생관리", "/sub_page/Factory_cleane/Factory_man.html", ["위생관리 용역업", "청소업체"]);
    addEntry("물탱크 청소", "/sub_page/Water_tank/Water_tank.html", ["저수조 청소", "저수조"]);
    addEntry("외벽 청소", "/sub_page/Exterior/Commercial.html", ["외벽청소", "외벽 방수", "유리창 청소"]);
    addEntry("청소 작업 신청", "/user_page/Online_application.html", ["작업문의", "견적", "온라인견적", "방문견적", "청소신청"]);

    [
        "겨울철 실내공기유지하기",
        "주방 청소 꿀팁 4가지, 이것만 알아도 관리가 쉬워집니다",
        "가습기 청소",
        "집먼지 진드기 알레르기, 원인 예방법 꼼꼼하게 알려드릴게요",
        "먼지 방지하는 청소 방법",
        "미세먼지 심할 때 환기, 올바른 환기 방법이 있어요!",
        "전자레인지 냄새 제거 꿀팁, 이 방법이 가장 확실해요!",
        "새집증후군 예방 위한 효과적인 방법 총정리!"
    ].forEach(function (title) {
        addEntry(title, "/sub_page/Community/Information.html", ["정보공유", "청소정보"], title);
    });

    function scoreEntry(entry, query) {
        const keyword = normalizeKeyword(query);
        const title = normalizeKeyword(entry.title);
        const fields = entry.keywords.map(normalizeKeyword);

        if (!keyword) return 0;
        if (title === keyword) return 100;
        if (title.includes(keyword)) return 80;
        if (fields.includes(keyword)) return 70;
        if (fields.some(function (field) { return field.includes(keyword); })) return 50;
        if (keyword.includes(title)) return 30;
        return 0;
    }

    function find(query) {
        return searchEntries
            .map(function (entry) {
                return { entry, score: scoreEntry(entry, query) };
            })
            .filter(function (result) {
                return result.score > 0;
            })
            .sort(function (a, b) {
                return b.score - a.score;
            })
            .map(function (result) {
                return result.entry;
            });
    }

    function readRecentSearches() {
        try {
            return JSON.parse(window.localStorage.getItem(recentSearchKey) || "[]");
        } catch (error) {
            return [];
        }
    }

    function saveRecentSearch(query) {
        const recent = readRecentSearches().filter(function (item) {
            return normalizeKeyword(item) !== normalizeKeyword(query);
        });

        recent.unshift(query);
        window.localStorage.setItem(recentSearchKey, JSON.stringify(recent.slice(0, 4)));
    }

    function renderRecentSearches() {
        const list = document.querySelector("#header_search .keyword_section:first-child .keyword_list");
        const recent = readRecentSearches();

        if (!list || !recent.length) {
            return;
        }

        list.replaceChildren();

        recent.forEach(function (query) {
            const item = document.createElement("li");
            const button = document.createElement("button");
            const icon = document.createElement("span");

            button.type = "button";
            button.className = "keyword_button";
            icon.className = "icon search_ion keyword_icon";
            icon.setAttribute("aria-hidden", "true");
            button.append(icon, document.createTextNode(query));
            item.appendChild(button);
            list.appendChild(item);
        });
    }

    function showNoResult(input, query) {
        input.setCustomValidity("'" + query + "'에 해당하는 페이지를 찾지 못했습니다.");
        input.reportValidity();
    }

    function go(query, input) {
        const value = String(query || "").trim();
        const result = find(value)[0];

        if (!value) {
            input?.focus();
            return false;
        }

        if (!result) {
            if (input) showNoResult(input, value);
            return false;
        }

        saveRecentSearch(value);

        const destination = new URL(
            window.GreenZonePaths?.resolve(result.href) || result.href,
            window.location.href
        );

        if (result.search) {
            destination.searchParams.set("search", result.search);
        }

        window.location.href = destination.href;
        return true;
    }

    document.addEventListener("submit", function (event) {
        const form = event.target.closest("#header_search");
        if (!form) return;

        event.preventDefault();
        const input = form.querySelector('input[type="search"]');
        go(input?.value, input);
    });

    document.addEventListener("click", function (event) {
        const keywordButton = event.target.closest("#header_search .keyword_button");
        const mainButton = event.target.closest(".mobile_search button");
        const searchOpenButton = event.target.closest(".search_open_btn");
        const searchCloseButton = event.target.closest(".search_close_btn");

        if (searchOpenButton && searchOpenButton.dataset.searchBound !== "true") {
            event.preventDefault();
            toggleHeaderSearch();
            return;
        }

        if (searchCloseButton && searchCloseButton.dataset.searchBound !== "true") {
            event.preventDefault();
            closeHeaderSearch();
            return;
        }

        if (keywordButton) {
            const input = document.querySelector("#header_search .search_input");
            const query = keywordButton.textContent.trim();
            if (input) input.value = query;
            go(query, input);
            return;
        }

        if (mainButton) {
            const input = mainButton.closest(".mobile_search")?.querySelector('input[type="search"]');
            go(input?.value, input);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeHeaderSearch();
        }

        const input = event.target.closest('.mobile_search input[type="search"]');
        if (input && event.key === "Enter") {
            event.preventDefault();
            go(input.value, input);
        }
    });

    document.addEventListener("input", function (event) {
        if (event.target.matches('#header_search input[type="search"], .mobile_search input[type="search"]')) {
            event.target.setCustomValidity("");
        }
    });

    window.GreenZoneSearch = {
        find,
        go
    };

    window.GreenZoneHeaderSearch = {
        open: openHeaderSearch,
        close: closeHeaderSearch,
        toggle: toggleHeaderSearch,
        bind: bindHeaderSearch
    };

    bindHeaderSearch(document);

    new MutationObserver(function (records) {
        records.forEach(function (record) {
            record.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) bindHeaderSearch(node);
            });
        });
    }).observe(document.documentElement, { childList: true, subtree: true });

})();
