/**
 * 合法二叉搜索树
 */
var isValidBST = function (root) {
    return isValid(root, -Infinity, Infinity);
};

var isValid = function (root, lower, upper) {
    if (!root) return true;
    if (root.val <= lower || root.val >= upper) return false;
    return (
        isValid(root.left, lower, root.val) &&
        isValid(root.right, root.val, upper)
    );
};

/**
 * 二叉搜索树中第K小的元素
 */
var kthSmallest = function (root, k) {
    let queue = [];
    while (root || queue.length) {
        while (root) {
            queue.push(root);
            root = root.left;
        }
        root = queue.pop();
        if (--k == 0) return root.val;
        root = root.right;
    }
};

/**
 * 相同的树
 */
var isSameTree = function (p, q) {
    if (!p && !q) return true;
    if ((!p && q) || (p && !q)) return false;
    return (
        p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right)
    );
};
