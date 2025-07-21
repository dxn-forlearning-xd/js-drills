const billInput = document.querySelector('#bill');
const peopleInput = document.querySelector('#people');
const tipBtns = document.querySelectorAll('.tip-btn');
const customInput = document.querySelector('.custom');
const billError = document.querySelector('.bill-error');
const peopleError = document.querySelector('.people-error');

const tipValue = document.querySelector('.tip-value');
const totalValue = document.querySelector('.total-value');
const resetBtn = document.querySelector('.reset');

billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);
customInput.addEventListener('input', calculate);

let tipPercentage = 0;

tipBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    customInput.value = '';
    tipPercentage = Number(btn.textContent.replace('%', ''));
    calculate();
  });
});

customInput.addEventListener('input', () => {
  tipPercentage = Number(customInput.value);
  calculate();
});

function calculate() {
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);

  if (!bill || bill <= 0) {
    billError.classList.remove('hidden');
    return;
  }

  if (!people || people <= 0) {
    peopleError.classList.remove('hidden');
    return;
  }
  billError.classList.add('hidden');
  peopleError.classList.add('hidden');

  const tipAmount = (bill * (tipPercentage / 100)) / people;
  const totalAmount = bill / people + tipAmount;

  tipValue.textContent = '$' + tipAmount.toFixed(2);
  totalValue.textContent = '$' + totalAmount.toFixed(2);
}

resetBtn.addEventListener('click', reset);
function reset() {
  billInput.value = '';
  peopleInput.value = '';
  customInput.value = '';
  tipPercentage = 0;
  billError.classList.add('hidden');
  peopleError.classList.add('hidden');
  tipValue.textContent = `$0.00`;
  totalValue.textContent = `$0.00`;
}
