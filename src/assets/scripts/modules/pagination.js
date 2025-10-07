import { gsap } from 'gsap/all';
export function paginationInit(containerSelector, cardSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(cardSelector));
  const prevBtn = document.querySelector('.pagination__button.prev');
  const nextBtn = document.querySelector('.pagination__button.next');
  const input = document.querySelector('.pagination__input');
  const totalSpan = document.querySelector('.pagination__span span');
  const loadMoreBtn = document.querySelector('.incredible-button');

  const perPage = 6;
  const totalPages = Math.ceil(cards.length / perPage);
  let currentPage = 1;

  function animateCards(visibleCards) {
    gsap.fromTo(
      visibleCards,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      },
    );
  }

  // Показуємо сторінку повністю (тільки цю сторінку)
  function renderPage(page, scrollBlock) {
    page = Math.max(1, Math.min(page, totalPages));
    currentPage = page;

    const start = (currentPage - 1) * perPage;
    const end = currentPage * perPage;

    // приховуємо всі
    cards.forEach(card => (card.style.display = 'none'));

    // показуємо тільки потрібні
    const visibleCards = cards.slice(start, end);
    visibleCards.forEach(card => (card.style.display = ''));

    animateCards(visibleCards);
    updateUI();
    if (!scrollBlock) {
      setTimeout(() => {
        const offsetTop = container.offsetTop - 100;
        console.log(offsetTop);

        window.scrollTo({
          top: offsetTop, // щоб до початку списку, а не до верху сторінки
          behavior: 'smooth',
        });
      }, 200);
    }
  }

  // Довантажуємо наступну сторінку (залишаємо попередні видимими)
  function loadMore() {
    if (currentPage < totalPages) {
      currentPage += 1;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;

      const newCards = cards.slice(start, end);
      newCards.forEach(card => (card.style.display = ''));

      animateCards(newCards);
      updateUI();
    }
  }

  function updateUI() {
    input.value = currentPage.toString().padStart(2, '0');
    totalSpan.textContent = totalPages.toString().padStart(2, '0');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    if (loadMoreBtn) {
      loadMoreBtn.classList.toggle('hidden', currentPage === totalPages);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMore);

  // стартова сторінка
  renderPage(1, true);
}
