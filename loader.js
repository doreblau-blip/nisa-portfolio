(function() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    let hidden = false;
    function hideLoader() {
        if (hidden) return;
        hidden = true;
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(function() { loader.style.display = 'none'; }, 400);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        hideLoader();
    } else {
        document.addEventListener('DOMContentLoaded', hideLoader);
        window.addEventListener('load', hideLoader);
    }

    // Instant fallback so page rendering is never blocked
    setTimeout(hideLoader, 200);
})();
