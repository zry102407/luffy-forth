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
