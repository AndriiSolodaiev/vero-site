const OPEN_CLASS = 'is-open';

const setItemState = (item, isOpen) => {
  const toggle = item.querySelector('[data-faq-toggle]');
  const answer = item.querySelector('[data-faq-answer]');

  item.classList.toggle(OPEN_CLASS, isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  answer.setAttribute('aria-hidden', String(!isOpen));
  // Посилання в згорнутій відповіді не повинні ловити фокус з клавіатури
  answer.inert = !isOpen;
  answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
};

export const initFaq = () => {
  const faqBlocks = document.querySelectorAll('[data-faq]');
  if (!faqBlocks.length) return;

  faqBlocks.forEach(faq => {
    faq.querySelectorAll('[data-faq-answer]').forEach(answer => {
      answer.inert = true;
    });
  });

  // Одночасно відкритий лише один пункт у блоці
  document.addEventListener('click', evt => {
    const toggle = evt.target.closest('[data-faq-toggle]');
    if (!toggle) return;

    const item = toggle.closest('[data-faq-item]');
    const faq = item.closest('[data-faq]');
    const isOpen = item.classList.contains(OPEN_CLASS);

    faq.querySelectorAll(`[data-faq-item].${OPEN_CLASS}`).forEach(openItem => {
      setItemState(openItem, false);
    });

    if (!isOpen) {
      setItemState(item, true);
    }
  });

  window.addEventListener('resize', () => {
    const openAnswers = document.querySelectorAll(`[data-faq-item].${OPEN_CLASS} [data-faq-answer]`);
    openAnswers.forEach(answer => {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  });
};
