import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);
console.log('floors');
const swiper = new Swiper('.swiper-sp', {
  modules: [Navigation],
  slidesPerView: 1,
  speed: 800,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  grabCursor: true,
  spaceBetween: 0,
});

document.addEventListener('DOMContentLoaded', function() {
  gsap
    .timeline()
    .fromTo(
      '.page-title__wrap',
      {
        y: -150,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
    )
    .fromTo(
      '.sp-content ',
      {
        y: 150,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      '<',
    )
    .fromTo(
      '.sp-content',
      {
        y: 150,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      '<',
    );
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.progress-list',
      start: 'top bottom',
      end: 'bottom top',
      //  onLeave: self => self.kill(),
    },
  })
  .fromTo(
    '.progress-card',
    {
      yPercent: 10,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      stagger: 0.2,
    },
  );

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.promo-list',
      start: 'top bottom',
      end: 'bottom top',
      //  onLeave: self => self.kill(),
    },
  })
  .fromTo(
    '.promo-homepage-card',
    {
      yPercent: 10,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      stagger: 0.2,
    },
  );
