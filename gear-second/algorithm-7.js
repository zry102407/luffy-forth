/**
 * 桶排序
 */
function topKFrequent(nums, k) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            let count = map.get(nums[i]) + 1;
            map.set(nums[i], count);
        } else {
            map.set(nums[i], 1);
        }
    }
    let result = [];
    for (let key of map.keys()) {
        result.push(key);
    }
    result.sort((a, b) => map.get(b) - map.get(a));
    let ans = [];
    for (let i = 0; i < k; i++) {
        ans.push(result[i]);
    }
    return ans;
}
/**
 *  快乐数
 */
var isHappy = function (n) {
    let map = new Map();
    while (n !== 1) {
        const judge = map.has(n);
        if (judge) {
            return false;
        }
        let copyN = n;
        let tmp = 0;
        while (copyN > 0) {
            const remain = copyN % 10;
            tmp += remain * remain;
            copyN = Math.floor(copyN / 10);
        }
        map.set(n, 1);
        n = tmp;
    }
    return true;
};
/**
 * 两节点的最长路径
 */
var diameterOfBinaryTree = function (root) {
    let ans = 1;
    function depth(rootNode) {
        if (!rootNode) {
            return 0;
        }
        let left = depth(rootNode.left);
        let right = depth(rootNode.right);
        ans = Math.max(left + right + 1, ans);
        return Math.max(left, right) + 1;
    }
    depth(root);
    return ans - 1;
};

/**
 *  有效的字母异位词
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false;
    }
    let mapS = new Map(),
        mapT = new Map();
    for (let i = 0; i < s.length; i++) {
        if (mapS.has(s[i])) {
            const tempS = mapS.get(s[i]) + 1;
            mapS.set(s[i], tempS);
        } else {
            mapS.set(s[i], 1);
        }
        if (mapT.has(t[i])) {
            const tempT = mapT.get(t[i]) + 1;
            mapT.set(t[i], tempT);
        } else {
            mapT.set(t[i], 1);
        }
    }
    for (let key of mapS.keys()) {
        if (mapS.get(key) !== mapT.get(key)) {
            return false;
        }
    }
    return true;
};

/**
 * 计算一组字符集合可以组成的回文字符串的最大长度
 */
function longestPalindrome(s) {
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            const count = map.get(s[i]) + 1;
            map.set(s[i], count);
        } else {
            map.set(s[i], 1);
        }
    }
    let result = 0;
    let keys = map.keys();
    for (let key of keys) {
        if (map.get(key) > 1) {
            result += 2 * Math.floor(map.get(key) / 2);
        }
    }
    for (let key of map.keys()) {
        if (map.get(key) % 2 === 1) {
            result++;
            return result;
        }
    }
    return result;
}
