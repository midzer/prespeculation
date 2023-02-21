(function () {
    function query (selector) {
        return Array.from(document.querySelectorAll(selector));
    }
    
    function pointerenterHandler (event) {
        if (!preloadedUrls.has(this.href)) {
            prefetcher.onload = function() {
                preloadedUrls.add(this.href);
                observer.unobserve(this);
            };
            prefetcher.href = this.href;
        }
        
        this.addEventListener('pointerleave', pointerleaveHandler);
        this.addEventListener('pointerdown', pointerdownHandler);
    }
    
    function pointerleaveHandler (event) {
        prefetcher.removeAttribute('href');
    
        this.removeEventListener('pointerleave', pointerleaveHandler);
        this.removeEventListener('pointerdown', pointerdownHandler);
    }
    
    function pointerdownHandler (event) {
        if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
            const speculationTag = document.createElement('script');
            speculationTag.textContent = JSON.stringify({ prerender: [{ source: 'list', urls: [this.href] }] });
            speculationTag.type = 'speculationrules';
            document.head.appendChild(speculationTag);
        }
    }
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const link = entry.target;
            if (entry.isIntersecting) {
                link.addEventListener('pointerenter', pointerenterHandler);
            }
            else {
                link.removeEventListener('pointerenter', pointerenterHandler);
            }
        });
    });
    
    const preloadedUrls = new Set();
    
    const prefetcher = document.createElement('link');
    prefetcher.rel = prefetcher.relList.supports('prefetch') ? 'prefetch' : 'preload';
    document.head.appendChild(prefetcher);
    
    query('a[href]:not([href^="#"]').forEach(item => observer.observe(item));    
})();
