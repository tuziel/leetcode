/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
  var rows = matrix.length;
  var cols = matrix[0].length;

  var pq = new PriorityQueue(([r1, c1], [r2, c2]) => matrix[r1][c1] - matrix[r2][c2]);
  pq.push([0, 0]);

  var r, c;
  while (k) {
    [r, c] = pq.pop();
    if (matrix[r][c] === -1) continue;
    if (!--k) return matrix[r][c];

    matrix[r][c] = -1;
    if (r < rows - 1) pq.push([r + 1, c]);
    if (c < cols - 1) pq.push([r, c + 1]);
  }
};

/**
 * 优先队列
 * @param {(a, b) => number} compareFn 用于确定元素顺序的方法
 */
function PriorityQueue(compareFn) {
  this.heap = [];
  this.compareFn = compareFn;
}

/** 获取当前队列长度 */
PriorityQueue.prototype.length = function () {
  return this.heap.length;
};

/** 添加元素到队列 */
PriorityQueue.prototype.push = function (item) {
  var heap = this.heap;
  // 添加元素到末尾
  heap.push(item);

  var curr = heap.length - 1;
  var parent;
  var compareFn = this.compareFn;

  // 父节点大于当前节点时，交换节点
  // 当前节点大于父节点，或到达栈顶时停止
  while (curr > 0) {
    parent = (curr - 1) >> 1;
    if (compareFn(heap[parent], heap[curr]) <= 0) break;
    [heap[curr], heap[parent]] = [heap[parent], heap[curr]];
    curr = parent;
  }

  return heap.length;
};

/** 从队列中弹出元素 */
PriorityQueue.prototype.pop = function () {
  var heap = this.heap;
  var len = heap.length;
  // 少于一个元素时直接弹出当前元素
  if (len-- <= 1) return heap.pop();

  var head = heap[0];
  // 将最后一个元素放到堆顶
  heap[0] = heap.pop();

  var curr = 0;
  var left, right;
  var compareFn = this.compareFn;
  // 当前节点大于子节点时，交换节点
  // 子节点大于当前节点，或到达叶子节点时停止
  while (1) {
    left = (curr << 1) + 1;
    // 子节点下标超出队列长度，即已到达叶子结点
    if (left >= len) break;
    right = (curr + 1) << 1;
    // 寻找最小的子节点进行比较
    if (right < len && compareFn(heap[left], heap[right]) > 0) left = right;
    if (compareFn(heap[curr], heap[left]) <= 0) break;
    [heap[curr], heap[left]] = [heap[left], heap[curr]];
    curr = left;
  }

  return head;
};

module.exports = kthSmallest;
