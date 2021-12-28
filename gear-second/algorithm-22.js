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
 * 二叉树的右视图
 */
var rightSideView = function (root) {
    if (!root) return [];
    let queue = [];
    let level = 0;
    let result = [];
    queue.push({ level, node: root });
    while (queue.length) {
        level++;
        let len = queue.length;
        while (len--) {
            let node = queue.shift().node;
            node.left && queue.push({ level, node: node.left });
            node.right && queue.push({ level, node: node.right });
            if (!len) {
                result.push(node.val);
            }
        }
    }
    return result;
};

// 之前需要知道各个节点的层数，在右视图中不需要则可以去掉level
var rightSideView = function (root) {
    if (!root) return [];
    let queue = [];
    let result = [];
    queue.push(root);
    while (queue.length) {
        let len = queue.length;
        while (len--) {
            let node = queue.shift();
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
            if (!len) {
                result.push(node.val);
            }
        }
    }
    return result;
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

/**
 * 对称二叉树
 */
var isSymmetric = function (root) {
    return check(root.right, root.left);
};

var check = function (root1, root2) {
    if (!root1 && !root2) return true;
    if (!root2 || !root1) return false;
    return (
        root1.val === root2.val &&
        check(root1.left, root2.right) &&
        check(root1.right, root2.left)
    );
};
