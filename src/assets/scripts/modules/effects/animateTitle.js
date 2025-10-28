import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);


export function animateTitleOnScroll(triggerSelector, titleSelector) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerSelector,
      start: 'top 80%', // коли секція з’являється у viewport
      // toggleActions: 'play none none reverse',
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