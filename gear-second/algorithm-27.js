/**
 * 排序数组
 */
var sortArray = function (nums) {
    mergeSort(nums, 0, nums.length - 1);
    return nums;
};

function mergeSort(nums, left, right) {
    if (left >= right) return;
    const mid = Math.floor((right + left) / 2);
    mergeSort(nums, left, mid);
    mergeSort(nums, mid + 1, right);
    const tmp = [];
    let i = left,
        j = mid + 1;
    let count = 0;
    while (i <= mid && j <= right) {
        if (nums[i] <= nums[j]) {
            tmp[count++] = nums[i++];
        } else {
            tmp[count++] = nums[j++];
        }
    }
    while (i <= mid) {
        tmp[count++] = nums[i++];
    }
    while (j <= right) {
        tmp[count++] = nums[j++];
    }
    for (let k = 0; k < right - left + 1; ++k) {
        nums[left + k] = tmp[k];
    }
}
/**
 * 数组中的逆序对
 */
const reversePairs = (nums) => {
    // 记录逆序
    let count = 0;
    // 归并排序
    const mergeSort = (arr) => {
        // arr为一个值直接返回
        if (arr.length < 2) return arr;
        // 长度为2排序返回
        if (arr.length === 2) {
            if (arr[0] <= arr[1]) return arr;
            // 记录逆序
            count++;
            return [arr[1], arr[0]];
        }
        // 获取二分位置
        const mid = arr.length >> 1;
        // 将左边部分排序
        const left = mergeSort(arr.slice(0, mid));
        // 将右边部分排序
        const right = mergeSort(arr.slice(mid));
        // 保存结果
        const res = [];
        // 两组的起始指针位置
        let [leftIndex, rightIndex] = [0, 0];
        // 循环直到两边遍历完
        while (leftIndex < left.length || rightIndex < right.length) {
            // left结束
            if (leftIndex >= left.length) {
                // 将剩余right添加到res
                res.push.apply(res, right.slice(rightIndex));
                // 跳出循环
                break;
            }
            // right结束
            if (rightIndex >= right.length) {
                // 将剩余left添加到res
                res.push.apply(res, left.slice(leftIndex));
                // 跳出循环
                break;
            }
            // 左值小
            if (left[leftIndex] <= right[rightIndex]) {
                // 将左值push
                res.push(left[leftIndex]);
                // 左下标右移
                leftIndex++;
            } else {
                //右值小
                // 将右值push
                res.push(right[rightIndex]);
                // 右下标右移
                rightIndex++;
                // 记录逆序(因为left是有序的，所以leftIndex开始都存在逆序)
                count += left.length - leftIndex;
            }
        }
        // 返回有序数组
        return res;
    };
    mergeSort(nums);
    return count;
};

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

/**
 * 首个共同祖先
 */
var lowestCommonAncestor = function (root, p, q) {
    let ans;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if (
            (lson && rson) ||
            ((root.val === p.val || root.val === q.val) && (lson || rson))
        ) {
            ans = root;
        }
        return lson || rson || root.val === p.val || root.val === q.val;
    };
    dfs(root, p, q);
    return ans;
};
