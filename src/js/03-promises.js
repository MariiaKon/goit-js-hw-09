import Notiflix from 'notiflix';

const form = document.querySelector('form');
const firstDelay = form.elements.delay;
const step = form.elements.step;
const amount = form.elements.amount;
const submitBtn = document.querySelector('button');
let DELAY = 0;
let timerID = null;

firstDelay.addEventListener('blur', () => {
  DELAY = Number(firstDelay.value);
});
form.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.disabled = true;
  createNotifications(amount.value, step.value);
});

function createNotifications(qty, ms) {
  let position = 1;
  let delay = DELAY;

  while (qty >= position) {
    createPromise(position, delay)
      .then(success => {
        Notiflix.Notify.success(`${success}`);
      })
      .catch(error => {
        Notiflix.Notify.failure(`${error}`);
      });

    DELAY += Number(ms);
    position += 1;
    delay = DELAY;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    timerID = setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, DELAY);
  }).finally(() => {
    let resetTimeoutAfter = Number(firstDelay.value) + amount.value * step.value;
    setTimeout(() => {
      clearTimeout(timerID);
      form.reset();
      submitBtn.disabled = false;
    }, resetTimeoutAfter);
  });
}
