// Carousel
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const carousel = document.getElementById('carousel');

let currentIndex = 0;
let autoScrollInterval;

function getItemWidth() {
    const item = track.querySelector('.carousel-item');
    if (!item) return 0;
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap) || 24;
    return item.offsetWidth + gap;
}

function getVisibleCount() {
    const containerWidth = carousel.offsetWidth;
    return Math.max(1, Math.floor(containerWidth / getItemWidth()));
}

function getMaxIndex() {
    const totalItems = track.children.length;
    return Math.max(0, totalItems - getVisibleCount());
}

function updateCarousel() {
    const itemWidth = getItemWidth();
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function nextSlide() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
}

function prevSlide() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
}

function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(nextSlide, 3500);
}

function stopAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoScroll();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoScroll();
    });

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    window.addEventListener('resize', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateCarousel();
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoScroll();
    }, { passive: true });

    startAutoScroll();
}

// Reveal on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const reveals = document.querySelectorAll('.servico-card, .portfolio-card, .contato-card, .why-item');
reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

reveals.forEach(el => revealObserver.observe(el));
