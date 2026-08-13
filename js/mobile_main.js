(function () {

    const mobileWidth = 1024;

    /* 작업 갤러리 */

    const gallery = document.querySelector(".mobile_gallery");

    if (gallery) {

        const track = gallery.querySelector(".mobile_gallery_wrap");
        const cards = [...gallery.querySelectorAll(".mobile_gallery_box")];
        const dots = [...gallery.querySelectorAll(".mobile_dots .slide_dot")];

        let currentIndex = 0;
        let startX = 0;
        let startTranslate = 0;
        let currentTranslate = 0;
        let dragging = false;
        let moved = false;

        function gap() {
            return parseFloat(getComputedStyle(track).gap) || 0;
        }

        function distance() {
            return (cards[0]?.getBoundingClientRect().width || 0) + gap();
        }

        function viewportWidth() {
            const style = getComputedStyle(gallery);

            return gallery.clientWidth
                - (parseFloat(style.paddingLeft) || 0)
                - (parseFloat(style.paddingRight) || 0);
        }

        function maxTranslate() {
            return Math.max(0, track.scrollWidth - viewportWidth());
        }

        function lastIndex() {
            const step = distance();

            return step
                ? Math.min(cards.length - 1, Math.ceil(maxTranslate() / step))
                : 0;
        }

        function translateFor(index) {
            return Math.min(index * distance(), maxTranslate());
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                const active = index === currentIndex;

                dot.classList.toggle("is_active", active);
                dot.setAttribute("aria-current", active ? "true" : "false");
            });
        }

        function moveTo(index) {
            currentIndex = Math.max(0, Math.min(index, lastIndex()));
            currentTranslate = translateFor(currentIndex);
            track.style.transform = `translate3d(${-currentTranslate}px, 0, 0)`;
            updateDots();
        }

        track.addEventListener("pointerdown", (event) => {
            if (window.innerWidth > mobileWidth) {
                return;
            }

            dragging = true;
            moved = false;
            startX = event.clientX;
            startTranslate = currentTranslate;
            track.classList.add("is_dragging");
            track.setPointerCapture(event.pointerId);
        });

        track.addEventListener("pointermove", (event) => {
            if (!dragging) {
                return;
            }

            const delta = event.clientX - startX;

            if (Math.abs(delta) > 5) {
                moved = true;
            }

            currentTranslate = Math.max(
                0,
                Math.min(startTranslate - delta, maxTranslate())
            );

            track.style.transform = `translate3d(${-currentTranslate}px, 0, 0)`;

            if (moved && event.cancelable) {
                event.preventDefault();
            }
        });

        function endDrag(event) {
            if (!dragging) {
                return;
            }

            dragging = false;
            track.classList.remove("is_dragging");

            if (track.hasPointerCapture(event.pointerId)) {
                track.releasePointerCapture(event.pointerId);
            }

            moveTo(Math.round(currentTranslate / distance()));
        }

        track.addEventListener("pointerup", endDrag);
        track.addEventListener("pointercancel", endDrag);

        track.addEventListener("click", (event) => {
            if (moved || event.target.closest("a[href='#']")) {
                event.preventDefault();
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => moveTo(index));
        });

        window.addEventListener("resize", () => moveTo(currentIndex));
        moveTo(0);
    }

    /* 커뮤니티 키워드 */

    const community = document.querySelector(".section_4");

    if (community) {

        const filterButtons = [...community.querySelectorAll(".mobile_filter button")];
        const posts = [...community.querySelectorAll(".box_4[data-keyword]")];
        let selectedKeyword = "전체";

        function filterPosts(keyword) {
            selectedKeyword = keyword;

            filterButtons.forEach((button) => {
                button.classList.toggle("is_active", button.textContent.trim() === keyword);
            });

            if (window.innerWidth > mobileWidth) {
                posts.forEach((post) => post.removeAttribute("hidden"));
                return;
            }

            posts.forEach((post, index) => {
                const show = keyword === "전체"
                    ? [0, 3, 4].includes(index)
                    : post.dataset.keyword === keyword;

                post.toggleAttribute("hidden", !show);
            });
        }

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                filterPosts(button.textContent.trim());
            });
        });

        window.addEventListener("resize", () => filterPosts(selectedKeyword));
        filterPosts("전체");
    }

    /* 미화원 파견 선택 */

    const dispatchButton = document.querySelector(
        ".mobile_box_side .mobile_box:first-child"
    );

    dispatchButton?.addEventListener("click", (event) => {
        if (dispatchButton.getAttribute("href") === "#") {
            event.preventDefault();
        }

        const selected = dispatchButton.classList.toggle("is_selected");
        dispatchButton.setAttribute("aria-pressed", String(selected));
    });

    /* 전체선택은 서비스 선택 상태를 초기화 */

    document.querySelector(".mobile_all")?.addEventListener("click", () => {
        document.querySelectorAll(".section_2 .button_2.is_selected")
            .forEach((button) => button.classList.remove("is_selected"));
    });

})();
