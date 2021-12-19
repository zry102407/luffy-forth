/**
 * 数组中的第K个最大元素
 */
var findKthLargest = function (nums, k) {
    nums.sort((a, b) => a - b);
    return nums[nums.length - k];
};

/**
 * 设计推特
 */
let time = 0; //维护一个全局的time,  试了 每次创建tweet的时候维护一个this.time = Date.now()不可行;
var Twitter = function () {
    //所有的用户；
    this.userMap = new Map();
};
Twitter.prototype.postTweet = function (userId, tweetId) {
    //1.查看用户是否建立
    if (!this.userMap.has(userId)) {
        this.userMap.set(userId, new User(userId));
    }
    //2. 新建一条post;
    this.userMap.set(userId, this.userMap.get(userId).post(tweetId));
};
Twitter.prototype.getNewsFeed = function (userId) {
    //1.查看用户是否建立
    if (!this.userMap.has(userId)) {
        return [];
    }
    //合并k个链表 前10条
    let user = this.userMap.get(userId);
    //声明一个大根堆
    let heap = new BinaryHeap();
    //以time为比较的依据
    //添加自己的推文
    if (user.tweet != null) {
        heap.push({ val: user.tweet.time, listNode: user.tweet });
    }
    //如果有关注者
    for (let followeeId of user.followee.values()) {
        if (this.userMap.get(followeeId)) {
            let tweet = this.userMap.get(followeeId).tweet;
            //qi'y
            if (tweet != null) {
                heap.push({ val: tweet.time, listNode: tweet });
            }
        }
    }
    let ans = [];
    while (!heap.isEmpty()) {
        let node = heap.pop();
        //先存储当前的值;
        ans.push(node.listNode.id);
        if (ans.length == 10) {
            return ans;
        }
        //添加下一个到堆；
        let nextNode = node.listNode.next;
        if (nextNode != null) {
            heap.push({ val: nextNode.time, listNode: nextNode });
        }
    }
    return ans;
};
Twitter.prototype.follow = function (followerId, followeeId) {
    //1.查看用户是否建立
    if (!this.userMap.has(followerId)) {
        this.userMap.set(followerId, new User(followerId));
    }
    //1.查看关注者是否建立
    if (!this.userMap.has(followeeId)) {
        this.userMap.set(followeeId, new User(followeeId));
    }
    this.userMap.set(
        followerId,
        this.userMap.get(followerId).follow(followeeId)
    );
};
Twitter.prototype.unfollow = function (followerId, followeeId) {
    //1.查看用户是否建立
    if (!this.userMap.has(followerId)) {
        this.userMap.set(followerId, new User(followerId));
    }
    this.userMap.set(
        followerId,
        this.userMap.get(followerId).unfollow(followeeId)
    );
};
//推文
function Tweet(id) {
    this.id = id;
    //this.time = Date.now();
    this.time = time;
    this.next = null;
}
//用户类
function User(id) {
    this.id = id;
    this.tweet = null; //推文放在链表；
    this.followee = new Set(); //关注者，放hashSet; 方便删除查找
    this.follow = (followeeId) => {
        //不能关注自己
        if (followeeId != this.id) {
            this.followee.add(followeeId);
        }
        return this;
    };
    this.unfollow = function unfollow(followeeId) {
        //不能取关自己
        if (this.followee.has(followeeId) && followeeId != this.id) {
            this.followee.delete(followeeId);
        }
        return this;
    };
    //发表文章
    this.post = function post(tweetId) {
        //插入到链表的头部
        time += 1;
        let tweet = new Tweet(tweetId);
        tweet.next = this.tweet;
        this.tweet = tweet;
        return this;
    };
}

//大二根堆；
class BinaryHeap {
    constructor() {
        //数组存储完全二叉树；
        //从索引0开始；
        this.heap = [];
    }
    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    isEmpty() {
        return this.heap.length == 0;
    }
    top() {
        return this.heap[0];
    }
    push(node) {
        //插入尾部；向上跟父节点做交换，直到满足堆性质；
        this.heap.push(node);
        //从最后一个索引开始；
        this.heapifyUp(this.heap.length - 1);
    }
    pop() {
        //删除堆顶1.头尾元素交换，2.删除尾部，3.此时不满足堆性质，所以向下跟子元素做交换；
        let res = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();

        this.heapifyDown(0);
        //返回被删除的元素；
        return res;
    }
    heapifyUp(p) {
        //1.一直向上做交换，直到根节点或者大于父节点（小根堆）2.父节点为(p-1)>>1 右位移一位
        while (p > 0) {
            let fa = (p - 1) >> 1; //father的索引

            if (this.heap[p].val > this.heap[fa].val) {
                this.swap(p, fa);
                p = fa;
            } else break;
        }
    }
    heapifyDown(p) {
        //1. 左子节点索引p*2+1, 右子节点p*2+2;
        //2. 小根堆，对比子节点小的作交换；
        let child = p * 2 + 1;
        let len = this.heap.length;
        //出界停止；
        while (child < len) {
            let otherChild = p * 2 + 2;
            //比较当前的两个节点；
            if (
                otherChild < len &&
                this.heap[otherChild].val > this.heap[child].val
            ) {
                child = otherChild;
            }
            if (this.heap[p].val < this.heap[child].val) {
                this.swap(p, child);
                p = child;
                child = p * 2 + 1;
            } else break;
        }
    }
}

/**
 * 前K个高频单词
 */
var topKFrequent = function (words, k) {
    let map = new Map();
    for (let i = 0; i < words.length; i++) {
        const item = words[i];
        let count = map.get(item);
        if (count) {
            map.set(item, ++count);
        } else {
            map.set(item, 1);
        }
    }
    let result = [];
    map.forEach((value, key) => {
        result.push(key);
    });
    result.sort((a, b) => map.get(b) - map.get(a) || a.localeCompare(b));
    return result.splice(0, k);
};

/**
 * 连续中值
 */
var MedianFinder = function () {
    this.list = [];
    this.length = 0;
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    for (let i = 0; i < this.length; i++) {
        if (num <= this.list[i]) {
            this.list.splice(i, 0, num);
            break;
        } else if (i === this.length - 1) {
            this.list.push(num);
        }
    }
    if (this.length === 0) {
        this.list.push(num);
    }
    this.length++;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    if (this.length % 2) {
        return this.list[(this.length - 1) / 2];
    } else {
        let mid = this.length / 2;
        return (this.list[mid] + this.list[mid - 1]) / 2;
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

/**
 * 数据流的中位数
 */
var MedianFinder = function () {
    this.maxHeap = new Heap(Heap.maxComparator);
    this.minHeap = new Heap(Heap.minComparator);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    const peek = this.maxHeap.peek();
    if (peek === null || num < peek) {
        this.maxHeap.add(num);
    } else {
        this.minHeap.add(num);
    }

    if (this.maxHeap.size - this.minHeap.size > 1) {
        this.minHeap.add(this.maxHeap.poll());
    } else if (this.minHeap.size - this.maxHeap.size > 1) {
        this.maxHeap.add(this.minHeap.poll());
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    if (this.maxHeap.size > this.minHeap.size) {
        return this.maxHeap.peek();
    } else if (this.maxHeap.size < this.minHeap.size) {
        return this.minHeap.peek();
    } else {
        return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
};

class Heap {
    constructor(comparator) {
        this.size = 0;
        this.value = [];
        this.comparator = comparator || Heap.minComparator;
    }

    add(val) {
        this.value.push(val);
        this.size++;
        this.bubbleUp();
    }

    peek() {
        return this.value[0] || null;
    }

    poll() {
        const max = this.value[0];
        const end = this.value.pop();
        this.size--;
        if (this.value.length) {
            this.value[0] = end;
            this.bubbleDown();
        }
        return max;
    }

    bubbleUp() {
        let index = this.value.length - 1;
        let parent = Math.floor((index - 1) / 2);
        while (this.comparator(this.value[index], this.value[parent]) < 0) {
            this.swap(this.value, index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    bubbleDown() {
        let i = 0,
            length = this.value.length;
        const arr = this.value;
        let temp = arr[i];
        for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
            temp = arr[i];
            if (j + 1 < length && this.comparator(arr[j + 1], arr[j]) < 0) {
                j++;
            }

            if (this.comparator(arr[j], arr[i]) < 0) {
                this.swap(arr, i, j);
                i = j;
            } else {
                break;
            }
        }
    }

    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

Heap.minComparator = (a, b) => a - b;

Heap.maxComparator = (a, b) => b - a;

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
