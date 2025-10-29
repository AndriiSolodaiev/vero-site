import { initSmoothScrolling } from '../scroll/leniscroll';
import device from 'current-device';

import { gsap, ScrollTrigger } from 'gsap/all';
import { animateTitleOnScroll } from '../../modules/effects/animateTitle';

gsap.registerPlugin(ScrollTrigger);

initSmoothScrolling();
const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});

const menuTimeline = gsap.timeline({
  paused: true,
  defaults: { ease: 'power3.out', duration: 1 },
});
const menu = document.querySelector('.menu-container');
menuTimeline
  .from(
    '.menu-left-part',
    {
      xPercent: -100,
      duration: 1,
      ease: 'power3.out',
    },
    0,
  )
  .from(
    '.menu-right-part',
    {
      xPercent: 100,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-1',
    {
      y: -1000,
      x: -400,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<+=0.2',
  )
  .from(
    '.menu-item-2',
    {
      y: -1200,
      x: -200,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-3',
    {
      y: -1400,

      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-4',
    {
      y: -1200,
      x: 200,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-5',
    {
      y: -1000,
      x: 400,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-6',
    {
      y: 1000,
      x: -400,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-7',
    {
      y: 1200,
      x: -200,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-8',
    {
      y: 1400,

      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-9',
    {
      y: 1200,
      x: 200,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-item-10',
    {
      y: 1000,
      x: 400,
      rotate: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  );

document.body.addEventListener('click', function(evt) {
  const close = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');

  const btnMob = evt.target.closest('[data-mob-call-btn]');
  const overflowMob = document.querySelector('[data-mob-call__overflow]');
  const closeMob = evt.target.closest('[data-mob-call-close]');

  const countryList = evt.target.closest('.iti__country-list');

  const btnUp = evt.target.closest('[data-btn-up]');

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenu = document.querySelector('[data-menu]');
  const menu = document.querySelector('[data-menu]');
  const menuItem = evt.target.closest('.menu-item');
  if (btnMenuTarget || menuItem) {
    const isHidden = menu.classList.contains('hidden');

    if (isHidden) {
      window.dispatchEvent(new Event('stop-scroll'));
      menu.classList.remove('hidden');
      header.classList.add('menu-is-open');

      menuTimeline.play();
    } else {
      window.dispatchEvent(new Event('start-scroll'));
      menuTimeline.reverse();
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 500);

      header.classList.remove('menu-is-open');
    }

    return;
  }
  if (btnUp) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      overflowMob.classList.add('hidden');
      return overflow.classList.remove('hidden');
    }
    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }

  if (btnMob) {
    if (overflowMob.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflowMob.classList.remove('hidden');
    }
    return;
  }
  if (closeMob) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowMob.classList.add('hidden');
  }

  if (evt.target === overflowMob) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowMob.classList.add('hidden');
  }
});

const inputs = document.querySelectorAll('.form-field-input');

if (inputs.length) {
  inputs.forEach(field => {
    const input = field.querySelector('.form-field__input');
    if (!input) {
      console.warn('Поле не містить <input>', field);
      return;
    }
    input.addEventListener('focus', () => {
      field.classList.add('is-focused');
    });

    input.addEventListener('blur', () => {
      // прибирати фокус тільки якщо поле порожнє
      if (!input.value) {
        field.classList.remove('is-focused');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.iti__country-list').forEach(el => {
    el.setAttribute('data-lenis-prevent', '');
  });
});

gsap.to('.header', {
  duration: 1.5,
  ease: 'power3.out',
  translateY: 0,
});

// gsap.to('.page-title__wrap svg', {
//   rotate: 0,
//   duration: 1,
// });
document.addEventListener('DOMContentLoaded', () => {
  const startPod = window.innerWidth > 768 ? '-5.2vw top' : '0px top';
  const svgHeight = window.innerWidth > 768 ? -40 : -20;
  const titleHeight = window.innerWidth > 768 ? -60 : -40;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.page-title__wrap',
        start: startPod,
        end: '300% top',
        scrub: true,
      },
    })
    .fromTo(
      '.page-title__wrap',
      {
        y: 0,
      },
      {
        y: titleHeight,
      },
    )
    .fromTo(
      '.page-title__wrap svg',
      {
        y: 0,
      },
      {
        y: svgHeight,
      },
      '<',
    )
    .fromTo(
      '.page-title__wrap h1',
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
      '<',
    );
});

console.log(window.location.pathname);
if (window.location.pathname === '/') {
  document.querySelector('.loader-wrap').style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrap');
  const percentText = document.querySelector('.loader__percent');
  const lineFill = document.querySelector('.loader__line-fill');

  let percent = 0;
  const speed = 30;

  const simulateLoading = setInterval(() => {
    // приріст відсотків під час завантаження
    percent += Math.random() * 5;
    if (percent > 95) percent = 95;
    percentText.textContent = `${Math.floor(percent)}%`;
    lineFill.style.width = `${percent}%`;
  }, speed);

  // коли вся сторінка справді завантажена
  window.addEventListener('load', () => {
    clearInterval(simulateLoading);

    let finalProgress = percent;
    const increase = setInterval(() => {
      finalProgress += 2;
      if (finalProgress >= 100) {
        finalProgress = 100;
        clearInterval(increase);
        gsap.to('.loader__line ', {
          opacity: 0,
          duration: 0.1,
          ease: 'power3.out',
        });
        gsap.to('.loader-bottom-part ', {
          yPercent: 100,
          duration: 1.22,
          ease: 'power3.out',
        });
        gsap.to('.loader-top-part ', {
          yPercent: -100,
          duration: 1.2,
          ease: 'power3.out',
        });
        // невелика затримка перед “роз’їздом”
        window.dispatchEvent(new Event('loaderLoaded'));
        setTimeout(() => {
          loader.classList.add('loaded');
        }, 500);
      }

      percentText.textContent = `${Math.floor(finalProgress)}%`;
      lineFill.style.width = `${finalProgress}%`;
    }, 30);
  });
});

//Global animation

function initSvgScrollAnimation() {
  // Всі елементи з data-svg-anim-left
  document.querySelectorAll('[data-svg-anim-left]').forEach(el => {
    gsap.fromTo(
      el,
      { rotate: 3, transformOrigin: 'center bottom' },
      {
        rotate: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom', // коли елемент входить у в'юпорт
          end: 'bottom top', // коли виходить
          scrub: true, // плавно реагує на скрол
        },
      },
    );
  });

  // Всі елементи з data-svg-anim-right
  document.querySelectorAll('[data-svg-anim-right]').forEach(el => {
    gsap.fromTo(
      el,
      { rotate: -3, transformOrigin: 'center bottom' },
      {
        rotate: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

// Викликати після завантаження DOM
window.addEventListener('DOMContentLoaded', initSvgScrollAnimation);

animateTitleOnScroll('.footer', '.footer-title');

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.footer-form',
      start: 'top bottom',
      // end: 'bottom top',
    },
  })
  .from('.footer-form', {
    opacity: 0,
    yPercent: 20,
  })
  .from('.footer-form>svg', {
    rotate: -3,
  });

window.addEventListener('orientationchange', () => {
  // трохи почекати, поки браузер перерахує розміри
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});
