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
