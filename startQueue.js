'use strict';

const PriorityQueue = require('./queue').PriorityQueue;
const queue = new PriorityQueue(1);
queue.insertInPQ(2, 'Liza');
queue.insertInPQ(1, 'Mila');
queue.insertInPQ(0, 'Andriy');
queue.insertInPQ(5, 'Ira');
queue.insertInPQ(4, 'Lesha');
queue.insertInPQ(4, 'Anonim');

console.log(queue.getQueue());
queue.extractMaxFromPQ();
console.log(queue.getQueue());
