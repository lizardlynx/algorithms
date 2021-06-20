'use strict';

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
  return diffs;
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
  return diffs;
}

module.exports = { ratesDifference1, ratesDifference2 };
