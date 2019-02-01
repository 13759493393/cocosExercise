"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var _a, _b;
var ex01_html_1 = require("./ex01.html");
console.log(ex01_html_1["default"]);
//块级作用域
{
    console.log("块级作用域");
}
//变量命名
var ppp = 1;
var p = 9;
var t = 5;
function func() {
    console.log(a);
}
/*import aa from "aa=0";
console.log(aa);
class abc{
    console.log("calss命名类")
}*/
//解构赋值
var _c = [1, 2, 3], a = _c[0], b = _c[1], c = _c[2];
console.log(a);
console.log(b);
console.log(c);
var _d = [1, 2, 3, 4], head = _d[0], tail = _d.slice(1);
console.log(head); //1
console.log(tail); //[2,3,4]
{
    //加了省略号之后如果赋值结果个数比定义变量个数多，前面的一一赋值，剩余的以数组的形式全部赋值给最后一个变量
    //如果定义变量个数比赋值结果个数多，不能对应的为undefined，最后一个为空数组，其他的为一一对应
    var _e = ['a'], x = _e[0], y = _e[1], z = _e.slice(2);
    console.log(x); //a
    console.log(y); //undefined
    console.log(z); //[]
    var _f = ['a', 'b', 'c', 'd', 'e', 'f'], p_1 = _f[0], t_1 = _f[1], q = _f.slice(2);
    console.log(p_1); //a
    console.log(t_1); //b
    console.log(q); //['c','d','e','f']
    //没有省略号，前面的变量和值一一对应，多余的值自动省略
    var _g = [1, 2, 3, 4, 5,], n = _g[0], m = _g[1], s_1 = _g[2];
    console.log("\n=========");
    console.log(n); //1
    console.log(m); //2
    console.log(s_1); //3
    //没有省略号，值多于变量时，多余的变量值为undefined
    var _h = [1, 2], a_1 = _h[0], b_1 = _h[1], c_1 = _h[2];
    console.log("=========");
    console.log(a_1); //1
    console.log(b_1); //2
    console.log(c_1); //undefined
}
{
    var _j = [false, undefined, undefined], _k = _j[0], a_2 = _k === void 0 ? true : _k, _l = _j[1], b_2 = _l === void 0 ? 2 : _l, _m = _j[2], c_2 = _m === void 0 ? false : _m;
    console.log("=========");
    console.log(a_2); //false因为a=true为false，所以a为false
    console.log(b_2); //2
    console.log(c_2); //false因为c=false为undefined，所以c还为false
}
//map遍历
{
    var map = new Map();
    map.set("a", "小明");
    map.set("b", "小红");
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
        var _o = map_1[_i], key = _o[0], value = _o[1];
        console.log(key + " is " + value);
    }
}
//输入模块指定方法
/*
{
    const {SourceMapConsumer, SourceNode} = require("source-map");
    console.log("模块指定方法");
    console.log(SourceMapConsumer);
    console.log(SourceNode);
}*/
//字符串
{
    var s = "𠮷";
    s.length; // 2
    s.charAt(0); // ''
    s.charAt(1); // ''
    s.charCodeAt(0); // 55362
    s.charCodeAt(1); // 57271
    console.log("=========");
    console.log(s.length);
    console.log(s.charAt(0));
    console.log(s.charAt(1));
    console.log(s.charCodeAt(0));
    console.log(s.charCodeAt(1));
    //for...of...字符串遍历
    console.log("字符串遍历");
    for (var _p = 0, _q = "forOf"; _p < _q.length; _p++) {
        var a_3 = _q[_p];
        console.log(a_3);
    }
    {
        //三种遍历方法startsWith,endsWith,includes
        //即支持传递一个参数也支持传递两个参数，第二个参数为其实查找位置
        var s_2 = 'Hello world!';
        s_2.startsWith('world', 6); // true
        s_2.endsWith('Hello', 5); // true
        s_2.includes('Hello', 6); // false
        //.repeat()方法，把原字符串重复几次
        //如果传入的是0到-1的小数会先取整，即为-0；
        console.log("repeat方法");
        "x".repeat(9);
        console.log("y:" + "y".repeat(-0.9));
        console.log("x:" + "x".repeat(9));
    }
    {
        //补全字符串长度padStart和padEnd
        "a".padStart(9, "99");
        "b".padEnd(9, "99");
        console.log("补全字符串长度");
        console.log("aa".padStart(9, "799"));
        console.log("bb".padEnd(9, "799"));
    }
    {
        //模板字符串反引号(``); 可以是多行字符串，${}可以引入变量
        var a_4 = 999;
        var b_3 = "\u5C0F\u660E\u6709" + a_4 + "\u4E2A\u82F9\u679C";
        var c_3 = "'\n'<h1>\u6A21\u677F\u5B57\u7B26\u4E32</h1>\n                <h2>\u8FD8\u662F\u6A21\u677F\u5B57\u7B26\u4E32</h2>\n                <h3>\u8FD8\u662F\u4ED6\u5988\u7684\u6A21\u677F\u5B57\u7B26\u4E32</h3>".trim();
        var div = document.createTextNode(c_3);
        document.body.appendChild(div);
        console.log(b_3);
        console.log(c_3);
        console.log(document.body);
    }
    /*{
        //标签模板
        console.log("js中运行java代码");
        `class MainClass{
            public static void main(String[] args){
            System.out.println("js中运行java代码")
            }
        }`;
        MainClass.main();
    }*/
    {
        console.log("\u6A21\u677F\u5B57\u7B26\u4E32\uFF1A");
        //模板字符串还有一个raw属性，是一个是数组
        console.log(templateObject_1 || (templateObject_1 = __makeTemplateObject(["123"], ["123"]))); //['123',raw:Array[1]]
    }
    //模板字符串的raw属性
    {
        console.log("raw属性的反转字符串");
        tag(templateObject_2 || (templateObject_2 = __makeTemplateObject(["first line \n second line"], ["first line \\n second line"])));
        function tag(strings) {
            console.log(strings.raw[0]); //strings.raw会把\n视为//和n两个字符串，不再是换行符
            //打印值为"first line \\n second line"
        }
    }
    //原生String的raw方法
    {
        var aaa = String.raw({ raw: "test" }, 1, 2, 3, 4, 5, 6);
        console.log(aaa); //t1e2s3t
    }
    //正则扩张
    //正则的方法有match,replace,search,split方法
    {
        //es6把所有的方法都归到RegExp();方法中
    }
    //二进制必须用0b或0B开头
    //八进制必须用0o或0O开头
    {
        console.log("八进制和二进制:");
        console.log(2389);
        console.log(9);
    }
    //number的属性方法
    {
        Number.isFinite(Math.PI); //判断数值是否为有限，不是数值返回false
        Number.isNaN(null); //判断数值是否为NaN类型
        Number.isInteger(0.618); //判断是否为整数
        Number.parseInt("24525fgsgs"); //全局方法parseInt和parseFloat用于Number上，等价于全局方法
        Number.parseFloat("24525fgsgs");
    }
    //Math方法扩张
    {
        Math.sign(618); //判断是否为正数、负数、0
        //指数运算符
        var num = Math.pow(2, Math.pow(3, 4));
        console.log(num);
    }
    //双冒号函数绑定运算符(::)
    {
        /*let func01 = () => {
            console.log("this is parent function");
            console.log(this);

            childFunc(() => {
                console.log("this is child function");
                console.log(this);
            });

        };

        func01::childFunc;
        func01();*/
        var foo = "小明";
        var bar = function (name) {
            return console.log(this.name);
        };
        bar.bind(this, "小明", "xiaoMing ");
    }
    //函数尾调用
    //在函数的最后一步调用另一个函数，不一定是在函数尾部调用，只要在函数执行的最后一步调用即可；
    {
        function funcA() {
            var a = 9;
            return a;
        }
        function funcB() {
            return funcA();
        }
        function funcC() {
            var a = 9;
            if (a < 9) {
                return funcB();
            }
            else {
                return funcA();
            }
        }
    }
    //尾递归，函数尾调用自身，只记录一次函数调用记录，不会存在栈溢出的问题，相对节省内存
    {
        //递归
        console.log("尾调用和尾递归");
        function func(n) {
            if (n <= 1) {
                return 1;
            }
            // console.log(func(n - 1) + func(n - 2));   //2,3,2,2,5,2,3,2,2,5  //为3时2,3,2,3
            return func(n - 1) + func(n - 2);
        }
        console.log("this is func(9)");
        console.log(func(9)); //55
    }
}
//数组的扩展
{
    //扩展运算符(...)，可以把数组转换成逗号隔开的参数序列
    function spread(arr) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        console.log.apply(console, items);
        arr.push.apply(arr, items);
        console.log(arr);
    }
    var arr01 = [0, 1, 2];
    var arr02 = [];
    spread.apply(void 0, [arr02].concat(arr01));
    //由于扩展运算符可以展开数组，所以就不用再用apply方法把数组转为传递的参数序列了
    /*console.log("这是apply方法的调用");
    spread.apply(null,arr01);*/
    console.log("这是扩展运算符方法");
    console.log(Math.max.apply(Math, arr01));
    console.log("这是apply方法");
    //null为另一个对象，没有就为null
    console.log(Math.max.apply(null, arr01));
}
//数组克隆
{
    //es5的写法
    console.log("es5写法");
    var a_5 = [1, 2, 3];
    var b_4 = a_5; //克隆的是指针
    b_4[0] = 9; //改变b会影响a的值
    console.log(a_5); //[9,2,3]
    console.log(b_4); //[9,2,3]
    var c_4 = a_5.concat();
    c_4[0] = 99;
    console.log(a_5);
    console.log(c_4);
    //es6
    console.log("es6写法");
    var aa = [1, 2, 3];
    var bb = aa.slice();
    bb[0] = 999;
    console.log(aa);
    console.log(bb);
    //结构复制只能把扩展运算符放在最后一位，否则报错
    console.log("放在末尾");
    var _r = [1, 2, 3, 4, 5], aaa = _r[0], bbb = _r[1], ccc = _r.slice(2);
    console.log(aaa);
    console.log(bbb);
    console.log.apply(console, ccc);
    //以下情况都会报错
    /*console.log("放在中间");
    let [aaa, ...bbb, ccc] = [1, 2, 3, 4, 5];
    console.log([aaa, ...bbb, ccc]);
    console.log("放在开头");
    let [...aaa, bbb, ccc] = [1, 2, 3, 4, 5];
    console.log([...aaa, bbb, ccc]);*/
    //Array.from();会把from对象返回一个数组，如果from对象本身就是一个数组，返回的是一个一模一样的数组
    console.log("Array.from()方法转换数组");
    var nameList = new Set([1, 2, 3]);
    console.log(nameList);
    console.log(Array.from(nameList));
    console.log(Array.from("hello  小明"));
    //Array.of()将一组值转换为数组
    console.log("Array.of()方法将一组值转换为数组");
    console.log(Array.of(1, 3, 4, 6, 8, 9));
    //copyWithin()把指定位置的值复制到其他位置，会覆盖原有成员，改变原来的数组
    //有三个参数，都为数值型，分别为(target,start,end)除了target为必填之外，其他两个为选填
    var cArr = [1, 2, 3, 4, 5].copyWithin(0, -2);
    console.log("copyWithin exercise");
    console.log(cArr); //[4,5,3,4,5] 如果传入参数为0,-2,-1结果为[4,2,3,4,5]
    //find()和findIndex()返回符合条件的成员属性和方法，没有符合条件的就返回-1
    //fill()方法是填充数组，接收三个参数(填充值，开始位置，结束位置)
    var fillArr = [1, 2, 3, 4, 5].fill(9, -3, -1);
    console.log("填充数组：");
    console.log(fillArr);
    //有初始位置和结束位置参数的都是包含初始位置不包含结束位置
    //flat和flatMap方法是拉平数组，默认拉平一层，传入参数为整数和infinity，infinity表示不管多少层都拉平成一维数组
    //map和flatMap只计算一维数组，多维数组默认只计算一维范围内的
    var flatArr = [1, 2, 3, 4, [5, 6, 7, [8, 9]]];
    console.log("拉平数组");
    console.log(flatArr.flat(Infinity));
    console.log("flatMap:");
    console.log(flatArr.map(function (x) { return [x, x * 3]; }));
}
//变量扩展
{
    console.log("变量扩展：");
    //简洁表达式
    var a_6 = 1;
    var b_5 = { a: a_6 };
    console.log(b_5);
    function ride(x, y) {
        return { x: x, y: y };
    }
    console.log(ride(4, 9));
    //属性名表达式，可以在对象赋值时计算
    var propKey = 'foo';
    var obj = (_a = {},
        _a[propKey] = true,
        _a['a' + 'bc'] = 123,
        _a);
    console.log(obj); //{foo:true,abc:123}
    //注意：简洁表达式和属性名表达式不能同时使用，否则报错
    /*
    * let a = "abc";
    * let b = "xyz";
    * let c = {[a]};   报错
    * */
    var keyA = { a: 1 };
    var keyB = { b: 2 };
    var myObject = (_b = {},
        _b[keyA] = 'valueA',
        _b[keyB] = 'valueB',
        _b);
    console.log("myObject:" + myObject); //myObject:[object,object];keyA和keyB已经是对象了
    //对象可枚举，可遍历
    //枚举   Object.getOwnPropertyDescriptor方法
    console.log("对象枚举遍历：");
    var enumObj = {
        name: "小明",
        age: 999,
        description: "mortal"
    };
    console.log("对象枚举：" + Object.getOwnPropertyDescriptor(enumObj, 'name'));
    //super关键字指向对象的原型对象
    //注意：super关键字只能用在对象的方法中，用在其他地方都会报错
    console.log("super关键字:");
    var theName = {
        name: "小红"
    };
    var superObj = {
        name: "小明",
        find: function () {
            console.log(_super.name); //小红
            return _super.name;
        }
    };
    Object.setPrototypeOf(superObj, theName); //用于设置原型量name为theName中的name属性
    console.log(superObj.find()); //小红
    //扩展运算符
    console.log("对象扩展运算符：");
    /*let {aaa, bbb, ...ccc} = {x: 1, y: 2, z: 3, n: 4, p: 5, q: 6};
    console.log(aaa);   //undefined
    console.log(bbb);   //undefined
    console.log(ccc);   //{x: 1, y: 2, z: 3, n: 4, p: 5, q: 6}*/
    var _s = { aaa: 1, bbb: 2, z: 3, n: 4, p: 5, q: 6 }, aaa = _s.aaa, bbb = _s.bbb, ccc = __rest(_s, ["aaa", "bbb"]);
    console.log(aaa); //1
    console.log(bbb); //2
    console.log(ccc); //{ z: 3, n: 4, p: 5, q: 6}
    //null和undefined都不能转换成为对象
    /*let { x, y, ...z } = null; // 运行时错误
    let { x, y, ...z } = undefined; // 运行时错误*/
}
//对象新增方法
{
    //Object.is()  区别于==和===，此方法为同值相等
    //在此之前+0 = -0，NaN != NaN;之后+0 != -0,NaN = NaN;
    console.log("对象新增方法：");
    console.log(+0 === -0); //true
    console.log(NaN === NaN); //false
    Object.is(+0, -0); //false
    Object.is(NaN, NaN); //true
    //Object.assign()把源对象复制到目标对象，除第一个参数是目标对象外，第一个之后的参数都是源对象
    //目标对象和源对象的对象名不能相同，否则只赋值最后一个
    //注意：浅拷贝，同名数组只有一个，数组处理为对象
    console.log("合并对象");
    var tObj = { name: "小明" };
    var sObj1 = { name1: "小红" };
    var sObj2 = { name2: "还他妈是小明" };
    Object.assign(tObj, sObj1, sObj2);
    console.log(tObj);
}
//Symbol是第七种数据类型，是一个独一无二的值
//注意：Symbol是一种数据类型不是对象，不能用new关键字；括号里面可以传入参数介绍，用以区分不同的Symbol
//不能与其他类型值运算，可以转换成布尔型，字符串型，不可以转换成数值型
{
    console.log("symbol数据类型");
    var sValue = Symbol();
    // sValue = 999;
    console.log(typeof sValue);
    //Symbol属性名
}
//set和map方法
{
    //set方法是一个构造对象，不会重复添加值
    //set方法可以接受数组作为参数
    var s_3 = new Set([1, 2, 3, 4, 3, 2, , 4, 9, 3, 4]);
    console.log(s_3); //[1, 2, 3, 4, undefined,9]   去除重复，没有为未定义
    console.log.apply(//[1, 2, 3, 4, undefined,9]   去除重复，没有为未定义
    console, s_3);
    //weakSet和Set方法类似，值只能是对象，否则报错，没有size属性，不能遍历成员
    //map方法，跟内存地址绑定，除了字符串外还可以用对象、数组等作为键值
    //weakMap和map类似，但是只接受null以外的对象作为参数，weakMap定义的值不会进入垃圾回收机制，容易造成内存泄漏
}
//proxy代理器，拦截函数
{
    var target = {};
    var handler = {};
    var pFun = new Proxy(target, handler);
}
//promise模式
{
    /*console.log("promise模式《=========》");
    let theVal = 999;

    function func01() {
        return new Promise((resolve, reject) => {
            console.log(resolve);
            console.log(reject);
            console.log("执行promise函数")
        })
    };

    let promise01 = new Promise((resolve, reject) => {
        console.log(resolve);
        console.log(reject);
        theVal = 9;
        console.log("执行promise01");
        resolve();   //先执行resolve函数才会执行then之后的成功回调函数
        reject();   //先执行reject函数才会执行then之后的错误回调函数
    });
    promise01.then(() => {
        console.log(theVal);
        console.log('执行then函数');
    }, (err) => {
        console.log(err);
    });
    console.log("执行promise后的打印");*/
    //resolve和reject之间的状态传递
    /*console.log("执行promise状态传递《=========》");
    let p01 = new Promise((resolve, reject) => {
        resolve();  //只有这里执行resolve方法之后p02中的resolve状态才会为启动状态，p02之后的then方法才会执行
        console.log(resolve);
        console.log("执行p01");
    });

    let p02 = new Promise((resolve, reject) => {
        resolve(p01);
        //p02的resolve状态取决于p01的resolve状态，如果p01的resolve不执行，则po02执行resolve方法也没有用，也不会执行之后的then方法
        console.log(resolve);
        console.log("执行p02");
    });

    //.catch()方法，错误时执行；.finally()方法无论怎样都执行，且在最后执行
    p02.then(() => {
        console.log("执行状态传递的then方法");
    }).catch(err => {
        console.log("函数执行错误");
    }).finally(() => {
        console.log("执行promise的finally方法");
    });*/
    //.all()和.race()方法，都是把多个promise对象转换成为一个promise对象
}
//Iterator遍历器和for...of...循环
//Iterator主要提供for...of...的消费
{
    /*console.log("循环遍历器<=========>");
    let it = makeIterator([1, 2, 3]);
    console.log(it.next());

    /!*for (let i = 0; i < it.length; i++) {
        console.log(it.next());
    }*!/

    function makeIterator(array) {
        let nextIndex = 0;
        return {
            next: function () {
                nextIndex < array.length ? {value: array[nextIndex++], done: false} : {value: undefined, done: true};
            }
        }
    }*/
    console.log("iterator遍历");
    var arr = [1, 2, 3];
    var ite = arr[Symbol.iterator]();
    console.log(ite.next());
    console.log(ite.next());
    console.log(ite.next());
    console.log(ite.next());
}
//generator
{
    //yield表达式
    //function后面必须要加*，否则报错
    //yield*表达式
    console.log("generator表达式");
    function tempFunc() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, 2];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, 3];
                case 3:
                    _a.sent();
                    return [2 /*return*/, 4];
            }
        });
    }
    function generatorF() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, 123 + 456];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, tempFunc()];
                case 2:
                    _a.sent(); //如果要调用tempFun里面的值必须用yield*表达式，否则打印出来的是tempFunc函数
                    return [4 /*yield*/, 999];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }
    console.log("下面是v的值");
    for (var _t = 0, _u = tempFunc(); _t < _u.length; _t++) {
        var v = _u[_t];
        console.log(v);
    }
    console.log("下面是L的值");
    for (var _v = 0, _w = generatorF(); _v < _w.length; _v++) {
        var L = _w[_v];
        console.log(L);
    }
    console.log("下面是tempFunc函数里面的值");
    var gen = tempFunc();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
}
//class类
{
    var point = /** @class */ (function () {
        function point(x, y) {
            this.x = x;
            this.y = y;
        }
        point.prototype.toString = function () {
            return "(" + this.x + "," + this.y + ")";
        };
        return point;
    }());
    //实例类
    console.log("class类的构造方法");
    var p_2 = new point(1, 9);
    console.log(p_2.toString());
    console.log("class表达式");
    var person = new /** @class */ (function () {
        function class_1(name) {
            this.name = name;
        }
        ;
        class_1.prototype.sayName = function () {
            console.log(this.name);
        };
        return class_1;
    }())('小明');
    //执行person类
    person.sayName();
}
//类的继承
{
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        ;
        Person.prototype.toString = function () {
            console.log(this.name);
        };
        ;
        return Person;
    }());
    ;
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Student;
    }(Person));
    ;
    console.log("类的继承");
    var p_3 = new Person("小明");
    p_3.toString(); //小明
}
//export和import
//export决定对外接口，import决定引入的其他模块
{
    // export m=1;   //报错
    /*
    * export决定对外的接口，上面输出无论是1或m=1；都会报错
    * 可以写成export let m=1;或者先定义好:let m=1;再输出m
    * */
}
{
    //reflect对象
    var obj = {};
    obj.name = 1;
    console.log(obj.name);
    console.log(Reflect.get(obj, "name"));
    var obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log("getting " + key + "!");
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log("setting " + value + "!");
            return Reflect.set(target, key, value, receiver);
        }
    });
}
var templateObject_1, templateObject_2;
