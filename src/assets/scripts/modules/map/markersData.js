const windowPath = window.location.origin + window.location.pathname;

 const baseFolder = window.location.href.match(/localhost/) || window.location.href.match(/inzhur-bud-verstka/)
    ? './assets/images/map/'
    : '/wp-content/themes/3d/assets/images/map/';

  
  const markersAdresses = {
    main: `${baseFolder}vero.svg`,
    street1: `${baseFolder}street1.svg`,
    street2: `${baseFolder}street2.svg`,
    feelHouse: `${baseFolder}feelHouse.svg`,
    duckLake: `${baseFolder}duckLake.svg`,
    lake: `${baseFolder}lake.svg`,
    mall: `${baseFolder}mall.svg`,
    park: `${baseFolder}park.svg`,
    pharmacy: `${baseFolder}pharmacy.svg`,
    restaurant: `${baseFolder}restaurant.svg`,
    school: `${baseFolder}school.svg`,
    sport: `${baseFolder}sport.svg`,
    supermarket: `${baseFolder}supermarket.svg`,
    // busStop: `${baseFolder}busStop.svg`,
    bank: `${baseFolder}bank.svg`,
    // novaPoshta: `${baseFolder}novaPoshta.svg`,
    // beautyParlor: `${baseFolder}beautyParlor.svg`,
    petrolStation: `${baseFolder}petrolStation.svg`,
  };
export function createMarkersData(google) {
  var defaultMarkerSize = new google.maps.Size(36, 48);
  
  var buildLogoSize = new google.maps.Size(110, 100);
  var street1Size = new google.maps.Size(142, 42);
  var street2Size = new google.maps.Size(60, 120);
  if (document.documentElement.clientWidth < 1600) {
    var defaultMarkerSize = new google.maps.Size(36, 48);
   var buildLogoSize = new google.maps.Size(82, 82);
    
  }
  return [
    //lake
    {
      type: 'main',
      icon: { url: markersAdresses.street1, scaledSize: street1Size },
      position: { lat: 49.797360618938484, lng:  24.003427742749427},
      text: 'вул. Трускавецька',
    },
   
    {
      type: 'main',
      icon: { url: markersAdresses.street2, scaledSize: street2Size },
      position: { lat: 49.79072564349369, lng:  24.015873192229126 },
      text: 'вул. Стрийська',
    },
   
     {
      type: 'lake',
      icon: { url: markersAdresses.lake, scaledSize: defaultMarkerSize },
      position: { lat: 49.78962433588947,  lng: 24.007377408872244 },
      text: 'Озеро',
    },
    {
      type: 'lake',
      icon: { url: markersAdresses.lake, scaledSize: defaultMarkerSize },
      position: { lat: 49.787171190774146,  lng: 24.0061572012979 },
      text: 'Озеро',
    },
    // mall
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.802340927523964,  lng: 23.996504107617895 },
      text: 'Вам',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.80158217203748,  lng: 24.00571972095146 },
      text: 'Нова Маркет',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.804958847668985,  lng: 24.019463345316694 },
      text: 'ТОЦ Fabrik',
    },
    {
      type: 'mall',
      icon: { url: markersAdresses.mall, scaledSize: defaultMarkerSize },
      position: { lat: 49.80165205990134, lng: 23.999943351570906 },
      text: 'Mark - меблі, освітлення, дизайн',
    },
    // school
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.80259249728639,  lng: 24.004705611000375 },
      text: 'Школа вільних та небайдужих',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.79599603855794,  lng: 24.019709441543903 },
      text: 'Середня загальноосвітня школа №32',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.79685480307658,  lng: 24.026404235062586 },
      text: 'Школа №86',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.802231366150465,  lng: 23.992799520115703 },
      text: 'Ліцей №45',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.79923543202256,  lng: 24.01000857079087 },
      text: 'GlobalKids - інноваційний дитячий садок',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.79339027887654,  lng: 24.018634554812163},
      text: 'Дитячий садок №70',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.80127228700798,  lng: 23.99400114975351 },
      text: 'Дошкільний навчальний заклад №165',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.8029255614023,  lng: 23.990286290268735 },
      text: 'Дитячий садок №159',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.79832741439781, lng: 24.02427524285114 },
      text: 'Дитяча артстудія "Море"',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.79140075742864,  lng: 24.010885652918503 },
      text: 'Кіндер Трополіс',
    },
    {
      type: 'school',
      icon: { url: markersAdresses.school, scaledSize: defaultMarkerSize },
      position: { lat: 49.7972466206607,  lng: 23.988722498228967 },
      text: 'Міні садок "Мадагаскар"',
    },
    
    // pharmacy
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.79546057762534, lng:  24.015888236964123 },
      text: 'Медичний центр Medicover (Медікавер)',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.79739968796276,  lng: 24.012406010702183 },
      text:
        'Dermis - клініка косметології & лазерної епіляції',
    },
    {
      type: 'pharmacy',
      icon: { url: markersAdresses.pharmacy, scaledSize: defaultMarkerSize },
      position: { lat: 49.79413598452508, lng: 24.0239639856333 },
      text: 'Львівський онкологічний регіональний лікувально-діагностичний центр',
    },
    
    // sport
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.78870894923211, lng: 24.00998943744348 },
      text: 'BRONX FitnessHub',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.79761726436024, lng: 24.010234901452336 },
      text: 'Angel Fit - товари для здоров`я, спорту та активного життя',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.78685557174157, lng: 24.01589571373867 },
      text: 'Power Garden Lviv',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.786143007643894, lng: 24.022740538076732 },
      text: 'IRON SPACE',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.79740058447293, lng:  24.0197440119678 },
      text: 'Svoi Fitness',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.78841958326049,lng: 24.007111709085944 },
      text: 'Футбольне поле',
    },
    {
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 49.79700176942298, lng: 23.990289288639048 },
      text: 'Fun Family',
    },
    // restaurant
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.79987891630623, lng: 24.013379432186625 },
      text: `La Luce`,
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.798746109698186, lng: 24.01431075686516 },
      text: 'KREDENS CAFE DUCK`S LAKE',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.803539363991355,  lng: 24.019755799179876 },
      text:
        'Magic Bowls',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.797307949987356, lng: 24.01628897806164 },
      text: 'БО заміс',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.798439492117936, lng: 24.016481901301958 },
      text: 'Spiro',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.79854902188812, lng:  23.99035602770313 },
      text: 'Atmosfera',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.789845332189785, lng: 24.010639601669848 },
      text: '7sevenheaven',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.78676555034495, lng:  24.020100148103616 },
      text: 'Lviv Croissants',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.79301621332823, lng: 24.003936008652367 },
      text: 'Екватор Cafe',
    },
    {
      type: 'restaurant',
      icon: { url: markersAdresses.restaurant, scaledSize: defaultMarkerSize },
      position: { lat: 49.7853363300295, lng: 24.019916798796938 },
      text: 'Black Honey',
    },
      // pet
    
    
    
    // ATM
    {
      type: 'petrolStation',
      icon: { url: markersAdresses.petrolStation, scaledSize: defaultMarkerSize },
      position: { lat: 49.80330251737458,  lng: 24.009014326761715 },
      text: 'OKKO',
    },
    {
      type: 'petrolStation',
      icon: { url: markersAdresses.petrolStation, scaledSize: defaultMarkerSize },
      position: { lat: 49.785479962102244, lng: 24.015519381854826 },
      text: 'UKRNAFTA',
    },
    // busStop
   
    // park
    {
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 49.80056551651142, lng: 24.01741610430948 },
      text: `Парк Налануйський`,
    },
    {
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 49.80330265434283, lng: 24.0166487594183 },
      text: `Парк Боднарівка`,
    },
    {
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 49.791446395170176, lng: 24.026390542367718 },
      text: `Парк`,
    },
    {
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 49.79107989239899, lng: 24.01713738180559 },
      text: `Парк для вигулу собак`,
    },
    {
      type: 'park',
      icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
      position: { lat: 49.78584477598711, lng:  24.01696953372647 },
      text: `Парк Архангела Михаїла`,
    },

    //bank
    {
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 49.7894414847411, lng:  24.01644241341487 },
      text: `Ощадбанк`,
    },
    {
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 49.80240387668483, lng:  24.00737864346383 },
      text: `Укрексімбанк`,
    },
    {
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 49.80048977500253, lng:  24.018682837085617 },
      text: `Термінал самообслуговування ПриватБанк`,
    },
    {
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 49.79807983607263, lng:  24.026107191492002 },
      text: `Термінал самообслуговування ПриватБанк`,
    },
    {
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 49.803456037089575, lng:  23.99724204988725 },
      text: `Банкомат ПриватБанку`,
    },
    
    {
      type: 'main',
      icon: { url: markersAdresses.feelHouse, scaledSize: buildLogoSize },
      position: { lat: 49.791420014074845,  lng: 24.006030814217223 },
      text: 'ЖК FEEL HOUSE',
    },
    {
      type: 'main',
      icon: { url: markersAdresses.duckLake, scaledSize: buildLogoSize },
      position: { lat: 49.80045294746771, lng:  24.015851805089756 },
      text: 'DUCK’S LAKE',
    },
    {
      type: 'main',
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      position: { lat: 49.78938789441226,  lng: 24.00534617115396 },
      text: 'ЖК VERO',
    }
  ];
  }