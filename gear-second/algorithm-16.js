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
var buildTree = function (preorder, inorder) {
    let node = new TreeNode();
    return build(preorder, inorder, node);
};

var build = function (preorder, inorder, node) {
    if (!preorder.length) {
        return;
    }
    node.val = preorder[0];
    const inorderindex = inorder.indexOf(node.val);
    const rightinorder = inorder.splice(inorderindex + 1);
    const leftinorder = inorder.splice(0, inorderindex);
    const rightpreorder = preorder.splice(leftinorder.length + 1);
    const leftpreorder = preorder.splice(1, leftinorder.length);
    if (rightinorder.length) {
        node.right = new TreeNode();
    }
    if (leftinorder.length) {
        node.left = new TreeNode();
    }
    build(leftpreorder, leftinorder, node.left);
    build(rightpreorder, rightinorder, node.right);
    return node;
};

/**
 * 第K个语法符号
 */
var kthGrammar = function (N, K) {
    if (N === 1) return 0;

    // 计算当前行的长度：2的N-1次方
    var length = 2 ** (N - 1);

    // 如果K大于长度的一半，就是K所在位置是后半段
    if (K > length / 2) {
        // 先得到上一行的值，位置是K相对于后半段的位置
        var val = kthGrammar(N - 1, K - length / 2);

        // 然后把值反过来
        return val === 0 ? 1 : 0;
    }
    // 否则前半部分
    else {
        // 值就是上一行K位置的值
        return kthGrammar(N - 1, K);
    }
};

/**
 * 完全二叉树的节点个数
 */
var countNodes = function (root) {
    let count = 0;
    if (root) {
        count++;
    } else {
        return count;
    }
    count += countNodes(root.left);
    count += countNodes(root.right);
    return count;
};
