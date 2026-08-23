const section2 = document.querySelector(".section_2");

if (section2) {

    
    /* ---------------------------------
       HTML 요소 가져오기
    --------------------------------- */

    const clippingMask = section2.querySelector(".clipping_mask");
    const buttonTrack = section2.querySelector(".button_wrap_2");

    const serviceButtons = section2.querySelectorAll(".button_2");
    const slideDots = section2.querySelectorAll(".slide_dot");

    const prevButton = section2.querySelector(".left_arrow_2");
    const nextButton = section2.querySelector(".right_arrow_2");

    const contentTitle = section2.querySelector(".tit_wrap_2 h3");
    const contentDescription = section2.querySelector(".tit_wrap_2 p");
    const contentLink = section2.querySelector(".box_li");

    const contentImages = section2.querySelectorAll(".img_box img");


    const serviceData = [
     
        {
            title: "공장 청소",
            link: "/sub_page/Factory_cleane/Factory_man.html",
            description:
                " 공장 청소(주)그린죤은 공장 청소를 전문으로 기계 설비,도색등 다양한 작업의 청소 용역이 가능합니다",
            images:
            
            [
                {
                    src: "img/sub_page/factory_equipment_ing_2.jpg",
                    alt: "공장 기계 설비 청소 현장"
                },
                {
                    src: "img/sub_page/factory_floor_ing_2.jpg",
                    alt: "공장 바닥 장비 청소 현장"
                }
            ]
        },
        {
            title: "카펫·패브릭 청소",
            link: "/sub_page/Cleaning/Carpet_cleaning.html",
            description:
                "카펫과 패브릭의 오염을 제거하여 깨끗하고 쾌적한 환경을 조성합니다.",
            images:
            
            [
                {
                    src: "img/sub_page/cleaning_carpet_ing_2.jpg",
                    alt: "카펫 부분 세척 작업 현장"
                },
                {
                    src: "img/sub_page/cleaning_carpet_ing_3.jpg",
                    alt: "대형 카펫 장비 청소 현장"
                }
            ]
        },
        {
            title: "왁스 코팅",
            link: "/sub_page/Cleaning/Wax_coating.html",
            description:
                " 바닥 표면을 보호하고 광택을 유지하는 왁스 코팅 작업을 제공합니다.",
            images:
            
            [
                {
                    src: "img/sub_page/Wax_job.jpg",
                    alt: "도서관 바닥 왁스 작업 현장"
                },
                {
                    src: "img/sub_page/wax_ing_3.jpg",
                    alt: "공연장 바닥 왁스 작업 현장"
                }
            ]
        },
        {
            title: "비둘기 퇴치",
            link: "/sub_page/Bird/Bird_control.html",
            description:
                "비둘기로 인한 오염과 시설 피해를 복구 및 예방하기위한 작업입니다.",
            images:
            
            [
                {
                    src: "img/mainimgs/bird_spike_before.jpg",
                    alt: "공장 천장 비둘기 방지 작업 전"
                },
                {
                    src: "img/mainimgs/bird_spike_ing.jpg",
                    alt: "공장 천장 비둘기 방지 작업 중"
                }
            ]
        },
        {
            title: "행사장 청소",
            link: "/sub_page/Event_cleane/City_event.html",
            description:
                "미화 인력을 파견한 행사 전후 행사장 정리 및 청소 서비스를 제공합니다.",
            images:
            
            [
                {
                    src: "img/sub_page/Event_cleaning_ing_2.jpg",
                    alt: "경기장 관람석 청소 현장"
                },
                {
                    src: "img/sub_page/Event_cleaning_ing_3.jpg",
                    alt: "행사 시설 벽면 청소 현장"
                }
            ]
        },
        {
            title: "선박·유람선 청소",
            link: "/sub_page/Ship/Ship.html",
            description:
                " 선박과 유람선에 맞춘 전문 청소 서비스를 제공합니다.",
            images:
            
            [
                {
                    src: "img/sub_page/ship_ing_1.jpg",
                    alt: "선박 조타실 청소 현장"
                },
                {
                    src: "img/sub_page/ship_ing_3.jpg",
                    alt: "선박 객실 청소 현장"
                }
            ]
        },       
        {
            title: "건물 외벽 청소",
            link: "/sub_page/Exterior/Commercial.html",
            description:
                "누적된 오염과 묵은 때를 제거하여 깨끗한 외관을 유지합니다.",
            images:
            
            [
                {
                    src: "img/sub_page/building_wall_ing_1.jpg",
                    alt: "건물 저층 외벽 세척 현장"
                },
                {
                    src: "img/sub_page/wall_cleaning_ing_1.jpg",
                    alt: "석재 외벽 세척 현장"
                }
            ]
        },
        {
            title: "시설물 청소",
            link: "/sub_page/Facility/Bridge.html",
            description:
                "다양한 시설물의 특성과 환경에 맞춘 전문 청소 서비스를 제공합니다.",
            images: 
            
            [
                {
                    src: "img/sub_page/Equipment_painting_ing.jpg",
                    alt: "공장 시설물 도색 작업 현장"
                },
                {
                    src: "img/sub_page/tunnel/tunnel_video_thumbnail.jpg",
                    alt: "터널 시설물 보수 작업 현장"
                }
            ]
        }, 
        {
            title: "미화원 파견",
            link: "/sub_page/Dispatch/Dispatch.html",
            description:
                "전문 교육을 거친 선별된 미화 인력을 파견합니다.",
            images: 
            
            [
                {
                    src: "img/mainimgs/dispatch_sanitation_Before.jpg",
                    alt: "미화원 파견 작업 전"
                },
                {
                    src: "img/mainimgs/dispatch_sanitation_ing.jpg",
                    alt: "미화원 파견 작업 중"
                }
            ]
        },
        {
            title: "물탱크 청소",
            link: "/sub_page/Water_tank/Water_tank.html",
            description:
                "물탱크 내부의 오염물을 제거하고<br>위생적인 급수 환경을 관리합니다.",
            images:
            [
                {
                    src: "img/sub_page/water_tank_ing_2.jpg",
                    alt: "저수조 내부 오염 제거 현장"
                },
                {
                    src: "img/sub_page/water_tank_ing_3.jpg",
                    alt: "대형 저수조 세척 현장"
                }
            ]
        },
        {
        
            title: "연못",
            link: "/sub_page/Water_tank/Pond.html",
            description:
                "슬러시,녹조,수초등<br>연못 외관을 해치는 요소를 청소합니다",
            images: 
            
            [
                {
                    src: "img/sub_page/Pond_ing_2.jpg",
                    alt: "정원 연못 내부 청소 현장"
                },
                {
                    src: "img/sub_page/Pond_ing_3.jpg",
                    alt: "석재 연못 청소 현장"
                }
            ]
        },
        {
            title: "소독·방역",
            link: "/sub_page/Disinfection/Disinfection.html",
            description:
                "각 시설과 환경 특성에 맞는 전문 소독 및 방역 서비스를 제공합니다.",
            images: 
            
            [
                {
                    src: "img/sub_page/Disinfection_1.jpg",
                    alt: "사무실 소독 작업 현장"
                },
                {
                    src: "img/sub_page/Disinfection_4.jpg",
                    alt: "공공시설 소독 작업 현장"
                }
            ]
        }


        
    ];


    /* ---------------------------------
       현재 상태값
    --------------------------------- */

    let currentSlideIndex = 0;

    let currentTranslateX = 0;
    let dragStartTranslateX = 0;

    let isDragging = false;
    let hasDragged = false;

    let startX = 0;
    let currentX = 0;

    /* ---------------------------------
    버튼 한 칸의 이동 거리 계산
    --------------------------------- */

    function getButtonMoveDistance() {
        const firstButton = serviceButtons[0];

        if (!firstButton) {
            return 0;
        }

        const buttonWidth =
            firstButton.getBoundingClientRect().width;

        const trackStyle =
            window.getComputedStyle(buttonTrack);

        const gap = parseFloat(trackStyle.gap) || 0;

        return buttonWidth + gap;
    }


    /* ---------------------------------
    화면에 보이는 버튼 개수 계산
    --------------------------------- */

    function getVisibleButtonCount() {
        const moveDistance = getButtonMoveDistance();

        if (moveDistance <= 0) {
            return 1;
        }

        return Math.max(
            1,
            Math.floor(
                clippingMask.clientWidth / moveDistance
            )
        );
    }
        

    /* ---------------------------------
       트랙이 이동할 수 있는 최대 거리
    --------------------------------- */

    function getMaxTranslateX() {
        const trackWidth = buttonTrack.scrollWidth;
        const maskWidth = clippingMask.clientWidth;

        return Math.max(0, trackWidth - maskWidth);
    }

    /* ---------------------------------
    마지막으로 이동 가능한 인덱스
    --------------------------------- */

    function getLastSlideIndex() {
        const moveDistance = getButtonMoveDistance();

        if (moveDistance <= 0) {
            return 0;
        }

        return Math.ceil(
            getMaxTranslateX() / moveDistance
        );
    }


    /* ---------------------------------
       현재 인덱스로 이동 위치 계산
    --------------------------------- */

    function getTranslateByIndex(index) {
        const moveDistance = getButtonMoveDistance();
        const requestedTranslate = index * moveDistance;
        const maxTranslate = getMaxTranslateX();

        return Math.min(requestedTranslate, maxTranslate);
    }



    /* ---------------------------------
    현재 이동 위치에 따라 도트 활성화
    --------------------------------- */

    function updateDots() {
        const dotCount = slideDots.length;

        if (dotCount === 0) {
            return;
        }

        const maxTranslate = getMaxTranslateX();

        const progress = maxTranslate > 0
            ? currentTranslateX / maxTranslate
            : 0;

        const activeDotIndex = Math.round(
            progress * (dotCount - 1)
        );

        slideDots.forEach((dot, index) => {
            dot.classList.toggle(
                "is_active_2",
                index === activeDotIndex
            );
        });
    }


    /* ---------------------------------
       화살표 비활성 상태 변경
    --------------------------------- */

    function updateArrowState() {
        const maxTranslate = getMaxTranslateX();

        if (prevButton) {
            prevButton.disabled = currentTranslateX <= 1;
        }

        if (nextButton) {
            nextButton.disabled =
                currentTranslateX >= maxTranslate - 1;
        }
    }


    /* ---------------------------------
       특정 인덱스로 버튼 목록 이동
    --------------------------------- */

    function moveToSlide(index, useAnimation = true) {
        const lastIndex = getLastSlideIndex();

        currentSlideIndex = Math.max(
            0,
            Math.min(index, lastIndex)
        );

        currentTranslateX =
            getTranslateByIndex(currentSlideIndex);

        buttonTrack.style.transition = useAnimation
            ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";

        buttonTrack.style.transform =
            `translate3d(-${currentTranslateX}px, 0, 0)`;

        updateDots();
        updateArrowState();
    }


    /* ---------------------------------
       아래 콘텐츠 변경
    --------------------------------- */

    function changeServiceContent(index) {
        const selectedData = serviceData[index];

        if (!selectedData) {
            return;
        }

        if (contentTitle) {
            contentTitle.textContent = selectedData.title;
        }

        if (contentDescription) {
            contentDescription.innerHTML =
                selectedData.description;
        }

        if (contentLink) {
            contentLink.href =
                window.GreenZonePaths?.resolve(selectedData.link) ||
                selectedData.link;
        }

        contentImages.forEach((image, imageIndex) => {
            const imageData =
                selectedData.images[imageIndex];

            if (!imageData) {
                return;
            }

            image.src = imageData.src;
            image.alt = imageData.alt;
        });
    }


    /* ---------------------------------
       서비스 버튼 클릭
    --------------------------------- */

    serviceButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (hasDragged) {
                return;
            }

            changeServiceContent(index);

            if (window.innerWidth > 768) {
                return;
            }

            serviceButtons.forEach((item) => {
                item.classList.remove("is_selected");
            });

            button.classList.add("is_selected");

            const link = serviceData[index]?.link;

            if (!link) {
                return;
            }

            window.setTimeout(() => {
                window.location.href =
                    window.GreenZonePaths?.resolve(link) || link;
            }, 160);
        });
    });


    /* ---------------------------------
    좌우 화살표 클릭
    --------------------------------- */

        prevButton?.addEventListener("click", () => {
            moveToSlide(currentSlideIndex - 1);
        });

        nextButton?.addEventListener("click", () => {
            moveToSlide(currentSlideIndex + 1);
        });


    /* ---------------------------------
       도트 클릭
    --------------------------------- */

    slideDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            moveToSlide(index);
        });
    });


    /* ---------------------------------
       마우스·터치 위치 가져오기
    --------------------------------- */

    function getPointerX(event) {
        if (event.touches && event.touches.length > 0) {
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
        if (event.target.closest(".arrow")) {
            return;
        }

        isDragging = true;
        hasDragged = false;

        startX = getPointerX(event);
        currentX = startX;

        dragStartTranslateX = currentTranslateX;

        buttonTrack.classList.add("is_dragging");
        buttonTrack.style.transition = "none";
    }


    /* ---------------------------------
       드래그 중
    --------------------------------- */

    function moveDrag(event) {
        if (!isDragging) {
            return;
        }

        currentX = getPointerX(event);

        const dragDistance = currentX - startX;

        if (Math.abs(dragDistance) > 5) {
            hasDragged = true;
        }

        const maxTranslate = getMaxTranslateX();

        let nextTranslate =
            dragStartTranslateX - dragDistance;

        nextTranslate = Math.max(
            0,
            Math.min(nextTranslate, maxTranslate)
        );

        currentTranslateX = nextTranslate;

        buttonTrack.style.transform =
            `translateX(-${currentTranslateX}px)`;

        if (event.cancelable) {
            event.preventDefault();
        }
    }


    /* ---------------------------------
       드래그 종료
    --------------------------------- */

    function endDrag() {
        if (!isDragging) {
            return;
        }

        isDragging = false;

        buttonTrack.classList.remove("is_dragging");

        const moveDistance = getButtonMoveDistance();

        if (moveDistance <= 0) {
            return;
        }

        /*
        현재 드래그된 위치를 기준으로
        가장 가까운 버튼 위치 계산
        */
        const nearestIndex = Math.round(
            currentTranslateX / moveDistance
        );

        moveToSlide(nearestIndex);

        window.setTimeout(() => {
            hasDragged = false;
        }, 50);
    }


    /* ---------------------------------
       마우스 드래그 이벤트
    --------------------------------- */

    buttonTrack.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", endDrag);


    /* ---------------------------------
       모바일 터치 이벤트
    --------------------------------- */

    buttonTrack.addEventListener(
        "touchstart",
        startDrag,
        { passive: true }
    );

    buttonTrack.addEventListener(
        "touchmove",
        moveDrag,
        { passive: false }
    );

    buttonTrack.addEventListener(
        "touchend",
        endDrag,
        { passive: true }
    );

    buttonTrack.addEventListener(
        "touchcancel",
        endDrag,
        { passive: true }
    );


    /* ---------------------------------
       브라우저 기본 이미지 드래그 방지
    --------------------------------- */

    buttonTrack.addEventListener("dragstart", event => {
        event.preventDefault();
    });


    /* ---------------------------------
       화면 크기가 바뀌면 위치 재계산
    --------------------------------- */

    window.addEventListener("resize", () => {
        moveToSlide(currentSlideIndex, false);
    });


    /* ---------------------------------
       최초 실행
    --------------------------------- */

    moveToSlide(0, false);
    changeServiceContent(0);
    
}
