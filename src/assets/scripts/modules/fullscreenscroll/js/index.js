import { gsap } from 'gsap';
import { preloadImages } from './utils';
import { CursorText } from './cursor';
import { Slide } from './slide';
import { Observer } from 'gsap/Observer.js';
gsap.registerPlugin(Observer);

// ======================================================
// Helper
// ======================================================
function pad(num) {
  return (num < 10 ? '0' : '') + num;
}

// ======================================================
// DOM References
// ======================================================
const gallery = document.querySelector('.home-gallery-screen');
const navButtons = gallery.querySelectorAll('.frame__nav-button');
const slides = gallery.querySelectorAll('.slide');

const DOM = {
  slides: [...slides],
  cursor: document.querySelector('.cursor'),
  prevArrow: document.querySelector('[data-gallery="prev"]'),
  nextArrow: document.querySelector('[data-gallery="next"]'),
  onChangeSlide: current => {
    document.querySelectorAll('[data-gallery-current]').forEach(item => {
      item.textContent = pad(current + 1);
    });
  },
};

// ======================================================
// Build Slides Array
// ======================================================
let slidesArr = [];
DOM.slides.forEach(slide => slidesArr.push(new Slide(slide)));

let current = -1;
let isAnimating = false;

// ======================================================
// Helpers
// ======================================================
const getVisibleSlides = () =>
  slidesArr.filter(slide => {
    const display = window.getComputedStyle(slide.DOM.el).display;
    return display !== 'none';
  });

// ======================================================
// Initial Category Setup
// ======================================================
let activeBtn = gallery.querySelector('.frame__nav-button.active');
if (!activeBtn && navButtons.length > 0) {
  activeBtn = navButtons[0];
  activeBtn.classList.add('active');
}

if (activeBtn) {
  const activeCategory = activeBtn.getAttribute('data-gallery-category');
  let firstVisible = null;

  slides.forEach(slide => {
    const slideCategory = slide.getAttribute('data-category');
    slide.classList.remove('slide--current');

    if (slideCategory === activeCategory) {
      slide.style.display = 'block';
      if (!firstVisible) firstVisible = slide;
    } else {
      slide.style.display = 'none';
    }
  });

  if (firstVisible) {
    firstVisible.classList.add('slide--current');
    const pos = slidesArr.findIndex(s => s.DOM.el === firstVisible);
    if (pos !== -1) current = pos;
  }
}

// ======================================================
// Category Buttons Click
// ======================================================
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1️⃣ Прибрати active у всіх
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2️⃣ Отримати категорію
    const category = btn.getAttribute('data-gallery-category');
    let firstVisible = null;

    current = -1;

    // 3️⃣ Пройтись по всіх слайдах
    slides.forEach(slide => {
      const slideCategory = slide.getAttribute('data-category');
      slide.classList.remove('slide--current');

      if (slideCategory === category) {
        slide.style.display = 'block';
        if (!firstVisible) firstVisible = slide;
      } else {
        slide.style.display = 'none';
      }

      // 🔄 Повне очищення трансформацій усього слайду та його внутрішніх елементів
      const innerEls = slide.querySelectorAll(
        '.slide__inner, .slide__img, .slide__img-inner, .slide__img-inner2',
      );

      gsap.set([slide, ...innerEls], {
        x: 0,
        y: 0,
        z: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        opacity: 1, // повертаємо прозорість
        zIndex: 'auto', // повертаємо стандартний стековий контекст
        clearProps: 'transform,opacity,z-index',
      });
    });

    // 4️⃣ Встановити slide--current на перший видимий
    if (firstVisible) {
      firstVisible.classList.add('slide--current');

      // 🔄 Іще раз обнулити всі вкладені елементи першого видимого
      const firstInnerEls = firstVisible.querySelectorAll(
        '.slide__inner, .slide__img, .slide__img-inner, .slide__img-inner2',
      );

      gsap.set([firstVisible, ...firstInnerEls], {
        x: 0,
        y: 0,
        z: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 'auto',
        clearProps: 'transform,opacity,z-index',
      });

      // 5️⃣ Оновити current-індекс
      const pos = slidesArr.findIndex(s => s.DOM.el === firstVisible);
      if (pos !== -1) current = pos;
    }
  });
});

// ======================================================
// Navigation Arrows
// ======================================================
if (DOM.prevArrow) {
  DOM.prevArrow.addEventListener('click', () => {
    if (isAnimating) return;
    prev();
  });
}
if (DOM.nextArrow) {
  DOM.nextArrow.addEventListener('click', () => {
    if (isAnimating) return;
    next();
  });
}

// ======================================================
// Next / Prev
// ======================================================
const next = () => {
  const visibleSlides = getVisibleSlides();
  if (visibleSlides.length <= 1) return; // один слайд — не рухаємось

  const currentIndex = visibleSlides.findIndex(slide =>
    slide.DOM.el.classList.contains('slide--current'),
  );
  const newIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % visibleSlides.length;
  const newSlide = visibleSlides[newIndex];

  slidesArr.forEach(slide => slide.DOM.el.classList.remove('slide--current'));
  newSlide.DOM.el.classList.add('slide--current');
  navigateToVisible(newSlide);
};

const prev = () => {
  const visibleSlides = getVisibleSlides();
  if (visibleSlides.length <= 1) return; // один слайд — не рухаємось

  const currentIndex = visibleSlides.findIndex(slide =>
    slide.DOM.el.classList.contains('slide--current'),
  );
  const newIndex =
    currentIndex === -1
      ? visibleSlides.length - 1
      : (currentIndex - 1 + visibleSlides.length) % visibleSlides.length;
  const newSlide = visibleSlides[newIndex];

  slidesArr.forEach(slide => slide.DOM.el.classList.remove('slide--current'));
  newSlide.DOM.el.classList.add('slide--current');
  navigateToVisible(newSlide);
};

function navigateToVisible(targetSlide) {
  if (!targetSlide) return;
  const newPosition = slidesArr.findIndex(s => s.DOM.el === targetSlide.DOM.el);
  if (newPosition === -1 || newPosition === current || isAnimating) return;
  navigate(newPosition);
}

// ======================================================
// GSAP Slide Navigation
// ======================================================

const navigate = newPosition => {
  if (isAnimating) return;
  isAnimating = true;

  const visibleSlides = getVisibleSlides();
  const visibleTotal = visibleSlides.length;
  if (visibleTotal <= 1) {
    isAnimating = false;
    return;
  }

  const direction =
    current < newPosition
      ? current === 0 && newPosition === visibleTotal - 1
        ? 'prev'
        : 'next'
      : current === visibleTotal - 1 && newPosition === 0
      ? 'next'
      : 'prev';

  const currentSlide = slidesArr[current];
  current = newPosition;
  const upcomingSlide = slidesArr[current];

  const overlapOffset = 0; // мінімальне перекриття — щоб не було щілини

  gsap.set(currentSlide.DOM.el, { display: 'block', opacity: 1, zIndex: 1 });
  gsap.set(upcomingSlide.DOM.el, { display: 'block', opacity: 1, zIndex: 2 });

  const tl = gsap.timeline({
    defaults: { duration: 1.6, ease: 'power3.inOut' },
    onComplete: () => {
      currentSlide.DOM.el.classList.remove('slide--current');
      gsap.set(currentSlide.DOM.el, { clearProps: 'transform zIndex opacity' });
      gsap.set(currentSlide.DOM.imgInner, { clearProps: 'transform' });
      isAnimating = false;
    },
  });

  tl.addLabel('start', 0)
    // 🔹 визначаємо центр деформації для обох
    .set(
      [currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner],
      { transformOrigin: direction === 'next' ? '50% 0%' : '50% 100%' },
      'start',
    )

    // 🔹 розташування нового слайду поза екраном
    .set(
      upcomingSlide.DOM.el,
      { yPercent: direction === 'next' ? 100 - overlapOffset : -100 + overlapOffset },
      'start',
    )
    .set(
      upcomingSlide.DOM.inner,
      { yPercent: direction === 'next' ? -100 + overlapOffset : 100 - overlapOffset },
      'start',
    )

    // додаємо клас
    .add(() => {
      upcomingSlide.DOM.el.classList.add('slide--current');
    }, 'start')

    // 🟢 поточний слайд рухається з невеликим “тягучим” scaleY
    .to(
      currentSlide.DOM.imgInner,
      {
        scaleY: 1.3, // 🔥 менше, ніж 1.45 → виглядає природно
        ease: 'power2.inOut',
      },
      'start',
    )
    .to(
      currentSlide.DOM.el,
      {
        yPercent: direction === 'next' ? -100 - overlapOffset : 100 + overlapOffset,
        ease: 'power3.inOut',
      },
      'start',
    )

    // 🟣 новий слайд в’їжджає і “здувається” одночасно
    .fromTo(
      [upcomingSlide.DOM.el, upcomingSlide.DOM.inner],
      {
        yPercent: direction === 'next' ? 100 : -100,
      },
      {
        yPercent: 0,
        ease: 'power3.inOut',
      },
      'start',
    )
    .fromTo(
      upcomingSlide.DOM.imgInner,
      { scaleY: 1.5 },
      {
        scaleY: 1,
        ease: 'power2.out',
        duration: 1.4,
      },
      'start',
    );

  if (typeof DOM.onChangeSlide === 'function') {
    DOM.onChangeSlide(current);
  }
};

// ======================================================
// Optional: Show / Hide content
// ======================================================
const showContent = position => {
  if (isAnimating) return;
  isAnimating = true;
  const slide = slidesArr[position];
  slide.isOpen = true;

  gsap
    .timeline({
      defaults: { duration: 1.6, ease: 'power3.inOut' },
      onComplete: () => (isAnimating = false),
    })
    .addLabel('start', 0)
    .to(slide.DOM.img, { yPercent: -100 }, 'start')
    .set(slide.DOM.imgInner, { transformOrigin: '50% 100%' }, 'start')
    .to(slide.DOM.imgInner, { yPercent: 100, scaleY: 2 }, 'start');
};

const hideContent = (slide, animate = false) => {
  isAnimating = true;
  const complete = () => {
    slide.isOpen = false;
    isAnimating = false;
  };

  if (animate) {
    gsap
      .timeline({ defaults: { duration: 1.6, ease: 'power3.inOut' }, onComplete: complete })
      .addLabel('start', 0)
      .to(slide.DOM.img, { yPercent: 0 }, 'start')
      .to(slide.DOM.imgInner, { yPercent: 0, scaleY: 1 }, 'start');
  } else {
    gsap.set(slide.DOM.img, { yPercent: 0 });
    gsap.set(slide.DOM.imgInner, { yPercent: 0, scaleY: 1 });
    complete();
  }
};

// ======================================================
// Init Events
// ======================================================
const initEvents = () => {
  for (const [position, slide] of slidesArr.entries()) {
    slide.DOM.img.addEventListener('click', () => showContent(position));
  }
};

// ======================================================
// Start
// ======================================================
initEvents();
preloadImages('.slide__img-inner').then(_ => {
  document.body.classList.remove('loading');
});
