(function() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    let hidden = false;
    function hideLoader() {
        if (hidden) return;
        hidden = true;
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(function() { loader.style.display = 'none'; }, 500);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(hideLoader, 100);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(hideLoader, 200);
        });
        window.addEventListener('load', hideLoader);
    }

    // Safety fallback: ensure loader is NEVER stuck covering the screen
    setTimeout(hideLoader, 800);
})();
