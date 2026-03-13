(function() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() { loader.style.display = 'none'; }, 500);
        }, 200);
    });
})();
