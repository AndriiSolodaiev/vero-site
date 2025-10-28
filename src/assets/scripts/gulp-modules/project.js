import '../modules/distortion/HeatDistortion';
import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);
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


document.addEventListener('DOMContentLoaded', function() {
  gsap.timeline().fromTo(".page-title__wrap", {
    y:-150,
    opacity:0
  }, {
    y:0,
    opacity:1
  }).fromTo(".project-content ", {
    y:150,
    opacity:0
  }, {
    y:0,
    opacity:1
  }, "<")

})

gsap.fromTo(".project-content__right>svg",
      { rotate: 3,
        transformOrigin:"center bottom"
       },
      {
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".project-content__right>svg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
const projectLocation = gsap
    .timeline({
      scrollTrigger: {
        trigger: '.project-location',
        start: "top bottom",
        end: 'bottom top',
        scrub: true,
        
      },
    })
  
    projectLocation.fromTo('.project-location__img-wrap img', {
      yPercent: -10,
     scale:1.1,
     ease:"none"
    },{
      yPercent: 10,
     scale:1.1, ease:"none"
    })

    
  
    gsap.fromTo(".project-location__right-card>svg",
      { rotate: 2,
        scale:1,
        transformOrigin:"center bottom"
       },
      {
        rotate: 6,
         scale:1,
        ease: "none",
        scrollTrigger: {
          trigger: ".project-location__right-card>svg",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    gsap
    .timeline({
      scrollTrigger: {
        trigger: '.project-location',
        start: "top 80%",
        end: 'bottom top', 
      },
    }).fromTo(".project-location h2", {
      y:50,
      opacity:0,
      filter:"blur(15px)"
    }, {
      y:0,
      opacity:1,
      filter:"blur(0px)",
      duration:1
    }).fromTo(".project-location__left-card", {
      y:50,
      opacity:0,
      xPercent:-20,
      filter:"blur(15px)"
    }, {
      y:0,
      xPercent:0,
      opacity:1,
      filter:"blur(0px)",
      duration:1
    }, "<").fromTo(".project-location__right-card", {
      y:50,
      xPercent:20,
      opacity:0,
      filter:"blur(15px)"
    }, {
      y:0,
      xPercent:0,
      opacity:1,
      filter:"blur(0px)",
      duration:1
    }, "<")

    gsap.timeline({
  scrollTrigger: {
    trigger: '.project-eco__list',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
  },
}).fromTo(
  ".project-eco-card",
  {
    yPercent:20,
    opacity:0,
    
  },{
    yPercent:0,
    opacity:1,
    stagger:0.2,
   
    
  }
).fromTo(".project-eco .block-description", {
  opacity:0,
  x:-10,
  yPercent:10,
},{
  opacity:1,
  x:0,
  yPercent:0,
}, ">-=0.3")

 gsap.fromTo(".project-eco .block-description>svg",
      { rotate: -2,
        scale:1,
        // transformOrigin:"center bottom"
       },
      {
        rotate: -8,
         scale:1,
        ease: "none",
        scrollTrigger: {
          trigger: ".project-eco .block-description",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );