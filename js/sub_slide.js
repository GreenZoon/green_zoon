document.addEventListener("DOMContentLoaded", function () {

    const slideWraps =
        document.querySelectorAll(".slide_wrap");


    slideWraps.forEach(function (wrap) {

        const slider =
            wrap.querySelector(".sub_pag_slide_wrap");

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
            wrap.querySelector(".slide_pagination");

        const dots =
            pagination
                ? pagination.querySelectorAll(".slide_dot")
                : [];


        const originalSlides =
            Array.from(
                slideTrack.querySelectorAll(".sub_pag_img_wrap")
            );

        const slideCount =
            originalSlides.length;


        if (slideCount === 0) return;



        /* =============================
           앞뒤 복제본 생성
        ============================= */

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


        const allSlides =
            slideTrack.querySelectorAll(
                ".sub_pag_img_wrap"
            );


        let currentIndex = 1;

        let isMoving = false;
        let isDragging = false;
        let hasDragged = false;

        let startX = 0;
        let currentX = 0;

        let dragStartPosition = 0;



        /* =============================
           슬라이드 크기
        ============================= */

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



        /* =============================
           위치 계산
        ============================= */

        function getPosition(index) {

            return (
                clippingMask.clientWidth *
                index
            );
        }



        /* =============================
           슬라이드 이동
        ============================= */

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



        /* =============================
           도트 활성화
        ============================= */

        function updateDots() {

            let realIndex =
                currentIndex - 1;


            if (realIndex < 0) {

                realIndex =
                    slideCount - 1;
            }


            if (realIndex >= slideCount) {

                realIndex = 0;
            }


            dots.forEach(function (
                dot,
                index
            ) {

                dot.classList.toggle(
                    "is_active",
                    index === realIndex
                );

            });
        }



        /* =============================
           무한 슬라이드 처리
        ============================= */

        slideTrack.addEventListener(
            "transitionend",
            function () {

                isMoving = false;


                /* 마지막 → 첫 번째 */

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


                /* 첫 번째 → 마지막 */

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



        /* =============================
           다음 버튼
        ============================= */

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



        /* =============================
           이전 버튼
        ============================= */

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



        /* =============================
           도트 클릭
        ============================= */

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



        /* =============================
           포인터 X값
        ============================= */

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



        /* =============================
           드래그 시작
        ============================= */

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



        /* =============================
           드래그 중
        ============================= */

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


            slideTrack.style.transform =
                `translate3d(-${nextPosition}px, 0, 0)`;


            if (event.cancelable) {

                event.preventDefault();
            }
        }



        /* =============================
           드래그 종료
        ============================= */

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


            /* 15% 이상 밀면 이동 */

            const threshold =
                slideWidth * 0.15;


            if (
                dragDistance < -threshold
            ) {

                moveSlide(
                    currentIndex + 1
                );

            } else if (
                dragDistance > threshold
            ) {

                moveSlide(
                    currentIndex - 1
                );

            } else {

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



        /* =============================
           마우스
        ============================= */

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



        /* =============================
           모바일 터치
        ============================= */

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



        /* =============================
           이미지 자체 드래그 방지
        ============================= */

        slideTrack.addEventListener(
            "dragstart",
            function (event) {

                event.preventDefault();
            }
        );



        /* =============================
           드래그 후 링크 클릭 방지
        ============================= */

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



        /* =============================
           반응형
        ============================= */

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



        /* =============================
           최초 실행
        ============================= */

        setSlideSize();

        moveSlide(
            currentIndex,
            false
        );

    });

});