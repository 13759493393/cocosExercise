import MK from "../MiddleKey";
import Axios from "../api/Axios.config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GDispatch extends cc.Component {

    MSQ: Array<any> = new Array<any>();

    isOpen: number = 1;

    history: Array<any> = new Array<any>();

    onLoad() {
        MK.GDispatch = this;
        //游戏切换前后台
        this.toggleGame();
    }

    start() {
        this.history = new Array<any>();
    }

    //消息队列数
    size() {
        return this.MSQ.length;
    }

    //清空消息队列
    empty() {
        return this.size() === 0;
    }

    //清除消息
    clear() {
        this.MSQ = new Array<any>();
    }

    //放入消息
    put(msg) {
        // cc.log(JSON.stringify(msg));
        if (msg != null) {
            this.MSQ.push(msg);
        }
    }

    //获取消息
    get() {
        if (this.MSQ.length > 0) {
            return this.MSQ.shift();

        } else {
            return null;
        }
    }

    //打开消息
    open() {
        this.isOpen = 1;
    }

    //关闭消息
    close() {
        this.isOpen = 0;
    }

    //游戏前后台切换
    toggleGame() {
        let isToggle = false;
        cc.game.on(cc.game.EVENT_HIDE, () => {
            this.close();
            this.clear();
            /*console.log("已经关闭消息队列");
            console.log(this.isOpen);
            console.log(this.MSQ)*/
        });
        cc.game.on(cc.game.EVENT_SHOW, () => {
            if (isToggle === true) {
                isToggle = !isToggle;
                return;
            }
            isToggle = !isToggle;
            // cc.delayTime(0.5);
            this.clear();
            this.open();
            /*console.log("重新打开消息队列");
            console.log(this.isOpen)
            console.log(this.MSQ)*/
        });

    }

    update() {

        if (this.isOpen === 1 && !this.empty()) {
            //开始游戏后才分发消息
            if (MK.GuessState.is_start_game === true) {
                this.distributeMessage(this.get());
                // console.log("执行分发消息");
            }
        }
    }

    //打印消息
    printMessage(msg) {
        if (msg == null) {
            cc.warn("message is null");
        }

        cc.log(`\n`);
        cc.log(`\n`);
        cc.log(`%c〖${msg.type} START〗〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓`, 'color:#F5680F;');
        cc.log(`%c ${JSON.stringify(msg, null, 2)}`, 'color:#F5680F;');
        cc.log(`%c〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〖${msg.type} END〗`, 'color:#F5680F;');
        // console.log(msg);
    }

    //分发消息
    distributeMessage(msg: { type: string, message: any }) {

        //执行打印消息
        // this.printMessage(msg);
        let type = msg.type;
        let message = msg.message;
        switch (type) {
            //全局消息
            //开奖倒计时
            case "101":
                //开奖倒计时
                MK.CDLogic.prixCountDown(message.count);
                //如果在开奖倒计时，保持显示牌背
                MK.OpenPrixLogic.openPrix(null, message.count);
                break;
            //结算倒计时
            case "102":
                MK.CDLogic.settleCountDown(message.count);
                //初始化下注按钮，倒计时为0时初始化下注时间
                MK.BetLogic.initBets(message.count);
                break;
            //中奖消息
            case "203":
                //展示开奖结果
                MK.OpenPrixLogic.openPrix(message.cards, 0);
                // this.printMessage(msg);
                // console.log(message.willName);
                let thisPrix = MK.GuessState.prix_history;
                let thePrix = message.willName;
                if (thePrix == "THREE_SAME_CARD") {
                    thePrix = "三条";
                } else if (thePrix == "SEQUENCE_CARD") {
                    thePrix = "顺子";
                } else if (thePrix == "SINGLE_CARD") {
                    thePrix = "单牌";
                } else if (thePrix == "GOLD_FLOWER_CARD") {
                    thePrix = "金花";
                } else if (thePrix == "PAIR_CARD") {
                    thePrix = "对子";
                } else if (thePrix == "SEQUENCE_GOLD_CARD") {
                    thePrix = "顺金";
                }
                thisPrix.unshift(thePrix);
                // console.log(thisPrix);
                //开奖时添加开奖历史信息
                MK.HistoryLogic.getHistory(thisPrix);
                // console.log("中奖消息");
                break;
            //上轮大赢家
            case "213":
                // console.log("显示第一名玩家");
                MK.FirstLogic.getFirst(message.topOneUser);
                break;
            //奖金池消息
            case "104":
                MK.PPLogic.prixNumber(message.bonusPoll);
                // console.log("奖金池消息");
                break;
            //上次三条时间
            case "206":
                MK.PPLogic.getLast(message.seconds);
                // console.log("大奖记录");
                break;
            //分类下注情况
            case "111":
                MK.BetLogic.showBetPeople(message.bettingIndexLists);
                // console.log("分类下注情况");
                break;

            //个人消息
            //错误消息
            case "110":
                MK.ErrorTips.showError(message.error);
                // console.log("错误消息");
                break;
            //自动下注
            case "116":
                MK.BetLogic.getAutoBetting(message);
                // console.log("自动下注");
                break;
            //个人下注信息
            case "117":
                MK.BetLogic.showBets(message.bettingIndexLists);
                // console.log("个人下注信息");
                break;
            // 用户获胜消息
            case "205":
                // this.printMessage(msg);
                console.log("用户获胜消息");
                break;
            //进入游戏
            case "212":
                MK.PlayerEnter.initPlayerEnter(message);
                // console.log("进入游戏");
                break;

        }

    }

    onDestroy() {
        MK.GDispatch = null;
    }

}
