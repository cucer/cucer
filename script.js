const splashScreen = document.getElementById('splashScreen');
const starCanvas = document.getElementById('sparks');
const mouseOrb = document.querySelector('.mouse-orb');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const heroRevealTargets = [
  document.querySelector('.hero-copy .eyebrow'),
  document.querySelector('#hero .hero-copy h1'),
  document.querySelector('.hero-copy .lede'),
  document.querySelector('.cta-group'),
  document.querySelector('.hero-visual'),
];

const portfolioCards = document.querySelectorAll('.portfolio-card');
const aiCards = document.querySelectorAll('.ai-card');
const aiSteps = document.querySelectorAll('.ai-step');

const mobileSidebar = document.querySelector('.mobile-sidebar');
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close-btn');
const mobileLinks = document.querySelectorAll('.mobile-sidebar .icon-link');

const toggleSidebar = (open) => {
  if (!mobileSidebar) return;
  mobileSidebar.classList.toggle('open', open);
  const state = open ? 'true' : 'false';
  hamburger?.setAttribute('aria-expanded', state);
  mobileSidebar.setAttribute('aria-hidden', open ? 'false' : 'true');
};

hamburger?.addEventListener('click', () => toggleSidebar(true));
closeBtn?.addEventListener('click', () => toggleSidebar(false));
mobileLinks.forEach((link) => link.addEventListener('click', () => toggleSidebar(false)));

const hideSplash = () => splashScreen?.classList.add('hide');

const revealHero = () => {
  heroRevealTargets.forEach((el, index) => {
    if (!el) return;
    setTimeout(() => el.classList.add('is-in'), index * 180);
  });
};

window.addEventListener('load', () => {
  setTimeout(() => {
    hideSplash();
    revealHero();
  }, 1600);
});

setTimeout(hideSplash, 4000);
setTimeout(revealHero, 2200);

const initCardReveal = (cards) => {
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.classList.add('card-animated');
    card.style.setProperty('--card-stagger', `${index * 90}ms`);
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    cards.forEach((card) => card.classList.add('card-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
  );

  cards.forEach((card) => observer.observe(card));
};

/* Stagger each pipeline node so it lights up as the rail pulse reaches it.
   The delays are fractions of the 4.2s aiPulseTravel cycle. */
const initAiPipeline = () => {
  aiSteps.forEach((step, index) => {
    step
      .querySelector('.ai-dot')
      ?.style.setProperty('--ai-step-delay', `${index * 460}ms`);
  });
};

/* Star field */
let starCtx;
let stars = [];

const starConfig = {
  count: 180,
  speed: { min: 0.3, max: 1.1 },
  size: { min: 0.6, max: 1.8 },
};

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const createStar = () => ({
  x: Math.random() * starCanvas.width,
  y: Math.random() * starCanvas.height,
  size: randomInRange(starConfig.size.min, starConfig.size.max),
  speed: randomInRange(starConfig.speed.min, starConfig.speed.max),
  alpha: randomInRange(0.2, 0.8),
});

const initStars = () => {
  if (!starCanvas) return;
  starCtx = starCanvas.getContext('2d');
  resizeCanvas();
  stars = Array.from({ length: starConfig.count }, createStar);
  requestAnimationFrame(drawStars);
};

const resizeCanvas = () => {
  if (!starCanvas) return;
  starCanvas.width = window.innerWidth;
  starCanvas.height = document.getElementById('hero')?.offsetHeight || window.innerHeight;
};

const drawStars = () => {
  if (!starCtx) return;
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > starCanvas.height) {
      star.y = -2;
      star.x = Math.random() * starCanvas.width;
    }
    starCtx.globalAlpha = star.alpha;
    starCtx.fillStyle = '#8af3fb';
    starCtx.fillRect(star.x, star.y, star.size, star.size);
  });
  requestAnimationFrame(drawStars);
};

if (starCanvas) {
  window.addEventListener('resize', resizeCanvas);
  initStars();
}

initCardReveal(portfolioCards);
initCardReveal(aiCards);
initAiPipeline();

/* Cursor orb + parallax */
const parallaxItems = document.querySelectorAll('[data-parallax]');
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const orbPos = { x: pointer.x, y: pointer.y };
const cometTrails = [];
const COMET_MAX_TRAILS = 32;

const spawnCometTrail = (event) => {
  if (prefersReducedMotion) return;
  const trail = document.createElement('span');
  trail.className = 'comet-trail';
  const length = randomInRange(18, 42);
  trail.style.width = `${length}px`;
  trail.style.left = `${event.clientX}px`;
  trail.style.top = `${event.clientY}px`;

  const angle =
    Math.atan2(event.movementY || 0.001, event.movementX || 0.001) * (180 / Math.PI);
  trail.style.setProperty('--comet-angle', `${angle}deg`);

  document.body.appendChild(trail);
  cometTrails.push(trail);

  if (cometTrails.length > COMET_MAX_TRAILS) {
    const oldTrail = cometTrails.shift();
    oldTrail?.remove();
  }

  trail.addEventListener(
    'animationend',
    () => {
      trail.remove();
      const index = cometTrails.indexOf(trail);
      if (index > -1) cometTrails.splice(index, 1);
    },
    { once: true }
  );
};

const animateOrb = () => {
  if (!mouseOrb || prefersReducedMotion) return;
  orbPos.x += (pointer.x - orbPos.x) * 0.1;
  orbPos.y += (pointer.y - orbPos.y) * 0.1;
  mouseOrb.style.transform = `translate(${orbPos.x - mouseOrb.offsetWidth / 2}px, ${orbPos.y - mouseOrb.offsetHeight / 2}px)`;

  const xRatio = orbPos.x / window.innerWidth - 0.5;
  const yRatio = orbPos.y / window.innerHeight - 0.5;

  parallaxItems.forEach((item) => {
    const depth = parseFloat(item.dataset.parallax || '15');
    const translateX = xRatio * depth;
    const translateY = yRatio * depth;
    item.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  });

  requestAnimationFrame(animateOrb);
};

if (mouseOrb && !prefersReducedMotion) {
  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    spawnCometTrail(event);
  });
  animateOrb();
}

// Disable right-click context menu across the site
window.addEventListener('contextmenu', (event) => event.preventDefault());
