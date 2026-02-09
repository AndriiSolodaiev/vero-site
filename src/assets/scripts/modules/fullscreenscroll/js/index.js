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

const getActiveCategory = () => {
  const activeBtn = gallery.querySelector('.frame__nav-button.active');
  return activeBtn ? activeBtn.getAttribute('data-gallery-category') : null;
};

const getCurrentSlideIndex = () => {
  const visibleSlides = getVisibleSlides();
  return visibleSlides.findIndex(slide => slide.DOM.el.classList.contains('slide--current'));
};

const updateArrowStates = () => {
  const visibleSlides = getVisibleSlides();
  const currentIndex = getCurrentSlideIndex();
  const activeBtn = gallery.querySelector('.frame__nav-button.active');

  if (visibleSlides.length <= 1 && navButtons.length <= 1) {
    DOM.prevArrow?.classList.add('disabled');
    DOM.nextArrow?.classList.add('disabled');
    return;
  }

  // Перевірка для кнопки PREV
  // disabled тільки якщо: перший слайд + перша категорія
  if (currentIndex === 0) {
    const prevBtn = activeBtn?.previousElementSibling;
    const isFirstCategory = !prevBtn || !prevBtn.classList.contains('frame__nav-button');

    if (isFirstCategory) {
      DOM.prevArrow?.classList.add('disabled');
    } else {
      DOM.prevArrow?.classList.remove('disabled');
    }
  } else {
    DOM.prevArrow?.classList.remove('disabled');
  }

  // Перевірка для кнопки NEXT
  // disabled тільки якщо: останній слайд + остання категорія
  if (currentIndex === visibleSlides.length - 1) {
    const nextBtn = activeBtn?.nextElementSibling;
    const isLastCategory = !nextBtn || !nextBtn.classList.contains('frame__nav-button');

    if (isLastCategory) {
      DOM.nextArrow?.classList.add('disabled');
    } else {
      DOM.nextArrow?.classList.remove('disabled');
    }
  } else {
    DOM.nextArrow?.classList.remove('disabled');
  }
};

// ======================================================
// Switch Category
// ======================================================
const switchCategory = direction => {
  if (isAnimating) return false;

  const activeBtn = gallery.querySelector('.frame__nav-button.active');
  if (!activeBtn) return false;

  const targetBtn =
    direction === 'next' ? activeBtn.nextElementSibling : activeBtn.previousElementSibling;

  if (!targetBtn || !targetBtn.classList.contains('frame__nav-button')) {
    return false;
  }

  isAnimating = true;

  const currentSlideEl = document.querySelector('.slide--current');
  const currentSlideObj = slidesArr.find(s => s.DOM.el === currentSlideEl);

  // Змінюємо категорію
  const targetCategory = targetBtn.getAttribute('data-gallery-category');

  // Знаходимо всі слайди нової категорії
  const newCategorySlides = slidesArr.filter(slide => {
    const slideCategory = slide.DOM.el.getAttribute('data-category');
    return slideCategory === targetCategory;
  });

  if (newCategorySlides.length === 0) {
    isAnimating = false;
    return false;
  }

  // Визначаємо цільовий слайд
  const targetSlideObj =
    direction === 'next' ? newCategorySlides[0] : newCategorySlides[newCategorySlides.length - 1];

  const overlapOffset = 0;

  // Показуємо слайди нової категорії
  newCategorySlides.forEach(slide => {
    slide.DOM.el.style.display = 'block';
  });

  // Приховуємо слайди старої категорії (крім поточного)
  const oldCategory = activeBtn.getAttribute('data-gallery-category');
  slidesArr.forEach(slide => {
    const slideCategory = slide.DOM.el.getAttribute('data-category');
    if (slideCategory !== targetCategory && slide !== currentSlideObj) {
      slide.DOM.el.style.display = 'none';
    }
  });

  gsap.set(currentSlideObj.DOM.el, { display: 'block', opacity: 1, zIndex: 1 });
  gsap.set(targetSlideObj.DOM.el, { display: 'block', opacity: 1, zIndex: 2 });

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: 'power3.inOut' },
    onComplete: () => {
      // Оновлюємо активну кнопку
      navButtons.forEach(b => b.classList.remove('active'));
      targetBtn.classList.add('active');

      // Приховуємо всі слайди старої категорії
      slidesArr.forEach(slide => {
        const slideCategory = slide.DOM.el.getAttribute('data-category');
        if (slideCategory !== targetCategory) {
          slide.DOM.el.style.display = 'none';
          slide.DOM.el.classList.remove('slide--current');
        }
      });

      // Очищаємо трансформації поточного слайду
      currentSlideObj.DOM.el.classList.remove('slide--current');
      gsap.set(currentSlideObj.DOM.el, { clearProps: 'transform,zIndex,opacity' });
      gsap.set(currentSlideObj.DOM.imgInner, { clearProps: 'transform' });

      // Встановлюємо новий поточний слайд
      targetSlideObj.DOM.el.classList.add('slide--current');
      const pos = slidesArr.findIndex(s => s.DOM.el === targetSlideObj.DOM.el);
      if (pos !== -1) current = pos;

      isAnimating = false;
      updateArrowStates();

      if (typeof DOM.onChangeSlide === 'function') {
        DOM.onChangeSlide(current);
      }
    },
  });

  tl.addLabel('start', 0)
    .set(
      [currentSlideObj.DOM.imgInner, targetSlideObj.DOM.imgInner],
      { transformOrigin: direction === 'next' ? '0% 50%' : '100% 50%' },
      'start',
    )
    .set(
      targetSlideObj.DOM.el,
      { xPercent: direction === 'next' ? 100 - overlapOffset : -100 + overlapOffset },
      'start',
    )
    .set(
      targetSlideObj.DOM.inner,
      { xPercent: direction === 'next' ? -100 + overlapOffset : 100 - overlapOffset },
      'start',
    )
    .to(
      currentSlideObj.DOM.imgInner,
      {
        scaleX: 1.3,
        ease: 'power2.inOut',
      },
      'start',
    )
    .to(
      currentSlideObj.DOM.el,
      {
        xPercent: direction === 'next' ? -100 - overlapOffset : 100 + overlapOffset,
        ease: 'power3.inOut',
      },
      'start',
    )
    .fromTo(
      [targetSlideObj.DOM.el, targetSlideObj.DOM.inner],
      {
        xPercent: direction === 'next' ? 100 : -100,
      },
      {
        xPercent: 0,
        ease: 'power3.inOut',
      },
      'start',
    )
    .fromTo(
      targetSlideObj.DOM.imgInner,
      { scaleX: 1.5 },
      {
        scaleX: 1,
        ease: 'power2.out',
        duration: 0.8,
      },
      'start',
    );

  return true;
};

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

// Початкове оновлення стану стрілок
updateArrowStates();

// ======================================================
// Category Buttons Click
// ======================================================
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-gallery-category');
    let firstVisible = null;

    current = -1;

    slides.forEach(slide => {
      const slideCategory = slide.getAttribute('data-category');
      slide.classList.remove('slide--current');

      if (slideCategory === category) {
        slide.style.display = 'block';
        if (!firstVisible) firstVisible = slide;
      } else {
        slide.style.display = 'none';
      }

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
        opacity: 1,
        zIndex: 'auto',
        clearProps: 'transform,opacity,z-index',
      });
    });

    if (firstVisible) {
      firstVisible.classList.add('slide--current');

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

      const pos = slidesArr.findIndex(s => s.DOM.el === firstVisible);
      if (pos !== -1) current = pos;
    }

    updateArrowStates();
  });
});

// ======================================================
// Navigation Arrows
// ======================================================
if (DOM.prevArrow) {
  DOM.prevArrow.addEventListener('click', () => {
    if (isAnimating) return;

    const currentIndex = getCurrentSlideIndex();

    // Якщо на першому слайді - спробувати переключити категорію
    if (currentIndex === 0) {
      const switched = switchCategory('prev');
      if (!switched) {
        // Немає попередньої категорії - залишаємось
        return;
      }
    } else {
      prev();
    }
  });
}

if (DOM.nextArrow) {
  DOM.nextArrow.addEventListener('click', () => {
    if (isAnimating) return;

    const visibleSlides = getVisibleSlides();
    const currentIndex = getCurrentSlideIndex();

    // Якщо на останньому слайді - спробувати переключити категорію
    if (currentIndex === visibleSlides.length - 1) {
      const switched = switchCategory('next');
      if (!switched) {
        // Немає наступної категорії - залишаємось
        return;
      }
    } else {
      next();
    }
  });
}

// ======================================================
// Next / Prev
// ======================================================
const next = () => {
  const visibleSlides = getVisibleSlides();
  if (visibleSlides.length <= 1) return;

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
  if (visibleSlides.length <= 1) return;

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

  // Визначаємо індекси в межах видимих слайдів
  const currentVisibleIndex = visibleSlides.findIndex(s => s.DOM.el === slidesArr[current].DOM.el);
  const newVisibleIndex = visibleSlides.findIndex(s => s.DOM.el === slidesArr[newPosition].DOM.el);

  // Вперед = справа наліво, назад = зліва направо
  const direction = newVisibleIndex > currentVisibleIndex ? 'next' : 'prev';

  const currentSlide = slidesArr[current];
  current = newPosition;
  const upcomingSlide = slidesArr[current];

  const overlapOffset = 0;

  gsap.set(currentSlide.DOM.el, { display: 'block', opacity: 1, zIndex: 1 });
  gsap.set(upcomingSlide.DOM.el, { display: 'block', opacity: 1, zIndex: 2 });

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: 'power3.inOut' },
    onComplete: () => {
      currentSlide.DOM.el.classList.remove('slide--current');
      gsap.set(currentSlide.DOM.el, { clearProps: 'transform zIndex opacity' });
      gsap.set(currentSlide.DOM.imgInner, { clearProps: 'transform' });
      isAnimating = false;
      updateArrowStates();
    },
  });

  tl.addLabel('start', 0)
    .set(
      [currentSlide.DOM.imgInner, upcomingSlide.DOM.imgInner],
      { transformOrigin: direction === 'next' ? '0% 50%' : '100% 50%' },
      'start',
    )
    .set(
      upcomingSlide.DOM.el,
      { xPercent: direction === 'next' ? 100 - overlapOffset : -100 + overlapOffset },
      'start',
    )
    .set(
      upcomingSlide.DOM.inner,
      { xPercent: direction === 'next' ? -100 + overlapOffset : 100 - overlapOffset },
      'start',
    )
    .add(() => {
      upcomingSlide.DOM.el.classList.add('slide--current');
    }, 'start')
    .to(
      currentSlide.DOM.imgInner,
      {
        scaleX: 1.3,
        ease: 'power2.inOut',
      },
      'start',
    )
    .to(
      currentSlide.DOM.el,
      {
        xPercent: direction === 'next' ? -100 - overlapOffset : 100 + overlapOffset,
        ease: 'power3.inOut',
      },
      'start',
    )
    .fromTo(
      [upcomingSlide.DOM.el, upcomingSlide.DOM.inner],
      {
        xPercent: direction === 'next' ? 100 : -100,
      },
      {
        xPercent: 0,
        ease: 'power3.inOut',
      },
      'start',
    )
    .fromTo(
      upcomingSlide.DOM.imgInner,
      { scaleX: 1.5 },
      {
        scaleX: 1,
        ease: 'power2.out',
        duration: 0.8,
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
      defaults: { duration: 1, ease: 'power3.inOut' },
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
      .timeline({ defaults: { duration: 1, ease: 'power3.inOut' }, onComplete: complete })
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
