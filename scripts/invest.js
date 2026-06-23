import { getInvestment } from '../api/index';
import c3 from 'c3';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);



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

console.log('Invest module loaded');
const chart = c3.generate({
  bindto: '#chart',
  data: {
    x: 'x',
    columns: [
      ['x', '2022-01-01', '2023-01-01', '2024-04-01', '2024-10-01', '2025-01-01'],
      ['profits', 1000, 1330, 1650, 2145, 2500],
    ],
    types: {
      profits: 'area-spline',
    },
  },
  padding: {
    top: 20,
    right: 0,
    bottom: 0,
    left: 90,
  },
  axis: {
    x: {
      type: 'category', // Use categories instead of timeseries
      tick: {
        multiline: true,
        multilineMax: 2,
        centered: true,
      },
    },
    y: {
      min: 20000,
      tick: {
        format: function(d) {
          return d + '₴/M²';
        },
      },
    },
  },
  legend: {
    show: false,
  },
});

const handleUpdateInvestment = async event => {
  const { target } = event;
  const tabRef = target.closest('.chart-navigation-info-btn');
  if (!tabRef) return;

  document.querySelectorAll('.chart-navigation-info-btn').forEach(button => {
    button.classList.remove('active');
  });
  tabRef.classList.add('active');

  const id = +tabRef.dataset.id;

  try {
    const { data } = await getInvestment(id);
    console.log('Fetched data dev:', data);
    console.log('Fetched data:', data.data);

    const isDev =
      window.location.href.match('localhost') ||
      window.location.href.match('https://soul-park-verstka.smartorange.com.ua/');

    let projectData;
    if (isDev) {
      projectData = data; // Using dev data structure
    } else {
      projectData = data.data; // Using production data structure
    }

    const { project, dates, profits, growthPercentage, averageAnnualGrowth } = projectData;

    // Log to debug the variables
    console.log('Project Data:', projectData);

    if (!Array.isArray(dates) || !Array.isArray(profits)) {
      throw new Error('Dates or profits are not in the expected format');
    }

    chart.load({
      columns: [
        ['x', ...dates],
        ['profits', ...profits],
      ],
    });

    const maxprofits = Math.max(...profits) * 1.1;
    chart.axis.range({ y: [0, maxprofits] });

    document.querySelector('.chart-navigation-info-numbers-data').textContent =
      growthPercentage + '%';
    document.querySelector('.chart-navigation-info-numbers-annual').textContent =
      averageAnnualGrowth + '%';
  } catch (error) {
    console.warn('Error fetching investment data:', error);
  }
};

const buttonContainer = document.querySelector('.chart-navigation-info-btns-wrap');
buttonContainer.addEventListener('click', function(event) {
  const projectButton = event.target.closest('button[data-id]');
  if (projectButton) {
    handleUpdateInvestment(event);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const firstButton = document.querySelector('.chart-navigation-info-btn[data-id]');
  if (firstButton) {
    firstButton.click();
  }
});


gsap.timeline({
  scrollTrigger:{
  trigger: '.developer-site',
  start: 'top bottom',
  // end: 'bottom top',
  
 
 
   
}}
).from(".developer-text__list p", {
  opacity:0, y:20, stagger: 0.2
}).from(".developer-site-bg svg .g-mask13", {
  rotate: -180, duration:2,
  transformOrigin:"center bottom"
}, "<")