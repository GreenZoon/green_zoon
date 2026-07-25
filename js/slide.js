
const slider = document.querySelector(".section_1");
console.log("slide.js 연결됨");
console.log(document.querySelector(".section_1"));

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

    let touchStartX = 0;
    let touchEndX = 0;

    // 현재 슬라이드 표시
    function showSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // 슬라이드 트랙 이동
        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        // 현재 슬라이드에 활성 클래스 적용
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "is_active",
                slideIndex === currentIndex
            );
        });

        // 현재 페이지 바에 활성 클래스 적용
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle(
                "is_active",
                dotIndex === currentIndex
            );
        });
    }

    // 다음 슬라이드
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // 이전 슬라이드
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 자동재생 시작
    function startAutoPlay() {
        stopAutoPlay();

        autoPlayTimer = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    // 자동재생 정지
    function stopAutoPlay() {
        if (autoPlayTimer !== null) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    // 재생·정지 버튼 상태 변경
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

    // 다음 버튼
    nextButton?.addEventListener("click", () => {
        nextSlide();

        if (isPlaying) {
            startAutoPlay();
        }
    });

    // 이전 버튼
    prevButton?.addEventListener("click", () => {
        prevSlide();

        if (isPlaying) {
            startAutoPlay();
        }
    });

    // 페이지 바 클릭
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);

            if (isPlaying) {
                startAutoPlay();
            }
        });
    });

    // 자동재생 정지·재생
    toggleButton?.addEventListener("click", () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }

        updateToggleButton();
    });

    // 모바일 터치 시작
    track.addEventListener(
        "touchstart",
        (event) => {
            touchStartX =
                event.changedTouches[0].clientX;
        },
        { passive: true }
    );

    // 모바일 터치 종료
    track.addEventListener(
        "touchend",
        (event) => {
            touchEndX =
                event.changedTouches[0].clientX;

            const swipeDistance =
                touchEndX - touchStartX;

            const minimumSwipeDistance = 50;

            if (
                Math.abs(swipeDistance) <
                minimumSwipeDistance
            ) {
                return;
            }

            if (swipeDistance < 0) {
                nextSlide();
            } else {
                prevSlide();
            }

            if (isPlaying) {
                startAutoPlay();
            }
        },
        { passive: true }
    );

    // 최초 실행
    showSlide(0);
    updateToggleButton();
    startAutoPlay();
}