const { DateTime } = luxon;

const form = document.getElementById("age-form");
const display = document.getElementById("display");
const label = document.getElementById("result-label");
const liveToggle = document.getElementById('adv-calc-toggle');
const birthTime = document.getElementById('birth-time');

let birthDate = DateTime.now().minus({ years: 18 });
let activeBirthTime = null;
let mode = 'clock'; // 'clock' | 'age'
let intervalId = null;

birthTime.required = liveToggle.checked;

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

function render() {
  const now = DateTime.now();
  const precise = liveToggle.checked;

  if (mode === 'clock') {
    display.value = precise
      ? now.toFormat('yy : MM : dd : HH : mm : ss')
      : now.toFormat('yy : MM : dd');
    return;
  }

  const units = precise
    ? ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
    : ['years', 'months', 'days'];
  const diff = now.diff(activeBirthTime, units).toObject();
  display.value = units.map((u) => pad(diff[u])).join(' : ');
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
}

function start() {
  stop();
  render();
  intervalId = setInterval(render, 250);
}

function showClock() {
  mode = 'clock';
  label.hidden = true;
  start();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  stop();
  label.hidden = false;

  if (!birthDate) {
    display.value = 'Pick a date.';
    return;
  }

  if (liveToggle.checked) {
    const [hour, minute] = birthTime.value.split(':').map(Number);
    activeBirthTime = birthDate.set({ hour, minute, second: 0, millisecond: 0 });
  } else {
    activeBirthTime = birthDate.startOf('day');
  }

  if (activeBirthTime > DateTime.now()) {
    display.value = "That hasn't happened yet.";
    return;
  }

  mode = 'age';
  start();
});

liveToggle.addEventListener('change', () => {
  birthTime.required = liveToggle.checked;
  showClock();
});

showClock();