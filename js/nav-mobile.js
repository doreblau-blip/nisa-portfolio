(function () {
    const trigger = document.getElementById("menu-trigger");
    const menu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("menu-close");
    if (!trigger || !menu) return;

    trigger.setAttribute("aria-controls", "mobile-menu");
    if (!trigger.hasAttribute("aria-expanded")) {
        trigger.setAttribute("aria-expanded", "false");
    }

    function closeMenu() {
        menu.classList.remove("active");
        document.body.classList.remove("menu-open");
        trigger.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
    }

    function setOpen(open) {
        menu.classList.toggle("active", open);
        document.body.classList.toggle("menu-open", open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    trigger.addEventListener("click", () => {
        setOpen(!menu.classList.contains("active"));
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }

    document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    menu.addEventListener("click", (e) => {
        if (e.target === menu) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (!menu.classList.contains("active")) return;
        closeMenu();
    });
})();
