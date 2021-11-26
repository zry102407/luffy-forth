var list = {
    "index.js": `
        var add = require('add.js).default
        console.log(add(3, 3))
    `,
    "add.js": "exports.default = function(a, b){return a + b}",
};
function require(file) {
    var exports = {}(function (exports, code) {
        eval(code);
    })(exports, list[file]);
    return exports;
}
