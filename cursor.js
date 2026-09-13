// High-Performance Custom Cursor Logic
document.addEventListener("DOMContentLoaded", () => {
    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;

    // Project nav link image preview
    document.querySelectorAll(".nav-link[href]").forEach((link) => {
        const preview = document.createElement("div");
        preview.className = "nav-link-preview";
        const imgSrc = link.getAttribute("data-preview");
        if (imgSrc) {
            preview.style.backgroundImage = `url(${imgSrc})`;
        }
        link.insertBefore(preview, link.firstChild);
    });

    // Right-click protection for images (all devices)
    window.addEventListener("contextmenu", (e) => {
        if (e.target.tagName === "IMG" || e.target.closest(".image-wrapper")) {
            e.preventDefault();
        }
    }, { passive: false });

    // Scroll element reveal with IntersectionObserver
    const revealElements = document.querySelectorAll(".project-header, .gallery-item, .work-item");
    revealElements.forEach((el) => {
        el.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    revealElements.forEach((el) => revealObserver.observe(el));

    // Custom cursor only on fine pointers
    if (!prefersFinePointer) return;

    try {
        const dot = document.createElement("div");
        dot.className = "cursor-dot";
        const outline = document.createElement("div");
        outline.className = "cursor-outline";
        document.body.appendChild(dot);
        document.body.appendChild(outline);
        document.documentElement.classList.add("cursor-active");

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        let isMoving = false;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(renderCursor);
            }
        }, { passive: true });

        function renderCursor() {
            outlineX += (mouseX - outlineX) * 0.2;
            outlineY += (mouseY - outlineY) * 0.2;
            outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

            if (Math.abs(mouseX - outlineX) > 0.1 || Math.abs(mouseY - outlineY) > 0.1) {
                requestAnimationFrame(renderCursor);
            } else {
                isMoving = false;
            }
        }

        // Delegation for hover state updates
        document.addEventListener("mouseover", (e) => {
            const item = e.target.closest("a, button, .footer-email, .face-nav-item");
            if (item) {
                if (item.classList.contains("work-item") || item.classList.contains("gallery-item")) {
                    document.body.classList.add("cursor-view");
                } else {
                    document.body.classList.add("cursor-hover");
                }
            }
        }, { passive: true });

        document.addEventListener("mouseout", (e) => {
            const item = e.target.closest("a, button, .footer-email, .face-nav-item");
            if (item) {
                document.body.classList.remove("cursor-hover", "cursor-view");
            }
        }, { passive: true });

    } catch (err) {
        document.documentElement.classList.remove("cursor-active");
    }
});
