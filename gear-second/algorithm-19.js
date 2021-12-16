/**
 * 平衡二叉树
 */
var isBalanced = function (root) {
    if (!root) return true;
    return (
        Math.abs(depth(root.left) - depth(root.right)) <= 1 &&
        isBalanced(root.left) &&
        isBalanced(root.right)
    );
};

var depth = function (root) {
    if (!root) return 0;
    return Math.max(depth(root.left), depth(root.right)) + 1;
};

/**
 * 最小的K个数
 */
var getLeastNumbers = function (arr, k) {
    arr.sort((a, b) => a - b);
    return arr.splice(0, k);
};

/**
 * 最后一块石头的重量
 */
var lastStoneWeight = function (stones) {
    stones.sort((a, b) => a - b);
    for (let i = stones.length - 1; i > 0; i--) {
        stones;
        stones[i - 1] = Math.abs(stones[i] - stones[i - 1]);
        stones.sort((a, b) => a - b);
    }
    return stones[0];
};

/**
 * 数据流中第K大元素
 */
var KthLargest = function (k, nums) {
    this.list = [];
    this.k = k;
    nums.sort((a, b) => a - b);
    for (let i = nums.length - 1; i > nums.length - 1 - k && i >= 0; i--) {
        this.list.push(nums[i]);
    }
    return null;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    if (this.list.length === 0) {
        this.list.push(val);
    } else if (this.list.length < this.k) {
        poll(this.list, val, this.k);
    } else if (val >= this.list[0]) {
        this.list.unshift(val);
        this.list.pop();
    } else if (val > this.list[this.list.length - 1]) {
        poll(this.list, val, this.k);
    }
    return this.list[this.k - 1] || null;
};

function poll(list, val, k) {
    let temp = val;
    let i;
    if (list.length < k) {
        list.push(val);
        list.sort((a, b) => b - a);
        return;
    }
    for (i = list.length - 1; i >= 0; i--) {
        if (list[i] >= temp) {
            list[i + 1] = temp;
            break;
        } else {
            list[i] = list[i - 1];
        }
    }
}
/**
 * 查找和最小的K对数字
 */
var kSmallestPairs = function (nums1, nums2, k) {
    const record = [];
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            record.push([nums1[i], nums2[j]]);
        }
    }
    return record.sort((a, b) => a[0] + a[1] - b[0] - b[1]).slice(0, k);
};
