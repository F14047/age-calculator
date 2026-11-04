import datepicker from 'js-datepicker';
import { DateTime } from 'luxon';
import './style.css';
import 'js-datepicker/dist/datepicker.min.css';

const picker = datepicker('#birthday', {
  // Event callbacks.
  onSelect: (instance, date) => {
    birthDate = date ? DateTime.fromJSDate(date) : null;
  },
  
  // Customizations.
  formatter: (input, date) => {
    input.value = DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
  },
  position: 'bl', // Bottom left.
  startDay: 0, // Calendar week starts on a Sunday.
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  overlayPlaceholder: 'Enter a 4-digit year',

  // Settings.
  alwaysShow: false,
  dateSelected: DateTime.now().minus({ years: 18 }), // This day 18 years ago.
  maxDate: new Date(), // Today.
  minDate: new Date(-753, 0, 1), // Jan 1st, 753 B.C.
  startDate: new Date(), // This month.
  showAllDates: true, // Numbers for leading & trailing days outside the current month will show.
})

const calculator = document.getElementById("calculator");
const form = document.getElementById("age-form");
const display = document.getElementById("display");
const toggle = document.getElementById("adv-calc-toggle");
const advCalculator = document.getElementById("adv-calc-btn");

let birthDate = picker.dateSelected;

function fn() {
  const currentSeconds = DateTime.now // Get the current seconds and add 1 every 1000 miliseconds.
  currentSeconds += 1;
}

function advancedCalculation() {
  if (!birthDate) {
    display.value = "Pick a date.";
    return;
  }
  setInterval(fn, 1000);
  const {years, months, days, hours, minutes} = DateTime.now().diff(birthDate, ['years', 'months', 'days', 'hours', 'minutes']).toObject();
  display.value = `${years} : ${months} : ${days} : ${hours} : ${Math.floor(minutes)} : `;
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  calculate();
});

// toggle.checked -> show advcalc button
//                -> unchecked hide advcalc button

advCalculator.addEventListener('onclick', (event) => {
  advEvent.preventDefault();
  advancedCalculation();
});

function calculate() {
  if (!birthDate) {
    display.value = "Pick a date.";
    return;
  }
  const {years, months, days, hours=0, minutes=0} = DateTime.now().diff(birthDate, ['years', 'months', 'days']).toObject();

  display.value = `${years} : ${months} : ${Math.floor(days)}`;
}