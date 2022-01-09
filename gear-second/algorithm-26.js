/**
 * 字符串解码
 */
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "]") {
            let tmp = stack.pop();
            let str = "";
            while (tmp !== "[") {
                str = tmp + str;
                tmp = stack.pop();
            }
            let count = stack.pop();
            let tmpStr = "";
            while (count--) {
                tmpStr += str;
            }
            stack.push(tmpStr);
        } else {
            if (isNaN(Number(s[i]))) {
                stack.push(s[i]);
            } else {
                stack.push(s[i]);
                while (!isNaN(Number(s[i + 1]))) {
                    let count = stack.pop() || "";
                    stack.push(count + s[i + 1]);
                    i++;
                }
            }
        }
    }
    return stack.join("");
};

/**
 * 不同的二叉搜索树II
 */
function build(lo, hi) {
    let res = [];
    // base case，显然当lo > hi闭区间[lo, hi]肯定是个空区间，也就对应着空节点 null，
    if (lo > hi) {
        res.push(null);
        return res;
    }
    // 1、穷举 root 节点的所有可能。
    for (let i = lo; i <= hi; i++) {
        // 2、递归构造出左右子树的所有合法 BST。
        let leftTree = build(lo, i - 1);
        let rightTree = build(i + 1, hi);
        // 3、给 root 节点穷举所有左右子树的组合。
        for (let left of leftTree) {
            for (let right of rightTree) {
                let root = new TreeNode(i);
                root.left = left;
                root.right = right;
                res.push(root);
            }
        }
    }
    return res;
}
var generateTrees = function (n) {
    if (n == 0) return [];
    // 构造闭区间 [1, n] 组成的 BST
    return build(1, n);
};

/**
 * 最小K个数
 */
var smallestK = function (arr, k) {
    arr.sort((a, b) => a - b);
    return arr.splice(0, k);
};

/**
 * 快排partition解法
 */
var smallestK = function (arr, k) {
    randomizedSelected(arr, 0, arr.length - 1, k);
    return arr.slice(0, k);
};

const randomizedSelected = (arr, l, r, k) => {
    if (l >= r) {
        return;
    }
    const pos = randomizedPartition(arr, l, r);
    const num = pos - l + 1;
    if (k === num) {
        return;
    } else if (k < num) {
        randomizedSelected(arr, l, pos - 1, k);
    } else {
        randomizedSelected(arr, pos + 1, r, k - num);
    }
};

// 基于随机的划分
const randomizedPartition = (nums, l, r) => {
    const i = parseInt(Math.random() * (r - l + 1)) + l;
    swap(nums, r, i);
    return partition(nums, l, r);
};

const partition = (nums, l, r) => {
    const pivot = nums[r];
    let i = l - 1;
    for (let j = l; j <= r - 1; ++j) {
        if (nums[j] <= pivot) {
            i = i + 1;
            swap(nums, i, j);
        }
    }
    swap(nums, i + 1, r);
    return i + 1;
};

const swap = (nums, i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
};

/**
 * 调整数组顺序使奇数位于偶数前面
 */
var exchange = function (nums) {
    let left = [],
        right = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2) {
            left.push(nums[i]);
        } else {
            right.push(nums[i]);
        }
    }
    return left.concat(right);
};
