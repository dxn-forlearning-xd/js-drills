const btn = document.querySelectorAll('.dropdown button');
const dropdown = document.querySelectorAll('.dropdown-menu');

btn.forEach((b) => {
  b.addEventListener('mouseenter', (e) => {
    const dropdownBtn = e.target.closest('.dropdown');
    dropdownBtn.querySelector('.dropdown-menu').classList.remove('hidden');
  });
});

dropdown.forEach((d) => {
  d.addEventListener('mouseleave', (e) => {
    const dropdownBtn = e.target.closest('.dropdown');
    dropdownBtn.querySelector('.dropdown-menu').classList.add('hidden');
  });
});
document.addEventListener('click', (e) => {
  const isInsideDropdown = e.target.closest('.dropdown');

  if (!isInsideDropdown) {
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
      menu.classList.add('hidden');
    });
  }
});
