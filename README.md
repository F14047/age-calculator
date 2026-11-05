# Age Calculator

A simple, responsive web app that calculates your exact age with a simple mode,  in years, months, and days and a precise mode  in years, months, and days, hours, minutes and seconds from your date of birth. Built with HTML, CSS, and JavaScript, using js-datepicker and Luxon for date calculations.

This project is a solution to the [Age Calculator](https://roadmap.sh/projects/age-calculator) challenge from [roadmap.sh](https://roadmap.sh).

## Features

- Pick your birthdate with a custom JavaScript datepicker
- Live clock.
- Exact age calculation in years, months, and days.
- Result displayed on the same page after submitting the form.
- Input validation (empty field, invalid date, and future dates).
- Responsive layout.

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- [Luxon](https://moment.github.io/luxon/) – date and time calculations.
- [js-datepicker](https://www.npmjs.com/package/js-datepicker) – JavaScript datepicker.
- [npm](https://www.npmjs.com/) – package management

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/F14047/age-calculator.git
   ```

2. Navigate to the project folder:

   ```bash
   cd age-calculator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Open `index.html` in your browser (or use an extension like Live Server in VS Code).

## Usage

1. Click the birthdate field and choose your date of birth from the datepicker.
2. Click the **Calculate** button or toggle **Precise Mode** for a more accurate calculation.
3. Your exact age is displayed below the form.

If the date is empty, invalid, or in the future, an error message is shown instead.

## Project Structure

```
age-calculator/
├── index.html
├── src/
│   ├── styles.css
|   └── index.js
|
├── package.json
├── package-lock.json
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [roadmap.sh](https://roadmap.sh) for the project idea
- [Luxon](https://moment.github.io/luxon/) and [js-datepicker](https://www.npmjs.com/package/js-datepicker)
 for their libraries

## Author

- GitHub: [@F14047](https://github.com/F14047)
