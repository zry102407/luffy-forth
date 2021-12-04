/**
 * 复杂链表的复制
 */
var copyRandomList = function (head, cachedNode = new Map()) {
    if (head === null) {
        return null;
    }
    if (!cachedNode.has(head)) {
        cachedNode.set(head, { val: head.val }),
            Object.assign(cachedNode.get(head), {
                next: copyRandomList(head.next, cachedNode),
                random: copyRandomList(head.random, cachedNode),
            });
    }
    return cachedNode.get(head);
};

/**
 * 删除中间节点
 */
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

/**
 * 两数相加II
 */
var addTwoNumbers = function (l1, l2) {
    let arr1 = [],
        arr2 = [],
        arr3 = [];
    while (l1) {
        arr1.push(l1.val);
        l1 = l1.next;
    }
    while (l2) {
        arr2.push(l2.val);
        l2 = l2.next;
    }
    let ret = null;
    let carry = 0;
    while (arr1.length || arr2.length || carry) {
        let val1 = arr1.length ? arr1.pop() : 0;
        let val2 = arr2.length ? arr2.pop() : 0;
        let val = val1 + val2 + carry;
        carry = Math.floor(val / 10);
        val = val % 10;
        const node = new ListNode(val);
        node.next = ret;
        ret = node;
    }
    return ret;
};

/**
 * 重排链表
 */
var reorderList = function (head) {
    let arr = [];
    while (head) {
        arr.push(head);
        head = head.next;
    }
    let n = arr.length;
    let ret = new ListNode();
    let result = ret;
    for (let i = 0; i < n / 2; i++) {
        ret.next = arr[i];
        if (i !== n - i - 1) {
            arr[i].next = arr[n - i - 1];
            ret = arr[n - i - 1];
        } else {
            ret = ret.next;
        }
    }
    ret.next = null;
    return result.next;
};
/**
 * 移除无效的括号
 */
