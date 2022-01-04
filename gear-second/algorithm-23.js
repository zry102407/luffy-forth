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
 * 二叉树中的最大路径和
 */
var maxPathSum = function (root) {
    if (!root) {
        return Number.MIN_SAFE_INTEGER;
    }
    function dfs1(node) {
        if (!node) {
            return 0;
        }
        const L = dfs1(node.left);
        const R = dfs1(node.right);
        node.val = Math.max(L, R, 0) + node.val;
        return node.val;
    }
    dfs1(root);

    let ans = Number.MIN_SAFE_INTEGER;
    function dfs2(node) {
        if (!node) {
            return Number.MIN_SAFE_INTEGER;
        }
        ans = Math.max(
            ans,
            node.val +
                Math.max(Math.min(node.left?.val || 0, node.right?.val || 0), 0)
        );
        dfs2(node.left);
        dfs2(node.right);
    }
    dfs2(root);
    return ans;
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

/**
 * 最接近远点的K个点
 */
var kClosest = function (points, k) {
    return points
        .sort((a, b) => a[0] ** 2 + a[1] ** 2 - (b[0] ** 2 + b[1] ** 2))
        .splice(0, k);
};

/**
 * 根据字符出现的频率排序
 */
var frequencySort = function (s) {
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        let item = map.get(s[i]) || 0;
        map.set(s[i], ++item);
    }
    let result = [];
    let keys = map.keys();
    for (let key of keys) {
        result.push({ count: map.get(key), key });
    }
    result.sort((a, b) => b.count - a.count);
    result = result.map((item) => {
        let tmp = "";
        while (item.count > 0) {
            tmp += item.key;
            item.count--;
        }
        return tmp;
    });
    return result.join("");
};
