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

/**
 * 子数组和排序后的区间和
 */
var rangeSum = function (nums, n, left, right) {
    let newArray = [],
        sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            newArray.push(sum);
        }
    }
    newArray.sort((a, b) => a - b);
    let result = 0;
    for (let i = left - 1; i < right; i++) {
        result = (result + newArray[i]) % 1000000007;
    }
    return result;
};

/**
 * 区间和的个数
 */
var countRangeSum = function (nums, lower, upper) {
    let s = 0;
    const sum = [0];
    for (const v of nums) {
        s += v;
        sum.push(s);
    }
    return countRangeSumRecursive(sum, lower, upper, 0, sum.length - 1);
};
const countRangeSumRecursive = (sum, lower, upper, left, right) => {
    if (left === right) {
        return 0;
    } else {
        const mid = Math.floor((left + right) / 2);
        const n1 = countRangeSumRecursive(sum, lower, upper, left, mid);
        const n2 = countRangeSumRecursive(sum, lower, upper, mid + 1, right);
        let ret = n1 + n2;

        // 首先统计下标对的数量
        let i = left;
        let l = mid + 1;
        let r = mid + 1;
        while (i <= mid) {
            while (l <= right && sum[l] - sum[i] < lower) l++;
            while (r <= right && sum[r] - sum[i] <= upper) r++;
            ret += r - l;
            i++;
        }

        // 随后合并两个排序数组
        const sorted = new Array(right - left + 1);
        let p1 = left,
            p2 = mid + 1;
        let p = 0;
        while (p1 <= mid || p2 <= right) {
            if (p1 > mid) {
                sorted[p++] = sum[p2++];
            } else if (p2 > right) {
                sorted[p++] = sum[p1++];
            } else {
                if (sum[p1] < sum[p2]) {
                    sorted[p++] = sum[p1++];
                } else {
                    sorted[p++] = sum[p2++];
                }
            }
        }
        for (let i = 0; i < sorted.length; i++) {
            sum[left + i] = sorted[i];
        }
        return ret;
    }
};

/**
 * 计算右侧小于当前元素的个数
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
    function merge_sort(arr, l, r) {
        if (l == r) return;
        let mid = (l + r) >> 1;
        merge_sort(arr, l, mid);
        merge_sort(arr, mid + 1, r);
        let p1 = l,
            p2 = mid + 1,
            k = l;
        while (p1 <= mid || p2 <= r) {
            // 进行降序排序
            if (p2 > r || (p1 <= mid && arr[p1] > arr[p2])) {
                tmp[k] = arr[p1];
                // 左区间数字大于右区间数字时，由于右区间为降序，所以后面的p2~r位置的数字都小于t位置的数字
                // 获取到数字在原始数组中的下标
                let t = index[p1++];
                // 更新合并后数字的下标
                tmpIndex[k] = t;
                // 更新数字 当前右侧小于它的元素个数
                res[t] += r - p2 + 1;
            } else {
                tmp[k] = arr[p2];
                tmpIndex[k] = index[p2++];
            }
            k++;
        }
        for (let i = l; i <= r; i++) {
            index[i] = tmpIndex[i];
            arr[i] = tmp[i];
        }
    }
    let index = Array(nums.length)
        .fill()
        .map((_, ind) => ind); // 记录本地合并后数字的位置
    let tmpIndex = Array(nums.length).fill(0); // 记录上次合并后数字的位置
    // 使用需要原数组相同长度的存储空间来存放排序好的序列
    let tmp = Array(nums.length).fill(0);
    let res = Array(nums.length).fill(0); // 结果数组
    merge_sort(nums, 0, nums.length - 1);
    return res;
};

/**
 * 层数最深叶子节点的和
 */
var deepestLeavesSum = function (root) {
    if (root == null) return 0;
    let queue = [root];
    let sum = 0;
    while (queue.length) {
        sum = 0;
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let cur = queue.shift();
            sum += cur.val;
            if (cur.left) queue.push(cur.left);
            if (cur.right) queue.push(cur.right);
        }
    }
    // 现在就是最后一层的节点值和
    return sum;
};
