(function () {
    "use strict";

    const form = document.getElementById("login_form");

    if (!form || !window.GreenZoneAuth) {
        return;
    }

    const email = form.elements.email;
    const password = form.elements.password;
    const remember = form.elements.remember;
    const message = document.getElementById("login_message");
    const help = document.getElementById("login_help");
    const signupNotice = document.getElementById("signup_notice");
    const toast = document.getElementById("login_toast");

    function safeReturnUrl() {
        const value = new URLSearchParams(window.location.search).get("returnTo");
        const fallback = window.GreenZonePaths?.resolve("index.html") || "../index.html";

        if (!value) {
            return fallback;
        }

        try {
            const target = new URL(value, window.location.href);
            return target.origin === window.location.origin ? target.href : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function setError(input, text) {
        input.classList.toggle("is_invalid", Boolean(text));
        const error = form.querySelector(`[data-error-for="${input.name}"]`);
        if (error) error.textContent = text;
    }

    function validate() {
        let valid = true;
        setError(email, "");
        setError(password, "");
        message.textContent = "";

        if (!email.validity.valid) {
            setError(email, "이메일 형식의 아이디를 입력해 주세요.");
            valid = false;
        }

        if (password.value.trim().length < 4) {
            setError(password, "비밀번호를 4자 이상 입력해 주세요.");
            valid = false;
        }

        return valid;
    }

    function showToast(text) {
        toast.textContent = text;
        toast.classList.add("is_visible");
    }

    form.addEventListener("input", function (event) {
        if (event.target.matches("input")) {
            setError(event.target, "");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validate()) {
            form.querySelector(".is_invalid")?.focus();
            return;
        }

        const accountName = email.value.trim().split("@")[0] || "그린죤 사용자";
        window.GreenZoneAuth.login({
            email: email.value.trim(),
            name: accountName,
            loggedInAt: new Date().toISOString()
        }, remember.checked);

        showToast("로그인되었습니다.");
        window.setTimeout(function () {
            window.location.assign(safeReturnUrl());
        }, 450);
    });

    document.querySelector("[data-login-help]")?.addEventListener("click", function () {
        help.hidden = !help.hidden;
    });

    document.querySelector("[data-signup]")?.addEventListener("click", function () {
        signupNotice.hidden = !signupNotice.hidden;
    });
})();
