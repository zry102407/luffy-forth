/**
 * 二叉搜索树的最近公共祖先
 */
var lowestCommonAncestor = function (root, p, q) {
    let min = Math.min(p.val, q.val);
    let max = Math.max(p.val, q.val);
    if (root.val > min && root.val < max) {
        return root;
    } else if (root.val > max) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < min) {
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
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
