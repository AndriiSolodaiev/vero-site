import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

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
      '.terms-hero ',
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

const projectLocation = gsap.timeline({
  scrollTrigger: {
    trigger: '.terms-filler',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

projectLocation.fromTo(
  '.terms-filler img',
  {
    yPercent: -10,
    scale: 1.1,
    ease: 'none',
  },
  {
    yPercent: 10,
    scale: 1.1,
    ease: 'none',
  },
);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Знаходимо елемент-перемикач та список, який потрібно відкрити
  const toggleElement = document.querySelector('.terms-open-list');
  const childList = document.querySelector('.terms-hero__list--child');

  // Перевіряємо, чи існують обидва елементи
  if (!toggleElement || !childList) {
    console.error('Не знайдено елементи .terms-open-list або .terms-hero__list--child.');
    return;
  }

  // 3. Додаємо обробник подій на клік
  toggleElement.addEventListener('click', () => {
    // Перевіряємо, чи список зараз "закритий" (maxHeight: 0)
    // Використовуємо '0px' для порівняння, оскільки DOM API повертає рядок
    const isClosed = childList.style.maxHeight === '0px' || childList.style.maxHeight === '';

    if (isClosed) {
      // ➡️ ВІДКРИТИ СПИСОК
      // Розраховуємо необхідну висоту (scrollHeight) для відображення всього вмісту.
      // Примножуємо на 1.1 (наприклад), щоб уникнути обрізання через невелику похибку браузера
      const contentHeight = childList.scrollHeight;

      // Встановлюємо нову max-height, щоб список відкрився
      childList.style.maxHeight = `${contentHeight}px`;

      // Додатково: змінюємо візуальний індикатор (наприклад, стрілку)
      toggleElement.classList.add('is-open');
    } else {
      // ⬅️ ЗАКРИТИ СПИСОК

      // Спочатку встановлюємо поточну scrollHeight як max-height
      // Це потрібно для коректного переходу (транзишена) з повної висоти на 0
      childList.style.maxHeight = `${childList.scrollHeight}px`;

      // Запускаємо таймер (невелику затримку), щоб браузер встиг зафіксувати
      // попереднє значення, перш ніж переходити на 0
      setTimeout(() => {
        childList.style.maxHeight = '0';
      }, 10);

      // Додатково: змінюємо візуальний індикатор (наприклад, стрілку)
      toggleElement.classList.remove('is-open');
    }
  });
});
