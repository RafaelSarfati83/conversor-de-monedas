const mainNavCheckbox = document.querySelector('.main-nav-toggle');

document.addEventListener('click', e => {
  if (
      e.target.classList.contains('main-nav__link') ||
      e.target.classList.contains('main-header__contact-link') ||
      e.target.classList.contains('main-header__title-link')
    ) {
    mainNavCheckbox.checked = false;
    }
})