/**
 * 二叉搜索树的第K大节点
 */
var kthLargest = function (root, k) {
    let result = [];
    midOrder(root, result);
    return result[result.length - k];
};

var midOrder = function (root, result) {
    if (root) {
        midOrder(root.left, result);
        result.push(root.val);
        midOrder(root.right, result);
    }
};

/**
 * 树的子结构
 */
var isSubStructure = function (A, B) {
    if (!B || !A) {
        return false;
    }
    return (
        isSub(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
    );
};

var isSub = function (A, B) {
    if (!B) {
        return true;
    }
    if (!A || A.val !== B.val) {
        return false;
    } else {
        return isSub(A.left, B.left) && isSub(A.right, B.right);
    }
};

/**
 * 监控二叉树
 */

/**
 *
 */

/**
 * 二叉树的前序遍历
 */
var preorderTraversal = function (root, result = []) {
    if (!root) {
        return result;
    }
    result.push(root.val);
    preorderTraversal(root.left, result);
    preorderTraversal(root.right, result);
    return result;
};
