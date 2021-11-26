/**
 * 环形链表II
 */
var detectCycle = function (head) {
    let count = 1;
    while (head) {
        if (head.count) {
            return head;
        } else {
            head.count = count;
            head = head.next;
            count++;
        }
    }
    return null;
};

/**
 * 反转链表
 */
var reverseList = function (head) {
    let node = null;
    while (head) {
        const next = head.next;
        head.next = node;
        node = head;
        head = next;
    }
    return node;
};

/**
 * 反转链表II
 */
var reverseBetween = function (head, left, right) {
    if (left === right) {
        return head;
    }
    let count = 1;
    let ret = new ListNode();
    ret.next = head;
    let start;
    let end;
    let pre = ret,
        next;
    while (head) {
        if (count === left) {
            start = head;
        }
        if (count < left) {
            pre = pre.next;
        }
        if (count === right) {
            end = head;
            next = head.next;
            head.next = null;
        }
        head = head.next;
        count++;
    }
    const [newEnd, newStart] = reverseList(start, end);
    pre.next = newEnd;
    newStart.next = next;
    return ret.next;
};

var reverseList = function (head, end) {
    if (!head || !end) {
        return head;
    }
    let node = null;
    const newStart = head;
    while (head) {
        const next = head.next;
        head.next = node;
        node = head;
        head = next;
    }
    return [end, newStart];
};

/**
 * 删除链表的倒数第N个节点
 */
var removeNthFromEnd = function (head, n) {
    let count = 0;
    let right = head;
    let pre = new ListNode();
    pre.next = head;
    let ret = pre;
    while (count < n) {
        right = right.next;
        count++;
    }
    while (right) {
        right = right.next;
        pre = head;
        head = head.next;
    }
    pre.next = head.next;
    return ret.next;
};

/**
 * 删除排序链表中的重复元素
 */
var deleteDuplicates = function (head) {
    let map = new Map();
    let pre = head;
    let ret = head;
    while (head) {
        if (!map.has(head.val)) {
            map.set(head.val, true);
            pre = head;
        } else {
            pre.next = head.next;
        }
        head = head.next;
    }
    return ret;
};

/**
 * 删除排序链表中的重复元素II
 */
var deleteDuplicates = function (head) {
    if (!head) {
        return head;
    }
    let cur = head;
    let pre = new ListNode();
    let ret = pre;

    if (!cur.next) {
        pre.next = cur;
    }
    while (cur && cur.next) {
        if (cur.val === cur.next.val) {
            // 继续往下找所有相同的节点中的最后一个，并将其从链表中移除
            let next = cur.next;
            while (next.next && next.val === next.next.val) {
                next = next.next;
            }
            pre.next = next.next;
            cur = pre.next;
        } else {
            pre.next = cur;
            pre = pre.next;
            cur = cur.next;
        }
    }
    return ret.next;
};
