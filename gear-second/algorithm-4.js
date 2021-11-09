/**
 *  平衡二叉树
 */
function isBalanced(root) {
    if (!root) {
        return true;
    }
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    return (
        Math.abs(left - right) <= 1 &&
        isBalanced(root.left) &&
        isBalanced(root.right)
    );
}

/**
 * 二叉树的深度
 */
function maxDepth(root) {
    if (!root) {
        return 0;
    } else {
        let left = maxDepth(root.left);
        let right = maxDepth(root.right);
        return 1 + Math.max(left, right);
    }
}

/**
 * 搜索插入位置
 */
function searchInsert(nums, target) {
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
}

/**
 * 罗马数字转整数
 */
function romanToInt(s) {
    const symbolValues = new Map();
    symbolValues.set("I", 1);
    symbolValues.set("V", 5);
    symbolValues.set("X", 10);
    symbolValues.set("L", 50);
    symbolValues.set("C", 100);
    symbolValues.set("D", 500);
    symbolValues.set("M", 1000);
    let ans = 0;
    const n = s.length;
    for (let i = 0; i < n; ++i) {
        const value = symbolValues.get(s[i]);
        if (i < n - 1 && value < symbolValues.get(s[i + 1])) {
            ans -= value;
        } else {
            ans += value;
        }
    }
    return ans;
}

/**
 * 反转字符串
 */
function reverseString(s) {
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
}
