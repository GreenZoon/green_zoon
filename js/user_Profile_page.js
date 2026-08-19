(function () {
    "use strict";

    if (!window.GreenZoneAuth?.requireLogin(window.location.href)) {
        return;
    }

    const user = window.GreenZoneAuth.getUser();
    document.body.classList.remove("is_auth_checking");

    const name = document.getElementById("profile_name");
    const email = document.getElementById("profile_email");
    const form = document.getElementById("profile_form");
    const editButton = document.getElementById("profile_edit");
    const saveButton = document.querySelector(".profile_save");
    const profileKey = "greenZoneProfile";
    let profile = {};

    try {
        profile = JSON.parse(localStorage.getItem(profileKey) || "{}");
    } catch (error) {
        profile = {};
    }

    if (name) name.value = profile.name || user.name || "";
    if (email) email.textContent = user.email || "-";

    function setEditMode(editing) {
        if (!form) return;

        form.querySelectorAll("input:not([name='grade']), textarea").forEach(function (control) {
            control.readOnly = !editing;
        });

        if (saveButton) saveButton.hidden = !editing;
        if (saveButton && editing) saveButton.textContent = "프로필 저장";
        if (editButton) editButton.textContent = editing ? "편집 취소" : "프로필 편집";
        form.classList.toggle("is_editing", editing);
    }

    editButton?.addEventListener("click", function () {
        setEditMode(!form?.classList.contains("is_editing"));
    });

    if (form) {
        ["company", "manager", "phone", "address"].forEach(function (field) {
            if (form.elements[field]) form.elements[field].value = profile[field] || "";
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const values = Object.fromEntries(new FormData(form).entries());
            localStorage.setItem(profileKey, JSON.stringify(values));
            window.GreenZoneAuth.login(Object.assign({}, user, { name: values.name || user.name }), true);
            if (saveButton) saveButton.textContent = "저장되었습니다";
            setEditMode(false);
        });
    }

    document.getElementById("profile_logout")?.addEventListener("click", function () {
        window.GreenZoneAuth.logout();
        window.location.assign(
            window.GreenZonePaths?.resolve("user_page/Login.html") || "Login.html"
        );
    });
})();
