/**
 *  平方数之和
 */
function judgeSquareSum(c) {
    let temp = Math.floor(Math.sqrt(c));
    if (temp * temp === c) {
        return true;
    }
    while (temp > 0) {
        let del = c - temp * temp;
        let sqr = Math.sqrt(del);
        if (Math.floor(sqr) * Math.floor(sqr) === del) {
            return true;
        } else {
            temp--;
        }
    }
    return false;
}

/**
 * 二路归并排序
 */
function sortArray(nums) {
    mergeSort(nums, 0, nums.length - 1);
    return nums;
}

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
 * 二分查找
 */
function search(nums, target) {
    let left = 0,
        right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((right - left) / 2) + left;
        if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}

/**
 * 哈希_两数之和
 */
function twoSum(nums, target) {
    let map = new Map();
    let delNum;
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    for (let j = 0; j < nums.length; j++) {
        delNum = target - nums[j];
        let judge = map.get(delNum);
        if (judge > -1 && judge !== j) {
            return [j, map.get(delNum)];
        }
    }
}

/**
 *
 */
function lengthOfLIS(nums) {
    let dp = Array(nums.length).fill(1);
    let result = 1;
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        result = Math.max(result, dp[i]);
    }
    return result;
}
