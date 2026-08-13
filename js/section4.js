/* =================================================
   섹션 4 갤러리 자동 슬라이드
================================================= */

const section4 = document.querySelector(".section_4");

if (section4) {
    /* ---------------------------------
       HTML 요소 가져오기
    --------------------------------- */

    const clippingMask4 =
        section4.querySelector(".clipping_mask_4");

    const galleryTrack =
        section4.querySelector(".box_wrap_4");

    const galleryCards =
        section4.querySelectorAll(".box_4");

    const galleryDots =
        section4.querySelectorAll(".slide_pagination_4 .slide_dot");


    /* ---------------------------------
       현재 상태값
    --------------------------------- */

    let currentGalleryIndex = 0;
    let currentGalleryTranslateX = 0;
    let dragStartTranslateX = 0;

    let startX = 0;
    let currentX = 0;

    let isDragging = false;
    let hasDragged = false;

    let autoplayTimer = null;

    const autoplayDelay = 2500;

    function isMobileGalleryLayout() {
        return window.innerWidth <= 1024;
    }


    /* ---------------------------------
       카드 한 칸의 이동 거리 계산
    --------------------------------- */

    function getGalleryMoveDistance() {
        const firstCard = galleryCards[0];

        if (!firstCard) {
            return 0;
        }

        const cardWidth =
            firstCard.getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(galleryTrack);

        const gap =
            parseFloat(trackStyle.gap) || 0;

        return cardWidth + gap;
    }


    /* ---------------------------------
       트랙의 최대 이동 거리
    --------------------------------- */

    function getGalleryMaxTranslateX() {
        const trackWidth =
            galleryTrack.scrollWidth;

        const maskWidth =
            clippingMask4.clientWidth;

        return Math.max(
            0,
            trackWidth - maskWidth
        );
    }


    /* ---------------------------------
       마지막 이동 가능 인덱스
    --------------------------------- */

    function getGalleryLastIndex() {
        const moveDistance =
            getGalleryMoveDistance();

        if (moveDistance <= 0) {
            return 0;
        }

        return Math.ceil(
            getGalleryMaxTranslateX() / moveDistance
        );
    }


    /* ---------------------------------
       인덱스에 따른 이동 거리
    --------------------------------- */

    function getGalleryTranslateByIndex(index) {
        const moveDistance =
            getGalleryMoveDistance();

        const requestedTranslate =
            index * moveDistance;

        const maxTranslate =
            getGalleryMaxTranslateX();

        return Math.min(
            requestedTranslate,
            maxTranslate
        );
    }


    /* ---------------------------------
       실제 사용할 도트 개수 갱신
    --------------------------------- */

    function updateGalleryDotCount() {
        const requiredDotCount =
            getGalleryLastIndex() + 1;

        galleryDots.forEach((dot, index) => {
            dot.hidden =
                index >= requiredDotCount;
        });
    }


    /* ---------------------------------
       도트 활성 상태 갱신
    --------------------------------- */

    function updateGalleryDots() {
        const lastIndex =
            getGalleryLastIndex();

        galleryDots.forEach((dot, index) => {
            const isActive =
                index === currentGalleryIndex &&
                index <= lastIndex;

            dot.classList.toggle(
                "is_active_4",
                isActive
            );
        });
    }


    /* ---------------------------------
       특정 위치로 이동
    --------------------------------- */

    function moveGalleryTo(
        index,
        useAnimation = true
    ) {
        const lastIndex =
            getGalleryLastIndex();

        currentGalleryIndex = Math.max(
            0,
            Math.min(index, lastIndex)
        );

        currentGalleryTranslateX =
            getGalleryTranslateByIndex(
                currentGalleryIndex
            );

        galleryTrack.style.transition =
            useAnimation
                ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";

        galleryTrack.style.transform =
            `translate3d(-${currentGalleryTranslateX}px, 0, 0)`;

        updateGalleryDots();
    }


    /* ---------------------------------
       다음 슬라이드 이동
    --------------------------------- */

    function moveToNextGallerySlide() {
        const lastIndex =
            getGalleryLastIndex();

        if (lastIndex <= 0) {
            return;
        }

        if (currentGalleryIndex >= lastIndex) {
            moveGalleryTo(0);
        } else {
            moveGalleryTo(
                currentGalleryIndex + 1
            );
        }
    }


    /* ---------------------------------
       자동 재생 시작
    --------------------------------- */

    function startGalleryAutoplay() {
        stopGalleryAutoplay();

        if (isMobileGalleryLayout()) {
            return;
        }

        if (getGalleryLastIndex() <= 0) {
            return;
        }

        autoplayTimer = window.setInterval(
            moveToNextGallerySlide,
            autoplayDelay
        );
    }


    /* ---------------------------------
       자동 재생 정지
    --------------------------------- */

    function stopGalleryAutoplay() {
        if (!autoplayTimer) {
            return;
        }

        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
    }


    /* ---------------------------------
       도트 클릭
    --------------------------------- */

    galleryDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            const lastIndex =
                getGalleryLastIndex();

            if (index > lastIndex) {
                return;
            }

            moveGalleryTo(index);
            startGalleryAutoplay();
        });
    });


    /* ---------------------------------
       마우스·터치 위치 가져오기
    --------------------------------- */

    function getGalleryPointerX(event) {
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

    function startGalleryDrag(event) {
        if (isMobileGalleryLayout()) {
            return;
        }

        isDragging = true;
        hasDragged = false;

        startX =
            getGalleryPointerX(event);

        currentX = startX;

        dragStartTranslateX =
            currentGalleryTranslateX;

        galleryTrack.classList.add(
            "is_dragging"
        );

        galleryTrack.style.transition =
            "none";

        stopGalleryAutoplay();
    }


    /* ---------------------------------
       드래그 중
    --------------------------------- */

    function moveGalleryDrag(event) {
        if (!isDragging) {
            return;
        }

        currentX =
            getGalleryPointerX(event);

        const dragDistance =
            currentX - startX;

        if (Math.abs(dragDistance) > 5) {
            hasDragged = true;
        }

        const maxTranslate =
            getGalleryMaxTranslateX();

        let nextTranslate =
            dragStartTranslateX -
            dragDistance;

        nextTranslate = Math.max(
            0,
            Math.min(
                nextTranslate,
                maxTranslate
            )
        );

        currentGalleryTranslateX =
            nextTranslate;

        galleryTrack.style.transform =
            `translate3d(-${currentGalleryTranslateX}px, 0, 0)`;

        if (event.cancelable) {
            event.preventDefault();
        }
    }


    /* ---------------------------------
       드래그 종료
    --------------------------------- */

    function endGalleryDrag() {
        if (!isDragging) {
            return;
        }

        isDragging = false;

        galleryTrack.classList.remove(
            "is_dragging"
        );

        const moveDistance =
            getGalleryMoveDistance();

        if (moveDistance > 0) {
            const nearestIndex =
                Math.round(
                    currentGalleryTranslateX /
                    moveDistance
                );

            moveGalleryTo(nearestIndex);
        }

        window.setTimeout(() => {
            hasDragged = false;
        }, 50);

        startGalleryAutoplay();
    }


    /* ---------------------------------
       드래그 후 링크 클릭 방지
    --------------------------------- */

    galleryTrack.addEventListener(
        "click",
        event => {
            if (!hasDragged) {
                return;
            }

            const link =
                event.target.closest("a");

            if (link) {
                event.preventDefault();
            }
        }
    );


    /* ---------------------------------
       마우스 드래그 이벤트
    --------------------------------- */

    galleryTrack.addEventListener(
        "mousedown",
        startGalleryDrag
    );

    window.addEventListener(
        "mousemove",
        moveGalleryDrag
    );

    window.addEventListener(
        "mouseup",
        endGalleryDrag
    );


    /* ---------------------------------
       모바일 터치 이벤트
    --------------------------------- */

    galleryTrack.addEventListener(
        "touchstart",
        startGalleryDrag,
        { passive: true }
    );

    galleryTrack.addEventListener(
        "touchmove",
        moveGalleryDrag,
        { passive: false }
    );

    galleryTrack.addEventListener(
        "touchend",
        endGalleryDrag,
        { passive: true }
    );

    galleryTrack.addEventListener(
        "touchcancel",
        endGalleryDrag,
        { passive: true }
    );


    /* ---------------------------------
       이미지 기본 드래그 방지
    --------------------------------- */

    galleryTrack.addEventListener(
        "dragstart",
        event => {
            event.preventDefault();
        }
    );


    /* ---------------------------------
       브라우저 탭 비활성화 시 정지
    --------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stopGalleryAutoplay();
            } else {
                startGalleryAutoplay();
            }
        }
    );


    /* ---------------------------------
       화면 크기 변경 시 위치 재계산
    --------------------------------- */

    window.addEventListener(
        "resize",
        () => {
            window.requestAnimationFrame(() => {
                updateGalleryDotCount();
                moveGalleryTo(
                    currentGalleryIndex,
                    false
                );

                startGalleryAutoplay();
            });
        }
    );


    /* ---------------------------------
       최초 실행
    --------------------------------- */

    updateGalleryDotCount();
    moveGalleryTo(0, false);
    startGalleryAutoplay();
}
