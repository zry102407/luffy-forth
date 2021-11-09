/**
 *  反转链表
 */
function reverseList(head) {
    let prev = null;
    let cur = head;
    while (cur) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}

/**
 * 链表相交
 */
function intersectionList(headA, headB) {
    let pA = headA,
        pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
}

/**
 *  旋转链表
 */
function rotateList(head, k) {
    if (k === 0 || !head || !head.next) {
        return head;
    }
    let n = 1;
    let cur = head;
    while (cur.next) {
        cur = cur.next;
        n++;
    }

    let add = n - (k % n);
    if (add === n) {
        return head;
    }

    cur.next = head;
    while (add) {
        cur = cur.next;
        add--;
    }

    const ret = cur.next;
    cur.next = null;
    return ret;
}

/**
 *  数据流中的第K大元素
 */
function KthLargest() {
    this.list = [];
    this.k = k;
    nums.sort((a, b) => a - b);
    for (let i = nums.length - 1; i > nums.length - 1 - k && i >= 0; i--) {
        this.list.push(nums[i]);
    }
    return null;
}
KthLargest.prototype.add = function (val) {
    if (this.list.length === 0) {
        this.list.push(val);
    } else if (this.list.length < this.k) {
        poll(this.list, val, this.k);
    } else if (val >= this.list[0]) {
        this.list.unshift(val);
        this.list.pop();
    } else if (val > this.list[this.list.length - 1]) {
        poll(this.list, val, this.k);
    }
    return this.list[this.k - 1] || null;
};

function poll(list, val, k) {
    let temp = val;
    let i;
    if (list.length < k) {
        list.push(val);
        list.sort((a, b) => b - a);
        return;
    }
    for (i = list.length - 1; i >= 0; i--) {
        if (list[i] >= temp) {
            list[i + 1] = temp;
            break;
        } else {
            list[i] = list[i - 1];
        }
    }
}

/**
 *  反转二叉树
 */
function invertTree(root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}
