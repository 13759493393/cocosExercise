"use strict";
exports.__esModule = true;
var People = /** @class */ (function () {
    function People() {
    }
    return People;
}());
console.log("<===这是People中的打印===>");
var p1 = new People();
p1.name = "小明";
p1.age = 999;
console.log(p1);
exports.regular = /\^[0-9]+$/;
var BBB = /** @class */ (function () {
    function BBB() {
    }
    BBB.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.regular.test(s);
    };
    return BBB;
}());
exports.BBB = BBB;
exports.bbb = BBB;
var bbb = new BBB();
exports["default"] = bbb;
