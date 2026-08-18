
const slider = document.querySelector(".section_1");

if (slider) {
    const track = slider.querySelector(".img_wrap_1");
    const slides = slider.querySelectorAll(".main_img_1");
    const dots = slider.querySelectorAll(".slide_dot");

    const prevButton = slider.querySelector(".left_arrow");
    const nextButton = slider.querySelector(".right_arrow");
    const toggleButton = slider.querySelector(".slide_toggle");

    let currentIndex = 0;
    let isPlaying = true;
    let autoPlayTimer = null;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragDistance = 0;
    let hasDragged = false;

    const dragThreshold = 80;
    const autoPlayDelay = 5000;

    function showSlide(index, useAnimation = true) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        track.style.transition = useAnimation
            ? "transform 0.6s ease"
            : "none";

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "is_active",
                slideIndex === currentIndex
            );
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle(
                "is_active",
                dotIndex === currentIndex
            );
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();

        autoPlayTimer = setInterval(() => {
            nextSlide();
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayTimer !== null) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function updateToggleButton() {
        if (!toggleButton) {
            return;
        }

        toggleButton.classList.toggle(
            "is_playing",
            isPlaying
        );

        toggleButton.classList.toggle(
            "is_paused",
            !isPlaying
        );

        toggleButton.setAttribute(
            "aria-label",
            isPlaying
                ? "자동재생 정지"
                : "자동재생 시작"
        );
    }

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

    function startDrag(event) {
        if (
            event.target.closest(
                ".slide_control"
            )
        ) {
            return;
        }

        isDragging = true;
        hasDragged = false;

        startX = getPointerX(event);
        currentX = startX;
        dragDistance = 0;

        track.style.transition = "none";

        if (isPlaying) {
            stopAutoPlay();
        }
    }

    function moveDrag(event) {
        if (!isDragging) {
            return;
        }

        currentX = getPointerX(event);
        dragDistance = currentX - startX;

        if (Math.abs(dragDistance) > 5) {
            hasDragged = true;
        }

        const sliderWidth = slider.clientWidth;
        const basePosition =
            currentIndex * sliderWidth;

        track.style.transform =
            `translateX(${-(basePosition) + dragDistance}px)`;

        if (event.cancelable) {
            event.preventDefault();
        }
    }

    function endDrag() {
        if (!isDragging) {
            return;
        }

        isDragging = false;

        if (dragDistance <= -dragThreshold) {
            nextSlide();
        } else if (
            dragDistance >= dragThreshold
        ) {
            prevSlide();
        } else {
            showSlide(currentIndex);
        }

        if (isPlaying) {
            startAutoPlay();
        }

        dragDistance = 0;
    }

    nextButton?.addEventListener(
        "click",
        () => {
            nextSlide();

            if (isPlaying) {
                startAutoPlay();
            }
        }
    );

    prevButton?.addEventListener(
        "click",
        () => {
            prevSlide();

            if (isPlaying) {
                startAutoPlay();
            }
        }
    );

    dots.forEach((dot, index) => {
        dot.addEventListener(
            "click",
            () => {
                showSlide(index);

                if (isPlaying) {
                    startAutoPlay();
                }
            }
        );
    });

    toggleButton?.addEventListener(
        "click",
        () => {
            isPlaying = !isPlaying;

            if (isPlaying) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }

            updateToggleButton();
        }
    );

    track.addEventListener(
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

    track.addEventListener(
        "mouseleave",
        () => {
            if (isDragging) {
                endDrag();
            }
        }
    );

    track.addEventListener(
        "touchstart",
        startDrag,
        {
            passive: true
        }
    );

    track.addEventListener(
        "touchmove",
        moveDrag,
        {
            passive: false
        }
    );

    track.addEventListener(
        "touchend",
        endDrag,
        {
            passive: true
        }
    );

    track.addEventListener(
        "touchcancel",
        endDrag,
        {
            passive: true
        }
    );

    track.addEventListener(
        "dragstart",
        (event) => {
            event.preventDefault();
        }
    );

    slider.addEventListener(
        "click",
        (event) => {
            if (hasDragged) {
                event.preventDefault();
                event.stopPropagation();
                hasDragged = false;
            }
        }
    );

    window.addEventListener(
        "resize",
        () => {
            showSlide(
                currentIndex,
                false
            );
        }
    );

    showSlide(0, false);
    updateToggleButton();
    startAutoPlay();
}


// -----------------------------------------

const certificationSlider = document.querySelector(".section_end");

if (certificationSlider) {
    const certificationWrap =
        certificationSlider.querySelector(".certification_wrap");

    const leftButton =
        certificationSlider.querySelector(".left_arrow_2");

    const rightButton =
        certificationSlider.querySelector(".right_arrow_2");

    const originalItems = Array.from(
        certificationWrap.querySelectorAll(".certification")
    );

    if (originalItems.length > 0) {
        const originalLength = originalItems.length;

        /* 원본 전체를 앞뒤로 한 세트씩 복제 */
        const frontClones = originalItems.map((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");

            return clone;
        });

        const backClones = originalItems.map((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");

            return clone;
        });

        /* 앞쪽 복제본 삽입 */
        frontClones.reverse().forEach((clone) => {
            certificationWrap.insertBefore(
                clone,
                certificationWrap.firstChild
            );
        });

        /* 뒤쪽 복제본 삽입 */
        backClones.forEach((clone) => {
            certificationWrap.appendChild(clone);
        });

        let currentIndex = originalLength;
        let autoSlideTimer = null;
        let isMoving = false;

        function getMoveDistance() {
            const firstItem =
                certificationWrap.querySelector(".certification");

            const wrapStyle =
                window.getComputedStyle(certificationWrap);

            const gap = parseFloat(wrapStyle.columnGap) || 0;

            return firstItem.getBoundingClientRect().width + gap;
        }

        function updateCertificationSlide(withAnimation = true) {
            const moveDistance = getMoveDistance();

            certificationWrap.style.transition = withAnimation
                ? "transform 0.4s ease"
                : "none";

            certificationWrap.style.transform =
                `translateX(-${currentIndex * moveDistance}px)`;
        }

        function moveCertificationNext() {
            if (isMoving) {
                return;
            }

            isMoving = true;
            currentIndex++;

            updateCertificationSlide(true);
        }

        function moveCertificationPrevious() {
            if (isMoving) {
                return;
            }

            isMoving = true;
            currentIndex--;

            updateCertificationSlide(true);
        }

        certificationWrap.addEventListener("transitionend", function () {
            /*
             * 뒤쪽 복제 세트로 들어가면
             * 같은 모양의 원본 위치로 순간 이동
             */
            if (currentIndex >= originalLength * 2) {
                currentIndex -= originalLength;
                updateCertificationSlide(false);
            }

            /*
             * 앞쪽 복제 세트로 들어가면
             * 같은 모양의 원본 위치로 순간 이동
             */
            if (currentIndex < originalLength) {
                currentIndex += originalLength;
                updateCertificationSlide(false);
            }

            isMoving = false;
        });

        function startCertificationAutoSlide() {
            clearInterval(autoSlideTimer);

            autoSlideTimer = setInterval(function () {
                moveCertificationNext();
            }, 3000);
        }

        rightButton?.addEventListener("click", function () {
            moveCertificationNext();
            startCertificationAutoSlide();
        });

        leftButton?.addEventListener("click", function () {
            moveCertificationPrevious();
            startCertificationAutoSlide();
        });

        /* 이미지 크기가 계산된 후 초기 위치 설정 */
        window.addEventListener("load", function () {
            updateCertificationSlide(false);
            startCertificationAutoSlide();
        });

        /* 화면 크기가 바뀌면 현재 위치 다시 계산 */
        window.addEventListener("resize", function () {
            updateCertificationSlide(false);
        });
    }
}
