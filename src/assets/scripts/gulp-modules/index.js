import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
import '../modules/gallery/gallerySlider';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

const tlFiller = gsap.timeline({
  scrollTrigger: {
    trigger: '.filler',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});

// Плавне розсунення псевдоелементів
tlFiller.fromTo(
  '.filler-img-wrap>img',
  {
    scale: 1.1,
    yPercent: -10,
    ease: 'none',
  },
  {
    duration: 1,
    scale: 1.1,
    yPercent: 10,
    ease: 'none',
  },
);
let tlFillerContent = gsap.timeline({
  scrollTrigger: {
    trigger: '.filler',
    start: 'top center', // коли з’являється секція
    toggleActions: 'play none none none',
  },
});

// 1. Ліва картинка
tlFillerContent
  .fromTo(
    '.filler .filler-img--left',
    { x: -100, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
  )
  .fromTo(
    '.filler .filler-img--right',
    { x: 100, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
    '<', // почати трохи раніше за попередній
  )
  .fromTo(
    '.filler .filler-title',
    { y: 50, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' },
    '<',
  )
  .fromTo(
    '.filler .hero-slogan',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
    '<+=0.2', // трошки раніше, щоб був перекритий ефект
  )
  .fromTo(
    '.filler .general-btn',
    { y: 20, opacity: 0, scale: 0.9 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
    '<',
  );
window.addEventListener('loaderLoaded', () => {
  gsap.fromTo(
    '.hero .section-title, .hero .hero-slogan, .hero .section-descr, .hero .video-frame img',
    {
      y: 80,
      stagger: 0.2,
      scale: 0.8,
      duration: 1.5,
      ease: 'power3.out',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)',
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      y: 0,
      scale: 1,
    },
  );
});

// 2. Hero піниться (але друга секція налізає)
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: '+=100%',
  pin: true,
  pinSpacing: false, // <-- без відступу!
});

document.addEventListener('DOMContentLoaded', function() {
  // Знаходимо всі блоки з відео
  const videoBlocks = document.querySelectorAll('.video-wrapper');

  videoBlocks.forEach(block => {
    const videoBtn = block.querySelector('.video-btn');
    const btnDescription = block.querySelector('.btn-description');
    const video = block.querySelector('video');

    // Клік по кнопці
    videoBtn.addEventListener('click', function() {
      videoBtn.classList.add('hidden');
      btnDescription.classList.add('hidden');

      video.classList.add('playing');
      video.play();
    });

    // Коли відео закінчиться — повернути кнопку й опис
    video.addEventListener('ended', function() {
      videoBtn.classList.remove('hidden');
      btnDescription.classList.remove('hidden');
      video.classList.remove('playing');
    });

    // Якщо користувач натисне паузу до кінця — теж повернути кнопку
    video.addEventListener('pause', function() {
      if (video.currentTime < video.duration) {
        videoBtn.classList.remove('hidden');
        btnDescription.classList.remove('hidden');
      }
    });
  });
});
export function animateTitleOnScroll(triggerSelector, titleSelector) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerSelector,
      start: 'top 80%', // коли секція з’являється у viewport
      toggleActions: 'play none none reverse',
    },
  });

  // SVG
  tl.fromTo(
    `${titleSelector} svg`,
    { rotation: 360, scale: 0.5, x: 200, opacity: 0 },
    { x: 0, rotation: 0, scale: 1, opacity: 1, duration: 1 },
  );

  // H2
  tl.fromTo(
    `${titleSelector} h2`,
    { x: 200, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '<', // почати трохи раніше
  );
  tl.fromTo(
    `${titleSelector} h3`,
    { x: -200, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '<', // почати трохи раніше
  );
  // Текст (параграф)
  //  tl.fromTo(
  //    `${titleSelector} .about-text`,
  //    { y: 50, opacity: 0 },
  //    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
  //    '-=0.6',
  //  );
}

// Використання:
animateTitleOnScroll('.about-project', '.about-project-title');
animateTitleOnScroll('.advantages', '.advantages-title');
animateTitleOnScroll('.real-estate-homepage', '.real-estate-title');
animateTitleOnScroll('.location', '.location-title');
animateTitleOnScroll('.progress-homepage', '.progress-homepage-title');
animateTitleOnScroll('.invest-homepage', '.invest-homepage-title');
animateTitleOnScroll('.developer', '.developer-title');
animateTitleOnScroll('.promo-homepage', '.promo-homepage-title');
animateTitleOnScroll('.gallery-homepage', '.gallery-homepage-title');
function initCardsAnimation() {
  const cards = document.querySelectorAll('.advantages-card');

  // Якщо десктоп — складна анімація
  if (window.innerWidth >= 1366) {
    gsap.set(cards, {
      opacity: 0,
      y: 150,
      rotation: () => gsap.utils.random(-25, 25),
      scale: 0.6,
      filter: 'blur(8px)',
      transformOrigin: 'center center',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages-cards',
        start: 'top-=20% bottom',
        end: 'bottom bottom',
        scrub: 1,
        markers: false,
      },
    });

    cards.forEach((card, index) => {
      let finalRotation, finalX, finalY, zIndex;

      switch (index + 1) {
        case 1:
          finalRotation = 3;
          finalX = 0;
          finalY = '30%';
          zIndex = 2;
          break;
        case 2:
          finalRotation = -3;
          finalX = '-20%';
          finalY = 0;
          zIndex = 1;
          break;
        case 3:
          finalRotation = 3;
          finalX = '-40%';
          finalY = '-40%';
          zIndex = 2;
          break;
        case 4:
          finalRotation = -3;
          finalX = '10%';
          finalY = '10%';
          zIndex = 4;
          break;
        case 5:
          finalRotation = 3;
          finalX = '10%';
          finalY = '-15%';
          zIndex = 2;
          break;
        case 6:
          finalRotation = -3;
          finalX = '-5%';
          finalY = '-55%';
          zIndex = 2;
          break;
        case 7:
          finalRotation = -3;
          finalX = '-10%';
          finalY = '-30%';
          zIndex = 2;
          break;
        case 8:
          finalRotation = 3;
          finalX = '-20%';
          finalY = '-50%';
          zIndex = 2;
          break;
        default:
          finalRotation = 0;
          finalX = 0;
          finalY = 0;
          zIndex = 1;
      }

      tl.to(
        card,
        {
          opacity: 1,
          y: finalY,
          x: finalX,
          rotation: finalRotation,
          scale: 1,
          filter: 'blur(0px)',
          zIndex: zIndex,
          duration: 0.8,
          ease: 'back.out(1.2)',
          onStart: () => {
            gsap.fromTo(
              card,
              { rotationX: -15, z: 50 },
              { rotationX: 0, z: 0, duration: 0.6, ease: 'power2.out' },
            );
          },
        },
        index * 0.1,
      );
    });
  }

  // Якщо мобільна версія — спрощена анімація
  else {
    cards.forEach(card => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        filter: 'blur(6px)',
      });

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  }
}

// Запуск після завантаження DOM
document.addEventListener('DOMContentLoaded', initCardsAnimation);
