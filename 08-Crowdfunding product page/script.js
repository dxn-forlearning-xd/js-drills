const backBtn = document.querySelector('.btn-primary');
const selectBtns = document.querySelectorAll('.js-select');
const bookmarkBtn = document.querySelector('.btn-bookmark');

const confirmBtn = document.querySelector('.btn-confirm');
const closeBtn = document.querySelector('.modal-close');

const pledgeModal = document.querySelector('.pledge-modal');
const successModal = document.querySelector('.success-modal');

const pledgeOptions = document.querySelectorAll('.pledge-option');
const noRewardOption = document.querySelector('[data-pledge="no-reward"]');

backBtn.addEventListener('click', () => {
  pledgeModal.classList.remove('hidden');
});
closeBtn.addEventListener('click', () => {
  pledgeModal.classList.add('hidden');
});
bookmarkBtn.addEventListener('click', () => {
  bookmarkBtn.classList.toggle('active');
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
