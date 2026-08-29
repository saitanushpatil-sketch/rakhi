/* ===== FLOATING PETALS BACKGROUND ===== */
(function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  const petals = [];
  const PETAL_COUNT = 35;

  const colors = [
    'rgba(245, 217, 142, 0.35)',
    'rgba(212, 160, 74, 0.3)',
    'rgba(232, 163, 23, 0.25)',
    'rgba(231, 76, 60, 0.2)',
    'rgba(254, 249, 239, 0.2)',
  ];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Petal {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : -20;
      this.size = Math.random() * 6 + 3;
      this.speedY = Math.random() * 0.6 + 0.2;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.rotation = Math.random() * 360;
      this.rotSpeed = Math.random() * 2 - 1;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }
    update() {
      this.y += this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.3;
      this.rotation += this.rotSpeed;
      if (this.y > H + 20) this.reset(false);
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      // Petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size, -this.size, this.size * 2, 0, 0, this.size * 1.6);
      ctx.bezierCurveTo(-this.size * 2, 0, -this.size, -this.size, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // Observe all elements except hero (hero has CSS animation)
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });
})();

/* ===== GRADIENT SHIFT ON SCROLL ===== */
(function initGradientShift() {
  const overlay = document.getElementById('gradient-overlay');
  const sections = document.querySelectorAll('.section');
  const gradients = [
    'radial-gradient(ellipse at 50% 30%, rgba(107,29,42,0.6) 0%, rgba(61,15,24,0.95) 70%)',
    'radial-gradient(ellipse at 40% 50%, rgba(107,29,42,0.5) 0%, rgba(44,24,16,0.95) 70%)',
    'radial-gradient(ellipse at 60% 40%, rgba(140,50,30,0.45) 0%, rgba(61,15,24,0.95) 70%)',
    'radial-gradient(ellipse at 50% 60%, rgba(120,40,35,0.5) 0%, rgba(50,18,20,0.95) 70%)',
    'radial-gradient(ellipse at 50% 50%, rgba(107,29,42,0.55) 0%, rgba(35,12,15,0.97) 70%)',
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    let idx = 0;
    sections.forEach((s, i) => {
      if (scrollY >= s.offsetTop - windowH / 2) idx = i;
    });
    overlay.style.background = gradients[idx] || gradients[0];
  }, { passive: true });
})();

/* ===== CONFETTI BURST ===== */
function burstConfetti() {
  const colors = ['#f5d98e', '#d4a04a', '#e74c3c', '#c0392b', '#fef9ef', '#e8a317', '#922b21'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size = Math.random() * 8 + 4;
    const isCircle = Math.random() > 0.5;
    el.style.width = size + 'px';
    el.style.height = isCircle ? size + 'px' : size * 2.5 + 'px';
    el.style.borderRadius = isCircle ? '50%' : '3px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10px';
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    el.style.animationDelay = (Math.random() * 0.5) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4500);
  }
}

document.getElementById('fab').addEventListener('click', burstConfetti);

/* ===== SMOOTH SCROLL INDICATOR FADE ===== */
(function initScrollIndicatorFade() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    const opacity = Math.max(0, 1 - window.scrollY / 300);
    indicator.style.opacity = opacity * 0.6;
  }, { passive: true });
})();
