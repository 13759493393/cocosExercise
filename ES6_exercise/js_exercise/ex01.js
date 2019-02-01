//块级作用域
{
    console.log("块级作用域");
}

//变量命名
let ppp = 1;
const p = 9;
var t = 5;

function func() {
    console.log(a)
}

/*import aa from "aa=0";
console.log(aa);
class abc{
    console.log("calss命名类")
}*/

//解构赋值
let [a, b, c] = [1, 2, 3];
console.log(a);
console.log(b);
console.log(c);

let [head, ...tail] = [1, 2, 3, 4];
console.log(head);  //1
console.log(tail);  //[2,3,4]

{
//加了省略号之后如果赋值结果个数比定义变量个数多，前面的一一赋值，剩余的以数组的形式全部赋值给最后一个变量
//如果定义变量个数比赋值结果个数多，不能对应的为undefined，最后一个为空数组，其他的为一一对应
    let [x, y, ...z] = ['a'];
    console.log(x);  //a
    console.log(y);  //undefined
    console.log(z);  //[]

    let [p, t, ...q] = ['a', 'b', 'c', 'd', 'e', 'f'];
    console.log(p);   //a
    console.log(t);   //b
    console.log(q);   //['c','d','e','f']

    //没有省略号，前面的变量和值一一对应，多余的值自动省略
    let [n, m, s] = [1, 2, 3, 4, 5,];
    console.log("\n=========")
    console.log(n);   //1
    console.log(m);   //2
    console.log(s);   //3

    //没有省略号，值多于变量时，多余的变量值为undefined
    let [a, b, c] = [1, 2];
    console.log("=========");
    console.log(a);   //1
    console.log(b);   //2
    console.log(c);   //undefined
}

{
    let [a = true, b = 2, c = false] = [false, undefined, undefined]
    console.log("=========");
    console.log(a);   //false因为a=true为false，所以a为false
    console.log(b);   //2
    console.log(c);   //false因为c=false为undefined，所以c还为false
}

//map遍历
{
    const map = new Map();
    map.set("a", "小明");
    map.set("b", "小红");
    for (let [key, value] of map) {
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

    s.length // 2
    s.charAt(0) // ''
    s.charAt(1) // ''
    s.charCodeAt(0) // 55362
    s.charCodeAt(1) // 57271

    console.log("=========")
    console.log(s.length);
    console.log(s.charAt(0));
    console.log(s.charAt(1));
    console.log(s.charCodeAt(0));
    console.log(s.charCodeAt(1));

    //for...of...字符串遍历
    console.log("字符串遍历");
    for (let a of "forOf") {
        console.log(a);
    }

    {
        //三种遍历方法startsWith,endsWith,includes
        //即支持传递一个参数也支持传递两个参数，第二个参数为其实查找位置
        let s = 'Hello world!';

        s.startsWith('world', 6) // true
        s.endsWith('Hello', 5) // true
        s.includes('Hello', 6) // false

        //.repeat()方法，把原字符串重复几次
        //如果传入的是0到-1的小数会先取整，即为-0；
        console.log("repeat方法")
        "x".repeat(9);
        console.log("y:" + "y".repeat(-0.9));
        console.log("x:" + "x".repeat(9))
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
        let a = 999;
        let b = `小明有${a}个苹果`;
        let c = `'\n'<h1>模板字符串</h1>
                <h2>还是模板字符串</h2>
                <h3>还是他妈的模板字符串</h3>`.trim();

        let div = document.createTextNode(c);
        document.body.appendChild(div);
        console.log(b);
        console.log(c);
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
        console.log(`模板字符串：`);
        //模板字符串还有一个raw属性，是一个是数组
        console.log`123`;   //['123',raw:Array[1]]
    }

    //模板字符串的raw属性
    {
        console.log("raw属性的反转字符串");
        tag`first line \n second line`;

        function tag(strings) {
            console.log(strings.raw[0]);   //strings.raw会把\n视为//和n两个字符串，不再是换行符
            //打印值为"first line \\n second line"
        }
    }

    //原生String的raw方法
    {
        let aaa = String.raw({raw: "test"}, 1, 2, 3, 4, 5, 6);
        console.log(aaa);   //t1e2s3t
    }

    //正则扩张
    //正则的方法有match,replace,search,split方法
    {
        //es6把所有的方法都归到RegExp();方法中
    }

    //二进制必须用0b或0B开头
    //八进制必须用0o或0O开头
    {
        console.log("八进制和二进制:")
        console.log(0o4525);
        console.log(0b1001);
    }

    //number的属性方法
    {
        Number.isFinite(Math.PI);   //判断数值是否为有限，不是数值返回false
        Number.isNaN(null);   //判断数值是否为NaN类型
        Number.isInteger(0.618);   //判断是否为整数
        Number.parseInt("24525fgsgs");   //全局方法parseInt和parseFloat用于Number上，等价于全局方法
        Number.parseFloat("24525fgsgs");
    }

    //Math方法扩张
    {
        Math.sign(618);   //判断是否为正数、负数、0
        //指数运算符
        let num = 2 ** 3 ** 4;
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

        /*let foo = "小明";
        let bar = function(name){
            return console.log(this.name);
        };
        bar.bind(foo);*/


    }

    //函数尾调用
    //在函数的最后一步调用另一个函数，不一定是在函数尾部调用，只要在函数执行的最后一步调用即可；
    {
        function funcA() {
            let a = 9;
            return a;
        }

        function funcB() {
            return funcA();
        }

        function funcC() {
            let a = 9;
            if (a < 9) {
                return funcB();
            } else {
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
                return 1
            }
            // console.log(func(n - 1) + func(n - 2));   //2,3,2,2,5,2,3,2,2,5  //为3时2,3,2,3
            return func(n - 1) + func(n - 2);
        }

        console.log("this is func(9)");
        console.log(func(9));   //55
    }

}

//数组的扩展
{
    //扩展运算符(...)，可以把数组转换成逗号隔开的参数序列
    function spread(arr, ...items) {
        console.log(...items);
        arr.push(...items);
        console.log(arr);
    }

    let arr01 = [0, 1, 2];
    let arr02 = [];
    spread(arr02, ...arr01);

    //由于扩展运算符可以展开数组，所以就不用再用apply方法把数组转为传递的参数序列了
    /*console.log("这是apply方法的调用");
    spread.apply(null,arr01);*/
    console.log("这是扩展运算符方法");
    console.log(Math.max(...arr01));
    console.log("这是apply方法");
    //null为另一个对象，没有就为null
    console.log(Math.max.apply(null, arr01));

}

//数组克隆
{
    //es5的写法
    console.log("es5写法");
    let a = [1, 2, 3];
    let b = a;   //克隆的是指针
    b[0] = 9;   //改变b会影响a的值
    console.log(a);   //[9,2,3]
    console.log(b);   //[9,2,3]

    let c = a.concat();
    c[0] = 99;
    console.log(a);
    console.log(c);

    //es6
    console.log("es6写法");
    let aa = [1, 2, 3];
    let bb = [...aa];
    bb[0] = 999;
    console.log(aa);
    console.log(bb);

    //结构复制只能把扩展运算符放在最后一位，否则报错
    console.log("放在末尾");
    let [aaa, bbb, ...ccc] = [1, 2, 3, 4, 5];
    console.log(aaa);
    console.log(bbb);
    console.log(...ccc);
    //以下情况都会报错
    /*console.log("放在中间");
    let [aaa, ...bbb, ccc] = [1, 2, 3, 4, 5];
    console.log([aaa, ...bbb, ccc]);
    console.log("放在开头");
    let [...aaa, bbb, ccc] = [1, 2, 3, 4, 5];
    console.log([...aaa, bbb, ccc]);*/

    //Array.from();会把from对象返回一个数组，如果from对象本身就是一个数组，返回的是一个一模一样的数组
    console.log("Array.from()方法转换数组");
    let nameList = new Set([1, 2, 3]);
    console.log(nameList);
    console.log(Array.from(nameList));
    console.log(Array.from("hello  小明"));

    //Array.of()将一组值转换为数组
    console.log("Array.of()方法将一组值转换为数组")
    console.log(Array.of(1, 3, 4, 6, 8, 9));

    //copyWithin()把指定位置的值复制到其他位置，会覆盖原有成员，改变原来的数组
    //有三个参数，都为数值型，分别为(target,start,end)除了target为必填之外，其他两个为选填
    let cArr = [1, 2, 3, 4, 5].copyWithin(0, -2);
    console.log("copyWithin exercise");
    console.log(cArr);   //[4,5,3,4,5] 如果传入参数为0,-2,-1结果为[4,2,3,4,5]

    //find()和findIndex()返回符合条件的成员属性和方法，没有符合条件的就返回-1
    //fill()方法是填充数组，接收三个参数(填充值，开始位置，结束位置)
    let fillArr = [1, 2, 3, 4, 5].fill(9, -3, -1);
    console.log("填充数组：");
    console.log(fillArr);
    //有初始位置和结束位置参数的都是包含初始位置不包含结束位置

    //flat和flatMap方法是拉平数组，默认拉平一层，传入参数为整数和infinity，infinity表示不管多少层都拉平成一维数组
    //map和flatMap只计算一维数组，多维数组默认只计算一维范围内的
    let flatArr = [1, 2, 3, 4, [5, 6, 7, [8, 9]]];
    console.log("拉平数组");
    console.log(flatArr.flat(Infinity));
    console.log("flatMap:");
    console.log(flatArr.map((x) => [x, x * 3]));

}

//变量扩展
{
    console.log("变量扩展：");
    //简洁表达式
    let a = 1;
    let b = {a};
    console.log(b);

    function ride(x, y) {
        return {x, y};
    }

    console.log(ride(4, 9));

    //属性名表达式，可以在对象赋值时计算
    let propKey = 'foo';
    let obj = {
        [propKey]: true,
        ['a' + 'bc']: 123
    };
    console.log(obj);   //{foo:true,abc:123}

    //注意：简洁表达式和属性名表达式不能同时使用，否则报错
    /*
    * let a = "abc";
    * let b = "xyz";
    * let c = {[a]};   报错
    * */

    const keyA = {a: 1};
    const keyB = {b: 2};

    const myObject = {
        [keyA]: 'valueA',
        [keyB]: 'valueB'
    };
    console.log("myObject:" + myObject);   //myObject:[object,object];keyA和keyB已经是对象了

    //对象可枚举，可遍历
    //枚举   Object.getOwnPropertyDescriptor方法
    console.log("对象枚举遍历：");
    let enumObj = {
        name: "小明",
        age: 999,
        description: "mortal"
    };
    console.log("对象枚举：" + Object.getOwnPropertyDescriptor(enumObj, 'name'));

    //super关键字指向对象的原型对象
    //注意：super关键字只能用在对象的方法中，用在其他地方都会报错
    console.log("super关键字:");
    let theName = {
        name: "小红"
    };
    let superObj = {
        name: "小明",
        find() {
            console.log(super.name);   //小红
            return super.name;
        }
    };
    Object.setPrototypeOf(superObj, theName);   //用于设置原型量name为theName中的name属性
    console.log(superObj.find());   //小红


    //扩展运算符
    console.log("对象扩展运算符：");
    /*let {aaa, bbb, ...ccc} = {x: 1, y: 2, z: 3, n: 4, p: 5, q: 6};
    console.log(aaa);   //undefined
    console.log(bbb);   //undefined
    console.log(ccc);   //{x: 1, y: 2, z: 3, n: 4, p: 5, q: 6}*/

    let {aaa, bbb, ...ccc} = {aaa: 1, bbb: 2, z: 3, n: 4, p: 5, q: 6};
    console.log(aaa);   //1
    console.log(bbb);   //2
    console.log(ccc);   //{ z: 3, n: 4, p: 5, q: 6}

    //null和undefined都不能转换成为对象
    /*let { x, y, ...z } = null; // 运行时错误
    let { x, y, ...z } = undefined; // 运行时错误*/
}

//对象新增方法
{
    //Object.is()  区别于==和===，此方法为同值相等
    //在此之前+0 = -0，NaN != NaN;之后+0 != -0,NaN = NaN;

    console.log("对象新增方法：");
    console.log(+0 === -0);   //true
    console.log(NaN === NaN);   //false

    Object.is(+0, -0);   //false
    Object.is(NaN, NaN);   //true

    //Object.assign()把源对象复制到目标对象，除第一个参数是目标对象外，第一个之后的参数都是源对象
    //目标对象和源对象的对象名不能相同，否则只赋值最后一个
    //注意：浅拷贝，同名数组只有一个，数组处理为对象
    console.log("合并对象");
    let tObj = {name: "小明"};
    let sObj1 = {name1: "小红"};
    let sObj2 = {name2: "还他妈是小明"};
    Object.assign(tObj, sObj1, sObj2);
    console.log(tObj);

}

//Symbol是第七种数据类型，是一个独一无二的值
//注意：Symbol是一种数据类型不是对象，不能用new关键字；括号里面可以传入参数介绍，用以区分不同的Symbol
//不能与其他类型值运算，可以转换成布尔型，字符串型，不可以转换成数值型
{
    console.log("symbol数据类型");
    let sValue = Symbol();
    // sValue = 999;
    console.log(typeof sValue);

    //Symbol属性名
}

//set和map方法
{
    //set方法是一个构造对象，不会重复添加值
    //set方法可以接受数组作为参数
    let s = new Set([1, 2, 3, 4, 3, 2, , 4, 9, 3, 4]);
    console.log(s);   //[1, 2, 3, 4, undefined,9]   去除重复，没有为未定义
    console.log(...s);

    //weakSet和Set方法类似，值只能是对象，否则报错，没有size属性，不能遍历成员

    //map方法，跟内存地址绑定，除了字符串外还可以用对象、数组等作为键值
    //weakMap和map类似，但是只接受null以外的对象作为参数，weakMap定义的值不会进入垃圾回收机制，容易造成内存泄漏

}

//proxy代理器，拦截函数
{
    let target = {};
    let handler = {};
    let pFun = new Proxy(target, handler);
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
    let arr = [1, 2, 3];
    let ite = arr[Symbol.iterator]();
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

    function* tempFunc() {
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }

    function* generatorF() {
        yield 123 + 456;
        yield tempFunc();   //如果要调用tempFun里面的值必须用yield*表达式，否则打印出来的是tempFunc函数
        yield 999;
    }

    console.log("下面是v的值");
    for (let v of tempFunc()) {
        console.log(v);
    }
    console.log("下面是L的值");
    for (let L of generatorF()) {
        console.log(L);
    }
    console.log("下面是tempFunc函数里面的值");
    let gen = tempFunc();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());

}

//class类
{
    class point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return "(" + this.x + "," + this.y + ")";
        }
    }

    //实例类
    console.log("class类的构造方法");
    let p = new point(1, 9);
    console.log(p.toString());

    console.log("class表达式");
    let person = new class {
        constructor(name) {
            this.name = name;
        };

        sayName() {
            console.log(this.name);
        }
    }('小明');
    //执行person类
    person.sayName();

}


//类的继承
{
    class Person{
        constructor(name){
            this.name = name;
        };
        toString(){
            console.log(this.name)
        };

    };
    class Student extends  Person{

    };
    console.log("类的继承");
    let p = new Person("小明");
    p.toString();   //小明

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

//Proxy
{
    //reflect对象
    let obj = {};
    obj.name = 1;
    console.log(obj.name);   //1
    console.log(Reflect.get(obj,"name"));   //1 reflect的get方法对象可以传入三个参数，目标对象、键、受体(读取器的上下文)

    //原理
    let proxyOBJ = new Proxy({},{
        get:(target,key,receiver)=>{
            console.log(`getting ${key}!`);
            return Reflect.get(target,key,receiver);
        },
        set:(target,key,value,receiver)=> {
            console.log(`setting ${value}!`);
            return Reflect.set(target,key,value,receiver);
        }
    })
}

