// import '../form';
// import 'intl-tel-input/build/css/intlTelInput.css';
// import intlTelInput from 'intl-tel-input';

// const input = document.querySelector('#phone');
// intlTelInput(input, {
//   utilsScript: 'path/to/utils.js',
// });

// import { animateTitleOnScroll } from '../../gulp-modules';
import { contactFormFooter } from './contactFormFooter';

// animateTitleOnScroll('.footer', '.footer-title');
const footer = document.querySelector('footer');

const initFooter = () => {
  const createFormValidRef = document.querySelectorAll('[contact-form-js]');
  createFormValidRef.forEach(el => {
    contactFormFooter(el);
  });
};

if (footer) {
  initFooter();
}
