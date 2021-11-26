/**
 * 链表中倒数第K个节点
 */
var getKthFromEnd = function (head, k) {
    let right = 0;
    let temp = head;
    while (right < k) {
        temp = temp.next;
        right++;
    }
    while (head && temp) {
        temp = temp.next;
        head = head.next;
    }
    return head;
};

/**
 * 复制带随机指针的链表
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
 * 交换链表中的节点
 */
var swapNodes = function (head, k) {
    const list = new ListNode(0);
    list.next = head;
    let i = 0,
        fast = (slow = list),
        nodeK;
    while (i++ < k) {
        fast = fast.next;
    }
    nodeK = fast;
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    i = nodeK.val;
    nodeK.val = slow.val;
    slow.val = i;
    return head;
};

/**
 * 两两交换链表中的节点
 */
var swapPairs = function (head) {
    let next,
        pre = new ListNode();
    result = pre;
    while (head) {
        if (head.next) {
            pre.next = head.next;
            pre = head;
            next = head.next.next;
            head.next.next = head;
            head.next = next;
            head = head.next;
        } else {
            pre.next = head;
            head = head.next;
        }
    }
    return result.next;
};

/**
 * 合并k个升序链表
 */
var mergeKLists = function (lists) {
    let head = new ListNode();
    head.next = lists[0] || null;
    head = head.next;
    for (let i = 1; i < lists.length; i++) {
        head = mergeTwoList(head, lists[i]);
    }
    return head;
};

function mergeTwoList(list1, list2) {
    let head = new ListNode();
    let result = head;
    while (list1 && list2) {
        if (list1.val > list2.val) {
            head.next = list2;
            list2 = list2.next;
        } else {
            head.next = list1;
            list1 = list1.next;
        }
        head = head.next;
    }
    if (list1) {
        head.next = list1;
    }
    if (list2) {
        head.next = list2;
    }
    return result.next;
}
