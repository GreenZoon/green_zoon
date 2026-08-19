(function () {
    "use strict";

    if (!window.GreenZoneAuth?.requireLogin(window.location.href)) {
        return;
    }

    const user = window.GreenZoneAuth.getUser();
    const isAdmin = user.role === "admin"
        || user.email?.toLowerCase() === "narasophiah@gmail.com";
    const form = document.getElementById("profile_form");
    const editButton = document.getElementById("profile_edit");
    const modal = document.getElementById("profile_modal");
    const editForm = document.getElementById("profile_edit_form");
    const profileKey = `greenZoneProfile:${user.email || "member"}`;
    const fields = ["name", "company", "manager", "phone", "address"];
    let profile = {};

    try {
        const savedProfile = localStorage.getItem(profileKey);
        const oldAdminProfile = isAdmin ? localStorage.getItem("greenZoneProfile") : null;
        profile = JSON.parse(savedProfile || oldAdminProfile || "{}");
    } catch (error) {
        profile = {};
    }

    function fillProfile() {
        if (!form) return;

        fields.forEach(function (field) {
            const control = form.elements[field];

            if (control) {
                control.value = profile[field] || (field === "name" ? user.name || "" : "");
            }
        });

        const grade = document.getElementById("profile_grade");
        const email = document.getElementById("profile_email");

        if (grade) grade.value = isAdmin ? "관리자" : "일반회원";
        if (email) email.textContent = user.email || "-";
    }

    function openEditor() {
        if (!isAdmin || !modal || !editForm) return;

        fields.forEach(function (field) {
            if (editForm.elements[field]) {
                editForm.elements[field].value = form?.elements[field]?.value || "";
            }
        });

        modal.showModal();
        editForm.elements.name?.focus();
    }

    function closeEditor() {
        if (modal?.open) modal.close();
    }

    fillProfile();
    document.body.classList.remove("is_auth_checking");

    if (editButton) {
        editButton.hidden = !isAdmin;
        editButton.addEventListener("click", openEditor);
    }

    document.querySelectorAll("[data-profile-close]").forEach(function (button) {
        button.addEventListener("click", closeEditor);
    });

    modal?.addEventListener("click", function (event) {
        if (event.target === modal) closeEditor();
    });

    editForm?.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!isAdmin) return;

        profile = Object.fromEntries(new FormData(editForm).entries());
        localStorage.setItem(profileKey, JSON.stringify(profile));
        window.GreenZoneAuth.login(
            Object.assign({}, user, { name: profile.name || user.name, role: "admin" }),
            true
        );

        fillProfile();
        closeEditor();
    });

    document.getElementById("profile_logout")?.addEventListener("click", function () {
        window.GreenZoneAuth.logout();
        window.location.assign(
            window.GreenZonePaths?.resolve("user_page/Login.html") || "Login.html"
        );
    });
})();
