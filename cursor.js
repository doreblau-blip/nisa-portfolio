// Minimal Custom Cursor Logic
document.addEventListener("DOMContentLoaded", () => {

    // Project nav link image preview
    document.querySelectorAll('.nav-link[href]').forEach(link => {
        // Create a preview div
        const preview = document.createElement('div');
        preview.className = 'nav-link-preview';
        const imgSrc = link.getAttribute('data-preview');
        if (imgSrc) {
            preview.style.backgroundImage = `url(${imgSrc})`;
        }
        link.insertBefore(preview, link.firstChild);
    });
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



    // Right-click protection for images
    window.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' || e.target.closest('.image-wrapper')) {
            e.preventDefault();
        }
    });

    // Scroll element reveal
    const revealElements = document.querySelectorAll('.project-header, .gallery-item, .work-item');
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Smart Cursor & Standard Hover States
    const interactables = document.querySelectorAll("a, button, .footer-email");
    interactables.forEach(item => {
        item.addEventListener("mouseenter", () => {
            if(item.classList.contains('work-item') || item.classList.contains('gallery-item')) {
                document.body.classList.add("cursor-view");
            } else {
                document.body.classList.add("cursor-hover");
            }
        });
        item.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
            document.body.classList.remove("cursor-view");
        });
    });

});
