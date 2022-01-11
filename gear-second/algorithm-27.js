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
 * 合并K个升序链表
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
