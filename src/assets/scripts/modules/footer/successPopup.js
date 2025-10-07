import { popupFactory } from './popupFactory';

export const successPopup = popupFactory(document.querySelector('.thank-you-popup'));

const closeAllBtnRef = document.querySelectorAll('.thank-you-popup__btn');
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', function(evt) {
  if (evt.target === overlay) {
    successPopup.close();
  }
});
closeAllBtnRef.forEach(btn => {
  btn.addEventListener('click', () => {
    successPopup.close();
  });
});
