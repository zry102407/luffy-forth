/**
 * 分隔链表
 */
var partition = function (head, x) {
    let large = new ListNode(),
        small = new ListNode();
    const smallHead = small;
    const largeHead = large;
    while (head) {
        if (head.val < x) {
            small.next = head;
            small = small.next;
        } else {
            large.next = head;
            large = large.next;
        }
        head = head.next;
    }
    large.next = null;
    small.next = largeHead.next;
    return smallHead.next;
};

/**
 * 设计循环队列
 */
var MyCircularQueue = function (k) {
    this.front = 0;
    this.rear = 0;
    this.max = k;
    this.list = Array(k);
};

MyCircularQueue.prototype.enQueue = function (value) {
    if (this.isFull()) {
        return false;
    } else {
        this.list[this.rear] = value;
        this.rear = (this.rear + 1) % this.max;
        return true;
    }
};

MyCircularQueue.prototype.deQueue = function () {
    let v = this.list[this.front];
    this.list[this.front] = undefined;
    if (v !== undefined) {
        this.front = (this.front + 1) % this.max;
        return true;
    } else {
        return false;
    }
};

MyCircularQueue.prototype.Front = function () {
    if (this.list[this.front] === undefined) {
        return -1;
    } else {
        return this.list[this.front];
    }
};

MyCircularQueue.prototype.Rear = function () {
    let rear = this.rear - 1;
    if (this.list[rear < 0 ? this.max - 1 : rear] === undefined) {
        return -1;
    } else {
        return this.list[rear < 0 ? this.max - 1 : rear];
    }
};

MyCircularQueue.prototype.isEmpty = function () {
    return this.front === this.rear && !this.list[this.front];
};

MyCircularQueue.prototype.isFull = function () {
    return this.front === this.rear && !!this.list[this.front];
};

/**
 * 设计循环双端队列
 */
/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
    this.list = [];
    this.length = 0;
    this.k = k;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
    if (this.length >= this.k) {
        return false;
    }
    this.list.unshift(value);
    this.length++;
    return true;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
    if (this.length >= this.k) {
        return false;
    }
    this.list.push(value);
    this.length++;
    return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
    if (this.length === 0) {
        return false;
    }
    this.list.shift();
    this.length--;
    return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
    if (this.length === 0) {
        return false;
    }
    this.list.pop();
    this.length--;
    return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
    if (this.length === 0) {
        return -1;
    }
    return this.list[0];
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
    if (this.length === 0) {
        return -1;
    }
    return this.list[this.length - 1];
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
    return this.length === 0;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
    return this.length === this.k;
};

/**
 *  设计前中后队列
 */
function NodeList(val, next = null) {
    this.val = val;
    this.next = next;
}
var FrontMiddleBackQueue = function () {
    this.head = new NodeList(-1);
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (val) {
    let p = this.head.next;
    this.head.next = new NodeList(val, p);
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
    let slot = this.head;
    let fast = this.head.next;
    while (fast && fast.next) {
        slot = slot.next;
        fast = fast.next.next;
    }
    let p = slot.next;
    slot.next = new NodeList(val, p);
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {
    let p = this.head;
    while (p.next) {
        p = p.next;
    }
    p.next = new NodeList(val);
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
    let p = this.head;
    if (p.next == null) return -1;
    let q = p.next;
    p.next = q.next;
    return q.val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
    let slot = this.head;
    let fast = this.head.next;
    if (fast === null) return -1;
    while (fast && fast.next) {
        fast = fast.next.next;
        if (fast) {
            slot = slot.next;
        }
    }
    let q = slot.next;
    slot.next = q.next;
    return q.val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
    let p = this.head;
    if (p.next === null) return p.val;
    // 不满足条件说明p.next就是最后一个
    while (p.next && p.next.next) {
        p = p.next;
    }
    let val = p.next.val;
    p.next = null;
    return val;
};

/**
 * 最近的请求次数
 */
var RecentCounter = function () {
    this.queue = [];
};

RecentCounter.prototype.ping = function (t) {
    this.queue.push(t);
    const time = t - 3000;
    while (this.queue[0] < time) {
        this.queue.shift();
    }
    return this.queue.length;
};

/**
 * 第K个数
 */
var getKthMagicNumber = function (k) {
    let dp = [];
    let p3 = 0;
    let p5 = 0;
    let p7 = 0;
    dp[0] = 1;

    for (let i = 1; i < k; i++) {
        dp[i] = Math.min(dp[p3] * 3, Math.min(dp[p5] * 5, dp[p7] * 7));
        if (dp[i] == dp[p3] * 3) {
            p3++;
        }
        if (dp[i] == dp[p5] * 5) {
            p5++;
        }
        if (dp[i] == dp[p7] * 7) {
            p7++;
        }
    }

    return dp[k - 1];
};

/**
 *  亲密字符串
 */
var buddyStrings = function (s, goal) {
    if (s.length != goal.length) {
        return false;
    }

    if (s === goal) {
        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            count[s[i].charCodeAt() - "a".charCodeAt()]++;
            if (count[s[i].charCodeAt() - "a".charCodeAt()] > 1) {
                return true;
            }
        }
        return false;
    } else {
        let first = -1,
            second = -1;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== goal[i]) {
                if (first === -1) first = i;
                else if (second === -1) second = i;
                else return false;
            }
        }

        return (
            second !== -1 &&
            s[first] === goal[second] &&
            s[second] === goal[first]
        );
    }
};

/**
 * 柠檬水找零
 */
var lemonadeChange = function (bills) {
    let five = 0,
        ten = 0;
    for (const bill of bills) {
        if (bill === 5) {
            five += 1;
        } else if (bill === 10) {
            if (five === 0) {
                return false;
            }
            five -= 1;
            ten += 1;
        } else {
            if (five > 0 && ten > 0) {
                five -= 1;
                ten -= 1;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
};

/**
 * 煎饼排序
 */
var pancakeSort = function (arr) {
    const res = [];
    sort(arr, arr.length);
    return res;
    function sort(cakes, n) {
        if (n === 1) return;
        // 寻找最大烧饼索引
        let maxCake = 0;
        let maxCakeIndex = 0;
        for (let i = 0; i < n; i++) {
            if (cakes[i] > maxCake) {
                maxCake = cakes[i];
                maxCakeIndex = i;
            }
        }

        // 第一次反转，将最大烧饼翻到最上面
        reverse(cakes, 0, maxCakeIndex);
        // 记录反转
        res.push(maxCakeIndex + 1);
        // 第二次翻转，翻转到最下面
        reverse(cakes, 0, n - 1);
        res.push(n);
        // 递归
        sort(cakes, n - 1);
    }

    // 翻转元素
    function reverse(arr, i, j) {
        // 翻转元素,对称翻转
        while (i < j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
};

/**
 * 任务调度器
 */
var leastInterval = function (tasks, n) {
    const freq = _.countBy(tasks);

    // 任务总数
    const m = Object.keys(freq).length;
    const nextValid = new Array(m).fill(1);
    const rest = Object.values(freq);

    let time = 0;
    for (let i = 0; i < tasks.length; i++) {
        time++;
        let minNextValid = Number.MAX_VALUE;
        for (let j = 0; j < m; j++) {
            if (rest[j] > 0) {
                minNextValid = Math.min(nextValid[j], minNextValid);
            }
        }
        time = Math.max(time, minNextValid);

        let best = -1;
        for (let j = 0; j < m; j++) {
            if (rest[j] && nextValid[j] <= time) {
                if (best === -1 || rest[j] > rest[best]) {
                    best = j;
                }
            }
        }

        nextValid[best] = time + n + 1;
        rest[best]--;
    }

    return time;
};
