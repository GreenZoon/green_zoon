(function () {

    "use strict";

    const slider = document.querySelector(".section_1");

    if (!slider) {
        return;
    }

    const track = slider.querySelector(".img_wrap_1");
    const slides = Array.from(slider.querySelectorAll(".main_img_1"));
    const dots = Array.from(slider.querySelectorAll(".slide_control_1 .slide_dot"));
    const prevButton = slider.querySelector(".left_arrow");
    const nextButton = slider.querySelector(".right_arrow");
    const toggleButton = slider.querySelector(".slide_toggle");

    if (!track || slides.length === 0) {
        return;
    }

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isPlaying = true;

    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;
    let hasDragged = false;

    const autoPlayDelay = 5000;

    /*
     * 이미지는 index.html에 작성된 img만 사용합니다.
     * JS에서는 이미지 요소나 이미지 경로를 만들지 않습니다.
     */
    function showSlide(index, animate) {

        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        track.style.transition = animate === false
            ? "none"
            : "transform 0.6s ease";

        track.style.transform =
            "translate3d(-" + currentIndex * 100 + "%, 0, 0)";

        slides.forEach(function (slide, slideIndex) {
            const isActive = slideIndex === currentIndex;

            slide.classList.toggle("is_active", isActive);
            slide.setAttribute("aria-hidden", isActive ? "false" : "true");
        });

        dots.forEach(function (dot, dotIndex) {
            const isActive = dotIndex === currentIndex;

            dot.classList.toggle("is_active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1, true);
    }

    function prevSlide() {
        showSlide(currentIndex - 1, true);
    }

    function stopAutoPlay() {

        if (autoPlayTimer) {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function startAutoPlay() {

        stopAutoPlay();

        if (!isPlaying || slides.length < 2) {
            return;
        }

        autoPlayTimer = window.setInterval(nextSlide, autoPlayDelay);
    }

    function restartAutoPlay() {

        if (isPlaying) {
            startAutoPlay();
        }
    }

    function updateToggleButton() {

        if (!toggleButton) {
            return;
        }

        toggleButton.classList.toggle("is_playing", isPlaying);
        toggleButton.classList.toggle("is_paused", !isPlaying);
        toggleButton.setAttribute(
            "aria-label",
            isPlaying ? "자동재생 정지" : "자동재생 시작"
        );
    }

    function startDrag(event) {

        if (event.target.closest(".slide_control_1")) {
            return;
        }

        isDragging = true;
        hasDragged = false;
        startX = event.clientX;
        dragDistance = 0;

        track.style.transition = "none";
        track.setPointerCapture?.(event.pointerId);
        stopAutoPlay();
    }

    function moveDrag(event) {

        if (!isDragging) {
            return;
        }

        dragDistance = event.clientX - startX;

        if (Math.abs(dragDistance) > 5) {
            hasDragged = true;
        }

        const slideWidth = slider.clientWidth;
        const currentPosition = currentIndex * slideWidth;

        track.style.transform =
            "translate3d(" + (-currentPosition + dragDistance) + "px, 0, 0)";
    }

    function endDrag(event) {

        if (!isDragging) {
            return;
        }

        isDragging = false;
        track.releasePointerCapture?.(event.pointerId);

        const slideWidth = slider.clientWidth;
        const dragThreshold = Math.min(80, slideWidth * 0.15);

        if (dragDistance <= -dragThreshold) {
            nextSlide();
        } else if (dragDistance >= dragThreshold) {
            prevSlide();
        } else {
            showSlide(currentIndex, true);
        }

        dragDistance = 0;
        restartAutoPlay();
    }

    nextButton?.addEventListener("click", function () {
        nextSlide();
        restartAutoPlay();
    });

    prevButton?.addEventListener("click", function () {
        prevSlide();
        restartAutoPlay();
    });

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index, true);
            restartAutoPlay();
        });
    });

    toggleButton?.addEventListener("click", function () {

        isPlaying = !isPlaying;

        if (isPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }

        updateToggleButton();
    });

    track.addEventListener("pointerdown", startDrag);
    track.addEventListener("pointermove", moveDrag);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    track.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });

    slider.addEventListener("click", function (event) {

        if (!hasDragged) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        hasDragged = false;
    });

    window.addEventListener("resize", function () {
        showSlide(currentIndex, false);
    });

    showSlide(0, false);
    updateToggleButton();
    startAutoPlay();

})();
