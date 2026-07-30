/* =================================================
   섹션 5 지구 센터 캐러셀
   - 자동 슬라이드
   - 마우스 드래그
   - 모바일 스와이프
================================================= */

const section5 = document.querySelector(".section_5");

if (section5) {
    /* ---------------------------------
       HTML 요소 가져오기
    --------------------------------- */

    const earthWrap =
        section5.querySelector(".img_wrap_5");

    const earthItems =
        section5.querySelectorAll(".earth");


    /* ---------------------------------
       현재 상태값
    --------------------------------- */

    let currentCenterIndex = 1;

    let autoplayTimer = null;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    const autoplayDelay = 2500;
    const swipeThreshold = 50;


    /* ---------------------------------
       지구 이미지 위치 갱신
    --------------------------------- */

    function updateEarthPositions() {
        const itemCount = earthItems.length;

        if (itemCount === 0) {
            return;
        }

        const leftIndex =
            (currentCenterIndex - 1 + itemCount) %
            itemCount;

        const rightIndex =
            (currentCenterIndex + 1) %
            itemCount;

        earthItems.forEach((item, index) => {
            item.classList.remove(
                "is_left_5",
                "is_center_5",
                "is_right_5"
            );

            if (index === currentCenterIndex) {
                item.classList.add("is_center_5");
            } else if (index === leftIndex) {
                item.classList.add("is_left_5");
            } else if (index === rightIndex) {
                item.classList.add("is_right_5");
            }
        });
    }


    /* ---------------------------------
       다음 이미지로 이동
    --------------------------------- */

    function moveToNextEarth() {
        if (earthItems.length === 0) {
            return;
        }

        currentCenterIndex =
            (currentCenterIndex + 1) %
            earthItems.length;

        updateEarthPositions();
    }


    /* ---------------------------------
       이전 이미지로 이동
    --------------------------------- */

    function moveToPreviousEarth() {
        if (earthItems.length === 0) {
            return;
        }

        currentCenterIndex =
            (
                currentCenterIndex -
                1 +
                earthItems.length
            ) %
            earthItems.length;

        updateEarthPositions();
    }


    /* ---------------------------------
       자동 재생 시작
    --------------------------------- */

    function startEarthAutoplay() {
        stopEarthAutoplay();

        if (earthItems.length <= 1) {
            return;
        }

        autoplayTimer = window.setInterval(
            moveToNextEarth,
            autoplayDelay
        );
    }


    /* ---------------------------------
       자동 재생 정지
    --------------------------------- */

    function stopEarthAutoplay() {
        if (!autoplayTimer) {
            return;
        }

        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
    }


    /* ---------------------------------
       마우스·터치 위치 가져오기
    --------------------------------- */

    function getEarthPointerX(event) {
        if (
            event.touches &&
            event.touches.length > 0
        ) {
            return event.touches[0].clientX;
        }

        if (
            event.changedTouches &&
            event.changedTouches.length > 0
        ) {
            return event.changedTouches[0].clientX;
        }

        return event.clientX;
    }


    /* ---------------------------------
       드래그 시작
    --------------------------------- */

    function startEarthDrag(event) {
        isDragging = true;

        startX =
            getEarthPointerX(event);

        currentX = startX;

        earthWrap.classList.add(
            "is_dragging_5"
        );

        stopEarthAutoplay();
    }


    /* ---------------------------------
       드래그 중
    --------------------------------- */

    function moveEarthDrag(event) {
        if (!isDragging) {
            return;
        }

        currentX =
            getEarthPointerX(event);

        const dragDistance =
            currentX - startX;

        /*
        가로 드래그 중 브라우저의
        이미지 기본 드래그 동작 방지
        */
        if (
            Math.abs(dragDistance) > 5 &&
            event.cancelable
        ) {
            event.preventDefault();
        }
    }


    /* ---------------------------------
       드래그 종료
    --------------------------------- */

    function endEarthDrag(event) {
        if (!isDragging) {
            return;
        }

        isDragging = false;

        currentX =
            getEarthPointerX(event);

        const dragDistance =
            currentX - startX;

        earthWrap.classList.remove(
            "is_dragging_5"
        );

        /*
        왼쪽으로 밀면 다음 이미지
        */
        if (dragDistance <= -swipeThreshold) {
            moveToNextEarth();
        }

        /*
        오른쪽으로 밀면 이전 이미지
        */
        else if (dragDistance >= swipeThreshold) {
            moveToPreviousEarth();
        }

        startEarthAutoplay();
    }


    /* ---------------------------------
       마우스 드래그 이벤트
    --------------------------------- */

    earthWrap.addEventListener(
        "mousedown",
        startEarthDrag
    );

    window.addEventListener(
        "mousemove",
        moveEarthDrag
    );

    window.addEventListener(
        "mouseup",
        endEarthDrag
    );


    /* ---------------------------------
       모바일 터치 이벤트
    --------------------------------- */

    earthWrap.addEventListener(
        "touchstart",
        startEarthDrag,
        { passive: true }
    );

    earthWrap.addEventListener(
        "touchmove",
        moveEarthDrag,
        { passive: false }
    );

    earthWrap.addEventListener(
        "touchend",
        endEarthDrag,
        { passive: true }
    );

    earthWrap.addEventListener(
        "touchcancel",
        endEarthDrag,
        { passive: true }
    );


    /* ---------------------------------
       이미지 기본 드래그 방지
    --------------------------------- */

    earthWrap.addEventListener(
        "dragstart",
        event => {
            event.preventDefault();
        }
    );


    /* ---------------------------------
       마우스를 올리면 자동 재생 정지
    --------------------------------- */

    section5.addEventListener(
        "mouseenter",
        stopEarthAutoplay
    );

    section5.addEventListener(
        "mouseleave",
        () => {
            if (!isDragging) {
                startEarthAutoplay();
            }
        }
    );


    /* ---------------------------------
       브라우저 탭 비활성화 시 정지
    --------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stopEarthAutoplay();
            } else if (!isDragging) {
                startEarthAutoplay();
            }
        }
    );


    /* ---------------------------------
       최초 실행
    --------------------------------- */

    updateEarthPositions();
    startEarthAutoplay();
}