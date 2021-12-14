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
var minCameraCover = function (root) {
    var count = 0;
    var dfs = function (root) {
        if (!root) {
            return 2;
        }
        var left = dfs(root.left);
        var right = dfs(root.right);

        if (left === 0 || right === 0) {
            count++;
            return 1;
        }
        if (left === 1 || right === 1) {
            return 2;
        }
        if (left === 2 && right === 2) {
            return 0;
        }
    };
    if (dfs(root) === 0) {
        count++;
    }
    return count;
};

/**
 * 二叉树最大宽度
 */
var widthOfBinaryTree = function (root) {
    let maxWidth = 0;
    if (root) {
        let queue = [root];
        let xs = [1];
        while (queue.length > 0) {
            let size = queue.length;
            let left, right;
            if (size === 1) {
                xs = [1];
            }
            for (let i = 0; i < size; i++) {
                let node = queue.shift();
                let x = xs.shift();
                if (i === 0) {
                    left = x;
                }
                if (i === size - 1) {
                    right = x;
                }
                if (node.left) {
                    queue.push(node.left);
                    xs.push(x * 2);
                }
                if (node.right) {
                    queue.push(node.right);
                    xs.push(x * 2 + 1);
                }
            }
            maxWidth = Math.max(maxWidth, right - left + 1);
        }
    }
    return maxWidth;
};

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
