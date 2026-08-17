(function () {
    "use strict";

    if (!window.GreenZoneAuth?.requireLogin(window.location.href)) {
        return;
    }

    const user = window.GreenZoneAuth.getUser();
    document.body.classList.remove("is_auth_checking");

    const name = document.getElementById("profile_name");
    const email = document.getElementById("profile_email");

    if (name) name.textContent = user.name || "그린죤 사용자";
    if (email) email.textContent = user.email || "-";

    document.getElementById("profile_logout")?.addEventListener("click", function () {
        window.GreenZoneAuth.logout();
        window.location.assign(
            window.GreenZonePaths?.resolve("user_page/Login.html") || "Login.html"
        );
    });
})();
