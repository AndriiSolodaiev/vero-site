import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

export function animateTitleOnScroll2(triggerSelector, titleSelector) {
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
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
  );

  // H2
  tl.fromTo(
    `${titleSelector} h2`,
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '<0.2', // трохи одночасно
  );

  // H3
  tl.fromTo(
    `${titleSelector} h3`,
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    '<0.2',
  );

  // Текст (параграф)
  // tl.fromTo(
  //   `${titleSelector} .about-text`,
  //   { y: 50, opacity: 0 },
  //   { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
  //   '<0.2',
  // );
}
