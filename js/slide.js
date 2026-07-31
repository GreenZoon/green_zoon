
const slider = document.querySelector(".section_1");

console.log("slide.js 연결됨");
console.log(slider);

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

document.querySelectorAll('.client_wrap').forEach(function (clientWrap) {

    const clientGroup = clientWrap.querySelector('.client_group_7');

    if (!clientGroup) {
        return;
    }

    const clonedGroup = clientGroup.cloneNode(true);

    /* 복제 이미지는 스크린 리더에서 중복으로 읽지 않도록 처리 */
    clonedGroup.setAttribute('aria-hidden', 'true');

    clientWrap.appendChild(clonedGroup);

});