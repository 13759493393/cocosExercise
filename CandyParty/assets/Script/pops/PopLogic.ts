import PopOrgnize from "./PopOrganize";
import MK from "../MiddleKeys";
import SpriteFrame = cc.SpriteFrame;
import array = cc.js.array;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopLogic extends cc.Component {

    @property(PopOrgnize) po: PopOrgnize = null;

    tokenIs = null;

    //判断是否可以托管
    isDeposit = false;

    onLoad() {
        MK.popLogic = this;
        //兑换细节
        this.exchangeDetail();
        //点击按钮事件
        this.clickBtns();
        //注数调整
        this.adjustmentNum();
        //点击切换弹窗
        this.togglePop();
    }


    //点击弹窗切换
    togglePop() {
        //充值细节提示弹窗
        this.po.toRecharge.on(cc.Node.EventType.TOUCH_START, () => {
            //显示充值弹窗，隐藏兑换细节弹窗
            this.po.rechargeTip.active = true;
            this.po.exchangeDetail.active = false;
        });

        //确定
        this.po.tipSure.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });
        this.po.tipCancel.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });

        //网络断开

        //金币不够
        //金币不足去充值
        this.po.shortToRecharge.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });
        //金币不足取消充值
        this.po.shortCancel.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });


        //点数兑换
        //去充值
        this.po.toRecharge_exchange.on(cc.Node.EventType.TOUCH_START, () => {
            //显示充值提示框，隐藏点数兑换框
            this.po.pointExchange.active = false;
            this.po.rechargeTip.active = true;
        });
        //去兑换
        this.po.toExchange_exchange.on(cc.Node.EventType.TOUCH_START, () => {
            //显示兑换细节窗，隐藏点数兑换窗
            this.po.pointExchange.active = false;
            this.po.exchangeDetail.active = true;
        });
        //关闭游戏
        this.po.close_exchange.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });
        //开始游戏
        this.po.start_exchange.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });


        //充值提示窗


    }

    //点击发送兑换请求
    clickExchange() {
        let count;
        let ratio;
        let base;

        let exchangeRatio = this.po.exchangeRatio.getComponent(cc.Label).string;
        let ratios = exchangeRatio.split(":");

        let scores = [500, 5000, 50000];

        this.po.exchangesBtns[0].on(cc.Node.EventType.TOUCH_START, () => {
            let theData = {count: 1, ratio: parseInt(ratio[1]), base: 1};

        });
        this.po.exchangesBtns[1].on(cc.Node.EventType.TOUCH_START, () => {

        });
        this.po.exchangesBtns[2].on(cc.Node.EventType.TOUCH_START, () => {

        });

        //发送兑换请求
        let theData = {count: 1, base: 1, ratio: 10};
        MK.candyManager.exchangeSend(JSON.stringify(theData));

    }

    //兑换细节
    exchangeDetail() {
        let clickCount = 0;
        let rotateAngel = this.po.detailIcon.getChildByName("detail");
        let thisProportion = this.po.thisProportion;
        //开始隐藏可选比例
        this.po.proportions.active = false;
        //点击显示细节
        this.po.detailIcon.on(cc.Node.EventType.TOUCH_START, () => {
            rotateAngel.rotation = 0;
            clickCount++;
            if (clickCount % 2 === 1) {
                rotateAngel.rotation = 90;
                this.po.proportions.active = true;
                thisProportion.active = false;
            } else if (clickCount % 2 === 0) {
                rotateAngel.rotation = 0;
                this.po.proportions.active = false;
                thisProportion.active = true;
            }
        });

        //点击比例选项显示当前
        this.po.proportions.children.forEach((proportion, idx) => {
            proportion.on(cc.Node.EventType.TOUCH_START, () => {
                clickCount++;
                if (clickCount % 2 === 1) {
                    rotateAngel.rotation = 90;
                } else if (clickCount % 2 === 0) {
                    rotateAngel.rotation = 0;
                }
                let pString = proportion.getComponent(cc.Label).string;
                thisProportion.getComponent(cc.Label).string = pString;
                this.po.proportions.active = false;
                thisProportion.active = true;
                return;
            })
        });

        //点击开始游戏发送请求
        this.po.exchangeStart.on(cc.Node.EventType.TOUCH_START, () => {
            //隐藏所有弹窗
            this.po.container.active = false;
            //显示关
            this.po.checkPoint.active = true;
            this.po.checkPoint.children.forEach((theCheck, idx) => {
                theCheck.active = false;
            });
            this.po.checkPoint.getChildByName("first").active = true;
            this.po.checkPoint.getChildByName("btns").active = true;
        });

        //关闭兑换细节
        this.po.closeEDetail.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });

    }

    //点击按钮事件
    clickBtns() {
        //点击确定发送开始游戏
        this.po.btns[1].on(cc.Node.EventType.TOUCH_START, () => {
            //点击完确定之后隐藏两个按钮
            this.po.btns[0].active = false;
            this.po.btns[1].active = false;

            //获取发送游戏开始数据
            let bCount = this.po.beatCount.getComponent(cc.Label).string;
            let count = this.po.count.getComponent(cc.Label).string;
            //发送游戏开始
            let sendData = {beatCount: bCount, count: count};
            MK.candyManager.startSend(JSON.stringify(sendData));

            //开始游戏之后就可以托管
            this.isDeposit = true;

            if(this.isDeposit == true){
                //游戏未开始，不能托管，游戏开始后才能托管
                this.po.deposit.active = true;
                this.po.grayDeposit.active = false;
            }

        });

        //点击注数显示注数调整弹窗
        this.po.btns[0].on(cc.Node.EventType.TOUCH_START, () => {
            console.log("显示执行注数调整");
            this.po.container.active = true;
            this.po.container.children.forEach((pop, idx) => {
                pop.active = false;
            });
            this.po.container.getChildByName("mask").active = true;
            this.po.adjustment.active = true;
        });

    }

    //注数调整
    adjustmentNum() {
        //调整弹窗按钮加减
        //加减注数
        //加注数
        let content01 = this.po.content1;
        let content02 = this.po.content2;
        let number01 = parseInt(content01.getComponent(cc.Label).string);
        let number02 = parseInt(content02.getComponent(cc.Label).string);
        /*console.log(number01);
        console.log(number02);*/
        this.po.add1.on(cc.Node.EventType.TOUCH_START, () => {

            number01 += 1;
            content01.getComponent(cc.Label).string = "" + number01;

        });
        //减注数
        this.po.reduce1.on(cc.Node.EventType.TOUCH_START, () => {
            if (number01 > 0) {
                number01 -= 1;
                content01.getComponent(cc.Label).string = "" + number01;
            }

        });
        //加减单倍投注数
        //加倍数
        this.po.add2.on(cc.Node.EventType.TOUCH_START, () => {
            number02 += 10;
            content02.getComponent(cc.Label).string = "" + number02;
        });
        //减倍数
        this.po.reduce2.on(cc.Node.EventType.TOUCH_START, () => {
            if (number02 > 0) {
                number02 -= 10;
                content02.getComponent(cc.Label).string = "" + number02;
            }
        });
        //注数调整返回游戏
        this.po.backGame_am.on(cc.Node.EventType.TOUCH_START, () => {

            //显示注数调整
            this.po.beatCount.getComponent(cc.Label).string = "" + number01;
            this.po.count.getComponent(cc.Label).string = "" + number02;

            this.po.container.active = false;
        });
        //关闭注数调整
        this.po.close_am.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.container.active = false;
        });
    }

}


/*
* 1、矩阵行列转置
* 2、显示糖果，标识位置
* 3、判断是否消除
* 3.1、有消除：根据result矩阵计算没消除的下落距离
* 把消除的糖果分组，记录下过关道具的标识位置，根据分组制作下落动画，
* 分组：一般糖果，隐藏当前节点，播放爆炸动画和音效，检查其他消除分组，检查完后下落消除糖果上面的糖果
* 通过糖果：一般糖果，隐藏当前节点，播放爆炸动画和音效，消除饼干，通过道具加1，上面的糖果下落
* 3.2、没消除：结束游戏
*
* */