'use strict';

const readline = require('readline');
const { ratesDifference1 } = require('./ratesDifference');
const { ratesDifference2 } = require('./ratesDifference');

let format = true;

function readRates() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question('Введіть курси акцій по днях, розділяючи їх пробілами: ', rates => {
      rates = rates.split(' ');
      const numbers = rates.map(num => {
        num = Number(num);
        if(isNaN(num)) format = false;
        return num;
      });  
      rl.close();
      resolve(numbers);
    });
  });
}

async function start() {
  let i = 0;
  let rates;
  do {
    format = true;
    rates = await readRates();
    i++;
  } while (i < 3 && !format);
  if (!format) return;
  console.time("Перший метод працював ");
  console.log(ratesDifference1(rates));
  console.timeEnd("Перший метод працював ");
  console.time("Другий метод працював ");
  console.log(ratesDifference2(rates));
  console.timeEnd("Другий метод працював ");
}

start();
