'use strict';

const parenthesisOpening = ['(', '[', '{'];
const parenthesisClosing = [')', ']', '}'];

function parenthesisSolver(string) {
  const stack = [];
  const parenthesis = string.split('');
  if (!parenthesisOpening.includes(parenthesis[0])) return 'Дужки розставлені неправильно!';
  else stack.push(0);
  for (let i = 1; i < parenthesis.length; i++) {
    const indexOfLast = stack.length - 1;
    const lastInStack = stack[indexOfLast];
    if (!parenthesisOpening.includes(parenthesis[i]) && !parenthesisClosing.includes(parenthesis[i])) return 'Наданий рядок не є рядком дужок!';
    else if (parenthesisClosing.includes(parenthesis[i])) {
      if (parenthesisOpening.indexOf(parenthesis[lastInStack]) === parenthesisClosing.indexOf(parenthesis[i])) stack.pop();
      else return 'Дужки розставлені неправильно!';
    }
    else if (parenthesisOpening.includes(parenthesis[i])) stack.push(i);
    if (i == parenthesis.length - 1 && stack.length !== 0) return 'Дужки розставлені неправильно!';
  }
  return 'Дужки розставлені правильно!';
}

module.exports = { parenthesisSolver };
