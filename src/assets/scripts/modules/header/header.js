import { initSmoothScrolling } from '../scroll/leniscroll';
import device from 'current-device';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateTitleOnScroll } from '../../modules/effects/animateTitle';

gsap.registerPlugin(ScrollTrigger);

initSmoothScrolling();

// let lastScroll = 0;
const header = document.querySelector('.header');
// const scrollThreshold = 10; // мінімальна зміна для реагування

// window.addEventListener('scroll', () => {
//   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//   // Якщо прокрутка незначна — нічого не робимо
//   if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;

//   if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
//     // Користувач крутить вниз
//     header.classList.add('hide');
//   } else {
//     // Користувач крутить вгору
//     header.classList.remove('hide');
//   }

//   lastScroll = currentScroll;
// });

const menuTimeline = gsap.timeline({
  paused: true,
  defaults: { ease: 'power3.out', duration: 1 },
});
const menu = document.querySelector('.menu-container');
menuTimeline
  .to(menu, {
    visibility: 'visible',
    duration: 0,
  })
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

  const seoToggle = evt.target.closest('[data-seo-block-toggle]');
  if (seoToggle) {
    const seoCard = seoToggle.closest('[data-seo-block]');
    const seoContent = seoCard.querySelector('[data-seo-block-content]');
    const isOpen = seoCard.classList.contains('is-open');

    if (isOpen) {
      seoContent.style.maxHeight = '0px';
      seoCard.classList.remove('is-open');
      seoToggle.setAttribute('aria-expanded', 'false');
    } else {
      seoContent.style.maxHeight = `${seoContent.scrollHeight}px`;
      seoCard.classList.add('is-open');
      seoToggle.setAttribute('aria-expanded', 'true');
    }

    return;
  }

  const btnUp = evt.target.closest('[data-btn-up]');

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenu = document.querySelector('[data-menu]');
  const menu = document.querySelector('[data-menu]');
  const menuItem = evt.target.closest('.menu-item');
  if (btnMenuTarget || menuItem) {
    const isHidden = menu.classList.contains('hide');

    if (isHidden) {
      window.dispatchEvent(new Event('stop-scroll'));
      menu.classList.remove('hide');
      header.classList.add('menu-is-open');
      // document.body.style.overflow = 'hidden';
      menuTimeline.play();
    } else {
      window.dispatchEvent(new Event('start-scroll'));
      // document.body.style.overflow = '';
      if (btnMenuTarget || menuItem.href.match('#')) {
        menuTimeline.reverse();
      }

      setTimeout(() => {
        menu.classList.add('hide');
      }, 500);

      header.classList.remove('menu-is-open');
    }

    return;
  }
  if (btnUp) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (btn) {
    if (overflow.classList.contains('hide')) {
      window.dispatchEvent(new Event('stop-scroll'));
      overflowMob.classList.add('hide');
      return overflow.classList.remove('hide');
    }
    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hide');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hide');
  }

  if (btnMob) {
    if (overflowMob.classList.contains('hide')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflowMob.classList.remove('hide');
    }
    return;
  }
  if (closeMob) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowMob.classList.add('hide');
  }

  if (evt.target === overflowMob) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowMob.classList.add('hide');
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

gsap.fromTo(
  '.header-bg',
  {
    duration: 0.4,
    // ease: 'power3.out',
    translateY: -100,
  },
  {
    duration: 0.4,
    // ease: 'power3.out',
    translateY: 0,
    delay: 0.2,
  },
);

// gsap.to('.page-title__wrap svg', {
//   rotate: 0,
//   duration: 1,
// });
// Анімацію вимкнено (закоментовано всі анімації, крім меню та попапів)
// document.addEventListener('DOMContentLoaded', () => {
//   const startPod = window.innerWidth > 768 ? '-5.2vw top' : '0px top';
//   const svgHeight = window.innerWidth > 768 ? -40 : -20;
//   const titleHeight = window.innerWidth > 768 ? -60 : -40;
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: '.page-title__wrap',
//         start: startPod,
//         end: '300% top',
//         scrub: true,
//       },
//     })
//     .fromTo(
//       '.page-title__wrap',
//       {
//         y: 0,
//       },
//       {
//         y: titleHeight,
//       },
//     )
//     .fromTo(
//       '.page-title__wrap svg',
//       {
//         y: 0,
//       },
//       {
//         y: svgHeight,
//       },
//       '<',
//     )
//     .fromTo(
//       '.page-title__wrap h1',
//       {
//         opacity: 1,
//       },
//       {
//         opacity: 0,
//       },
//       '<',
//     );
// });

console.log(window.location.pathname);
const loaderWrapEl = document.querySelector('.loader-wrap');
if (window.location.pathname === '/' && loaderWrapEl) {
  loaderWrapEl.style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrap');
  const percentText = document.querySelector('.loader__percent');
  const lineFill = document.querySelector('.loader__line-fill');

  // Розмітку лоадера тимчасово закоментовано (main.pug) — поки її немає,
  // просто сигналізуємо про готовність, щоб анімація hero все одно запустилась.
  if (!loader || !percentText || !lineFill) {
    let dispatched = false;
    const notifyLoaded = () => {
      if (dispatched) return;
      dispatched = true;
      window.dispatchEvent(new Event('loaderLoaded'));
    };
    window.addEventListener('load', notifyLoaded);
    setTimeout(notifyLoaded, 300);
    return;
  }

  let percent = 0;
  const speed = 10;

  const simulateLoading = setInterval(() => {
    // приріст відсотків під час завантаження
    percent += Math.random() * 8;
    if (percent > 95) percent = 95;
    percentText.textContent = `${Math.floor(percent)}%`;
    lineFill.style.width = `${percent}%`;
  }, speed);

  // Завершуємо лоадер або по реальному завантаженню, або по таймауту —
  // щоб не "висіти" довго на повільних ресурсах (відео/великі зображення)
  let isFinished = false;
  const finishLoading = () => {
    if (isFinished) return;
    isFinished = true;
    clearInterval(simulateLoading);

    let finalProgress = percent;
    const increase = setInterval(() => {
      finalProgress += 10;
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
          duration: 0.7,
          ease: 'power3.out',
        });
        gsap.to('.loader-top-part ', {
          yPercent: -100,
          duration: 0.7,
          ease: 'power3.out',
        });
        // невелика затримка перед “роз’їздом”
        window.dispatchEvent(new Event('loaderLoaded'));
        setTimeout(() => {
          loader.classList.add('loaded');
        }, 150);
      }

      percentText.textContent = `${Math.floor(finalProgress)}%`;
      lineFill.style.width = `${finalProgress}%`;
    }, 15);
  };

  window.addEventListener('load', finishLoading);
  setTimeout(finishLoading, 1200);
});

//Global animation
// Анімацію вимкнено (закоментовано всі анімації, крім меню та попапів)

// function initSvgScrollAnimation() {
//   // Всі елементи з data-svg-anim-left
//   document.querySelectorAll('[data-svg-anim-left]').forEach(el => {
//     gsap.fromTo(
//       el,
//       { rotate: 3, transformOrigin: 'center bottom' },
//       {
//         rotate: -3,
//         ease: 'none',
//         scrollTrigger: {
//           trigger: el,
//           start: 'top bottom', // коли елемент входить у в'юпорт
//           end: 'bottom top', // коли виходить
//           scrub: true, // плавно реагує на скрол
//         },
//       },
//     );
//   });

//   // Всі елементи з data-svg-anim-right
//   document.querySelectorAll('[data-svg-anim-right]').forEach(el => {
//     gsap.fromTo(
//       el,
//       { rotate: -3, transformOrigin: 'center bottom' },
//       {
//         rotate: 3,
//         ease: 'none',
//         scrollTrigger: {
//           trigger: el,
//           start: 'top bottom',
//           end: 'bottom top',
//           scrub: true,
//         },
//       },
//     );
//   });
// }

// // Викликати після завантаження DOM
// window.addEventListener('DOMContentLoaded', initSvgScrollAnimation);

// animateTitleOnScroll('.footer', '.footer-title');

// gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: '.footer-form',
//       start: 'top bottom',
//       // end: 'bottom top',
//     },
//   })
//   .from('.footer-form', {

//     yPercent: 20,
//   })
//   .from('.footer-form>svg', {
//     rotate: -3,
//   });

window.addEventListener('orientationchange', () => {
  // трохи почекати, поки браузер перерахує розміри
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});
