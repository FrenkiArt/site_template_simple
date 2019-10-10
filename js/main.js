/* lazyLoading();
myPopup(document.querySelectorAll('[data-popup]'));
my_tel_masker(document.querySelectorAll('input[type=tel]'));
sendMail(document.querySelectorAll('form'));
smoothScroll(); */

/* document.documentElement.classList.remove("no-js"); */
let eventClick = new MouseEvent('click');

window.addEventListener('resize', function () {
  console.clear();
  console.info(window.innerWidth, 'px');
});

if (window.matchMedia("(min-width: 1000px)").matches) {
  console.info('decktop');
} else {
  console.info('mobile');
}

console.info(`js загружен полностью!`);
