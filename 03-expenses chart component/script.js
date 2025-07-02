const bars = document.querySelectorAll('.bar');
const amountElements = document.querySelectorAll('.spending-amount');
const dayElements = document.querySelectorAll('.day-label');

fetch('./data.json')
  .then((Response) => Response.json())
  .then((data) => {
    renderChart(data);
    const maxAmount = Math.max(...data.map((d) => d.amount));
    const maxHeightPx = 150;

    for (let i = 0; i < data.length; i++) {
      dayElements[i].textContent = data[i].day;
      amountElements[i].textContent = data[i].amount;

      const heightPx = (data[i].amount / maxAmount) * maxHeightPx;
      bars[i].style.height = `${heightPx}px`;
    }
  })
  .catch((error) => console.error('Error loading JSON:', error));

function renderChart(data) {
  for (let i = 0; i < data.length; i++) {
    dayElements[i].textContent = data[i].day;
    amountElements[i].textContent = data[i].amount;
  }
}

bars.forEach((bar, i) => {
  bar.dataset.index = i;
  bar.setAttribute('tabindex', '0');
  bar.addEventListener('mouseenter', () => {
    amountElements.forEach((a) => a.classList.add('hidden'));
    amountElements[i].classList.remove('hidden');
  });
  bar.addEventListener('mouseleave', () => {
    amountElements[i].classList.add('hidden');
  });
});

renderChart;
