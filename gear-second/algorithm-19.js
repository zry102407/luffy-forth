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
