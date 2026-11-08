(() => {
  'use strict';
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const loader = document.querySelector('.site-loader');
  const loaderRule = loader.querySelector('.loader-rule');
  const loaderStatus = loader.querySelector('.loader-status');
  let introTimeline;
  let loaderClosed = false;
  let loaderProgress = 8;
  function setLoaderProgress(value, message) {
    if (loaderClosed || value <= loaderProgress) return;
    loaderProgress = value;
    loaderRule.style.setProperty('--loader-progress', String(value / 100));
    loaderRule.setAttribute('aria-valuenow', String(value));
    if (value === 100) loaderRule.classList.add('is-complete');
    if (message) {
      loaderStatus.classList.add('is-changing');
      setTimeout(() => {
        if (loaderClosed) return;
        loaderStatus.textContent = message;
        loaderStatus.classList.remove('is-changing');
      }, reduce.matches ? 0 : 140);
    }
  }
  setTimeout(() => setLoaderProgress(27, 'Preparando cada detalhe do seu conforto'), 180);
  setTimeout(() => setLoaderProgress(59, 'Ajustando luz, ar e atmosfera'), 520);
  setTimeout(() => setLoaderProgress(88, 'Quase pronto para você'), 840);
  function closeLoader() {
    if (loaderClosed) return;
    loaderClosed = true;
    clearTimeout(window.artificeLoaderGuard);
    const skipped = document.activeElement === loader.querySelector('.loader-skip');
    root.classList.remove('is-loading');
    loader.setAttribute('aria-hidden', 'true');
    if (skipped) document.querySelector('#conteudo').focus({ preventScroll: true });
    if (introTimeline) introTimeline.play(0);
  }
  window.artificeLoaderClose = closeLoader;
  loader.querySelector('.loader-skip').addEventListener('click', closeLoader);
  const windowReady = new Promise(resolve => {
    if (document.readyState === 'complete') resolve();
    else addEventListener('load', resolve, { once: true });
  });
  const heroImage = document.querySelector('.hero-product img');
  const imageReady = heroImage.decode ? heroImage.decode().catch(() => {}) : Promise.resolve();
  const fontsReady = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  Promise.race([
    Promise.all([windowReady, imageReady, fontsReady]),
    new Promise(resolve => setTimeout(resolve, 2400))
  ]).then(() => {
    const elapsed = performance.now() - (window.artificeLoaderStart || performance.now());
    const remaining = Math.max(0, 1000 - elapsed);
    setTimeout(() => {
      if (loaderClosed) return;
      setLoaderProgress(100, 'Tudo pronto. Bem-vindo à Artífice.');
      setTimeout(closeLoader, reduce.matches ? 120 : 360);
    }, remaining);
  });
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const progress = document.querySelector('.reading-progress span');
  const mobileContact = document.querySelector('.mobile-whatsapp');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  let scrollQueued = false;

  function updateShell() {
    const travel = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    header.classList.toggle('is-scrolled', scrollY > 24);
    progress.style.transform = `scaleX(${Math.min(1, scrollY / travel)})`;
    mobileContact.classList.toggle('is-visible', scrollY > hero.offsetHeight * .73);
    scrollQueued = false;
  }
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateShell); }
  }, { passive: true });
  addEventListener('resize', updateShell, { passive: true });
  updateShell();

  mobileMenu.inert = true;
  function closeMenu(restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    mobileMenu.hidden = true;
    mobileMenu.inert = true;
    header.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.hidden = !open;
    mobileMenu.inert = !open;
    header.classList.toggle('menu-open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu(true);
  });
  addEventListener('resize', () => { if (innerWidth > 900 && !mobileMenu.hidden) closeMenu(); }, { passive: true });

  const filterRange = document.querySelector('#filter-range');
  const filterScene = document.querySelector('.filter-scene');
  filterRange.addEventListener('input', () => filterScene.style.setProperty('--clean', `${filterRange.value}%`));

  const journeyContent = [
    { title: 'Tudo começa com uma boa conversa.', description: 'Explique sua necessidade e o ambiente. A orientação certa começa por aí.' },
    { title: 'Cuidado que aparece em cada detalhe.', description: 'Atenção técnica, organização e respeito pelo espaço fazem parte do que os clientes elogiam.' },
    { title: 'O espaço volta a ser seu.', description: 'O conforto térmico é o objetivo. A tranquilidade de ter sido bem atendido faz parte da experiência.' }
  ];
  const journeyButtons = [...document.querySelectorAll('[data-journey]')];
  const journeyDisplay = document.querySelector('.journey-display');
  const journeyTitle = document.querySelector('#journey-display-title');
  const journeyDescription = document.querySelector('#journey-display-description');
  const journeyCount = document.querySelector('.journey-count');
  let activeJourney = 0;
  function showJourney(index) {
    if (index === activeJourney && journeyDisplay.dataset.step === String(index)) return;
    activeJourney = index;
    journeyButtons.forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
    journeyDisplay.dataset.step = String(index);
    journeyTitle.textContent = journeyContent[index].title;
    journeyDescription.textContent = journeyContent[index].description;
    journeyCount.textContent = `${String(index + 1).padStart(2, '0')} / 03`;
  }
  journeyButtons.forEach((button, index) => button.addEventListener('click', () => showJourney(index)));

  const quoteForm = document.querySelector('#quote-form');
  const quoteLink = document.querySelector('#quote-link');
  function updateQuote() {
    const service = quoteForm.querySelector('input[name="service"]:checked').value;
    const region = quoteForm.querySelector('#quote-region').value.trim();
    const detail = quoteForm.querySelector('#quote-detail').value.trim();
    const lines = [
      'Olá, gostaria de solicitar um orçamento de ar-condicionado.',
      `Serviço: ${service}.`,
      region ? `Bairro/região: ${region}.` : '',
      detail ? `Detalhes: ${detail}` : ''
    ].filter(Boolean);
    quoteLink.href = `https://wa.me/5511965261945?text=${encodeURIComponent(lines.join('\n'))}`;
  }
  quoteForm.addEventListener('input', updateQuote);
  quoteForm.addEventListener('change', updateQuote);
  quoteForm.addEventListener('submit', event => { event.preventDefault(); updateQuote(); quoteLink.click(); });
  updateQuote();

  const gsapReady = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (gsapReady) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce.matches && typeof Lenis !== 'undefined') {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    if (root.classList.contains('intro-on') && !reduce.matches) {
      const markPaths = [...document.querySelectorAll('.brand-mark path')];
      markPaths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
      });
      introTimeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' }, onComplete: () => root.classList.remove('intro-on') })
        .fromTo('.hero-architecture', { scale: 1.045, opacity: .38 }, { scale: 1, opacity: .94, duration: 1.55 }, 0)
        .to(markPaths, { strokeDashoffset: 0, duration: .55, stagger: .07 }, 0)
        .fromTo('.hero-product', { x: 95, y: 25, opacity: 0, scale: .94 }, { x: 0, y: 0, opacity: 1, scale: 1, duration: 1.12 }, .22)
        .fromTo('.hero h1 span', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .77, stagger: .095 }, .27)
        .fromTo(['.hero-description', '.hero-actions', '.hero-rating'], { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .58, stagger: .095 }, .65)
        .fromTo('.hero-air', { opacity: 0 }, { opacity: .7, duration: .75 }, .84);
    }
    const revealTypes = { rise: { y: 34 }, words: { x: -32 }, line: { clipPath: 'inset(0 0 100% 0)' }, panel: { clipPath: 'inset(0 0 12% 0)' } };
    document.querySelectorAll('[data-reveal]').forEach((element, i) => {
      const from = reduce.matches ? { opacity: .65 } : { opacity: .35, ...(revealTypes[element.dataset.reveal] || revealTypes.rise) };
      gsap.fromTo(element, from, {
        opacity: 1, x: 0, y: 0, clipPath: 'inset(0 0 0% 0)',
        duration: reduce.matches ? .22 : .82, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      });
    });
    if (!reduce.matches) {
      gsap.to('.hero-air', { y: 65, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } });
      gsap.fromTo('.precision-image', { y: 65, rotateY: -7, rotateX: 3, scale: .95 }, {
        y: -32, rotateY: 4, rotateX: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.precision-visual', start: 'top bottom', end: 'bottom top', scrub: .9 }
      });
      gsap.fromTo('.precision-tag', { y: 20, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
        y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', stagger: .12, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: '.precision-visual', start: 'top 68%', once: true }
      });
      gsap.fromTo('.install-visual img', { y: 35, rotate: -4 }, {
        y: 0, rotate: -1, ease: 'none', scrollTrigger: { trigger: '.install-story', start: 'top bottom', end: 'bottom top', scrub: .8 }
      });
      gsap.fromTo('.filter-experience', { clipPath: 'inset(0 13% 0 13%)' }, {
        clipPath: 'inset(0 0% 0 0%)', ease: 'none', scrollTrigger: { trigger: '.cleaning-story', start: 'top 75%', end: 'center 45%', scrub: .8 }
      });
      ScrollTrigger.matchMedia({
        '(min-width: 901px)': () => {
          journeyButtons.forEach((button, index) => {
            ScrollTrigger.create({ trigger: button, start: 'top 58%', end: 'bottom 42%', onEnter: () => showJourney(index), onEnterBack: () => showJourney(index) });
          });
        }
      });
    }
  }
  if (!gsapReady || reduce.matches) root.classList.remove('intro-on');

  if (!reduce.matches && finePointer.matches) {
    const product = document.querySelector('.hero-product img');
    const productStage = document.querySelector('.hero-product');
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      productStage.classList.add('is-interactive');
      product.style.transform = `rotateY(${(x * 4).toFixed(2)}deg) rotateX(${(-y * 3).toFixed(2)}deg) translateY(${(-y * 5).toFixed(1)}px)`;
    });
    hero.addEventListener('pointerleave', () => {
      productStage.classList.remove('is-interactive');
      product.style.transform = '';
    });
  }

  const loopSections = document.querySelectorAll('.hero, .maintenance-story, .manifesto-strip');
  if ('IntersectionObserver' in window) {
    const loopObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-offscreen', !entry.isIntersecting)), { threshold: 0 });
    loopSections.forEach(section => loopObserver.observe(section));
  }

  const reviewViewport = document.querySelector('.reviews-viewport');
  const reviewTrack = document.querySelector('.reviews-track');
  const originalCards = [...reviewTrack.querySelectorAll('.review-card')];
  const pauseButton = document.querySelector('[data-review-pause]');
  const pauseSymbol = pauseButton.querySelector('.pause-symbol');
  const pauseText = pauseButton.querySelector('.pause-text');
  const announcement = document.createElement('span');
  announcement.className = 'sr-only';
  announcement.setAttribute('aria-live', 'polite');
  document.querySelector('.review-controls').appendChild(announcement);
  let paused = reduce.matches;
  let hovered = false;
  let focused = false;
  let visible = false;
  let frame = 0;
  let lastFrame = 0;
  let offset = 0;
  let loopWidth = 0;
  let stepWidth = 0;
  let dragging = false;
  let lastX = 0;
  let lastMoveTime = 0;
  let inertia = 0;
  const nudge = { value: 0 };
  if (!reduce.matches) originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    reviewTrack.appendChild(clone);
  });
  function measureReviews() {
    if (originalCards.length < 2) return;
    const before = loopWidth;
    const gap = parseFloat(getComputedStyle(reviewTrack).gap) || 0;
    stepWidth = originalCards[1].offsetLeft - originalCards[0].offsetLeft;
    loopWidth = originalCards.at(-1).offsetLeft + originalCards.at(-1).offsetWidth + gap - originalCards[0].offsetLeft;
    if (before > 0 && before !== loopWidth) offset *= loopWidth / before;
    renderReviews();
  }
  function renderReviews() {
    if (!loopWidth || reduce.matches) return;
    const position = ((offset + nudge.value) % loopWidth + loopWidth) % loopWidth;
    reviewTrack.style.transform = `translate3d(${-position}px,0,0)`;
  }
  function animationFrame(now) {
    const dt = Math.min(40, now - (lastFrame || now));
    lastFrame = now;
    if (!dragging && !focused) {
      if (!paused) offset += (hovered ? .013 : .045) * dt;
      if (Math.abs(inertia) > .003) {
        offset += inertia * dt;
        inertia *= Math.pow(.90, dt / 16.7);
      } else inertia = 0;
    }
    renderReviews();
    frame = requestAnimationFrame(animationFrame);
  }
  function syncFrame() {
    if (!reduce.matches && visible && !document.hidden) {
      if (!frame) { lastFrame = 0; frame = requestAnimationFrame(animationFrame); }
    } else if (frame) { cancelAnimationFrame(frame); frame = 0; }
  }
  function updatePause() {
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Retomar movimento das avaliações' : 'Pausar movimento das avaliações');
    pauseSymbol.textContent = paused ? '▶' : 'Ⅱ';
    pauseText.textContent = paused ? 'Reproduzir' : 'Pausar';
  }
  function moveReview(direction) {
    const current = Math.round((((offset + nudge.value) % loopWidth) + loopWidth) % loopWidth / stepWidth);
    const next = (current + direction + originalCards.length) % originalCards.length;
    announcement.textContent = `Avaliação de ${originalCards[next].querySelector('.review-card-bottom strong').textContent}`;
    if (reduce.matches) {
      reviewViewport.scrollBy({ left: direction * stepWidth, behavior: 'smooth' });
    } else if (gsapReady) {
      gsap.killTweensOf(nudge);
      gsap.to(nudge, { value: nudge.value + direction * stepWidth, duration: .62, ease: 'power3.inOut', onUpdate: renderReviews });
    } else { offset += direction * stepWidth; renderReviews(); }
  }
  document.querySelector('[data-review-prev]').addEventListener('click', () => moveReview(-1));
  document.querySelector('[data-review-next]').addEventListener('click', () => moveReview(1));
  pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
  reviewViewport.addEventListener('mouseenter', () => { hovered = true; });
  reviewViewport.addEventListener('mouseleave', () => { hovered = false; });
  reviewViewport.addEventListener('focusin', () => { focused = true; });
  reviewViewport.addEventListener('focusout', () => { focused = false; });
  reviewViewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveReview(event.key === 'ArrowRight' ? 1 : -1); }
  });
  reviewViewport.addEventListener('pointerdown', event => {
    if (reduce.matches || event.button !== 0 || !loopWidth) return;
    dragging = true; inertia = 0; lastX = event.clientX; lastMoveTime = performance.now();
    reviewViewport.classList.add('is-dragging');
    reviewViewport.setPointerCapture(event.pointerId);
  });
  reviewViewport.addEventListener('pointermove', event => {
    if (!dragging) return;
    const now = performance.now();
    const dx = event.clientX - lastX;
    const dt = Math.max(1, now - lastMoveTime);
    offset -= dx;
    inertia = -dx / dt;
    lastX = event.clientX; lastMoveTime = now;
    renderReviews();
  });
  function endDrag(event) {
    if (!dragging) return;
    dragging = false;
    reviewViewport.classList.remove('is-dragging');
    if (reviewViewport.hasPointerCapture(event.pointerId)) reviewViewport.releasePointerCapture(event.pointerId);
  }
  reviewViewport.addEventListener('pointerup', endDrag);
  reviewViewport.addEventListener('pointercancel', endDrag);
  addEventListener('resize', measureReviews, { passive: true });
  document.addEventListener('visibilitychange', syncFrame);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncFrame(); }, { threshold: .08 });
    observer.observe(reviewViewport);
  } else { visible = true; syncFrame(); }
  measureReviews();
  updatePause();
})();
