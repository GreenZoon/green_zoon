document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".sub_pag_slide_wrap");

    if (!slider) return;


    const clippingMask =
        slider.querySelector(".sub_pag_clipping_mask");

    const slideTrack =
        slider.querySelector(".img_con_wrap");

    const prevButton =
        slider.querySelector(".left_arrow_2");

    const nextButton =
        slider.querySelector(".right_arrow_2");

    const pagination =
        document.querySelector(".slide_pagination_4");

    const dots =
        pagination
            ? pagination.querySelectorAll(".slide_dot")
            : [];


    /* ---------------------------------
       실제 슬라이드 가져오기
    --------------------------------- */

    const originalSlides =
        Array.from(
            slideTrack.querySelectorAll(".sub_pag_img_wrap")
        );

    const slideCount =
        originalSlides.length;

    if (slideCount === 0) return;


    /* ---------------------------------
       앞뒤 복제 슬라이드 생성
    --------------------------------- */

    const firstClone =
        originalSlides[0].cloneNode(true);

    const lastClone =
        originalSlides[slideCount - 1].cloneNode(true);


    firstClone.classList.add("is_clone");
    lastClone.classList.add("is_clone");


    slideTrack.appendChild(firstClone);
    slideTrack.insertBefore(
        lastClone,
        slideTrack.firstChild
    );


    /*

        최종 구조

        0 : 마지막 복제
        1 : 실제 1번
        2 : 실제 2번
        3 : 실제 3번
        4 : 첫 번째 복제

    */

    const allSlides =
        slideTrack.querySelectorAll(".sub_pag_img_wrap");


    let currentIndex = 1;

    let isMoving = false;

    let isDragging = false;
    let hasDragged = false;

    let startX = 0;
    let currentX = 0;

    let dragStartPosition = 0;



    /* ---------------------------------
       슬라이드 크기 설정
    --------------------------------- */

    function setSlideSize() {

        const slideWidth =
            clippingMask.clientWidth;


        allSlides.forEach(function (slide) {

            slide.style.width =
                `${slideWidth}px`;

            slide.style.flex =
                `0 0 ${slideWidth}px`;
        });


        slideTrack.style.width =
            `${slideWidth * allSlides.length}px`;
    }



    /* ---------------------------------
       현재 위치 계산
    --------------------------------- */

    function getPosition(index) {

        return (
            clippingMask.clientWidth *
            index
        );
    }



    /* ---------------------------------
       슬라이드 이동
    --------------------------------- */

    function moveSlide(
        index,
        animate = true
    ) {

        currentIndex = index;


        if (animate) {

            slideTrack.style.transition =
                "transform 0.4s ease";

            isMoving = true;

        } else {

            slideTrack.style.transition =
                "none";
        }


        const position =
            getPosition(currentIndex);


        slideTrack.style.transform =
            `translate3d(-${position}px, 0, 0)`;


        updateDots();
    }



    /* ---------------------------------
       도트 활성화
    --------------------------------- */

    function updateDots() {

        let realIndex =
            currentIndex - 1;


        /*
            앞쪽 마지막 복제본
        */

        if (realIndex < 0) {

            realIndex =
                slideCount - 1;
        }


        /*
            뒤쪽 첫 번째 복제본
        */

        if (realIndex >= slideCount) {

            realIndex = 0;
        }


        dots.forEach(function (
            dot,
            index
        ) {

            dot.classList.toggle(
                "is_active_4",
                index === realIndex
            );
        });
    }



    /* ---------------------------------
       무한 슬라이드 핵심

       복제 슬라이드까지 이동이 끝나면
       진짜 슬라이드 위치로 순간 이동
    --------------------------------- */

    slideTrack.addEventListener(
        "transitionend",
        function () {

            isMoving = false;


            /*
                첫 번째 슬라이드 복제본에 도착
                → 진짜 첫 번째로 순간이동
            */

            if (
                currentIndex ===
                allSlides.length - 1
            ) {

                currentIndex = 1;

                moveSlide(
                    currentIndex,
                    false
                );
            }


            /*
                마지막 슬라이드 복제본에 도착
                → 진짜 마지막으로 순간이동
            */

            if (currentIndex === 0) {

                currentIndex =
                    slideCount;

                moveSlide(
                    currentIndex,
                    false
                );
            }
        }
    );



    /* ---------------------------------
       다음 버튼
    --------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                if (isMoving) return;

                moveSlide(
                    currentIndex + 1
                );
            }
        );
    }



    /* ---------------------------------
       이전 버튼
    --------------------------------- */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                if (isMoving) return;

                moveSlide(
                    currentIndex - 1
                );
            }
        );
    }



    /* ---------------------------------
       도트 클릭
    --------------------------------- */

    dots.forEach(function (
        dot,
        index
    ) {

        dot.addEventListener(
            "click",
            function () {

                moveSlide(
                    index + 1
                );
            }
        );
    });



    /* ---------------------------------
       마우스 / 터치 위치
    --------------------------------- */

    function getPointerX(event) {

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

    function startDrag(event) {

        if (isMoving) return;


        isDragging = true;
        hasDragged = false;


        startX =
            getPointerX(event);

        currentX =
            startX;


        dragStartPosition =
            getPosition(currentIndex);


        slideTrack.style.transition =
            "none";


        slideTrack.classList.add(
            "is_dragging"
        );
    }



    /* ---------------------------------
       드래그 중
    --------------------------------- */

    function moveDrag(event) {

        if (!isDragging) return;


        currentX =
            getPointerX(event);


        const dragDistance =
            currentX - startX;


        if (
            Math.abs(dragDistance) > 5
        ) {

            hasDragged = true;
        }


        const nextPosition =
            dragStartPosition -
            dragDistance;


        /*
            이번에는 양 끝 제한 없음.

            복제 슬라이드가 있기 때문에
            끝까지 그대로 드래그 가능.
        */

        slideTrack.style.transform =
            `translate3d(-${nextPosition}px, 0, 0)`;


        if (event.cancelable) {

            event.preventDefault();
        }
    }



    /* ---------------------------------
       드래그 종료
    --------------------------------- */

    function endDrag(event) {

        if (!isDragging) return;


        isDragging = false;


        slideTrack.classList.remove(
            "is_dragging"
        );


        const endX =
            getPointerX(event);


        const dragDistance =
            endX - startX;


        const slideWidth =
            clippingMask.clientWidth;


        /*
            슬라이드 너비의 15% 이상 움직이면
            다음/이전으로 넘어감
        */

        const threshold =
            slideWidth * 0.15;


        if (
            dragDistance < -threshold
        ) {

            /*
                왼쪽으로 밀기
                → 다음 슬라이드
            */

            moveSlide(
                currentIndex + 1
            );

        } else if (
            dragDistance > threshold
        ) {

            /*
                오른쪽으로 밀기
                → 이전 슬라이드
            */

            moveSlide(
                currentIndex - 1
            );

        } else {

            /*
                조금만 움직였으면
                원래 위치로 복귀
            */

            moveSlide(
                currentIndex
            );
        }


        window.setTimeout(
            function () {

                hasDragged = false;

            },
            100
        );
    }



    /* ---------------------------------
       마우스 드래그
    --------------------------------- */

    clippingMask.addEventListener(
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



    /* ---------------------------------
       모바일 스와이프
    --------------------------------- */

    clippingMask.addEventListener(
        "touchstart",
        startDrag,
        {
            passive: true
        }
    );


    clippingMask.addEventListener(
        "touchmove",
        moveDrag,
        {
            passive: false
        }
    );


    clippingMask.addEventListener(
        "touchend",
        endDrag,
        {
            passive: true
        }
    );


    clippingMask.addEventListener(
        "touchcancel",
        endDrag,
        {
            passive: true
        }
    );



    /* ---------------------------------
       이미지 기본 드래그 방지
    --------------------------------- */

    slideTrack.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();
        }
    );



    /* ---------------------------------
       드래그 후 링크 실행 방지
    --------------------------------- */

    slideTrack.addEventListener(
        "click",
        function (event) {

            if (!hasDragged) return;


            const link =
                event.target.closest("a");


            if (link) {

                event.preventDefault();
            }
        }
    );



    /* ---------------------------------
       화면 크기 변경
    --------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            setSlideSize();

            moveSlide(
                currentIndex,
                false
            );
        }
    );



    /* ---------------------------------
       최초 실행
    --------------------------------- */

    setSlideSize();

    moveSlide(
        currentIndex,
        false
    );

});