/* =========================================================
   SUB PAGE COMMON
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DUPLICATE INITIALIZATION GUARD
    ===================================================== */

    if (window.GreenZoneSubCommonInitialized) {
        return;
    }

    window.GreenZoneSubCommonInitialized = true;



    /* =====================================================
       COMPONENT LOAD
    ===================================================== */

    const COMPONENT_TIMEOUT = 8000;


    async function loadComponent(id, file) {

        const target =
            document.getElementById(id);


        if (!target) {
            return null;
        }


        const controller =
            new AbortController();


        const timeoutId =
            window.setTimeout(
                function () {

                    controller.abort();

                },
                COMPONENT_TIMEOUT
            );


        try {

            const response =
                await fetch(
                    file,
                    {
                        cache: "no-cache",
                        signal: controller.signal
                    }
                );


            if (!response.ok) {

                console.error(
                    `[sub_common] ${id} 로드 실패:`,
                    response.status,
                    file
                );

                return null;

            }


            const html =
                await response.text();


            target.innerHTML =
                html;


            window.GreenZonePaths
                ?.normalize(target);


            if (
                id === "header" ||
                id === "menu"
            ) {
                window.GreenZoneAuth
                    ?.syncUI(target);
            }


            return target;


        } catch (error) {

            if (error.name === "AbortError") {

                console.warn(
                    `[sub_common] ${id} 로드 시간 초과:`,
                    file
                );

            } else {

                console.error(
                    `[sub_common] ${id} 로드 오류:`,
                    error
                );

            }


            return null;


        } finally {

            window.clearTimeout(
                timeoutId
            );

        }

    }



    /* =====================================================
       HEADER SEARCH
    ===================================================== */

    function closeHeaderSearch() {

        document
            .querySelector("#header_search")
            ?.classList.remove("is_open");


        document
            .querySelectorAll(".search_open_btn")
            .forEach(function (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

    }



    /* =====================================================
       PLACEHOLDER LINK
    ===================================================== */

    function preventPlaceholderLink(event) {

        const link =
            event.target.closest(
                'a[href=""], a[href="#"]'
            );


        if (!link) {
            return false;
        }


        event.preventDefault();

        return true;

    }



    /* =====================================================
       GLOBAL CLICK
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {


            preventPlaceholderLink(event);



            /* SEARCH OPEN */

            const searchOpen =
                event.target.closest(
                    ".search_open_btn"
                );


            if (searchOpen) {

                const searchForm =
                    document.querySelector(
                        "#header_search"
                    );


                if (!searchForm) {
                    return;
                }


                searchForm.classList.add(
                    "is_open"
                );


                document
                    .querySelectorAll(".search_open_btn")
                    .forEach(function (button) {

                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    });


                searchForm
                    .querySelector(".search_input")
                    ?.focus();


                return;

            }



            /* SEARCH CLOSE */

            const searchClose =
                event.target.closest(
                    ".search_close_btn"
                );


            if (searchClose) {

                closeHeaderSearch();

                return;

            }



            /* SEARCH KEYWORD */

            const keyword =
                event.target.closest(
                    ".keyword_button"
                );


            if (keyword) {

                const input =
                    document.querySelector(
                        "#search_input"
                    );


                if (!input) {
                    return;
                }


                input.value =
                    keyword.textContent.trim();


                input.focus();

            }

        }
    );



    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeHeaderSearch();

            window.closeMobileMenu?.();

        }
    );



    /* =====================================================
       REQUEST CLEANING POSITION
    ===================================================== */

    const requestMobileMedia =
        window.matchMedia(
            "(max-width: 768px)"
        );


    function moveRequestCleaning() {

        const request =
            document.getElementById(
                "Request_Cleaning"
            );


        if (!request) {
            return;
        }


        const pin =
            document.querySelector(
                ".request_cleaning_pin"
            );


        const video =
            document.querySelector(
                ".service_video"
            );



        /* MOBILE / IPAD */

        if (requestMobileMedia.matches) {

            if (
                pin &&
                pin.nextElementSibling !== request
            ) {

                pin.insertAdjacentElement(
                    "afterend",
                    request
                );

            }


            return;

        }



        /* PC */

        if (
            video &&
            video.nextElementSibling !== request
        ) {

            video.insertAdjacentElement(
                "afterend",
                request
            );

        }

    }



    /* =====================================================
       REQUEST RESPONSIVE CHANGE
    ===================================================== */

    if (
        typeof requestMobileMedia.addEventListener ===
        "function"
    ) {

        requestMobileMedia.addEventListener(
            "change",
            moveRequestCleaning
        );

    } else {

        requestMobileMedia.addListener(
            moveRequestCleaning
        );

    }



    /* =====================================================
       SUB GALLERY SLIDER

       메인페이지 슬라이더 방식 적용
       - 마우스 드래그
       - 모바일 터치
       - window에서 드래그 추적
    ===================================================== */

    function initSubSliders() {

        const sliders =
            document.querySelectorAll(
                ".slide_wrap"
            );


        sliders.forEach(
            function (wrap) {


                if (
                    wrap.dataset.sliderInitialized ===
                    "true"
                ) {

                    return;

                }


                const clippingMask =
                    wrap.querySelector(
                        ".slide_mask"
                    );


                const track =
                    wrap.querySelector(
                        ".img_con_wrap"
                    );


                if (
                    !clippingMask ||
                    !track
                ) {

                    return;

                }


                const slides =
                    Array.from(
                        track.querySelectorAll(
                            ":scope > .slide_group"
                        )
                    );


                if (slides.length === 0) {
                    return;
                }


                const prevButton =
                    wrap.querySelector(
                        ".left_arrow_2"
                    );


                const nextButton =
                    wrap.querySelector(
                        ".right_arrow_2"
                    );


                const pagination =
                    wrap.querySelector(
                        ".slide_pagination"
                    );


                const gallery =
                    wrap.closest(
                        ".service_gallery"
                    );


                const galleryMeta =
                    gallery?.querySelector(
                        ".service_gallery_meta"
                    );


                if (pagination && galleryMeta) {

                    galleryMeta.after(
                        pagination
                    );

                }


                const dots =
                    Array.from(
                        pagination?.querySelectorAll(
                            ".slide_dot"
                        )
                        || []
                    );


                const slideStatus =
                    document.createElement("div");


                slideStatus.className =
                    "slide_status";


                slideStatus.innerHTML =
                    `<span class="slide_count"><b>1</b> / ${slides.length}</span>
                    <button type="button" class="slide_pause" aria-label="자동 슬라이드 일시정지">
                        <span class="icon pause_icon" aria-hidden="true"></span>
                    </button>`;


                clippingMask.appendChild(
                    slideStatus
                );


                wrap.classList.toggle(
                    "is_single",
                    slides.length < 2
                );

                if (pagination) {
                    pagination.classList.toggle(
                        "single_paging",
                        slides.length < 2
                    );
                }


                const currentNumber =
                    slideStatus.querySelector("b");


                const pauseButton =
                    slideStatus.querySelector(
                        ".slide_pause"
                    );


                let currentIndex = 0;

                let isPlaying =
                    slides.length > 1;

                let autoPlayTimer = null;

                let isDragging = false;
                let hasDragged = false;

                let dragDirection = null;

                let startX = 0;
                let startY = 0;

                let currentX = 0;
                let currentY = 0;

                let dragDistance = 0;

                let clickResetTimer = null;


                /*
                    메인 슬라이더와 같은 고정 기준.

                    화면 크기와 관계없이 50px 이상 움직이면
                    다음 또는 이전 슬라이드로 넘어감.
                */

                const dragThreshold = 50;

                const autoPlayDelay = 5000;


                wrap.dataset.sliderInitialized =
                    "true";


                wrap.style.cursor =
                    "grab";


                clippingMask.style.touchAction =
                    "pan-y";



                /* -----------------------------------------
                   SLIDER POSITION
                ----------------------------------------- */

                function showSlide(
                    index,
                    useAnimation = true
                ) {

                    if (index < 0) {

                        currentIndex =
                            slides.length - 1;

                    } else if (
                        index >= slides.length
                    ) {

                        currentIndex = 0;

                    } else {

                        currentIndex = index;

                    }


                    track.style.transition =
                        useAnimation
                            ? "transform 0.5s ease"
                            : "none";


                    track.style.transform =
                        `translateX(-${currentIndex * 100}%)`;


                    dots.forEach(
                        function (dot, dotIndex) {

                            const active =
                                dotIndex === currentIndex;


                            dot.classList.toggle(
                                "is_active",
                                active
                            );


                            dot.classList.toggle(
                                "is_active_4",
                                active
                            );


                            dot.setAttribute(
                                "aria-current",
                                active
                                    ? "true"
                                    : "false"
                            );

                        }
                    );


                    currentNumber.textContent =
                        String(currentIndex + 1);

                }


                function stopAutoPlay() {

                    window.clearInterval(
                        autoPlayTimer
                    );

                    autoPlayTimer = null;

                }


                function startAutoPlay() {

                    stopAutoPlay();

                    if (!isPlaying || slides.length < 2) {
                        return;
                    }

                    autoPlayTimer =
                        window.setInterval(
                            nextSlide,
                            autoPlayDelay
                        );

                }


                function updatePauseButton() {

                    pauseButton.classList.toggle(
                        "is_paused",
                        !isPlaying
                    );

                    pauseButton.setAttribute(
                        "aria-label",
                        isPlaying
                            ? "자동 슬라이드 일시정지"
                            : "자동 슬라이드 재생"
                    );

                }



                /* -----------------------------------------
                   NEXT
                ----------------------------------------- */

                function nextSlide() {

                    showSlide(
                        currentIndex + 1
                    );

                }



                /* -----------------------------------------
                   PREVIOUS
                ----------------------------------------- */

                function previousSlide() {

                    showSlide(
                        currentIndex - 1
                    );

                }



                /* -----------------------------------------
                   BUTTON
                ----------------------------------------- */

                nextButton?.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        nextSlide();

                    }
                );


                prevButton?.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        previousSlide();

                    }
                );


                pauseButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        isPlaying = !isPlaying;

                        updatePauseButton();

                        if (isPlaying) {
                            startAutoPlay();
                        } else {
                            stopAutoPlay();
                        }

                    }
                );



                /* -----------------------------------------
                   DOT
                ----------------------------------------- */

                dots.forEach(
                    function (dot, index) {

                        dot.addEventListener(
                            "click",
                            function (event) {

                                event.preventDefault();


                                if (
                                    index >=
                                    slides.length
                                ) {

                                    return;

                                }


                                showSlide(index);

                            }
                        );

                    }
                );



                /* -----------------------------------------
                   MOUSE / TOUCH POSITION
                ----------------------------------------- */

                function getPointerX(event) {

                    if (
                        event.touches &&
                        event.touches.length > 0
                    ) {

                        return event
                            .touches[0]
                            .clientX;

                    }


                    if (
                        event.changedTouches &&
                        event.changedTouches.length > 0
                    ) {

                        return event
                            .changedTouches[0]
                            .clientX;

                    }


                    return event.clientX;

                }


                function getPointerY(event) {

                    if (
                        event.touches &&
                        event.touches.length > 0
                    ) {

                        return event
                            .touches[0]
                            .clientY;

                    }


                    if (
                        event.changedTouches &&
                        event.changedTouches.length > 0
                    ) {

                        return event
                            .changedTouches[0]
                            .clientY;

                    }


                    return event.clientY;

                }



                /* -----------------------------------------
                   DRAG START
                ----------------------------------------- */

                function startDrag(event) {


                    /*
                        화살표와 페이지네이션 클릭은
                        드래그로 시작하지 않음
                    */

                    if (
                        event.target.closest(
                            ".arrow, .slide_pagination, .slide_status"
                        )
                    ) {

                        return;

                    }


                    /*
                        마우스 오른쪽 버튼 드래그 방지
                    */

                    if (
                        event.type === "mousedown" &&
                        event.button !== 0
                    ) {

                        return;

                    }


                    isDragging = true;
                    hasDragged = false;

                    dragDirection = null;


                    startX =
                        getPointerX(event);


                    startY =
                        getPointerY(event);


                    currentX = startX;
                    currentY = startY;

                    dragDistance = 0;


                    track.style.transition =
                        "none";


                    wrap.style.cursor =
                        "grabbing";

                }



                /* -----------------------------------------
                   DRAG MOVE

                   메인페이지처럼 실제 드래그한 거리만큼
                   슬라이드가 마우스와 함께 움직임
                ----------------------------------------- */

                function moveDrag(event) {

                    if (!isDragging) {
                        return;
                    }


                    currentX =
                        getPointerX(event);


                    currentY =
                        getPointerY(event);


                    const moveX =
                        currentX - startX;


                    const moveY =
                        currentY - startY;



                    /*
                        처음 움직인 방향으로
                        드래그와 세로 스크롤 구분
                    */

                    if (!dragDirection) {

                        const absoluteX =
                            Math.abs(moveX);


                        const absoluteY =
                            Math.abs(moveY);


                        if (
                            absoluteX < 5 &&
                            absoluteY < 5
                        ) {

                            return;

                        }


                        dragDirection =
                            absoluteX > absoluteY
                                ? "horizontal"
                                : "vertical";

                    }



                    /*
                        세로 이동이면 페이지 스크롤 유지
                    */

                    if (
                        dragDirection !==
                        "horizontal"
                    ) {

                        return;

                    }


                    dragDistance =
                        moveX;


                    if (
                        Math.abs(dragDistance) > 5
                    ) {

                        hasDragged = true;

                    }


                    const sliderWidth =
                        clippingMask.clientWidth;


                    const basePosition =
                        currentIndex *
                        sliderWidth;


                    track.style.transform =
                        `translateX(${-(basePosition) + dragDistance}px)`;


                    if (event.cancelable) {

                        event.preventDefault();

                    }

                }



                /* -----------------------------------------
                   DRAG END
                ----------------------------------------- */

                function endDrag() {

                    if (!isDragging) {
                        return;
                    }


                    isDragging = false;


                    wrap.style.cursor =
                        "grab";


                    if (
                        dragDirection === "horizontal" &&
                        dragDistance <= -dragThreshold
                    ) {

                        nextSlide();

                    } else if (
                        dragDirection === "horizontal" &&
                        dragDistance >= dragThreshold
                    ) {

                        previousSlide();

                    } else {

                        showSlide(currentIndex);

                    }


                    dragDistance = 0;
                    dragDirection = null;


                    /*
                        드래그 직후 발생하는 링크 클릭을 막고
                        잠시 뒤 상태를 초기화
                    */

                    if (hasDragged) {

                        window.clearTimeout(
                            clickResetTimer
                        );


                        clickResetTimer =
                            window.setTimeout(
                                function () {

                                    hasDragged = false;

                                },
                                300
                            );

                    }

                }



                /* -----------------------------------------
                   MOUSE DRAG

                   시작은 slide_wrap 전체
                   이동과 종료는 window 전체
                ----------------------------------------- */

                wrap.addEventListener(
                    "mousedown",
                    startDrag
                );


                window.addEventListener(
                    "mousemove",
                    moveDrag
                );


                window.addEventListener(
                    "mouseup",
                    endDrag
                );



                /* -----------------------------------------
                   MOBILE TOUCH

                   slide_wrap 전체에서 스와이프 가능
                ----------------------------------------- */

                wrap.addEventListener(
                    "touchstart",
                    startDrag,
                    {
                        passive: true
                    }
                );


                wrap.addEventListener(
                    "touchmove",
                    moveDrag,
                    {
                        passive: false
                    }
                );


                wrap.addEventListener(
                    "touchend",
                    endDrag,
                    {
                        passive: true
                    }
                );


                wrap.addEventListener(
                    "touchcancel",
                    endDrag,
                    {
                        passive: true
                    }
                );



                /* -----------------------------------------
                   IMAGE DEFAULT DRAG PREVENTION
                ----------------------------------------- */

                wrap.addEventListener(
                    "dragstart",
                    function (event) {

                        event.preventDefault();

                    }
                );



                /* -----------------------------------------
                   CLICK AFTER DRAG PREVENTION
                ----------------------------------------- */

                wrap.addEventListener(
                    "click",
                    function (event) {

                        if (!hasDragged) {
                            return;
                        }


                        event.preventDefault();

                        event.stopPropagation();


                        hasDragged = false;


                        window.clearTimeout(
                            clickResetTimer
                        );

                    },
                    true
                );



                /* -----------------------------------------
                   RESIZE
                ----------------------------------------- */

                window.addEventListener(
                    "resize",
                    function () {

                        showSlide(
                            currentIndex,
                            false
                        );

                    }
                );


                updatePauseButton();
                startAutoPlay();



                /* -----------------------------------------
                   FIRST RENDER
                ----------------------------------------- */

                showSlide(
                    0,
                    false
                );

            }
        );

    }



    /* =====================================================
       SITE PATH
    ===================================================== */

    function sitePath(path) {

        return (
            window.GreenZonePaths
                ?.resolve(path) ||
            path
        );

    }



    /* =====================================================
       COMPONENT INITIALIZATION
    ===================================================== */

    function loadSubComponents() {

        const componentJobs = [

            loadComponent(
                "header",
                sitePath(
                    "components/header_v2.html"
                )
            ),

            loadComponent(
                "menu",
                sitePath(
                    "components/menu.html"
                )
            ),

            loadComponent(
                "Factry_sub_menu",
                sitePath(
                    "components/sub_pag/Factry_sub_menu.html"
                )
            ),

            loadComponent(
                "Community_sub_menu",
                sitePath(
                    "components/sub_pag/Community_sub_menu.html"
                )
            ),

            loadComponent(
                "Request_Cleaning",
                sitePath(
                    "components/sub_pag/Request_Cleaning.html"
                )
            ),

            loadComponent(
                "footer",
                sitePath(
                    "components/footer.html"
                )
            )

        ];


        Promise
            .allSettled(componentJobs)
            .then(
                function () {

                    moveRequestCleaning();
                    markCurrentSubMenu();
                    connectDispatchApplication();
                    connectServiceMediaLinks();

                }
            );

    }

    function connectDispatchApplication() {
        if (!window.location.pathname.includes("/Dispatch/Dispatch.html")) {
            return;
        }

        document.querySelectorAll('a[href*="Online_application.html"]').forEach(function (link) {
            const url = new URL(link.href, window.location.href);
            url.searchParams.set("service", "dispatch");
            link.href = url.href;
        });
    }


    /* =====================================================
       SERVICE GALLERY / VIDEO LINKS

       서비스 상세 화면에 모양만 남아 있던 # 링크를
       실제 갤러리 화면으로 연결한다.
    ===================================================== */

    function connectServiceMediaLinks() {

        const workGallery =
            sitePath("sub_page/Gallery/Work_gallery.html");

        const videoGallery =
            sitePath("sub_page/Gallery/Video_gallery.html");

        const workPost =
            sitePath("sub_page/Gallery/Post.html") + "?type=work&id=";

        const serviceWorkPost = [
            [/\/Disinfection\//, 0],
            [/\/Cleaning\/Fabric_cleaning\.html$/, 1],
            [/\/Cleaning\/Carpet_cleaning\.html$/, 3],
            [/\/Cleaning\/Wax_coating\.html$/, 5],
            [/\/Bird\//, 4],
            [/\/Exterior\//, 6],
            [/\/Water_tank\/Pond\.html$/, 9],
            [/\/Water_tank\/Water_tank\.html$/, 13],
            [/\/Factory_cleane\/Factory_floor\.html$/, 7],
            [/\/Factory_cleane\/(Factory_equipment_cleane|Factory_line|Equipment_painting)\.html$/, 12],
            [/\/Factory_cleane\/Factory_man\.html$/, 7],
            [/\/Facility\/Tunnel\.html$/, 6],
            [/\/Facility\/(Rust_removal|Statue)\.html$/, 12],
            [/\/Event_cleane\//, 11],
            [/\/Ship\//, 7]
        ];

        const serviceMatch = serviceWorkPost.find(function (entry) {
            return entry[0].test(window.location.pathname);
        });

        const workDestination = serviceMatch
            ? workPost + serviceMatch[1]
            : workGallery;

        document
            .querySelectorAll(
                ".service_gallery a"
            )
            .forEach(function (link) {

                link.href = workDestination;

            });

        document
            .querySelectorAll(".service_video")
            .forEach(function (section) {
                const linkedPost = section.querySelector('a[href*="Post.html?type=video"]');
                const destination = linkedPost ? linkedPost.href : videoGallery;

                section.querySelectorAll("a").forEach(function (link) {
                    link.href = destination;
                    link.removeAttribute("aria-disabled");
                    link.removeAttribute("tabindex");
                });

                if (!linkedPost) {
                    const cardLink = section.querySelector(".video_card_a");
                    if (cardLink) cardLink.classList.add("video_card_a--gallery-only");
                }
            });

    }


    function markCurrentSubMenu() {

        const currentPath =
            window.location.pathname.replace(/\/+$/, "");

        let communityPage =
            document.body.dataset.communityPage;


        /* 게시글 상세 화면은 주소의 게시글 종류로 활성 메뉴를 정한다. */

        if (
            !communityPage &&
            document.body.dataset.postPage === "community"
        ) {

            const postType =
                new URLSearchParams(window.location.search)
                    .get("type");

            const communityPages = {
                notice: "notice",
                event: "event",
                information: "information",
                review: "reviews"
            };

            communityPage =
                communityPages[postType] ||
                "notice";

        }

        document
            .querySelectorAll(
                ".subpage_nav_link:not(.company_tit)"
            )
            .forEach(function (link) {

                const linkPath =
                    new URL(link.href, window.location.href)
                        .pathname
                        .replace(/\/+$/, "");

                const isCommunityPage =
                    communityPage &&
                    link.dataset.communityPage === communityPage;

                if (
                    linkPath === currentPath ||
                    isCommunityPage
                ) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }

            });

    }



    /* =====================================================
       INIT
    ===================================================== */

    function initializeSubPage() {

        moveRequestCleaning();
        markCurrentSubMenu();
        connectDispatchApplication();
        connectServiceMediaLinks();

        initSubSliders();

        loadSubComponents();

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSubPage,
            {
                once: true
            }
        );

    } else {

        initializeSubPage();

    }

})();
