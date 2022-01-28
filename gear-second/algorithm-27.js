/**
 * 排序链表
 */
const merge = (head1, head2) => {
    const dummyHead = new ListNode(0);
    let temp = dummyHead,
        temp1 = head1,
        temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
};

const toSortList = (head, tail) => {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head,
        fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
};

var sortList = function (head) {
    return toSortList(head, null);
};

/**
 * 两颗二叉搜索树中的所有元素
 */
var getAllElements = function (root1, root2) {
    return merge(traversal(root1), traversal(root2));
};
const traversal = (node, arr = []) => {
    if (node) {
        traversal(node.left, arr);
        arr.push(node.val);
        traversal(node.right, arr);
    }
    return arr;
};
const merge = (arr1, arr2) => {
    const ret = [];
    let idx1 = (idx2 = 0);
    while (idx1 < arr1.length && idx2 < arr2.length) {
        arr1[idx1] < arr2[idx2]
            ? ret.push(arr1[idx1++])
            : ret.push(arr2[idx2++]);
    }
    while (idx1 < arr1.length) ret.push(arr1[idx1++]);
    while (idx2 < arr2.length) ret.push(arr2[idx2++]);
    return ret;
};
