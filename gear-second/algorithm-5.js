/**
 * 从尾到头打印链表
 */
function reversePrint(head) {
    let result = [];
    while (head) {
        result.unshift(head.val);
        head = head.next;
    }
    return result;
}

/**
 * 返回倒数第K个节点
 */
function kthToLast(head, k) {
    let result = head;
    let cur = head;
    let right = 0;
    while (right < k) {
        cur = cur.next;
        right++;
    }
    while (cur) {
        result = result.next;
        cur = cur.next;
    }
    return result.val;
}

/**
 * 环形链表
 * @param {{}} head
 * @returns
 */

function hasCycle(head) {
    let count = 1;
    while (head && !head.count) {
        head.count = count;
        count++;
        head = head.next;
    }
    if (head) {
        return head.count - 1 > -1;
    }
    return false;
}

/**
 * K个一组翻转链表
 */
function reverseKGroup(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;
    let cur = head;
    let n = 0;
    let count;
    while (cur) {
        cur = cur.next;
        n++;
    }
    count = Math.floor(n / k);
    while (count) {
        let tail = pre;
        for (let i = 0; i < k; i++) {
            tail = tail.next;
        }
        const next = tail.next;
        [head, tail] = reverseList(head, tail);
        if (count === Math.floor(n / k)) {
            hair.next = tail;
        }
        pre.next = head;
        tail.next = next;
        pre = tail;
        head = tail.next;
        count--;
    }
    return hair.next;
}

// 进行链表翻转，参考翻转链表函数，进行k - 1次旋转
function reverseList(head, tail) {
    let prev = tail.next;
    let cur = head;
    while (prev !== tail) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return [tail, head];
}

/**
 * 只出现一次的数
 */
function singleNumber(nums) {
    let result;
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const exist = map.has(nums[i]);
        if (!exist) {
            map.set(nums[i], 1);
        } else {
            map.set(nums[i], 3);
        }
    }
    for (let item of map.keys()) {
        let count = map.get(item);
        if (count === 1) {
            result = item;
            break;
        }
    }
    return result;
}
