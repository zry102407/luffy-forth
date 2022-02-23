/**
 * 字符频次唯一的最小删除次数
 */
var minDeletions = function (s) {
    let hash = new Map();
    let res = 0;
    for (let i of s) {
        hash.get(i) ? hash.set(i, hash.get(i) + 1) : hash.set(i, 1);
    }
    hash = [...hash].sort((a, b) => a[1] - b[1]);
    for (let i = 1; i < hash.length; i++) {
        if (hash[i][1] <= hash[i - 1][1] && hash[i - 1][1] != 0) {
            hash[i - 1][1] = hash[i - 1][1] - 1;
            res++;
            i = 0;
        }
    }
    return res;
};

/**
 * 零移动
 */
var moveZeroes = function (nums) {
    let slow = 0,
        fast = 0;
    while (fast < nums.length) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
        fast++;
    }
    return nums;
};

/**
 * 合并排序数组
 */
var merge = function (A, m, B, n) {
    while (n > 0) {
        if (m <= 0 || B[n - 1] >= A[m - 1]) {
            A[n + m - 1] = B[n - 1];
            n--;
        } else {
            A[n + m - 1] = A[m - 1];
            m--;
        }
    }
    return A;
};

/**
 * 数组拆分I
 */
var arrayPairSum = function (nums) {
    nums.sort((a, b) => a - b);
    let result = 0;
    for (let i = 0; i < nums.length; i += 2) {
        result += Math.min(nums[i], nums[i + 1]);
    }
    return result;
};

/**
 * 最多可以参加的会议数目
 */
var maxEvents = function (events) {
    // 按最快结束的会议来排序，相同的结束时间就按最早开始来排
    events.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    // 使用并查集来记录从第x天开始之后有空闲的那一天
    const uf = new UF(events[events.length - 1][1] + 1);
    let res = 0;
    for (const [start, end] of events) {
        // 从第start天开始，使用并查集找下一个有空的日子
        const i = uf.find(start);
        // 有空的这天会议还没结束
        if (i <= end) {
            // 这天要去开会，所以要变为没空，从这天开始找有空的日子推后一天来找
            uf.union(i + 1, i);
            res++;
        }
    }
    return res;
};

class UF {
    constructor(n) {
        this.p = Array.from({ length: n }, (_, i) => i);
    }
    find(x) {
        if (x !== this.p[x]) {
            this.p[x] = this.find(this.p[x]);
        }
        return this.p[x];
    }
    union(x, y) {
        this.p[this.find(y)] = this.find(x);
    }
}
