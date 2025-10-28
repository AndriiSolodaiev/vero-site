
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);




document.addEventListener('DOMContentLoaded', function() {
  gsap.timeline().fromTo(".page-title__wrap", {
    y:-150,
    opacity:0
  }, {
    y:0,
    opacity:1
  }).fromTo(".present-card ", {
    y:150,
    opacity:0
  }, {
    y:0,
    opacity:1,
    stagger:0.2
  }, "<")

})

const projectLocation = gsap
    .timeline({
      scrollTrigger: {
        trigger: '.terms-filler',
        start: "top bottom",
        end: 'bottom top',
        scrub: true,
        
      },
    })
  
    projectLocation.fromTo('.terms-filler img', {
      yPercent: -10,
     scale:1.1,
     ease:"none"
    },{
      yPercent: 10,
     scale:1.1, ease:"none"
    })