import datepicker from 'js-datepicker';
import { DateTime } from 'luxon';
import './style.css';
import 'js-datepicker/dist/datepicker.min.css';

const { DateTime } = luxon;

const form = document.getElementById("age-form");
const display = document.getElementById("display");
const liveToggle = document.getElementById('adv-calc-toggle');

let birthDate = DateTime.now().minus({ years: 18 });
let timerId = null;


const picker = datepicker('#birthday', {
  // Event callbacks.
  onSelect: (instance, date) => {
    birthDate = date ? DateTime.fromJSDate(date) : null;
    run();
  },
  
  // Customizations.
  formatter: (input, date) => {
    input.value = DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
  },
  position: 'bl', // Bottom left.
  startDay: 0, // Calendar week starts on a Sunday.
  customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
  customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  overlayPlaceholder: 'Enter a year',

  // Settings.
  alwaysShow: false,
  dateSelected: birthDate.toJSDate(), // This day 18 years ago.
  maxDate: new Date(), // Today.
  minDate: new Date(-753, 0, 1), // Jan 1st, 753 B.C.
  startDate: new Date(), // This month.
  showAllDates: true, // Numbers for leading & trailing days outside the current month will show.
})

const pad = (n) => String(Math.floor(n)).padStart(2, '0');  

function calculate() {
  const {years, months, days, hours=0, minutes=0} = DateTime.now().diff(birthDate, ['years', 'months', 'days']).toObject();
  display.value = `${years} : ${months} : ${Math.floor(days)}`;
}

function advancedCalculation() {
  const { years, months, days, hours, minutes, seconds } = DateTime.now().diff(birthDate, 
    ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();
  display.value = [years, months, days, hours, minutes, seconds].map(pad).join(' : ');
}

function stopLive() {
  clearInterval(timerId);
  timerId = null;
}

function run() {
  stopLive();

  if (!birthDate) {
    display.value = 'Pick a date.';
    return;
  }

  if (liveToggle.checked) {
    advancedCalculation();                  
    timerId = setInterval(advancedCalculation, 1000); 
  } else {
    calculate();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  run();
});

liveToggle.addEventListener('change', run);

run();