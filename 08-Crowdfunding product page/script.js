const backBtn = document.querySelector('.btn-primary');
const selectBtns = document.querySelectorAll('.js-select');
const bookmarkBtn = document.querySelector('.btn-bookmark');

const confirmBtns = document.querySelectorAll('.btn-confirm');
const closeBtn = document.querySelector('.modal-close');

const pledgeModal = document.querySelector('.pledge-modal');
const modalContent = document.querySelector('.modal-content');
const successModal = document.querySelector('.success-modal');

const amountDisplay = document.querySelector('.amount-display');
const backerDisplay = document.querySelector('.backer-display');

const pledgeOptions = document.querySelectorAll('.pledge-option');

const inputs = document.querySelectorAll('input[type=number');

bookmarkBtn.addEventListener('click', () => {
  bookmarkBtn.classList.toggle('active');
});

backBtn.addEventListener('click', () => {
  pledgeModal.classList.remove('hidden');
});

selectBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    pledgeModal.classList.remove('hidden');
    const selectedPledgeId = e.currentTarget.dataset.pledge;
    console.log(selectedPledgeId);

    pledgeOptions.forEach((option) => {
      const isTarget = option.dataset.pledge === selectedPledgeId;
      option.classList.toggle('active', isTarget);
      option.querySelector('input[type="radio"]').checked = isTarget;
      const inputBlock = option.querySelector('.pledge-input');
      if (inputBlock) {
        inputBlock.classList.toggle('hidden', !isTarget);
      }
    });
  });
});

closeBtn.addEventListener('click', () => {
  pledgeModal.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  const isInside = e.target.closest('.modal-content');
  const isButton = e.target.closest('.btn-primary, .btn-select');
  const isVisible = !pledgeModal.classList.contains('hidden');
  if (isVisible && !isInside && !isButton) {
    pledgeModal.classList.add('hidden');
  }
});

let latestAmount = null;
let latestPledgeId = null;
confirmBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const parent = e.currentTarget.closest('.pledge-option');
    if (!parent) return;
    latestPledgeId = parent.dataset.pledge;
    const input = parent.querySelector('input[type="number"]');
    latestAmount = input ? input.value : null;
    console.log('Selected:', latestPledgeId, 'Amount:', latestAmount);
    updateStock(latestPledgeId);

    pledgeModal.classList.add('hidden');
    successModal.classList.remove('hidden');
  });
});

pledgeOptions.forEach((option) => {
  option.addEventListener('change', () => {
    const selectedPledgeId = option.closest('.pledge-option').dataset.pledge;

    pledgeOptions.forEach((option) => {
      const isTarget = option.dataset.pledge === selectedPledgeId;
      option.classList.toggle('active', isTarget);
      const inputBlock = option.querySelector('.pledge-input');
      if (inputBlock) {
        inputBlock.classList.toggle('hidden', !isTarget);
      }
    });
  });
});

document
  .querySelector('[data-pledge="got-it"]')
  .addEventListener('click', () => {
    successModal.classList.add('hidden');
    let totalAmount = Number(amountDisplay.textContent.replace(/[$,]/g, ''));
    let backerCount = Number(backerDisplay.textContent.replace(/,/g, ''));

    if (latestAmount !== null) {
      totalAmount += Number(latestAmount);
      backerCount += 1;

      amountDisplay.textContent = `$${totalAmount.toLocaleString()}`;
      backerDisplay.textContent = backerCount.toLocaleString();

      if (totalAmount >= 100000) {
        document.querySelectorAll('.js-select').forEach((btn) => {
          btn.style.backgroundColor = 'grey';
          btn.style.color = 'white';
          btn.style.cursor = 'not-allowed';
          btn.onclick = null;
          btn.disabled = true;
        });
        document.querySelectorAll('.reward').forEach((r) => {
          r.classList.add('out-of-stock');
        });
      }
    }

    const progressElement = document.querySelector('.progress');
    const targetAmount = 100000;

    const progressPercent = Math.min((totalAmount / targetAmount) * 100, 100);
    progressElement.style.width = `${progressPercent}%`;
    console.log(progressPercent);
  });

const pledgeStock = {
  bamboo: 101,
  black: 64,
};

function updateStock(pledgeId) {
  if (pledgeStock[pledgeId] > 0) {
    pledgeStock[pledgeId]--;

    const stockDisplays = document.querySelectorAll(
      `.left-count[data-pledge="${pledgeId}"] strong`
    );
    stockDisplays.forEach((el) => {
      el.textContent = pledgeStock[pledgeId];
    });
  }
  if (pledgeStock[pledgeId] === 0) {
    const option = document.querySelector(
      `.pledge-option[data-pledge="${pledgeId}"]`
    );
    option.classList.add('out-of-stock');
    const button = document.querySelector(
      `.btn-select[data-pledge="${pledgeId}"]`
    );
    if (button) button.disabled = true;
  }
}
(function initProgressBar() {
  const progressElement = document.querySelector('.progress');
  const totalAmount = Number(amountDisplay.textContent.replace(/[$,]/g, ''));
  const targetAmount = 100000;
  const percent = Math.min((totalAmount / targetAmount) * 100, 100);
  progressElement.style.width = `${percent}%`;
})();
