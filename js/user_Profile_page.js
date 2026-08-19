(function () {
    "use strict";

    if (!window.GreenZoneAuth?.requireLogin(window.location.href)) return;

    const user = window.GreenZoneAuth.getUser();
    const isAdmin = user.role === "admin"
        || user.email?.toLowerCase() === "narasophiah@gmail.com";
    const editor = document.getElementById("profile_editor");
    const form = document.getElementById("profile_form");
    const editForm = document.getElementById("profile_edit_form");
    const editButton = document.getElementById("profile_edit");
    const profileKey = `greenZoneProfile:${user.email || "member"}`;
    let profile = readProfile();

    function readProfile() {
        try {
            const saved = localStorage.getItem(profileKey);
            const oldAdminProfile = isAdmin ? localStorage.getItem("greenZoneProfile") : null;
            return JSON.parse(saved || oldAdminProfile || "{}");
        } catch (error) {
            return {};
        }
    }

    function fillView() {
        if (!form) return;

        form.elements.name.value = profile.name || user.name || "";
        form.elements.grade.value = isAdmin ? "관리자" : "일반회원";
        form.elements.company.value = profile.company || "";
        form.elements.manager.value = profile.manager || profile.managers?.[0] || "";
        form.elements.phone.value = profile.phone || profile.phones?.[0] || "";
        form.elements.address.value = profile.address || profile.addresses?.[0] || "";

        const email = document.getElementById("profile_email");
        if (email) email.textContent = user.email || "-";

        setAvatar(document.querySelector(".profile_avatar"), profile.image || "");
    }

    function setAvatar(avatar, image) {
        if (!avatar) return;

        avatar.style.backgroundImage = image ? `url("${image}")` : "";
        avatar.classList.toggle("has_image", Boolean(image));
    }

    function fillEditor() {
        if (!editForm) return;

        editForm.elements.name.value = profile.name || user.name || "";
        editForm.elements.grade.value = isAdmin ? "관리자" : "일반회원";
        editForm.elements.grade.disabled = !isAdmin;
        editForm.elements.company.value = profile.company || "";
        editForm.elements.manager.value = profile.manager || "";
        editForm.elements.phone.value = profile.phone || "";
        editForm.elements.address.value = profile.address || "";
    }

    function showProfileEditor(open) {
        const visible = Boolean(open);
        document.body.classList.toggle("is_profile_edit", visible);

        if (!editor) return;
        if (visible && !editor.open) editor.showModal();
        if (!visible && editor.open) editor.close();
    }

    function openEditor() {
        fillEditor();
        showProfileEditor(true);
    }

    function closeEditor() {
        showProfileEditor(false);
    }

    function formValues() {
        const data = new FormData(editForm);

        return {
            name: String(data.get("name") || "").trim(),
            grade: isAdmin ? String(data.get("grade") || "관리자") : "일반회원",
            company: String(data.get("company") || "").trim(),
            manager: String(data.get("manager") || "").trim(),
            phone: String(data.get("phone") || "").trim(),
            address: String(data.get("address") || "").trim()
        };
    }

    fillView();
    document.body.classList.remove("is_auth_checking");

    if (editButton) {
        editButton.hidden = false;
        editButton.addEventListener("click", openEditor);
    }

    document.querySelectorAll("[data-profile-back]").forEach(function (button) {
        button.addEventListener("click", closeEditor);
    });

    editForm?.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!editForm.reportValidity()) return;

        const values = formValues();
        profile = Object.assign({}, profile, values);

        localStorage.setItem(profileKey, JSON.stringify(profile));
        window.GreenZoneAuth.login(
            Object.assign({}, user, {
                name: profile.name || user.name,
                role: isAdmin && values.grade === "관리자" ? "admin" : "member"
            }),
            true
        );
        fillView();
        closeEditor();
    });

    editor?.addEventListener("click", function (event) {
        if (event.target === editor) closeEditor();
    });

    document.getElementById("profile_logout")?.addEventListener("click", function () {
        window.GreenZoneAuth.logout();
        window.location.assign(window.GreenZonePaths?.resolve("user_page/Login.html") || "Login.html");
    });

    showProfileEditor(false);
})();
