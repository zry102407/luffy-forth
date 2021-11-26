/**
 * 最长公共子序列
 */
var longestCommonSubsequence = function (text1, text2) {
    let n = text1.length,
        m = text2.length;
    let dp = new Array(n + 1).fill(0).map((item) => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return dp[n][m];
};

/**
 * 买卖股票的最佳时机
 */
var maxProfit = function (prices) {
    let n = prices.length;
    let minPrice = prices[0];
    let dp = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }
    return dp[n - 1];
};

/**
 * 最小花费爬楼梯
 */
var minCostClimbingStairs = function (cost) {
    let n = cost.length;
    let dp = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (i < 2) {
            dp[i] = cost[i];
        } else {
            dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
        }
    }
    return Math.min(dp[n - 2], dp[n - 1]);
};

/**
 * 翻转树
 */
var invertTree = function (root) {
    if (!root) {
        return root;
    }
    let left = invertTree(root.right);
    let right = invertTree(root.left);
    root.left = left;
    root.right = right;
    return root;
};

/**
 * 回文子串
 */
var countSubstrings = function (s) {
    let n = s.length;
    let dp = new Array(n).fill(0).map((item) => new Array(n).fill(0));
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (s[i] === s[j] && (i - j < 2 || dp[j + 1][i - 1])) {
                dp[j][i] = true;
                ans++;
            }
        }
    }
    return ans;
};
