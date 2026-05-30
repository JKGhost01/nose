// ========== INICIALIZACIÓN AOS ==========
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========== GSAP ANIMATIONS ==========
gsap.registerPlugin(ScrollTrigger);

// Animaciones del navbar al scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== CONTADOR DE NÚMEROS ANIMADOS ==========
const countUpElements = () => {
    document.querySelectorAll('.stat-number').forEach(element => {
        const target = parseInt(element.dataset.target);
        const initialValue = 0;

        ScrollTrigger.create({
            trigger: element,
            onEnter: () => {
                if (!element.dataset.animated) {
                    element.dataset.animated = 'true';
                    gsap.to(element, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: 'power2.out'
                    });
                }
            }
        });
    });
};

countUpElements();

// ========== CONFETTI GENERATOR ==========
function createConfetti() {
    const container = document.getElementById('confetti-container');

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.delay = Math.random() * 0.5 + 's';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
    }
}

function getRandomColor() {
    const colors = ['#a855f7', '#ec4899', '#d8b4fe', '#f97316', '#fbbf24'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========== SURPRISE BUTTON ==========
const surpriseBtn = document.getElementById('surpriseBtn');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
        createConfetti();
        showHeartExplosion();
        playSound();
        surpriseBtn.style.animation = 'pulse 0.6s ease';
    });
}

function showHeartExplosion() {
    const btn = document.getElementById('surpriseBtn');
    const rect = btn.getBoundingClientRect();

    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'fixed';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';

        const angle = (Math.PI * 2 * i) / 25;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        document.body.appendChild(heart);

        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let life = 60;

        const animate = () => {
            x += vx;
            y += vy;
            life--;

            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.opacity = life / 60;

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
        const notes = [262, 330, 392, 523, 392, 330];

        notes.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.frequency.value = freq;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.2, time + index * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, time + index * 0.1 + 0.2);

            osc.start(time + index * 0.1);
            osc.stop(time + index * 0.1 + 0.2);
        });
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ========== SCROLL BUTTON ==========
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        const gallery = document.getElementById('gallery');
        gallery.scrollIntoView({ behavior: 'smooth' });
    });
}

// ========== GALERÍA CON IMÁGENES DINÁMICAS ==========
function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');

    // Array de imágenes disponibles (deberás reemplazar con tus rutas)
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
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'zoom-in');
        galleryItem.setAttribute('data-aos-delay', (index * 100) + 'ms');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Momento especial ${index + 1}`;
        img.onerror = () => {
            galleryItem.innerHTML = '<div style="width:100%; height:100%; background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); display: flex; align-items: center; justify-content: center;"><i class="fas fa-image" style="font-size: 3rem; color: #a855f7;"></i></div>';
        };

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = '<i class="fas fa-heart gallery-icon"></i>';

        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);
    });

    // Reiniciar AOS después de agregar elementos
    AOS.refresh();
}

loadGalleryImages();

// ========== EFECTOS HOVER EN CARDS ==========
document.querySelectorAll('.reason-item, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            filter: 'drop-shadow(0 0 0px rgba(168, 85, 247, 0))'
        });
    });
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// ========== SMOOTH SCROLL PARA LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// ========== MOBILE OPTIMIZATION ==========
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.body.style.fontSize = '16px';
    // Reducir cantidad de confetti en móvil
    window.createConfetti = function() {
        const container = document.getElementById('confetti-container');
        for (let i = 0; i < 20; i++) {
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
}

console.log('🎉 ¡Página cargada exitosamente!');
console.log('💜 Hecha con amor para el cumpleaños más especial');
