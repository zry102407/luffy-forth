/**
 * 课程表
 */
const canFinish = (numCourses, prerequisites) => {
    const inDegree = new Array(numCourses).fill(0); // 入度数组
    const map = {}; // 邻接表
    for (let i = 0; i < prerequisites.length; i++) {
        inDegree[prerequisites[i][0]]++; // 求课的初始入度值
        if (map[prerequisites[i][1]]) {
            // 当前课已经存在于邻接表
            map[prerequisites[i][1]].push(prerequisites[i][0]); // 添加依赖它的后续课
        } else {
            // 当前课不存在于邻接表
            map[prerequisites[i][1]] = [prerequisites[i][0]];
        }
    }
    const queue = [];
    for (let i = 0; i < inDegree.length; i++) {
        // 所有入度为0的课入列
        if (inDegree[i] == 0) queue.push(i);
    }
    let count = 0;
    while (queue.length) {
        const selected = queue.shift(); // 当前选的课，出列
        count++; // 选课数+1
        const toEnQueue = map[selected]; // 获取这门课对应的后续课
        if (toEnQueue && toEnQueue.length) {
            // 确实有后续课
            for (let i = 0; i < toEnQueue.length; i++) {
                inDegree[toEnQueue[i]]--; // 依赖它的后续课的入度-1
                if (inDegree[toEnQueue[i]] == 0) {
                    // 如果因此减为0，入列
                    queue.push(toEnQueue[i]);
                }
            }
        }
    }
    return count == numCourses; // 选了的课等于总课数，true，否则false
};

/**
 * 课程表II
 */
var findOrder = function (numCourses, prerequisites) {
    const buildGraph = (numCourses, prerequisites) => {
        // 图中共有 numCourses 个节点
        let graph = new Array(numCourses).fill(0).map(() => new Array());
        for (let edge of prerequisites) {
            let from = edge[1],
                to = edge[0];
            // 修完课程from才能修课程to  在图中添加一条从from指向to的有向边
            graph[from].push(to);
        }
        return graph;
    };
    // 记录后序遍历结果
    let res = [];
    // 记录是否存在环
    let hasCycle = false;
    let visited = new Array(numCourses).fill(false),
        onPath = new Array(numCourses).fill(false);
    let graph = buildGraph(numCourses, prerequisites);
    // 从节点 s 开始 DFS 遍历，将遍历过的节点标记为 true
    const traverse = (graph, s) => {
        // 出现环
        if (onPath[s]) hasCycle = true;
        // 如果已经找到了环，也不用再遍历了
        if (visited[s] || hasCycle) return;
        visited[s] = true;
        onPath[s] = true;
        for (let t of graph[s]) {
            traverse(graph, t);
        }
        onPath[s] = false;
        // 后序遍历计算拓扑排序
        res.push(s);
    };
    // 遍历图
    for (let i = 0; i < numCourses; i++) {
        traverse(graph, i);
    }
    // 有环图无法进行拓扑排序
    if (hasCycle) {
        return [];
    }
    // 计算后序遍历的逆序，逆序遍历结果即为拓扑排序结果
    return res.reverse();
};

/**
 * 数组的相对排序
 */
var relativeSortArray = function (arr1, arr2) {
    let left = [],
        right = [];
    let map = new Map();
    for (let i = 0; i < arr2.length; i++) {
        map.set(arr2[i], i);
    }
    for (let i = 0; i < arr1.length; i++) {
        if (map.has(arr1[i])) {
            left.push(arr1[i]);
        } else {
            right.push(arr1[i]);
        }
    }
    right.sort((a, b) => a - b);
    left.sort((a, b) => map.get(a) - map.get(b));
    return left.concat(right);
};

/**
 * 最大间距
 */
var maximumGap = function (nums) {
    nums.sort((a, b) => a - b);
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0) {
            result = Math.max(result, nums[i] - nums[i - 1]);
        }
    }
    return result;
};

/**
 * H指数
 */
var hIndex = function (citations) {
    citations.sort((a, b) => a - b);
    let h = 0,
        i = citations.length - 1;
    while (i >= 0 && citations[i] > h) {
        h++;
        i--;
    }
    return h;
};
