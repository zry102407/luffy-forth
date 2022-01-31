/**
 * 最大子序和
 */
var maxSubArray = function (nums) {
    let pre = 0,
        max = nums[0];
    nums.forEach((item) => {
        pre = Math.max(pre + item, item);
        max = Math.max(max, pre);
    });
    return max;
};

/**
 * 合并区间
 */
var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let res = [];
    for (let i = 0; i < intervals.length; i++) {
        let start = intervals[i][0];
        let cur = intervals[i][1];
        while (i < intervals.length - 1 && cur >= intervals[i + 1][0]) {
            cur = Math.max(intervals[i + 1][1], cur);
            i++;
        }
        res.push([start, cur]);
    }
    return res;
};

/**
 * 删除被覆盖区间
 */
var removeCoveredIntervals = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    for (let i = 0; i < intervals.length; i++) {
        for (let j = i + 1; j < intervals.length; j++) {
            if (intervals[j][1] <= intervals[i][1]) {
                intervals[j] = [];
            }
        }
    }
    intervals = intervals.filter((item) => item.length);
    return intervals.length;
};

/**
 * 递增子序列
 */
var findSubsequences = function (nums) {
    const res = [];
    const len = nums.length;

    const dfs = (start, path) => {
        if (start == len) {
            // 递归的出口，指针已经越界
            if (path.length >= 2) {
                // path长度大于等于2
                res.push(path.slice()); // 加入解集
                return;
            }
        }
        path.push(nums[start]); // 进行选择
        for (let i = start + 1; i <= len; i++) {
            //枚举出选项，从start+1到len都可以选
            const prev = nums[start]; // 递归树中上一层的选择
            const cur = nums[i]; // 当前的选择
            if (i < len && cur == prev) {
                // i还没越界，且当前选择和上一层的选择相同
                dfs(i, path); // 递归完当前选择，就break，避免i自增，导致i==len
                break; // 从而避免导致执行else if里的逻辑，导致start==len
                // 导致来递归的出口，path推入res
            } else if (i == len || prev < cur) {
                // i==len越界，让它落入递归，在递归的出口中return
                dfs(i, path); // 或prev < cur，满足条件，往下递归
            }
        }
        path.pop(); // 撤销选择
    };
    for (let i = 0; i < len; i++) {
        dfs(i, []);
    }
    return res;
};

/**
 * 求和路径
 */
var pathSum = function (root, sum) {
    if (!root) return 0;
    return pathSum(root.left, sum) + pathSum(root.right, sum) + dfs(root, sum);
};

var dfs = function (root, sum) {
    if (!root) return 0;
    if (root.val === sum) {
        return (
            1 + dfs(root.left, sum - root.val) + dfs(root.right, sum - root.val)
        );
    }
    return dfs(root.left, sum - root.val) + dfs(root.right, sum - root.val);
};
