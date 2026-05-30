// ========== CANVAS 3D BACKGROUND ==========
function initCanvas3D() {
    const canvas = document.getElementById('canvas3d');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            this.opacity += (Math.random() - 0.5) * 0.02;
            this.opacity = Math.max(0.05, Math.min(0.5, this.opacity));
        }

        draw() {
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Conectar partículas
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let particle of particles) {
            particle.update();
            particle.draw();
        }

        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========== INICIALIZACIÓN AOS ==========
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ========== GSAP ANIMATIONS ==========
gsap.registerPlugin(ScrollTrigger);

// Navbar animations
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== SWIPER GALLERY ==========
let swiper = new Swiper('.gallery-swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

// ========== CONTADOR DE NÚMEROS ANIMADOS ==========
const countUpElements = () => {
    document.querySelectorAll('.stat-number').forEach(element => {
        const target = parseInt(element.dataset.target);

        ScrollTrigger.create({
            trigger: element,
            onEnter: () => {
                if (!element.dataset.animated) {
                    element.dataset.animated = 'true';
                    gsap.to(element, {
                        innerText: target,
                        duration: 2.5,
                        snap: { innerText: 1 },
                        ease: 'power3.out'
                    });
                }
            }
        });
    });
};

countUpElements();

// ========== CARGAR GALERÍA DINÁMICAMENTE ==========
function loadGalleryImages() {
    const galleryWrapper = document.getElementById('galleryWrapper');

    const images = [
        'img/2024-07-14-19-08-03-400.jpg',
        'img/2024-07-27-18-53-36-183.jpg',
        'img/2024-07-27-18-54-08-073.jpg',
        'img/2024-07-27-18-54-11-659.jpg',
        'img/2024-07-27-18-54-16-211.jpg',
        'img/2024-08-30-13-40-20-438.jpg',
        'img/2024-09-11-19-51-20-665.jpg',
        'img/2024-10-25-13-07-52-956.jpg',
        'img/2024-10-27-12-38-51-482.jpg',
        'img/2024-10-27-12-38-52-922.jpg',
        'img/2024-10-31-12-22-45-900.jpg',
        'img/2024-10-31-13-04-36-297.jpg'
    ];

    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Momento especial ${index + 1}`;
        img.loading = 'lazy';
        img.onerror = () => {
            galleryItem.innerHTML = '<div style="width:100%; height:100%; background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.1)); display: flex; align-items: center; justify-content: center;"><i class="fas fa-image" style="font-size: 4rem; color: #a855f7;"></i></div>';
        };

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = '<i class="fas fa-heart gallery-icon"></i>';

        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        slide.appendChild(galleryItem);
        galleryWrapper.appendChild(slide);
    });

    swiper.update();
    AOS.refresh();
}

loadGalleryImages();

// ========== CONFETTI GENERATOR AVANZADO ==========
function createConfetti() {
    const container = document.getElementById('confetti-container');

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.delay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
        confetti.style.width = (5 + Math.random() * 8) + 'px';
        confetti.style.height = confetti.style.width;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
    }
}

function getRandomColor() {
    const colors = ['#a855f7', '#ec4899', '#d8b4fe', '#f97316', '#fbbf24', '#06b6d4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========== SURPRISE BUTTON ==========
const surpriseBtn = document.getElementById('surpriseBtn');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        createConfetti();
        showHeartExplosion();
        playSound();
        gsap.to(surpriseBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    });
}

function showHeartExplosion() {
    const btn = document.getElementById('surpriseBtn');
    const rect = btn.getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'fixed';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        heart.style.fontSize = (1.5 + Math.random() * 1) + 'rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.fontWeight = 'bold';

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 5 + Math.random() * 7;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(heart);

        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let life = 60;

        const animate = () => {
            x += vx;
            y += vy;
            vy += 0.1; // gravedad
            life--;

            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.opacity = life / 60;
            heart.style.transform = `rotate(${(60 - life) * 6}deg) scale(${life / 60})`;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };

        animate();
    }
}

function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const time = audioContext.currentTime;
        const notes = [262, 330, 392, 523, 392, 330, 262];

        notes.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.3, time + index * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, time + index * 0.1 + 0.2);

            osc.start(time + index * 0.1);
            osc.stop(time + index * 0.1 + 0.2);
        });
    } catch (e) {
        console.log('Audio no disponible en este navegador');
    }
}

// ========== SCROLL BUTTON ==========
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        const gallery = document.getElementById('gallery');
        gsap.to(window, {
            scrollTo: {
                y: gallery,
                offsetY: 80
            },
            duration: 1,
            ease: 'power3.inOut'
        });
    });
}

// ========== SMOOTH SCROLL LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            gsap.to(window, {
                scrollTo: {
                    y: document.querySelector(href),
                    offsetY: 80
                },
                duration: 1,
                ease: 'power3.inOut'
            });
        }
    });
});

// ========== EFECTOS HOVER CARDS ==========
document.querySelectorAll('.reason-item, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.8))',
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            filter: 'drop-shadow(0 0 0px rgba(168, 85, 247, 0))',
            ease: 'power2.out'
        });
    });
});

// ========== PARALLAX EFFECT AVANZADO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero) {
        gsap.to(hero, {
            backgroundPosition: `0 ${scrolled * 0.5}px`,
            duration: 0
        });
    }
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    initCanvas3D();

    // Esperar a que cargue todo
    setTimeout(() => {
        createConfetti();
        gsap.to(document.body, {
            opacity: 1,
            duration: 0.5
        });
    }, 500);
});

// ========== SCROLL ANIMATIONS GSAP ==========
// Animaciones personalizadas para otros elementos si es necesario
// Los reason-items se animan con AOS

// ========== MOBILE OPTIMIZATION ==========
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.body.style.fontSize = '16px';

    // Reducir cantidad de confetti en móvil
    const originalCreateConfetti = window.createConfetti;
    window.createConfetti = function() {
        const container = document.getElementById('confetti-container');
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.delay = Math.random() * 0.5 + 's';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3500);
        }
    };

    // Desabilitar algunas animaciones en móvil
    AOS.init({
        duration: 800,
        once: true,
        disable: 'phone'
    });
}

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== SLIDER INTERACTIVO ==========
const loveSlider = document.getElementById('loveSlider');
const sliderDate = document.getElementById('sliderDate');

if (loveSlider) {
    // Fecha inicial: 10 de julio de 2023
    const startDate = new Date(2023, 6, 10); // Julio = mes 6

    loveSlider.addEventListener('input', function() {
        const days = parseInt(this.value);
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + days);

        // Formatear fecha
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('es-ES', options);

        sliderDate.textContent = formattedDate;

        // Efecto visual
        gsap.to(sliderDate, {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    });

    // Inicializar con la fecha actual
    loveSlider.value = 1055;
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1055);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    sliderDate.textContent = currentDate.toLocaleDateString('es-ES', options);
}

// ========== PERFORMANCE MONITORING ==========
console.log('🎉 ¡Página cargada exitosamente!');
console.log('💜 Hecha con amor por tu persona especial');
console.log('⭐ 1055 días juntos desde el 10 de julio del 2023');
console.log('🎂 Feliz cumpleaños número 18');
