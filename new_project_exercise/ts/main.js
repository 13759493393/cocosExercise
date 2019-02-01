// import bbb from "./People";
{
    console.log("this is typescript exercise");
    function sayName(name) {
        return "这他妈是" + name.firstName + name.lastName + "呀！哈哈哈";
    }
    var person = {
        firstName: "Mr.", lastName: "小明"
    };
    document.body.innerHTML = "<h1>" + sayName(person) + "</h1>";
    // $(".container").html("this is container");
}
{
    var name_1 = "小明";
    function func(name) {
        return console.log("name:" + this.name);
    }
    ;
    func.apply(name_1);
    console.log("bind函数绑定");
    var theFunc = function (name) {
        return console.log("name:" + name);
    };
    var thisFunc = function (age, name) {
        return console.log("age:" + age + "\n" + "name:" + name);
    };
    var obj = {
        name: "小明", getFunc: function (name) {
            return console.log(name);
        }
    };
    //bind方法
    var thatFunc = thisFunc.bind(this, 9, "小明");
    // let thisFunc::thatFunc(this,9,"小明");
    thatFunc(); //绑定后需要执行
    console.log("<=========>");
    //apply方法
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
    }
    function Student(name, age, job, grade) {
        Person.apply(this, arguments);
        this.grade = grade;
        console.log(this.name);
        console.log(this.age);
        console.log(this.job);
        console.log(this.grade);
    }
    var student = new Student("小明", 999, "student", "N年级");
    // student();
    //实例化后不需要执行student方法了，否则会报student不是函数的错
    //实例化Student类打印结果为 "小明"，999，"student"，"N年级"
    {
        var Color = void 0;
        (function (Color) {
            Color[Color["red"] = 0] = "red";
            Color[Color["green"] = 1] = "green";
            Color[Color["violet"] = 2] = "violet";
        })(Color || (Color = {}));
        var a = Color.red;
        var b = Color.green;
        var c = Color.violet;
        console.log(a + "\n" + b + "\n" + c); //0,1,2得到的是Color里面值的下标
        var d = Color[2];
        console.log(d); //violet，得到的是Color中下标为2的值
        var arr = [1, 2, 3, 4, 5];
        console.log(arr[3]);
        var newArr = ['s', 1, true, { p: false }, { n: 1 }, { f: 'g' }];
        console.log(newArr);
        console.log("=========>");
        var Animal = void 0;
        (function (Animal) {
            Animal[Animal["dog"] = 0] = "dog";
            Animal["pig"] = "Peppa";
            Animal["tiger"] = "marry";
        })(Animal || (Animal = {}));
        var n = Animal.dog;
        var p = Animal.pig;
        var m = Animal.tiger;
        console.log(n + "\n" + p + "\n" + m);
        var signs = [1 /* S */, 9 /* T */, 81 /* K */];
        console.log(signs);
        //外部枚举
        /*declare enum Enum{u = 1,v,w = 2}
        let tEn:Enum = Enum.u;
        console.log(tEn);*/
    }
    {
        //泛型
        console.log("===> identity");
        function idenFunc(arg) {
            // console.log(arg);
            return arg;
        }
        var aa = idenFunc("小明");
        console.log(aa);
        function funcs(args) {
            for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                var i = args_1[_i];
                console.log(i);
            }
            return args;
        }
        funcs(['a', 1, false, '小明']);
        //泛型接口
        console.log("<=========>泛型接口");
        function Identity(arg) {
            console.log(arg);
            return arg;
        }
        var myIdentity = Identity;
        myIdentity(9);
        //泛型类
        console.log("<=========>泛型类");
        var IdentityClass = /** @class */ (function () {
            function IdentityClass() {
            }
            return IdentityClass;
        }());
        var theIdentityClass = new IdentityClass();
        theIdentityClass.zeroValue = 0;
        theIdentityClass.pos = function (x, y) {
            console.log("(" + x + "," + y + ")");
            return ("(" + x + "," + y + ")");
        };
        theIdentityClass.pos(9, 81);
        /*{
            console.log("<========>泛型例子");

            class BeeKeeper {
                hasMask: boolean;
            }

            class ZooKeeper {
                nameTag: string;
            }

            class Animal {
                legNum: number;
            }

            class Bee extends Animal {
                keeper: BeeKeeper;
            }

            class Lion extends Animal {
                keeper: ZooKeeper;
            }

            function createInstance<A extends Animal>(c: new () => A): A {
                return new c();
            }

            createInstance(Bee).keeper.hasMask = true;
            createInstance(Lion).keeper.nameTag = "狮子";

        }*/
    }
    //迭代器和生成器
    {
        console.log("迭代器和生成器");
        var nums = [1, 2, 3];
        for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
            var num = nums_1[_i];
            console.log(num);
        }
        var theNums = ['a', 'b', 'c'];
        for (var theNum in theNums) {
            console.log(theNum);
        }
        /**
         * 生成的极速代码是：
         {
            console.log("迭代器和生成器");
            var nums = [1, 2, 3];
            for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
                var num = nums_1[_i];
                console.log(num);
            }
            var theNums = ['a', 'b', 'c'];
            for (var theNum in theNums) {
                console.log(theNum);
            }
         }*/
    }
}
