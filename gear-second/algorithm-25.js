/**
 * 冗余链接II
 */
var findRedundantDirectedConnection = function (edges) {
    const N = edges.length + 10;

    const indegrees = [];
    for (let [start, end] of edges) {
        indegrees[end] = (indegrees[end] || 0) + 1;
    }
    let endNode = null;
    let cand1 = null;
    let cand2 = null;
    for (let i = 0; i < indegrees.length; i++) {
        if (indegrees[i] === 2) {
            endNode = i;
            break;
        }
    }
    if (endNode) {
        for (let edge of edges) {
            const [start, end] = edge;
            if (end !== endNode) continue;
            if (cand1 === null) cand1 = [start, end];
            else cand2 = [start, end];
            edge[1] = null; // 为了让这两条边最后union
        }
    }

    class UF {
        constructor(size) {
            this.parent = new Array(size).fill(-1);
            this.size = new Array(size).fill(1);
        }
        findRoot(i) {
            while (this.parent[i] !== -1) i = this.parent[i];
            return i;
        }
        union(i, j) {
            const iRoot = this.findRoot(i);
            const jRoot = this.findRoot(j);
            if (iRoot === jRoot) return [i, j];
            if (this.size[iRoot] > this.size[jRoot]) {
                this.parent[jRoot] = iRoot;
                this.size[iRoot] += this.size[jRoot];
            } else {
                this.parent[iRoot] = jRoot;
                this.size[jRoot] += this.size[iRoot];
            }
        }
    }

    const uf = new UF(N);
    for (let [start, end] of edges) {
        if (end == null) continue;
        const t = uf.union(start, end);
        if (t) return t; // 情况2 会在这里输出
    }
    if (endNode) {
        // 情况1 会在这里输出
        const t1 = uf.union(cand1[0], cand1[1]);
        if (t1) return t1;
        const t2 = uf.union(cand2[0], cand2[1]);
        if (t2) return t2;
    }

    return cand2; // 情况3 会在这里输出
};

/**
 * 滑动窗口最大值
 */
var maxSlidingWindow = function (nums, k) {
    const n = nums.length;
    const q = [];
    for (let i = 0; i < k; i++) {
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
    }

    const ans = [nums[q[0]]];
    for (let i = k; i < n; i++) {
        while (q.length && nums[i] >= nums[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
        while (q[0] <= i - k) {
            q.shift();
        }
        ans.push(nums[q[0]]);
    }
    return ans;
};

/**
 * 用Rand7()实现Rand10()
 */
var rand10 = function () {
    var a, b, idx;
    while (true) {
        a = rand7();
        b = rand7();
        idx = b + (a - 1) * 7;
        if (idx <= 40) {
            return 1 + ((idx - 1) % 10);
        }
        a = idx - 40;
        b = rand7();
        // get uniform dist from 1 - 63
        idx = b + (a - 1) * 7;
        if (idx <= 60) {
            return 1 + ((idx - 1) % 10);
        }
        a = idx - 60;
        b = rand7();
        // get uniform dist from 1 - 21
        idx = b + (a - 1) * 7;
        if (idx <= 20) {
            return 1 + ((idx - 1) % 10);
        }
    }
};

/**
 * 盛最多水的容器
 */
var maxArea = function (height) {
    if (height == null) {
        return 0;
    }
    // 左边界
    let left = 0,
        // 右边界
        right = height.length - 1;
    let result = 0;
    while (left < right) {
        // 左右边界当中的最小值
        let minVal = Math.min(height[left], height[right]);
        // 结果取决于最小值和宽度
        result = Math.max(
            result,
            // [left, right] 之间的矩形面积
            minVal * (right - left)
        );
        if (height[left] <= height[right]) {
            // 如果左边界小则移动左边界向中间靠拢，双指针技巧，移动较低的一边
            left++;
        } else {
            right--;
        }
    }
    return result;
};

/**
 * 字符串解码
 */
var decodeString = function (s) {
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "]") {
            let tmp = stack.pop();
            let str = "";
            while (tmp !== "[") {
                str = tmp + str;
                tmp = stack.pop();
            }
            let count = stack.pop();
            let tmpStr = "";
            while (count--) {
                tmpStr += str;
            }
            stack.push(tmpStr);
        } else {
            if (isNaN(Number(s[i]))) {
                stack.push(s[i]);
            } else {
                stack.push(s[i]);
                while (!isNaN(Number(s[i + 1]))) {
                    let count = stack.pop() || "";
                    stack.push(count + s[i + 1]);
                    i++;
                }
            }
        }
    }
    return stack.join("");
};
