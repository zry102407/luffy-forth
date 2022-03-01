/**
 * Sqrt(x)
 */
var mySqrt = function (x) {
    let high = x,
        low = 0,
        ans = -1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (mid * mid <= x) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
};

/**
 * 搜索插入位置
 */
var searchInsert = function (nums, target) {
    const n = nums.length;
    let left = 0,
        right = n - 1,
        ans = n;
    while (left <= right) {
        let mid = ((right - left) >> 1) + left;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

/**
 * 两数之和
 */
var twoSum = function (nums, target) {
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
};
