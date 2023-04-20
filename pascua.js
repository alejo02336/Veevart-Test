const prompt = require("prompt-sync")();

let year = prompt("Enter a year: ");
let golden = parseInt(year) % 19;

//Gregorian calendar
let C = Math.floor(year / 100); // century

let H =
  (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * golden + 15) %
  30; // number of days from 21 March to the Paschal full moon
let IG = Math.ceil(H - (H / 28) * (1 - (29 / (H + 1)) * ((21 - golden) / 11))); // is the number of days from 21 March to the Paschal full moon.

let JI = (year + Math.floor(year / 4) + IG + 2 - C + Math.floor(C / 4)) % 7; // J	is the weekday for the Paschal full moon (0=Sunday, 1=Monday, etc.).

//Both calendars, the date of Easter is:

let L = IG - JI;

let month = 3 + Math.floor((L + 40) / 44);

const response = new Date(year, month - 1, IG);

console.log("Easter Date: " + response.toISOString().slice(0, 10));
