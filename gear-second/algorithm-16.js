/**
 * 斐波那契数列
 */
var fib = function (n) {
    let a = [];
    a[0] = 0;
    a[1] = 1;
    if (n < 2) {
        return a[n];
    }
    let temp;
    while (n >= 2) {
        temp = a[1];
        a[1] = (a[0] + a[1]) % 1000000007;
        a[0] = temp;
        n--;
    }
    return a[1];
};

/**
 * 路径总和
 */
var hasPathSum = function (root, targetSum) {
    if (!root) {
        return false;
    }
    if (!root.left && !root.right) {
        return targetSum - root.val === 0;
    }
    return (
        hasPathSum(root.left, targetSum - root.val) ||
        hasPathSum(root.right, targetSum - root.val)
    );
};

/**
 * 从前序与中序遍历序列构造二叉树
 */
