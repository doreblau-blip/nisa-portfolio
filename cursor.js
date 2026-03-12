// Minimal Custom Cursor Logic
document.addEventListener("DOMContentLoaded", () => {
    // Inject cursor elements
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const outline = document.createElement("div");
    outline.className = "cursor-outline";
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    // Track mouse movement
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate dot instantly
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Animate outline with a slight delay
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Add hover states to all links and interactive elements
    const interactables = document.querySelectorAll("a, button, .work-item");
    interactables.forEach(item => {
        item.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        item.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
});
