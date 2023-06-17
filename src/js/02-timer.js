import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let timerInterval = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];
    startButton.disabled = selectedDate <= new Date();
  },
};

console.log(startButton);

function updateTimer() {
  const remainingTime = getRemainingTime();

  if (remainingTime > 0) {
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  } else {
    clearInterval(timerInterval);
    resetTimer();
    Notiflix.Notify.success('Timer finished!');
  }
}

function getRemainingTime() {
  const currentDate = new Date().getTime();
  const selectedDate = new Date(dateTimePicker.value).getTime();
  return selectedDate - currentDate;
}

function resetTimer() {
  daysValue.textContent = '00';
  hoursValue.textContent = '00';
  minutesValue.textContent = '00';
  secondsValue.textContent = '00';
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  const selectedDate = new Date(dateTimePicker.value);
  if (selectedDate && selectedDate > new Date()) {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  } else {
    Notiflix.Notify.warning('Please select a valid future date');
  }
});

flatpickr(dateTimePicker, options);
