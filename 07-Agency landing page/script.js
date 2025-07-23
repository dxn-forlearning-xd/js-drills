const btn = document.querySelector('.hamburger');
const menu = document.getElementById('mobileMenu');

btn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('show');

  document.addEventListener('click', handler);
});

function handler(event) {
  if (!menu.contains(event.target) && !btn.contains(event.target)) {
    menu.classList.remove('show');
  }
}
