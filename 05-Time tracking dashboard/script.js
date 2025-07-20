const dashboard = document.querySelector('.dashboard');
const buttons = document.querySelectorAll('.timeframe-btn');
let currentPeriod = 'weekly';
let timeData = [];
const periodLabels = {
  daily: 'Yesterday',
  weekly: 'Last Week',
  monthly: 'Last Month',
};
const colorLabels = {
  Work: 'bg-work',
  Play: 'bg-play',
  Study: 'bg-study',
  Exercise: 'bg-exercise',
  Social: 'bg-social',
  'Self Care': 'bg-self-care',
};

fetch('./data.json')
  .then((res) => res.json())
  .then((data) => {
    timeData = data;
    renderCards(timeData, currentPeriod);
  })
  .catch((error) => console.log('error', error));

function renderCards(timeData, currentPeriod) {
  dashboard.innerHTML = '';

  timeData.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('activity-card');

    const iconName = item.title.toLowerCase().replace(' ', '-');
    const bgClass = colorLabels[item.title];

    card.innerHTML = `
    <div class="card-header ${bgClass}">
        <img src="./images/icon-${iconName}.svg" alt="" class="logo" />
      </div>
      <div class="card-body">
        <div class="activity-title">
          <p class="title">${item.title}</p>
          <button class="icon">···</button>
        </div>
        <p class="current-hours">${item.timeframes[currentPeriod].current}hrs</p>
        <p class="previous-hours">${periodLabels[currentPeriod]} - ${item.timeframes[currentPeriod].previous}hrs</p>
      </div>
    `;
    dashboard.appendChild(card);
  });
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    timeframeToggle(btn);
  });
});

function timeframeToggle(activeBtn) {
  buttons.forEach((btn) => btn.classList.remove('active'));
  activeBtn.classList.add('active');
  currentPeriod = activeBtn.textContent.toLowerCase();
  renderCards(timeData, currentPeriod);
}
