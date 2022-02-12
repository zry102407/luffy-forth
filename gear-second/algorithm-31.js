/**
 * 划分字母区间
 */
var partitionLabels = function (s) {
    const last = new Array(26);
    const length = s.length;
    const codePointA = "a".codePointAt(0);
    for (let i = 0; i < length; i++) {
        last[s.codePointAt(i) - codePointA] = i;
    }
    const partition = [];
    let start = 0,
        end = 0;
    for (let i = 0; i < length; i++) {
        end = Math.max(end, last[s.codePointAt(i) - codePointA]);
        if (i == end) {
            partition.push(end - start + 1);
            start = end + 1;
        }
    }
    return partition;
};

/**
 * 部分排序
 */
var subSort = function (array) {
    let r = -1,
        l = -1;
    //正向遍历记录最右区间值
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < array.length; i++) {
        if (array[i] >= max) {
            max = array[i];
        } else {
            r = i;
        }
    }
    //反向遍历记录最左区间值
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] <= min) {
            min = array[i];
        } else {
            l = i;
        }
    }
    return [l, r];
};

/**
 * 最长同值路径
 */
var longestUnivaluePath = function (root) {
    if (root == null) return 0;
    let res = 0;
    let maxDepth = (root, parentVal) => {
        // 定义：计算以 root 为根的这棵二叉树中，从 root 开始值为 parentVal 的最长树枝长度
        if (root == null) return 0;
        // 利用函数定义，计算左右子树值为 root.val 的最长树枝长度
        let leftLen = maxDepth(root.left, root.val);
        let rightLen = maxDepth(root.right, root.val);
        // 后序遍历位置顺便更新全局变量，同值路径就是左右同值树枝长度之和
        res = Math.max(res, leftLen + rightLen);
        // 如果 root 本身和上级值不同，那么整棵子树都不可能有同值树枝
        if (root.val != parentVal) return 0;
        // 以 root 为根的二叉树从 root 开始值为 parentVal 的最长树枝长度，等于左右子树的最长树枝长度的最大值加上 root 节点本身
        return 1 + Math.max(leftLen, rightLen);
    };
    // 在后序遍历的位置更新 res
    maxDepth(root, root.val);
    return res;
};

/**
 * 最大数
 */
var largestNumber = function (nums) {
    nums.sort((a, b) => b + "" + a - (a + "" + b));
    if (nums[0] === 0) return "0";
    return nums.join("");
};

/**
 * 前K个高频元素
 */
var topKFrequent = function (nums, k) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            let count = map.get(nums[i]) + 1;
            map.set(nums[i], count);
        } else {
            map.set(nums[i], 1);
        }
    }
    let result = [];
    for (let key of map.keys()) {
        result.push(key);
    }
    result.sort((a, b) => map.get(b) - map.get(a));
    let ans = [];
    for (let i = 0; i < k; i++) {
        ans.push(result[i]);
    }
    return ans;
};
