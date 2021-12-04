/**
 * 化栈为队
 */
var MyQueue = function () {
    this.stackIn = [];
    this.stackOut = [];
};

MyQueue.prototype.push = function (x) {
    this.stackIn.push(x);
};

MyQueue.prototype.pop = function () {
    while (this.stackIn.length > 1) {
        this.stackOut.push(this.stackIn.pop());
    }
    let ans = this.stackIn.pop();
    while (this.stackOut.length) {
        this.stackIn.push(this.stackOut.pop());
    }
    return ans;
};

MyQueue.prototype.peek = function () {
    while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop());
    }
    let ans = this.stackOut[this.stackOut.length - 1];
    while (this.stackOut.length) {
        this.stackIn.push(this.stackOut.pop());
    }
    return ans;
};

MyQueue.prototype.empty = function () {
    return !this.stackIn.length && !this.stackOut.length;
};

/**
 * 棒球比赛
 */
var calPoints = function (ops) {
    let goals = [];
    let result = 0;
    for (let i = 0; i < ops.length; i++) {
        const n = goals.length;
        if (ops[i] === "C") {
            goals.pop();
        } else if (ops[i] === "D") {
            goals.push(goals[n - 1] * 2);
        } else if (ops[i] === "+") {
            goals.push(goals[n - 1] + goals[n - 2]);
        } else {
            goals.push(Number(ops[i]));
        }
    }
    for (let i = 0; i < goals.length; i++) {
        result += goals[i];
    }
    return result;
};

/**
 * 比较含退格的字符串
 */
var backspaceCompare = function (s, t) {
    let string1 = [],
        string2 = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "#") {
            if (string1.length) {
                string1.pop();
            }
        } else {
            string1.push(s[i]);
        }
    }
    for (let j = 0; j < t.length; j++) {
        if (t[j] === "#") {
            if (string2.length) {
                string2.pop();
            }
        } else {
            string2.push(t[j]);
        }
    }
    return string1.join("") === string2.join("");
};

/**
 * 证栈序列
 */
var validateStackSequences = function (pushed, popped) {
    let stack = [];
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i]);
        while (stack.length && stack[stack.length - 1] === popped[0]) {
            stack.pop();
            popped.shift();
        }
    }
    return stack.length === 0;
};

/**
 *  删除最外层的括号
 */
var removeOuterParentheses = function (s) {
    let count = 0,
        ans = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(" && count++ > 0) ans += "(";
        if (s[i] === ")" && count-- > 1) ans += ")";
    }
    return ans;
};
