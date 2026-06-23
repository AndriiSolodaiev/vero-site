
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);


console.log("lox")
document.addEventListener('DOMContentLoaded', function() {
  gsap.timeline().fromTo(".page-title__wrap", {
    y:-150,
    opacity:0
  }, {
    y:0,
    opacity:1
  }).fromTo(".real-estate-homepage-card ", {
    y:150,
    opacity:0
  }, {
    y:0,
    opacity:1,
    stagger:0.2
  }, "<")

})

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


