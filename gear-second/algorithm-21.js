/**
 * 积压订单中的订单总数
 */
var getNumberOfBacklogOrders = function (orders) {
    // sell 小顶堆
    let minHeap = new Heap();
    // 节点结构为 [price, amount]
    // 根据节点price构建堆
    var cmp = (a, b) => a[0] < b[0];
    // buy 大顶堆
    let maxHeap = new Heap(cmp);
    for (let arr of orders) {
        // buy时 看 sell小顶堆
        if (arr[2] == 0) {
            while (true) {
                // 小顶堆堆顶订单数量足够抵消 buy订单数量，还有剩余时
                if (
                    minHeap.heap.length > 0 &&
                    minHeap.heap[0][0] <= arr[0] &&
                    minHeap.heap[0][1] > arr[1]
                ) {
                    // 小顶堆堆顶订单数量为 抵消buy订单后 余下的数量
                    minHeap.heap[0][1] = minHeap.heap[0][1] - arr[1];
                    break;
                    // 小顶堆堆顶订单数量全部抵消 buy订单数量， 或者不够抵消时
                } else if (
                    minHeap.heap.length > 0 &&
                    minHeap.heap[0][0] <= arr[0] &&
                    minHeap.heap[0][1] <= arr[1]
                ) {
                    // 还剩下的buy订单，待会和重构的sell小顶堆重新匹配
                    arr[1] -= minHeap.heap[0][1];
                    // 移除sell小顶堆堆顶
                    minHeap.heap[0] = minHeap.heap[minHeap.heap.length - 1];
                    minHeap.heap.pop();
                    minHeap.down(0);
                    // 剩余订单为0，退出循环
                } else if (arr[1] == 0) {
                    break;
                    // 阻塞了，剩下订单全堆积
                } else {
                    maxHeap.heap.push([arr[0], arr[1]]); // 节点结构是 [price, amount]
                    maxHeap.up(maxHeap.heap.length - 1);
                    break;
                }
            }
            // sell时 看 buy大顶堆
        } else {
            while (true) {
                if (
                    maxHeap.heap.length > 0 &&
                    maxHeap.heap[0][0] >= arr[0] &&
                    maxHeap.heap[0][1] > arr[1]
                ) {
                    // 大顶堆堆顶订单数量为 抵消sell订单后 余下的数量
                    maxHeap.heap[0][1] = maxHeap.heap[0][1] - arr[1];
                    break;
                } else if (
                    maxHeap.heap.length > 0 &&
                    maxHeap.heap[0][0] >= arr[0] &&
                    maxHeap.heap[0][1] <= arr[1]
                ) {
                    // 还剩下的sell订单，待会和重构的buy大顶堆重新匹配
                    arr[1] -= maxHeap.heap[0][1];
                    // 移除buy大顶堆堆顶
                    maxHeap.heap[0] = maxHeap.heap[maxHeap.heap.length - 1];
                    maxHeap.heap.pop();
                    maxHeap.down(0);
                    // 剩余订单为0，退出循环
                } else if (arr[1] == 0) {
                    break;
                    // 阻塞了，剩下的全堆积
                } else {
                    minHeap.heap.push([arr[0], arr[1]]); // 节点结构为 [price, amount]
                    minHeap.up(minHeap.heap.length - 1);
                    break;
                }
            }
        }
    }
    let count = 0;
    // 积压订单数为两个堆每个节点积压的订单数
    for (let arr of maxHeap.heap) {
        count += arr[1];
    }
    for (let arr of minHeap.heap) {
        count += arr[1];
    }
    return count % 1000000007;
};

// 默认小顶堆
var defaultCmp = (a, b) => a[0] > b[0];
class Heap {
    constructor(cmp = defaultCmp) {
        this.heap = []; // 每个节点结构是 [price, amount]
        this.cmp = cmp;
    }
    up(i) {
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.cmp(this.heap[parent], this.heap[i])) {
                [this.heap[parent], this.heap[i]] = [
                    this.heap[i],
                    this.heap[parent],
                ];
                i = parent;
            } else {
                break;
            }
        }
    }
    down(i) {
        while (2 * i + 1 < this.heap.length) {
            let child = 2 * i + 1;
            if (
                child + 1 < this.heap.length &&
                this.cmp(this.heap[child], this.heap[child + 1])
            ) {
                child++;
            }
            if (this.cmp(this.heap[i], this.heap[child])) {
                [this.heap[child], this.heap[i]] = [
                    this.heap[i],
                    this.heap[child],
                ];
                i = child;
            } else {
                break;
            }
        }
    }
}

/**
 * 丑数II
 */
var nthUglyNumber = function (n) {
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    let p2 = 1,
        p3 = 1,
        p5 = 1;
    for (let i = 2; i <= n; i++) {
        const num2 = dp[p2] * 2,
            num3 = dp[p3] * 3,
            num5 = dp[p5] * 5;
        dp[i] = Math.min(Math.min(num2, num3), num5);
        if (dp[i] === num2) {
            p2++;
        }
        if (dp[i] === num3) {
            p3++;
        }
        if (dp[i] === num5) {
            p5++;
        }
    }
    return dp[n];
};

/**
 * 超级丑数
 */
var nthSuperUglyNumber = function (n, primes) {
    var arr = new Array(n + 1).fill(0);
    arr[0] = 1;
    var m = primes.length;
    var points = new Array(m).fill(0);
    var nums = new Array(m).fill(1);
    for (let i = 1; i < arr.length; i++) {
        var minNum = Number.MAX_SAFE_INTEGER;
        for (let j = 0; j < m; j++) {
            minNum = Math.min(minNum, nums[j]);
        }
        arr[i] = minNum;
        for (let j = 0; j < m; j++) {
            if (nums[j] === minNum) {
                points[j]++;
                nums[j] = arr[points[j]] * primes[j];
            }
        }
    }
    return arr[n];
};

/**
 * 移除石子的最大得分
 */
var maximumScore = function (a, b, c) {
    const arr = [a, b, c];
    arr.sort((a, b) => a - b);
    if (arr[0] + arr[1] <= arr[2]) {
        return arr[0] + arr[1];
    }
    return parseInt((a + b + c) / 2);
};

/**
 * 二叉树的最大深度
 */
var maxDepth = function (root) {
    if (!root) return 0;
    let queue = [];
    let ans = 0;
    queue.push(root);
    while (queue.length) {
        let size = queue.length;
        while (size) {
            let node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
            size--;
        }
        ans++;
    }
    return ans;
};
