import AxiosExOrg from "./AxiosExOrg";
import SpriteFrame = cc.SpriteFrame;

const {ccclass, property} = cc._decorator;

@ccclass
export default class AxiosExLogic extends cc.Component {

    @property(AxiosExOrg)
    aeo: AxiosExOrg = null;

    onLoad() {

        //axios取参数渲染
        this.axiosGet();

        //执行状态机
        this.stateMachine();

    }

    //axios取参数渲染
    axiosGet() {
        let bg = this.aeo.changeBg.getComponent(cc.Sprite);
        let bg01 = this.aeo.changBg01.getComponent(cc.Sprite);
        let d01 = JSON.parse(localStorage.getItem("data01")).data;
        let d02 = JSON.parse(localStorage.getItem("data02")).data;
        console.log(d01);
        console.log(d01[0].img);
        cc.loader.load(d01[0].img, (err, img) => {
            bg.spriteFrame = new SpriteFrame(img);
        });
        cc.loader.load(d02[1].img, (err, img) => {
            bg01.spriteFrame = new SpriteFrame(img);
        })
    }

    stateMachine() {

        let data = JSON.parse(localStorage.getItem("data01")).data;
        let bg = this.aeo.changeBg.getComponent(cc.Sprite);
        let self = this;

        let btn = function () {
            this.currentState = FSM.sta01;
        };

        //为btn添加init原型量为一个方法，新建btn的构造方法后直接调用init方法就会执行定义原型量为init的方法
        btn.prototype.init = function () {
            self.aeo.btn.getComponentInChildren(cc.Label).string = "这是第一张";   //初始化按钮上的文本
            self.aeo.btn.on(cc.Node.EventType.TOUCH_START, () => {
                //this指向btn函数
                // console.log(this);
                this.currentState.clickFunc.call(this);   //按钮点击用clickFunc通过call调用btn方法的执行
            })
        };

        let FSM = {
            sta01: {
                //clickFunc(){} 和 clickFunc:function(){}的写法是一样的，状态中this的指向不会变
                clickFunc() {
                    cc.loader.load(data[0].img, (err, img) => {
                        bg.spriteFrame = new SpriteFrame(img);
                    });
                    console.log("这是第一张");
                    //这里的this也是指向btn函数
                    // console.log(this);
                    this.currentState = FSM.sta02;
                    self.aeo.btn.getComponentInChildren(cc.Label).string = "第一张";   //通过call方法的调用改变按钮里面的文本
                }
            }, sta02: {
                clickFunc() {
                    cc.loader.load(data[1].img, (err, img) => {
                        bg.spriteFrame = new SpriteFrame(img);
                    });
                    console.log("这是第二张");
                    this.currentState = FSM.sta03;
                    self.aeo.btn.getComponentInChildren(cc.Label).string = "第二张";
                }
            }, sta03: {
                clickFunc() {
                    cc.loader.load(data[2].img, (err, img) => {
                        bg.spriteFrame = new SpriteFrame(img);
                    });
                    console.log("这是第三张");
                    this.currentState = FSM.sta04;
                    self.aeo.btn.getComponentInChildren(cc.Label).string = "第三张";
                }
            }, sta04: {
                clickFunc() {
                    cc.loader.load(data[3].img, (err, img) => {
                        bg.spriteFrame = new SpriteFrame(img);
                    });
                    console.log("这是第四张");
                    this.currentState = FSM.sta05;
                    self.aeo.btn.getComponentInChildren(cc.Label).string = "第四张";
                }
            }, sta05: {
                clickFunc() {
                    cc.loader.load(data[4].img, (err, img) => {
                        bg.spriteFrame = new SpriteFrame(img);
                    });
                    console.log("这是第五张");
                    this.currentState = FSM.sta06;
                    self.aeo.btn.getComponentInChildren(cc.Label).string = "第五张";
                }
            }, sta06: {
                clickFunc() {
                    cc.loader.load(data[5].img, (err, img) => {
                        bg.spriteFrame = new SpriteFrame(img);
                    });
                    console.log("这是第六张");
                    this.currentState = FSM.sta01;
                    self.aeo.btn.getComponentInChildren(cc.Label).string = "第六张";
                }
            }
        };

        //通过new关键字实例化btn函数
        let btn_n = new btn();
        //通过调用btn原型量的init的方法执行点击事件
        btn_n.init();

    }

}
