/* ==========================================================================
   VARNATIR · Lógica Interactiva y Micro-interacciones de Alto Calibre (Estilo WAM)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initHeaderScroll();
  initScrollReveal();
  initHeroCanvas();
  initH1Switcher();
  initComparisonTabs();
  initIndustryTabs();
  initSwiper();
  initModal();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. Custom Cursor (WAM Micro-interaction)
   -------------------------------------------------------------------------- */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');

  if (!cursor || !ring) return;

  // Touch device check
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    cursor.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth lerp for ring
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover effect over interactive elements
  const interactiveSelectors = 'a, button, input, textarea, select, .btn, .h1-switcher, .solution-row, .case-slide, [data-reveal]';
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* --------------------------------------------------------------------------
   2. Header Scroll Transition (Transparent → Blurry Frosted Glass)
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Engine (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  revealElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. Hero Dynamic Canvas (Subtle Particle Mesh / Constellation)
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particleCount = Math.min(Math.floor(width / 32), 48);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw links
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(95, 211, 184, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(95, 211, 184, ${p.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/* --------------------------------------------------------------------------
   5. H1 Switcher (Founder Tool · Opción B Activa por Defecto)
   -------------------------------------------------------------------------- */
function initH1Switcher() {
  const btnA = document.getElementById('toggle-opt-a');
  const btnB = document.getElementById('toggle-opt-b');
  const titleA = document.getElementById('hero-title-a');
  const titleB = document.getElementById('hero-title-b');

  if (!btnA || !btnB || !titleA || !titleB) return;

  btnA.addEventListener('click', () => {
    btnA.classList.add('active');
    btnB.classList.remove('active');
    titleA.classList.add('active');
    titleB.classList.remove('active');
  });

  btnB.addEventListener('click', () => {
    btnB.classList.add('active');
    btnA.classList.remove('active');
    titleB.classList.add('active');
    titleA.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   6. Comparativa Interactiva (Control de Vuelo vs. Caja Negra)
   -------------------------------------------------------------------------- */
function toggleComparison(type) {
  const tabVarnatir = document.getElementById('tab-varnatir');
  const tabLegacy = document.getElementById('tab-legacy');
  const panelVarnatir = document.getElementById('panel-varnatir');
  const panelLegacy = document.getElementById('panel-legacy');

  if (!tabVarnatir || !tabLegacy || !panelVarnatir || !panelLegacy) return;

  if (type === 'varnatir') {
    tabVarnatir.classList.add('active');
    tabLegacy.classList.remove('active');
    panelVarnatir.classList.add('active');
    panelLegacy.classList.remove('active');
  } else {
    tabLegacy.classList.add('active');
    tabVarnatir.classList.remove('active');
    panelLegacy.classList.add('active');
    panelVarnatir.classList.remove('active');
  }
}
window.toggleComparison = toggleComparison;

function initComparisonTabs() {
  window.toggleComparison = toggleComparison;
}

/* --------------------------------------------------------------------------
   7. Selector de Industrias (Enterprise, Govtech, Defensa)
   -------------------------------------------------------------------------- */
function switchIndustry(sector) {
  const buttons = document.querySelectorAll('.ind-btn');
  const panels = document.querySelectorAll('.industry-panel');

  buttons.forEach(btn => btn.classList.remove('active'));
  panels.forEach(panel => panel.classList.remove('active'));

  const activeBtn = document.getElementById(`btn-ind-${sector}`);
  const activePanel = document.getElementById(`panel-ind-${sector}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.add('active');
}
window.switchIndustry = switchIndustry;

function initIndustryTabs() {
  window.switchIndustry = switchIndustry;
}

/* --------------------------------------------------------------------------
   8. Swiper de Casos de Uso
   -------------------------------------------------------------------------- */
function initSwiper() {
  const track = document.getElementById('swiper-track');
  const prevBtn = document.getElementById('swiper-prev');
  const nextBtn = document.getElementById('swiper-next');
  const dotsContainer = document.getElementById('swiper-dots');

  if (!track) return;

  const slides = track.querySelectorAll('.case-slide');
  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 1.2;
    return 2;
  }

  function getMaxIndex() {
    const visible = getVisibleCount();
    return Math.max(0, Math.ceil(totalSlides - visible));
  }

  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('div');
      dot.className = `swiper-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.swiper-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    const maxIdx = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIdx));
    const slideWidth = slides[0].offsetWidth + 24; // width + gap
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }

  window.addEventListener('resize', () => {
    goToSlide(currentIndex);
  });
}

/* --------------------------------------------------------------------------
   9. Modal «Desbloquear un Flujo»
   -------------------------------------------------------------------------- */
function initModal() {
  const modal = document.getElementById('cta-modal');
  const closeBtn = document.getElementById('modal-close');
  const openButtons = [
    document.getElementById('open-cta-modal'),
    document.getElementById('hero-primary-cta'),
    document.getElementById('footer-cta-btn'),
    document.getElementById('cta-bottom-btn')
  ];

  window.openModal = function(presetName) {
    if (!modal) return;
    modal.classList.add('active', 'open');
    modal.setAttribute('aria-hidden', 'false');

    if (presetName) {
      const caseInput = document.getElementById('form-case');
      if (caseInput && !caseInput.value) {
        caseInput.value = `Interés en plan: ${presetName}`;
      }
    }
  };

  openButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openModal();
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active', 'open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active', 'open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (modal.classList.contains('active') || modal.classList.contains('open'))) {
      modal.classList.remove('active', 'open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  if (!submitBtn) return;

  submitBtn.innerText = 'Procesando solicitud...';
  submitBtn.disabled = true;

  setTimeout(() => {
    const modalBox = document.querySelector('.modal-box, .modal-window');
    if (modalBox) {
      modalBox.innerHTML = `
        <div style="text-align: center; padding: 24px 0;">
          <div style="font-size: 3rem; margin-bottom: 16px; color: var(--accent);">✓</div>
          <h3 style="font-size: 1.8rem; margin-bottom: 12px; color: var(--text);">Solicitud de Piloto Recibida</h3>
          <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
            Un arquitecto de soluciones de VARNATIR contactará contigo en menos de 24 horas para definir el perímetro acotado de tu flujo sensible.
          </p>
          <button class="btn btn-primary" onclick="location.reload()">Volver a la web</button>
        </div>
      `;
    }
  }, 900);
}
window.handleFormSubmit = handleFormSubmit;

/* --------------------------------------------------------------------------
   10. Menú Móvil
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}
