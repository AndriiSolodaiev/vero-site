import { paginationInit } from '../modules/pagination';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);




document.addEventListener('DOMContentLoaded', function() {
  gsap.timeline().fromTo(".page-title__wrap", {
    y:-150,
    opacity:0
  }, {
    y:0,
    opacity:1
  })
})

paginationInit('.promo-list', '.promo-homepage-card');
