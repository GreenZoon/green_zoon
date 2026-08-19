(function () {
    "use strict";

    if (!window.GreenZoneAuth?.requireLogin(window.location.href)) return;

    const user = window.GreenZoneAuth.getUser();
    const isAdmin = user.role === "admin"
        || user.email?.toLowerCase() === "narasophiah@gmail.com";
    const panel = document.querySelector(".profile_panel");
    const breadcrumb = document.querySelector(".login_breadcrumb");
    const editor = document.getElementById("profile_editor");
    const form = document.getElementById("profile_form");
    const editForm = document.getElementById("profile_edit_form");
    const editButton = document.getElementById("profile_edit");
    const profileKey = `greenZoneProfile:${user.email || "member"}`;
    const draftKey = `${profileKey}:draft`;
    let profile = readProfile();
    let pendingImage = profile.image || "";

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

    function setList(name, values) {
        const list = editForm?.querySelector(`[data-profile-list="${name}"]`);
        if (!list) return;

        const tagName = name === "address" ? "textarea" : "input";
        const type = name === "phone" ? "tel" : "text";
        const placeholders = {
            manager: "그린죤 담당자",
            phone: "010-0000-0000",
            address: "기존) 경상남도 김해시 전하로 191"
        };
        const items = values?.length ? values : [""];

        list.replaceChildren();

        items.forEach(function (value) {
            const control = document.createElement(tagName);
            control.name = name;
            control.value = value || "";
            control.placeholder = placeholders[name];

            if (tagName === "input") control.type = type;
            list.appendChild(control);
        });
    }

    function fillEditor(data) {
        if (!editForm) return;

        editForm.elements.name.value = data.name || profile.name || user.name || "";
        editForm.elements.grade.value = "관리자";
        editForm.elements.privacy.checked = Boolean(data.privacy);
        setList("manager", data.managers || [data.manager || profile.manager || ""]);
        setList("phone", data.phones || [data.phone || profile.phone || ""]);
        setList("address", data.addresses || [data.address || profile.address || ""]);
    }

    function editRequested() {
        return new URLSearchParams(window.location.search).get("edit") === "profile";
    }

    function showProfileEditor(open) {
        const visible = Boolean(open && isAdmin);

        if (panel) panel.hidden = visible;
        if (breadcrumb) breadcrumb.hidden = visible;
        if (editor) editor.hidden = !visible;
        document.body.classList.toggle("is_profile_edit", visible);

        if (visible) {
            let draft = {};
            try { draft = JSON.parse(localStorage.getItem(draftKey) || "{}"); } catch (error) { draft = {}; }
            fillEditor(draft);
            pendingImage = draft.image || profile.image || "";
            setAvatar(document.querySelector(".profile_editor_avatar"), pendingImage);
            window.scrollTo(0, 0);
        }
    }

    function openEditor() {
        if (!isAdmin) return;

        const url = new URL(window.location.href);
        url.searchParams.set("edit", "profile");
        history.pushState({ profileEdit: true }, "", url);
        showProfileEditor(true);
    }

    function closeEditor() {
        const url = new URL(window.location.href);
        url.searchParams.delete("edit");
        history.pushState({}, "", url);
        showProfileEditor(false);
    }

    function formValues() {
        const data = new FormData(editForm);

        return {
            name: String(data.get("name") || "").trim(),
            grade: "관리자",
            privacy: data.has("privacy"),
            managers: data.getAll("manager").map(String).map(function (value) { return value.trim(); }).filter(Boolean),
            phones: data.getAll("phone").map(String).map(function (value) { return value.trim(); }).filter(Boolean),
            addresses: data.getAll("address").map(String).map(function (value) { return value.trim(); }).filter(Boolean),
            image: pendingImage
        };
    }

    fillView();
    document.body.classList.remove("is_auth_checking");

    if (editButton) {
        editButton.hidden = !isAdmin;
        editButton.addEventListener("click", openEditor);
    }

    document.querySelectorAll("[data-profile-back]").forEach(function (button) {
        button.addEventListener("click", closeEditor);
    });

    document.querySelectorAll("[data-add-profile]").forEach(function (button) {
        button.addEventListener("click", function () {
            const name = button.dataset.addProfile;
            const list = editForm.querySelector(`[data-profile-list="${name}"]`);
            const source = list?.lastElementChild;
            if (!list || !source) return;

            const control = source.cloneNode();
            control.value = "";
            list.appendChild(control);
            control.focus();
        });
    });

    document.querySelector("[data-profile-draft]")?.addEventListener("click", function () {
        localStorage.setItem(draftKey, JSON.stringify(formValues()));
        this.textContent = "임시저장 완료";
    });

    const imageButton = document.querySelector("[data-profile-image]");
    const imageInput = document.getElementById("profile_image_input");
    const editorAvatar = document.querySelector(".profile_editor_avatar");

    imageButton?.addEventListener("click", function () { imageInput?.click(); });
    imageInput?.addEventListener("change", function () {
        const file = this.files?.[0];
        if (!file || !editorAvatar) return;

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            pendingImage = String(reader.result || "");
            setAvatar(editorAvatar, pendingImage);
        });
        reader.readAsDataURL(file);
    });

    editForm?.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!isAdmin || !editForm.reportValidity()) return;

        const values = formValues();
        profile = Object.assign({}, profile, values, {
            manager: values.managers[0] || "",
            phone: values.phones[0] || "",
            address: values.addresses[0] || ""
        });

        localStorage.setItem(profileKey, JSON.stringify(profile));
        localStorage.removeItem(draftKey);
        window.GreenZoneAuth.login(
            Object.assign({}, user, { name: profile.name || user.name, role: "admin" }),
            true
        );
        fillView();
        closeEditor();
    });

    window.addEventListener("popstate", function () {
        showProfileEditor(editRequested());
    });

    document.getElementById("profile_logout")?.addEventListener("click", function () {
        window.GreenZoneAuth.logout();
        window.location.assign(window.GreenZonePaths?.resolve("user_page/Login.html") || "Login.html");
    });

    showProfileEditor(editRequested());

    if (!isAdmin && editRequested()) {
        const url = new URL(window.location.href);
        url.searchParams.delete("edit");
        history.replaceState({}, "", url);
    }
})();
