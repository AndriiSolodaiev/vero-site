import '../modules/distortion/HeatDistortion';
import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';

const swiper = new Swiper('.swiper-architect', {
  modules: [Navigation],
  slidesPerView: 1,
  // loop: true,
  speed: 800,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    init: function() {
      updateCounter(this);
    },
    slideChange: function() {
      updateCounter(this);
    },
  },
});

function updateCounter(swiper) {
  const current = document.querySelector('.swiper-numbers-wrap .current-number');
  const total = document.querySelector('.swiper-numbers-wrap .total-number');

  if (current && total) {
    current.textContent = String(swiper.realIndex + 1).padStart(2, '0');
    total.textContent = String(swiper.slides.length).padStart(2, '0');
  }
}
