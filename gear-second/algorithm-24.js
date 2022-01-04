/**
 * 省份数量
 */
var findCircleNum = function (isConnected) {
    const provinces = isConnected.length;
    const visited = new Set();
    let circles = 0;
    for (let i = 0; i < provinces; i++) {
        if (!visited.has(i)) {
            dfs(isConnected, visited, provinces, i);
            circles++;
        }
    }
    return circles;
};

const dfs = (isConnected, visited, provinces, i) => {
    for (let j = 0; j < provinces; j++) {
        if (isConnected[i][j] == 1 && !visited.has(j)) {
            visited.add(j);
            dfs(isConnected, visited, provinces, j);
        }
    }
};

/**
 * 岛屿数量
 */
var numIslands = function (grid) {
    const dfs = (i, j) => {
        // 越界、遇到水，则不访问了
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === "0") return;
        // 访问过的的地方，标记为0
        grid[i][j] = "0";
        // 四个方向继续访问
        dfs(i + 1, j);
        dfs(i, j + 1);
        dfs(i - 1, j);
        dfs(i, j - 1);
    };
    // 矩阵的行、列
    const m = grid.length;
    const n = grid[0].length;
    let res = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 找到矩阵中，为1的地方，开始深度优先遍历
            if (grid[i][j] === "1") {
                dfs(i, j);
                // 每遍历完一整趟，会把相连的所有1，变成0
                // 代表访问完了一个岛屿，res++
                res++;
            }
        }
    }
    return res;
};

/**
 * 等式方程的可满足性
 */
var equationsPossible = (equations) => {
    const uf = new UnionFind(26);
    for (const e of equations) {
        // 将字母对应成数字
        if (e[1] === "=") uf.union(e.charCodeAt(0) - 97, e.charCodeAt(3) - 97);
    }
    for (const e of equations) {
        if (
            e[1] == "!" &&
            uf.findRoot(e.charCodeAt(0) - 97) ==
                uf.findRoot(e.charCodeAt(3) - 97)
        )
            return false;
    }
    return true;
};

class UnionFind {
    constructor(num) {
        // num 顶点个数
        this.roots = new Array(num);
        this.ranks = new Array(num);
        for (let i = 0; i < num; i++) {
            this.roots[i] = -1;
            this.ranks[i] = 0;
        }
    }
    findRoot(x) {
        // 找出顶点x的根节点
        let x_root = x;
        while (this.roots[x_root] !== -1) {
            // 一直找父节点，找到尽头
            x_root = this.roots[x_root];
        }
        return x_root; // 返回根节点
    }
    union(x, y) {
        // 把顶点x和顶点y所在的集合合并到一起
        let x_root = this.findRoot(x);
        let y_root = this.findRoot(y);
        if (x_root === y_root) return;
        let x_rank = this.ranks[x_root];
        let y_rank = this.ranks[y_root];
        if (x_rank < y_rank) {
            // 谁高度大，谁就作为根节点
            this.roots[x_root] = y_root;
        } else if (y_rank < x_rank) {
            this.roots[y_root] = x_root;
        } else {
            // 一样高，谁作为根节点都行
            this.roots[y_root] = x_root;
            this.ranks[x_root]++;
        }
    }
}

/**
 * 冗余连接
 */
var findRedundantConnection = function (edges) {
    const n = edges.length;
    const parent = new Array(n + 1).fill(0).map((value, index) => index);
    for (let i = 0; i < n; i++) {
        const edge = edges[i];
        const node1 = edge[0],
            node2 = edge[1];
        if (find(parent, node1) != find(parent, node2)) {
            union(parent, node1, node2);
        } else {
            return edge;
        }
    }
    return [0];
};

const union = (parent, index1, index2) => {
    parent[find(parent, index1)] = find(parent, index2);
};

const find = (parent, index) => {
    if (parent[index] !== index) {
        parent[index] = find(parent, parent[index]);
    }
    return parent[index];
};

/**
 * 连通网络的操作次数
 */
var makeConnected = function (n, connections) {
    if (connections.length < n - 1) {
        return -1;
    }

    const edges = new Map();
    for (const [x, y] of connections) {
        edges.get(x) ? edges.get(x).push(y) : edges.set(x, [y]);
        edges.get(y) ? edges.get(y).push(x) : edges.set(y, [x]);
    }

    const used = new Array(n).fill(0);

    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (!used[i]) {
            dfs(i, used, edges);
            ans++;
        }
    }
    return ans - 1;
};

const dfs = (u, used, edges) => {
    used[u] = 1;
    if (edges.get(u)) {
        for (const v of edges.get(u)) {
            if (!used[v]) {
                dfs(v, used, edges);
            }
        }
    }
};
