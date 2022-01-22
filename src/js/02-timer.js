import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.getElementById('datetime-picker'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
  calendarOptions: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (Date.parse(selectedDates) > Date.now()) {
        refs.startBtn.disabled = false;
      } else if (Date.parse(selectedDates) < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future', { timeout: 1500 });
        refs.startBtn.disabled = true;
      }
    },
  },
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
};

refs.startBtn.disabled = true;

let interval = null;
flatpickr(refs.input, refs.calendarOptions);

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  interval = setInterval(() => {
    if (Date.parse(refs.input.value) - Date.now() < 0) {
      clearInterval(interval);
      refs.input.disabled = false;
      return;
    }
    timeLeft();
  }, 1000);
}

function timeLeft() {
  const timer = refs.convertMs(Date.parse(refs.input.value) - Date.now());
  const { days, hours, minutes, seconds } = timer;
  refs.timerDays.innerText = days;
  refs.timerHours.innerText = hours.toString().padStart(2, 0);
  refs.timerMinutes.innerText = minutes.toString().padStart(2, 0);
  refs.timerSeconds.innerText = seconds.toString().padStart(2, 0);
}

// function addLeadingZero(value) {
//   if (value.toString().length < 2) {
//     value.toString().padStart(2, 0);
//   } else {
//     value.toString();
//   }
// }
