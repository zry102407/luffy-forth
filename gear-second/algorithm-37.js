/**
 * 旋转数组的最小数字
 */
var minArray = function (numbers) {
    let l = 0,
        r = numbers.length - 1;
    while (l < r) {
        let mid = Math.floor((l + r) / 2);
        if (numbers[mid] > numbers[r]) {
            l = Math.ceil((l + r) / 2);
        } else if (numbers[mid] < numbers[r]) {
            r = mid;
        } else {
            r--;
        }
    }
    return numbers[r];
};

/**
 * 找到K个最近的元素
 */
var findClosestElements = function (arr, k, x) {
    let result = [];
    let minAbsIndex,
        minAbs = Number.MAX_SAFE_INTEGER;
    arr.forEach((item, index) => {
        const newAbs = Math.abs(item - x);
        if (newAbs < minAbs) {
            minAbsIndex = index;
            minAbs = newAbs;
        }
    });
    if (result.length < k) {
        result.push(arr[minAbsIndex]);
    }
    let l = minAbsIndex - 1,
        r = minAbsIndex + 1;
    while (result.length < k) {
        if (arr[l] !== undefined && arr[r] !== undefined) {
            const absl = Math.abs(arr[l] - x),
                absr = Math.abs(arr[r] - x);
            if (absl <= absr) {
                result.unshift(arr[l]);
                l--;
            } else {
                result.push(arr[r]);
                r++;
            }
        } else if (arr[l] !== undefined) {
            result.unshift(arr[l]);
            l--;
        } else if (arr[r] !== undefined) {
            result.push(arr[r]);
            r++;
        }
    }

    return result;
};

/**
 * 分糖果
 */
var distributeCandies = function (candyType) {
    let types = [...new Set(candyType)];
    return Math.min(candyType.length / 2, types.length);
};

/**
 * 保证文件名唯一
 */
var getFolderNames = function (names) {
    const dirDict = {};
    const list = [];
    for (let i = 0; i < names.length; i++) {
        const fileName = names[i];
        if (dirDict[fileName] === undefined) {
            dirDict[fileName] = 1;
            list.push(fileName);
        } else {
            let newFileName = `${fileName}(${dirDict[fileName]++})`;
            while (dirDict[newFileName]) {
                newFileName = `${fileName}(${dirDict[fileName]++})`;
            }
            dirDict[newFileName] = 1;
            list.push(newFileName);
        }
    }

    return list;
};

/**
 * 最小高度树
 */
var findMinHeightTrees = function (n, edges) {
    if (edges.length === 1) return [0, 1];
    const G = new Array(n).fill(0).map(() => []);

    for (const [u, v] of edges) {
        G[u].push(v);
        G[v].push(u);
    }

    const res = [];
    let min = 20000;
    for (let i = 0; i < n; i++) {
        if (G[i].length === 1) {
            res.push(20001); // 剪枝，根不可能是叶节点
        } else {
            const S = new Array(n).fill(0);
            const deep = dfs(G, i, S);
            res.push(deep);
            min = Math.min(min, deep);
        }
    }

    return res.map((v, i) => (v === min ? i : -1)).filter((v) => v > -1);
};

function dfs(G, u, visited) {
    let max = 0;
    visited[u] = 1;
    // 找到最大高度
    for (let i = 0; i < G[u].length; i++) {
        const v = G[u][i];
        let deep = 0;
        if (!visited[v]) {
            deep += dfs(G, v, visited) + 1;
            max = Math.max(max, deep);
        }
    }

    return max;
}
