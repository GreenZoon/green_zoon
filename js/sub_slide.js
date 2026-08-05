document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".sub_pag_slide_wrap");
    const clippingMask = slider.querySelector(".sub_pag_clipping_mask");
    const slideTrack = slider.querySelector(".img_con_wrap");
    const slides = slideTrack.querySelectorAll(".sub_pag_img_wrap");

    const prevButton = slider.querySelector(".left_arrow_2");
    const nextButton = slider.querySelector(".right_arrow_2");

    const pagination = document.querySelector(".slide_pagination_4");
    const dots = pagination.querySelectorAll(".slide_dot");

    let currentIndex = 0;

    function moveSlide(index) {
        const slideWidth = clippingMask.clientWidth;

        currentIndex = index;

        slideTrack.style.transform =
            `translateX(-${slideWidth * currentIndex}px)`;

        dots.forEach(function (dot, dotIndex) {
            dot.classList.toggle(
                "is_active_4",
                dotIndex === currentIndex
            );
        });
    }

    nextButton.addEventListener("click", function () {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        moveSlide(currentIndex);
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }

        moveSlide(currentIndex);
    });

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            moveSlide(index);
        });
    });

    window.addEventListener("resize", function () {
        moveSlide(currentIndex);
    });

    moveSlide(0);
});