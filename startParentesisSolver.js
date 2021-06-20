'use strict';

const readline = require('readline');
const { parenthesisSolver } = require('./parenthesisSolver');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Введіть рядок дужок: ', string => {
  console.log(parenthesisSolver(string));
  rl.close();
});
