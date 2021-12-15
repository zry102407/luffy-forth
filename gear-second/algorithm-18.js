/**
 * N叉树的前序遍历
 */
var preorder = function (root) {
    let result = [];
    var dfs = (root) => {
        if (!root) return;
        result.push(root.val);
        if (root.children) {
            for (let i = 0; i < root.children.length; i++) {
                dfs(root.children[i]);
            }
        }
    };
    dfs(root);
    return result;
};

/**
 * 翻转二叉树
 */
var invertTree = function (root) {
    if (!root) {
        return root;
    }
    let left = invertTree(root.right);
    let right = invertTree(root.left);
    root.left = left;
    root.right = right;
    return root;
};

/**
 * 从上到下打印二叉树
 */
var levelOrder = function (root) {
    if (!root) {
        return [];
    }
    let queue = [[root, 0]];
    let res = [];
    while (queue.length) {
        const [node, level] = queue.shift();
        if (!res[level]) res[level] = [];
        res[level].push(node.val);
        node.left && queue.push([node.left, level + 1]);
        node.right && queue.push([node.right, level + 1]);
    }
    return res;
};

/**
 * 二叉树的层序遍历
 */
var levelOrderBottom = function (root) {
    if (!root) {
        return [];
    }
    let queue = [[root, 0]];
    let res = [];
    while (queue.length) {
        const [node, level] = queue.shift();
        if (!res[level]) res[level] = [];
        res[level].push(node.val);
        node.left && queue.push([node.left, level + 1]);
        node.right && queue.push([node.right, level + 1]);
    }
    return res.reverse();
};

/**
 * 二叉树的锯齿形层序遍历
 */
var zigzagLevelOrder = function (root) {
    if (!root) {
        return [];
    }
    let queue = [[root, 0, false]];
    let res = [];
    while (queue.length) {
        const [node, level, sort] = queue.shift();
        if (!res[level]) res[level] = [];
        if (sort) {
            res[level].unshift(node.val);
        } else {
            res[level].push(node.val);
        }
        node.left && queue.push([node.left, level + 1, !sort]);
        node.right && queue.push([node.right, level + 1, !sort]);
    }
    return res;
};
