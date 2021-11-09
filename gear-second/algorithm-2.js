/**
 * 有效括号
 * @param {*} input
 * @returns
 */
function validBrackets(input) {
    let stack = [];
    stack.push(input[0]);
    let map = new Map();
    map.set("(", ")");
    map.set("[", "]");
    map.set("{", "}");
    for (let i = 1; i < input.length; i++) {
        const len = stack.length;
        if (stack[len - 1] && map.get(stack[len - 1]) === input[i]) {
            stack.pop();
        } else {
            stack.push(input[i]);
        }
    }
    return stack.length === 0;
}

/**
 * 合并两个有序链表
 * @param {*} input
 * @returns
 */
var mergeTwoLists = function (l1, l2) {
    let fakeNode = new ListNode();
    let node = fakeNode;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            node.next = l1;
            l1 = l1.next;
        } else {
            node.next = l2;
            l2 = l2.next;
        }
        node = node.next;
    }
    node.next = l1 ? l1 : l2;
    return fakeNode.next;
};

/**
 * 二叉树前序遍历
 * @param {*} input
 * @returns
 */
function preOrderTraversal(root, result = []) {
    if (!root) return result;
    result.push(root.val);
    preOrderTraversal(root.left, result);
    preOrderTraversal(root.right, result);
    return result;
}

/**
 * 计数排序
 * @param {*} input
 * @returns
 */

function countSort(inputArr) {
    let obj = {};
    for (let i = 0; i < inputArr.length; i++) {
        obj[inputArr[i]] ? obj[inputArr[i]]++ : (obj[inputArr[i]] = 1);
    }
    let result = [];
    let keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j++) {
        for (let k = 0; k < obj[keys[j]]; k++) {
            result.push(keys[j]);
        }
    }
    return result;
}

/**
 * 回文数
 * @param {*} input
 * @returns
 */
function charge(input) {
    let len = input.length;
    for (let i = 0; i < Math.ceil(len / 2); i++) {
        if (input[i] !== input[len - i - 1]) {
            return false;
        }
    }
    return true;
}

console.log(charge(input));
