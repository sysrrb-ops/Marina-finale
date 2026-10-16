(() => {
  // Query on load
  const section = document.querySelector('.cinema-scroll');
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const track = document.querySelector('.sights-track');
  const sightsControls = document.querySelector('.sights-controls');
  const sightPrev = document.querySelector('.sight-prev');
  const sightNext = document.querySelector('.sight-next');
  const initialCards = Array.from(document.querySelectorAll('.sight-card'));

  // State
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetScroll = 0;
  let smoothScroll = 0;
  let initialized = false;
  let rafPending = false;
  let sightCards = [];
  let originalSightCount = initialCards.length;
  let activeSight = originalSightCount;

  // Helpers
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const smoothstep = (e0, e1, v) => {
    const x = clamp((v - e0) / (e1 - e0));
    return x * x * (3 - 2 * x);
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const segmentInOut = (s, a, b, c, d) => {
    const enter = smoothstep(a, b, s);
    const exit = smoothstep(c, d, s);
    return { enter, exit, active: enter * (1 - exit) };
  };
  const getScrollDistance = () =>
    clamp(
      -section.getBoundingClientRect().top,
      0,
      section.offsetHeight - window.innerHeight
    );

  // Per-frame update
  function update() {
    rafPending = false;
    targetScroll = getScrollDistance();
    if (!initialized || reduceMotion.matches) {
      smoothScroll = targetScroll;
      initialized = true;
    } else {
      smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
    }
    if (Math.abs(smoothScroll - targetScroll) < 0.08) smoothScroll = targetScroll;

    mouseX = lerp(mouseX, targetMouseX, 0.12);
    mouseY = lerp(mouseY, targetMouseY, 0.12);

    const frame2 = segmentInOut(smoothScroll, 560, 900, 1300, 1620);
    const frame3 = segmentInOut(smoothScroll, 1760, 2140, 2540, 2700);
    const progress = clamp(smoothScroll / 2700);
    const introExit = smoothstep(90, 650, smoothScroll);
    const sightsEnterRaw = smoothstep(2760, 3560, smoothScroll);
    const sightsEnter = Math.pow(sightsEnterRaw, 1.55);
    const sightsControlsEnter = smoothstep(3360, 3660, smoothScroll);
    const blurActive = clamp(frame2.active + frame3.active);
    const frame2Opacity = frame2.active * (1 - frame3.enter);
    const splitDrift = Math.pow(frame2.enter, 1.5);
    const panel2Opacity = frame2.active * (1 - frame2.exit);
    const panel3Opacity = frame3.active * (1 - frame3.exit);
    const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
    const sharedHeroY = progress * -74;
    const sharedHeroScale = progress * 0.23;
    const sightsScreenTop = Math.min(220, Math.max(112, window.innerHeight * 0.19)) - 50;
    const sightsParentTop = window.innerHeight - (window.innerHeight - sightsScreenTop) / backScale;

    const style = root.style;

    style.setProperty('--mx', (reduceMotion.matches ? 0 : mouseX).toFixed(4));
    style.setProperty('--my', (reduceMotion.matches ? 0 : mouseY).toFixed(4));

    style.setProperty('--back-opacity', (1 - frame2.active * 0.06).toFixed(4));
    style.setProperty('--back-x', `${(mouseX * -12).toFixed(2)}px`);
    style.setProperty('--back-y', `${(mouseY * -4).toFixed(2)}px`);
    style.setProperty('--back-scale', backScale.toFixed(4));
    style.setProperty('--four-y', `${(10 + progress * 10).toFixed(2)}vh`);
    style.setProperty('--four-scale', (0.78 + progress * 0.16).toFixed(4));
    style.setProperty('--bazaar-y', `${(20 - progress * 8).toFixed(2)}vh`);
    style.setProperty('--blur-px', `${(blurActive * 14).toFixed(2)}px`);
    style.setProperty('--back-brightness', (1 - blurActive * 0.255).toFixed(4));
    style.setProperty('--bazaar-blur-px', `${(frame2.active * 14).toFixed(2)}px`);
    style.setProperty(
      '--bazaar-brightness',
      (1 - frame2.active * 0.255 - frame3.active * 0.06).toFixed(4)
    );
    style.setProperty('--bazaar-saturation', (1 + frame3.active * 0.18).toFixed(4));
    style.setProperty('--shade-opacity', '1');
    style.setProperty('--shade-z', frame2.active > 0.02 ? '2' : '0');
    style.setProperty('--shade-top-alpha', (blurActive * 0.465).toFixed(4));
    style.setProperty('--shade-mid-alpha', (blurActive * 0.42).toFixed(4));
    style.setProperty('--shade-bottom-alpha', (blurActive * 0.51).toFixed(4));

    style.setProperty('--title-y', `${(introExit * -210).toFixed(2)}px`);
    style.setProperty('--title-scale', (1 - introExit * 0.08).toFixed(4));
    style.setProperty('--title-opacity', (1 - introExit).toFixed(4));

    style.setProperty('--bridge-x', `calc(-50% + ${(mouseX * 18).toFixed(2)}px)`);
    style.setProperty('--bridge-y', `${(mouseY * 8 + sharedHeroY - frame2.exit * 760).toFixed(2)}px`);
    style.setProperty('--bridge-bottom', `${(5 - frame2.enter * 13).toFixed(2)}vh`);
    style.setProperty('--bridge-width', `${(67.2 + frame2.enter * 37.8).toFixed(2)}vw`);
    style.setProperty('--bridge-scale', (1.02 + sharedHeroScale + frame2.exit * 0.46).toFixed(4));

    style.setProperty(
      '--split-left-x',
      `calc(-50% + ${(-splitDrift * 46).toFixed(2)}vw + ${(mouseX * 22).toFixed(2)}px)`
    );
    style.setProperty('--split-left-y', `${(mouseY * 10 + sharedHeroY - splitDrift * 180).toFixed(2)}px`);
    style.setProperty(
      '--split-left-scale',
      (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(4)
    );
    style.setProperty(
      '--split-right-x',
      `calc(-50% + ${(splitDrift * 46).toFixed(2)}vw + ${(mouseX * 22).toFixed(2)}px)`
    );
    style.setProperty('--split-right-y', `${(mouseY * 10 + sharedHeroY - splitDrift * 180).toFixed(2)}px`);
    style.setProperty(
      '--split-right-scale',
      (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(4)
    );

    style.setProperty('--frame2-opacity', frame2Opacity.toFixed(4));
    style.setProperty('--frame2-x', `calc(-50% + ${(mouseX * 10).toFixed(2)}px)`);
    style.setProperty(
      '--frame2-y',
      `calc(-50% + ${(mouseY * 8 - frame2.exit * 150).toFixed(2)}px)`
    );
    style.setProperty(
      '--frame2-scale',
      (1.06 + frame2.enter * 0.08 + frame2.exit * 0.08).toFixed(4)
    );

    style.setProperty('--intro-copy-y', `${(introExit * 90).toFixed(2)}px`);
    style.setProperty('--intro-copy-opacity', (1 - introExit).toFixed(4));
    style.setProperty('--panel2-opacity', panel2Opacity.toFixed(4));
    style.setProperty(
      '--panel2-y',
      `calc(-50% + ${(-frame2.exit * 86 + (1 - frame2.enter) * 58).toFixed(2)}px)`
    );
    style.setProperty('--panel3-opacity', panel3Opacity.toFixed(4));
    style.setProperty(
      '--panel3-y',
      `calc(-50% + ${(-frame3.exit * 86 + (1 - frame3.enter) * 58).toFixed(2)}px)`
    );

    style.setProperty('--sights-opacity', sightsEnter.toFixed(4));
    style.setProperty('--sights-controls-opacity', sightsControlsEnter.toFixed(4));
    sightsControls.classList.toggle('is-ready', sightsControlsEnter > 0.98);
    style.setProperty('--sights-visibility', sightsEnter > 0.01 ? 'visible' : 'hidden');
    style.setProperty('--sights-y', '0px');
    style.setProperty('--sights-enter-x', `${((1 - sightsEnter) * 420).toFixed(2)}vw`);
    style.setProperty('--sights-scale', (1 / backScale).toFixed(4));
    style.setProperty('--sights-top', `${sightsParentTop.toFixed(2)}px`);
    style.setProperty('--sights-screen-top', `${sightsScreenTop.toFixed(2)}px`);

    if (
      Math.abs(smoothScroll - targetScroll) > 0.08 ||
      Math.abs(mouseX - targetMouseX) > 0.001 ||
      Math.abs(mouseY - targetMouseY) > 0.001
    ) {
      requestTick();
    }
  }

  function requestTick() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(update);
    }
  }

  // Infinite slider logic
  function setupSightSlider() {
    originalSightCount = initialCards.length;
    track.replaceChildren();

    for (let setIndex = 0; setIndex < 3; setIndex++) {
      initialCards.forEach((card, cardIndex) => {
        const clone = card.cloneNode(true);
        clone.dataset.sightIndex = String(setIndex * originalSightCount + cardIndex);
        track.appendChild(clone);
      });
    }

    sightCards = Array.from(track.querySelectorAll('.sight-card'));
    activeSight = originalSightCount; // start in middle set

    sightCards.forEach((card) => {
      card.addEventListener('click', () => selectSightCard(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectSightCard(card);
        }
      });
    });

    track.addEventListener('transitionend', normalizeSightSlider);
    updateSightSlider();
  }

  function updateSightSlider() {
    if (!sightCards.length) return;
    const cardWidth = sightCards[0].offsetWidth;
    const computedStyle = getComputedStyle(track);
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || '0') || 0;
    root.style.setProperty('--sights-shift', `${-(cardWidth + gap) * activeSight}px`);
    sightCards.forEach((card) => {
      card.classList.toggle('is-active', Number(card.dataset.sightIndex) === activeSight);
    });
  }

  function moveSightSlider(dir) {
    activeSight += dir;
    updateSightSlider();
  }

  function selectSightCard(card) {
    const idx = Number(card.dataset.sightIndex);
    if (Number.isFinite(idx)) {
      activeSight = idx;
      updateSightSlider();
    }
  }

  function jumpSightSlider(i) {
    track.classList.add('is-jumping');
    activeSight = i;
    updateSightSlider();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.classList.remove('is-jumping');
      });
    });
  }

  function normalizeSightSlider() {
    if (activeSight >= originalSightCount * 2) {
      jumpSightSlider(activeSight - originalSightCount);
    } else if (activeSight < originalSightCount) {
      jumpSightSlider(activeSight + originalSightCount);
    }
  }

  // Listeners
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => {
    updateSightSlider();
    requestTick();
  });
  window.addEventListener(
    'pointermove',
    (e) => {
      targetMouseX = e.clientX / window.innerWidth - 0.5;
      targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    },
    { passive: true }
  );

  if (sightPrev) {
    sightPrev.addEventListener('click', () => moveSightSlider(-1));
  }
  if (sightNext) {
    sightNext.addEventListener('click', () => moveSightSlider(1));
  }

  // Smooth scroll for nav anchors
  document.querySelectorAll('.site-nav a, .site-logo').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.slice(1);
      let targetY = 0;
      if (targetId === 'cinema') {
        targetY = 0;
      } else if (targetId === 'bridge') {
        targetY = 1100;
      } else if (targetId === 'bazaar') {
        targetY = 2240;
      } else if (targetId === 'routes') {
        targetY = 3560;
      } else {
        const el = document.getElementById(targetId);
        if (el) targetY = el.getBoundingClientRect().top + window.scrollY;
      }
      e.preventDefault();
      window.scrollTo({
        top: section.offsetTop + targetY,
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
      });
    });
  });

  // Language switcher toggle interaction
  const langBtn = document.querySelector('.language-switcher');
  if (langBtn) {
    const langSpan = langBtn.querySelector('span:first-child');
    langBtn.addEventListener('click', () => {
      if (langSpan) {
        langSpan.textContent = langSpan.textContent === 'EN' ? 'BS' : 'EN';
      }
    });
  }

  // Init
  let initializedSlider = false;
  function init() {
    if (initializedSlider) return;
    initializedSlider = true;
    setupSightSlider();
    requestTick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
