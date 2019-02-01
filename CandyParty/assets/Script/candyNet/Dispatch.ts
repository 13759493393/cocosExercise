import MK from "./../MiddleKeys";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dispatch extends cc.Component {

    //延时函数挂载节点
    @property(cc.Node) mountNode: cc.Node = null;

    messageQueen = new Array();
    isOpen = 1;

    onLoad() {
        MK.candyDispatch = this;
    }

    start() {
        //每5秒执行一次
        this.everyFiveSecond();
    }

    //每帧分发消息
    update() {
        /*//每帧分发消息
        if (this.isOpen == 1 && this.messageQueen.length > 0) {
            this.distributeMessage(this.getMessage());
            this.isOpen = 0;
            this.mountNode.getComponent(cc.Sprite).schedule(()=>{
                this.isOpen = 1;
            },4);
        }*/
    }

    //每5秒分发一次消息
    everyFiveSecond() {
        //先执行一次
        if (this.isOpen == 1 && this.messageQueen.length > 0) {
            this.distributeMessage(this.getMessage());
        }
        this.mountNode.getComponent(cc.Sprite).schedule(() => {
            //执行分发消息
            if (this.isOpen == 1 && this.messageQueen.length > 0) {
                this.distributeMessage(this.getMessage());
            }
        }, 3);
    }

    //返回消息队列长度
    messageLength() {
        return this.messageQueen.length;
    }

    //打开消息队列
    openQueen() {
        this.isOpen = 1;
    }

    //关闭消息队列
    closeQueen() {
        this.isOpen = 0;
    }

    //清除消息
    clearMessage() {
        this.messageQueen = new Array();
    }

    //放入消息
    putMessage(msg) {
        if (msg != null) {
            this.messageQueen.push(msg);
        }
    }

    //获取消息
    getMessage() {
        if (this.messageQueen.length > 0) {
            return this.messageQueen.shift();
        } else {
            return null;
        }
    }

    //打印消息
    printMessage(msg) {
        if (msg === null || msg === undefined) {
            cc.warn("message is null");
        }
        console.log(msg);
    }

    //分发消息
    distributeMessage(msg) {
        console.log("分发消息的消息是：" + JSON.stringify(msg));
        let theMsg = JSON.parse(msg);

        //执行改变背景函数
        //先执行一次
        MK.gameLogic.changeCandy(theMsg);

        //托管
    }

    //执行分发消息
    playDistributeMessage() {
        this.isOpen = 1;
        console.log("执行playDistributeMessage");
        console.log(this.isOpen);
        console.log(this.messageQueen.length);
        console.log("《=========》");

        /*if (this.isOpen == 1 && this.messageQueen.length > 0) {
            console.log("<=========>已经执行第一次分发消息");
            console.log("第一次"+JSON.parse(this.getMessage()));
            this.distributeMessage(this.getMessage());
        }*/
        let count = 9;
        // if (this.isOpen == 1 && this.messageQueen.length > 0) {
        /*count = this.messageLength();
        console.log(count);*/

        this.mountNode.getComponent(cc.Sprite).schedule(() => {
            /*count = this.messageLength();*/
            console.log(count);
            if (this.isOpen == 1 && this.messageQueen.length > 0) {
                console.log("<=========>已经执行分发消息");
                this.distributeMessage(this.getMessage());
            }
        }, 5, count);

        // }


    }

    //销毁时清除数据
    onDestroy() {
        MK.candyDispatch = null;
    }

}
