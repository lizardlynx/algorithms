'use strict';

//щоб отримати мінімальну чергу, передавайте в конструктор 0, максимальну - будь-що інше
class PriorityQueue {
  #queue = [];
  #variant = 0;
  constructor(variant) {
    this.#variant = variant;
  }

  insertInPQ(pq, data) {
    let c = {pq: pq, data: data};
    this.#addLast(c);
    if (!this.#parent(c)) return;
    let condition2 = this.#comparePriorities(c);
    while (c !== this.#root() && condition2) {
      const p = this.#parent(c);
      this.#exchange(p, c);
      c = p; 
      if (!this.#parent(c)) return;
      condition2 = this.#comparePriorities(c);
    }
  }

  #comparePriorities(c) {
    let condition2 = false; 
    if (this.#variant === 0) condition2 = (this.#getData(c) < this.#getData(this.#parent(c)));
    else condition2 = (this.#getData(c) > this.#getData(this.#parent(c)));
    return condition2;
  }

  #root() {
    return this.#queue[0];
  }

  #exchange(x, y) {
    const tempX = JSON.parse(JSON.stringify(x));
    x.pq = y.pq;
    x.data = y.data;
    y.pq = tempX.pq;
    y.data = tempX.data;
  }

  #getData(c) {
    return c.pq;
  }

  #parent(c) {
    const i = this.#queue.lastIndexOf(c);
    if (i % 2 === 0) return this.#queue[(i - 2) / 2]; 
    else return this.#queue[(i - 1) / 2];
  }

  #addLast(i) {
    this.#queue.push(i);
  }

  findMinInPQ() {
    if (this.#variant !== 0) return 'use Max';
    return this.#queue[0];
  }

  findMaxInPQ() {
    if (this.#variant === 0) return 'use Min';
    return this.#queue[0];
  }

  extractMinFromPQ() {
    if (this.#variant !== 0) return 'use Max';
    const c = JSON.parse(JSON.stringify(this.#root()));
    this.#queue[0] = this.#extractLastFromPQ();
    let i = this.#queue[0];
    while (this.#hasChildren(i)) {
      const children = this.#children(i);
      let j = children[0];
      if (children.length === 0) return c;
      else if (children.length === 1) j = children[0];
      else if (this.#getData(children[0]) > this.#getData(children[1])) j = children[1];
      if (this.#getData(i) < this.#getData(j)) return c;
      this.#exchange(i, j);
      i = j;
    }
    return c;
  }

  #children(c) {
    const i = this.#queue.lastIndexOf(c);
    const children = [];
    if (this.#queue[2*i + 1]) children.push(this.#queue[2*i + 1]);
    if (this.#queue[2*i + 2]) children.push(this.#queue[2*i + 2]);
    return children;
  }

  #hasChildren(c) {
    const i = this.#queue.lastIndexOf(c);
    if (this.#queue.length > 2*i + 2) return true;
    else false;
  }

  #extractLastFromPQ() {
    return this.#queue.pop();
  }

  extractMaxFromPQ() {
    if (this.#variant === 0) return 'use Min';
    const c = JSON.parse(JSON.stringify(this.#root()));
    this.#queue[0] = this.#extractLastFromPQ();
    let i = this.#queue[0];
    while (this.#hasChildren(i)) {
      const children = this.#children(i);
      let j = children[0];
      if (children.length === 0) return c;
      else if (children.length === 1) j = children[0];
      else if (this.#getData(children[0]) < this.#getData(children[1])) j = children[1];
      if (this.#getData(i) > this.#getData(j)) return c;
      this.#exchange(i, j);
      i = j;
    }
    return c;
  }

  getQueue() {
    return this.#queue;
  }
}

module.exports = { PriorityQueue };
