'use strict';

const readline = require('readline');

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

function ratesDifference1(rates) {
  const diffs = [];
  for (let i = 0; i < rates.length; i++) {
    if(i === 0) diffs.push(1);
    else {
      let k = 1;
      while (i - k >= 0) {
        if (rates[i - k] <= rates[i]) k++;
        else break;
      }
      diffs.push(k);
    }
  }
  console.log(diffs);
}

function ratesDifference2(rates) {
  const diffs = [];
  const stack = [0];
  for (let i = 0; i < rates.length; i++) {
    while (stack.length > 0 && rates[stack[stack.length - 1]] <= rates[i]) stack.pop();
    if (stack.length === 0) diffs.push(i + 1);
    else diffs.push(i - stack[stack.length - 1]);
    stack.push(i);
  }
  console.log(diffs);
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
  ratesDifference1(rates);
  console.timeEnd("Перший метод працював ");
  console.time("Другий метод працював ");
  ratesDifference2(rates);
  console.timeEnd("Другий метод працював ");
}

start();
