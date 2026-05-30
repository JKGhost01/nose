// ========== CONFETTI ==========
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
    const colors = ['#E8D5F2', '#D4A5E0', '#C084D8', '#9B5BA8', '#FDD835', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========== SURPRISE BUTTON ==========
const surpriseBtn = document.getElementById('surpriseBtn');
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function() {
        createConfetti();
        showHeartExplosion();
        playSound();
    });
}

function showHeartExplosion() {
    const btn = document.getElementById('surpriseBtn');
    const rect = btn.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'fixed';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';

        const angle = (Math.PI * 2 * i) / 20;
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
        const notes = [262, 330, 392, 523];

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
        console.log('Audio no disponible');
    }
}

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.message-card, .timeline-item, .stat-card, .reason-card, .quiz-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ========== COUNTER ANIMATION ==========
const countUpElements = (elements) => {
    const observerCount = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observerCount.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(el => observerCount.observe(el));
};

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

const statNumbers = document.querySelectorAll('.stat-number');
countUpElements(statNumbers);

// ========== QUIZ INTERACTION ==========
document.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Feedback visual
        this.style.background = 'linear-gradient(135deg, #D4A5E0, #C084D8)';
        this.style.color = 'white';

        setTimeout(() => {
            this.style.background = '';
            this.style.color = '';
        }, 600);
    });
});

// ========== GLOW EFFECT ==========
document.querySelectorAll('.message-card, .reason-card, .stat-card').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 20px rgba(196, 132, 216, 0.5))';
    });

    item.addEventListener('mouseleave', function() {
        this.style.filter = 'drop-shadow(0 0 0px rgba(196, 132, 216, 0))';
    });
});

// ========== PAGE LOAD ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ========== MOBILE OPTIMIZATION ==========
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.body.style.fontSize = '16px';
}

// ========== TOUCH SUPPORT ==========
document.querySelectorAll('.reason-card, .stat-card, .message-card').forEach(item => {
    item.addEventListener('touchstart', function() {
        this.style.filter = 'drop-shadow(0 0 20px rgba(196, 132, 216, 0.5))';
    });

    item.addEventListener('touchend', function() {
        this.style.filter = 'drop-shadow(0 0 0px rgba(196, 132, 216, 0))';
    });
});

console.log('¡Página de cumpleaños cargada con éxito! 🎉');
