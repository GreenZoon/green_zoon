(function () {

    const mobileWidth = 768;

    /* 작업 갤러리 */

    const gallery = document.querySelector(".mobile_gallery");

    if (gallery) {

        const viewport = gallery.querySelector(".mobile_gallery_viewport");
        const track = gallery.querySelector(".mobile_gallery_wrap");
        const cards = [...gallery.querySelectorAll(".mobile_gallery_box")];
        const dots = [...gallery.querySelectorAll(".mobile_dots .slide_dot")];

        let currentIndex = 0;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let startTranslate = 0;
        let currentTranslate = 0;
        let dragging = false;
        let moved = false;
        let dragDirection = "";
        let lastTouchTime = 0;

        function gap() {
            return parseFloat(getComputedStyle(track).gap) || 0;
        }

        function distance() {
            return (cards[0]?.getBoundingClientRect().width || 0) + gap();
        }

        function viewportWidth() {
            return viewport?.clientWidth || 0;
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
            const limit = maxTranslate();
            const progress = limit > 0
                ? currentTranslate / limit
                : 0;
            const activeIndex = Math.round(progress * (dots.length - 1));

            dots.forEach((dot, index) => {
                const active = index === activeIndex;

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

        function pointerX(event) {
            if (event.touches?.length) {
                return event.touches[0].clientX;
            }

            if (event.changedTouches?.length) {
                return event.changedTouches[0].clientX;
            }

            return event.clientX;
        }

        function pointerY(event) {
            if (event.touches?.length) {
                return event.touches[0].clientY;
            }

            if (event.changedTouches?.length) {
                return event.changedTouches[0].clientY;
            }

            return event.clientY;
        }

        function startDrag(event) {
            if (window.innerWidth > mobileWidth) {
                return;
            }

            if (event.type === "mousedown" && Date.now() - lastTouchTime < 500) {
                return;
            }

            if (event.type === "touchstart") {
                lastTouchTime = Date.now();
            }

            dragging = true;
            moved = false;
            dragDirection = "";
            startX = pointerX(event);
            startY = pointerY(event);
            currentX = startX;
            startTranslate = currentTranslate;
            viewport.classList.add("is_dragging");
            track.style.transition = "none";
        }

        function moveDrag(event) {
            if (!dragging) {
                return;
            }

            currentX = pointerX(event);

            const deltaX = currentX - startX;
            const deltaY = pointerY(event) - startY;

            if (!dragDirection && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 6) {
                dragDirection = Math.abs(deltaX) > Math.abs(deltaY)
                    ? "horizontal"
                    : "vertical";
            }

            if (dragDirection !== "horizontal") {
                return;
            }

            if (Math.abs(deltaX) > 5) {
                moved = true;
            }

            currentTranslate = Math.max(
                0,
                Math.min(startTranslate - deltaX, maxTranslate())
            );

            track.style.transform = `translate3d(${-currentTranslate}px, 0, 0)`;

            if (moved && event.cancelable) {
                event.preventDefault();
            }
        }

        function endDrag() {
            if (!dragging) {
                return;
            }

            dragging = false;
            viewport.classList.remove("is_dragging");
            track.style.transition = "";

            const dragDistance = currentX - startX;
            const step = distance();

            if (step <= 0) {
                return;
            }

            const threshold = Math.min(40, step * 0.18);

            if (dragDirection === "horizontal" && Math.abs(dragDistance) >= threshold) {
                const movedCards = Math.max(1, Math.round(Math.abs(dragDistance) / step));
                const direction = dragDistance < 0 ? 1 : -1;

                moveTo(currentIndex + direction * movedCards);
            } else {
                moveTo(currentIndex);
            }

            window.setTimeout(() => {
                moved = false;
            }, 50);
        }

        viewport.addEventListener("mousedown", startDrag);
        window.addEventListener("mousemove", moveDrag);
        window.addEventListener("mouseup", endDrag);

        viewport.addEventListener("touchstart", startDrag, { passive: true });
        viewport.addEventListener("touchmove", moveDrag, { passive: false });
        viewport.addEventListener("touchend", endDrag, { passive: true });
        viewport.addEventListener("touchcancel", endDrag, { passive: true });

        track.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });

        track.addEventListener("click", (event) => {
            if (moved || event.target.closest("a[href='#']")) {
                event.preventDefault();
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                const ratio = dots.length <= 1
                    ? 0
                    : index / (dots.length - 1);
                const step = distance();
                const targetIndex = step > 0
                    ? Math.round((maxTranslate() * ratio) / step)
                    : 0;

                moveTo(targetIndex);
            });
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

    /* 전체선택은 서비스 선택 상태를 초기화 */

    document.querySelector(".mobile_all")?.addEventListener("click", () => {
        document.querySelectorAll(".section_2 .button_2.is_selected")
            .forEach((button) => button.classList.remove("is_selected"));
    });

})();
