import { createMarkersData } from './markersData';

const filterNav = document.querySelector('.map-navigation');
document.body.addEventListener('click', (evt) => {    const target = evt.target.closest('#filter-button');
    if (!target) return;
   
    evt.preventDefault();
    evt.stopPropagation();           // ← ДОДАЙ
    evt.stopImmediatePropagation();  // ← ДОДАЙ
      filterNav.classList.toggle('oppened');
    
})

export default function googleMap() {
  global.initMap = initMap;
}
// Google map start
async function func() {
  const script = document.createElement('script');
  let key = 'AIzaSyCYwk23aIR-N5XTFmojgQRHbj_T6lOOUPE';
  // if (window.location.href.match(/localhost/)) key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&language=ua`;
  document.getElementsByTagName('head')[0].appendChild(script);
}

// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach(image => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});
// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  // const center = {
  //   lat: 49.2281012,
  //   lng: 28.3925433,
  // };
  const center = {
    lat: 49.79572622608716, 
     lng: 24.00454357262482
     
  };
  
 let zoomAdaptive = 15
  if (document.documentElement.clientWidth < 1024) {
    zoomAdaptive = 14
  }
  const choosedCategories = new Set();
  choosedCategories.add('main');
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'ua',
    styles: getMapTheme(),
  });
  window.googleMap = map;
  const filterMarkers = function(category, categoriesArray) {
    gmarkers1.forEach(el => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        
        el.setMap(map);
        // el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach(item => {
    item.addEventListener('click', evt => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });
 const flightPlanCoordinates = [
    { lat: 49.80394, lng: 23.99877 },
    { lat: 49.80195, lng: 24.01799 },
    { lat: 49.79217, lng: 24.01584 },
    { lat: 49.79645, lng: 24.01674 },
    { lat: 49.79703, lng: 24.0128 },
    { lat: 49.79795, lng: 24.00443 },
  ];
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#C2E1EF",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });
  flightPath.setMap(map);
  const infowindow = new google.maps.InfoWindow({
    text: '',
    maxWidth: 300,
  });
  const markersData = createMarkersData(google);
  markersData.forEach(marker => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      // animation: google.maps.Animation.DROP,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      cursor: 'pointer', // курсор при наведении на макркер жк
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function() {
      infowindow.setContent(marker.text);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });

    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

// window.addEventListener("load", () => {
// const legend = document.querySelector("[data-accordeon]");
// const legendTitle = document.querySelector(".infrastructure-markers__btn");
// const openedMarker = document.querySelector(".infrastructure-markers__btn svg");
// const markersHeight = getComputedStyle(
//   document.querySelector(".infrastructure-markers__ul")
// ).height;
// if (document.documentElement.clientWidth < 575) {
//     legend.classList.remove("opened");
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
// }

// legendTitle.addEventListener("click", () => {
//   const legendWrapper = document.querySelector('.infastructure-markers__wrapper');
//   legend.classList.toggle('opened');
//   openedMarker.classList.toggle('rotate');
//   if (legend.classList.contains("opened")) {
//     legendWrapper.classList.remove('closed');
//     gsap.timeline().fromTo(legend, { y: markersHeight }, { y: 0 });
//     gsap.timeline().fromTo(legendTitle, {y: markersHeight}, {y: 0});
//   } else {
//     legendWrapper.classList.add('closed')
//     gsap.timeline().fromTo(legend, { y: 0 }, { y: markersHeight });
//     gsap.timeline().fromTo(legendTitle, {y: 0}, {y: markersHeight});
//   }
// });
// });

function getMapTheme() {
  return [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#372305"
            },
            {
                "saturation": "-25"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
]
}
