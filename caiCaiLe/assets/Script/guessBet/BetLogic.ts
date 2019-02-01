import BetOrg from "./BetOrg";
import MK from "../MiddleKey";
// import GuessState from "../GuessState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetLogic extends cc.Component {

    @property(BetOrg)
    bo: BetOrg = null;

    //自动下注次数数组
    autoArr: Array<any> = [10, 30, 50, 100];

    //下注金额数组
    countArr: Array<any> = [2000, 50000, 500000, 5000000];

    onLoad() {
        MK.BetLogic = this;

        //改变下注金额
        this.changeBet();
        //自动下注
        this.betAuto();
        //重复下注
        this.betRepeat();
    }

    //初始化下注按钮
    start() {
        // 初始化下注按钮，当传入0时初始
        this.initBets(0);
        //点击取消自动投注
        this.clickCancelAutoBet();
    }

    //点击过下注或重复投币之后隐藏取消自动下注，显示自动下注
    hideCancelShowAuto(){
        this.bo.autoBtn.active = true;
        this.bo.autoCancel.active = false;
    }

    /**
     * 改变下注金额和自动下注次数
     */
    changeBet() {

        let autoStr = this.bo.autoBtn.getChildByName("count").getChildByName("count").getComponent(cc.Label);
        let countStr = this.bo.countBtn.getChildByName("2000").getChildByName("2000").getComponent(cc.Label);
        let countText = this.bo.countBtn.getChildByName("2000").getChildByName("count");
        let auto = 0;
        let count = 0;

        //自动下注的按钮集
        this.bo.autoBtn.on(cc.Node.EventType.TOUCH_START, () => {
            if(this.bo.countBtns.active == true){
                this.bo.countBtns.active = false;
                auto = 0;
                count = 0;
                return;
            }

            if (auto % 2 === 1) {
                this.bo.autoBtns.active = false;
                auto += 1;
            } else {
                this.bo.autoBtns.active = true;
                auto += 1;
            }

        }, this);

        //自动下注次数
        this.bo.autoBtns.children.forEach((btn, idx) => {
            btn.on(cc.Node.EventType.TOUCH_START, () => {
                /*this.bo.autoBtn.getChildByName("autoCoin_text").active = false;
                this.bo.autoBtn.getChildByName("count").active = true;
                let theStr = btn.getChildByName("num").getComponent(cc.Label);
                autoStr.string = theStr.string;*/
                this.bo.autoBtns.active = false;
                auto -= 1;
            }, this)
        });

        //下注金额按钮集
        this.bo.countBtn.on(cc.Node.EventType.TOUCH_START, () => {
            if(this.bo.autoBtns.active == true){
                this.bo.autoBtns.active = false;
                count = 0;
                auto = 0;
                return;
            }

            if (count % 2 === 1) {
                this.bo.countBtns.active = false;
                count += 1;
            } else {
                this.bo.countBtns.active = true;
                count += 1;
            }

        }, this);

        //自动下注金额
        this.bo.countBtns.children.forEach((btn, idx) => {
            btn.on(cc.Node.EventType.TOUCH_START, () => {
                let theStr = btn.getChildByName("num").getComponent(cc.Label);
                if (idx === 3) {
                    countStr.string = theStr.string;
                    countText.active = false;
                    this.bo.countBtns.active = false;
                    count -= 1;
                } else {
                    countStr.string = theStr.string;
                    countText.active = true;
                    this.bo.countBtns.active = false;
                    count -= 1;
                }

            }, this)
        })

    }

    /*
    *初始化下注按钮
     */
    initBets(initCount) {

        if (initCount === 0) {

            //初始化下注按钮
            //显示取消自动投币，隐藏自动投币
            this.bo.autoBtn.active = true;
            this.bo.autoCancel.active = false;
            let sendCountArr = [];

            this.bo.betBtns.forEach((btn, idx) => {

                let count = btn.getChildByName("betsNum");
                let person = btn.getChildByName("allAssets");
                let btn_bg = btn.getChildByName("alBets");
                let bet = btn_bg.getChildByName("bet");
                let unbet = btn_bg.getChildByName("unbet");

                count.getComponent(cc.Label).string = "未下注";
                count.color = cc.Color.WHITE;
                person.getComponent(cc.Label).string = 0 + "";
                //初始化按钮背景颜色
                bet.active = false;
                unbet.active = true;

                //如果循环了多次之后就只执行第一次
                sendCountArr.push(idx);

                // console.log(MK.GuessState.control_send_count);
                if (MK.GuessState.control_send_count.length >= 1) {
                    return;
                }

                //点击发送下注消息
                btn.on(cc.Node.EventType.TOUCH_START, () => {

                    //点击下注金额选择和自动下注次数隐藏
                    this.bo.autoBtns.active = false;
                    this.bo.countBtns.active = false;

                    let betNum = this.bo.countBtn.getChildByName("2000").getChildByName("2000").getComponent(cc.Label).string;
                    //处理下注金额
                    if (betNum == "2000") {
                        betNum = this.countArr[0];
                    } else if (betNum == "5") {
                        betNum = this.countArr[1];
                    } else if (betNum == "50") {
                        betNum = this.countArr[2];
                    } else if (betNum == "500") {
                        betNum = this.countArr[3];
                    }


                    let index = idx + "";
                    let allStr = betNum + "";
                    console.log(allStr);
                    let sendJson = '{"' + index + '": "' + allStr + '"}';
                    // let aaa = JSON.parse(`${index}:${allStr}`);
                    console.log("发送下注消息");

                    MK.GManager.sendBet(sendJson);
                    // 发送完下注消息后隐藏取消自动下注按钮，显示自动下注按钮
                    this.hideCancelShowAuto();

                })

            });

            MK.GuessState.control_send_count.push(sendCountArr);
            // console.log(MK.GuessState.control_send_count);

        }
    }

    /**
     * 展示下注消息
     * */
    showBets(betData) {
        if (betData != null && betData != undefined) {

            betData.forEach((bet, idx) => {
                if (bet > 10000) {
                    bet = bet / 10000 + "万";
                }
                this.bo.betBtns[idx].getChildByName("betsNum").getComponent(cc.Label).string = bet;

                //本次下注金额赋值
                bet = parseInt(bet);
                if (bet <= 10000) {
                    bet = bet * 10000;
                }
                MK.GuessState.bet_cur_guess[idx] = bet;

                //下注成功后改变下注按钮背景
                if (bet != "0") {
                    this.bo.betBtns[idx].getChildByName("alBets").getChildByName("bet").active = true;
                    this.bo.betBtns[idx].getChildByName("alBets").getChildByName("unbet").active = false;
                }
            });
            // console.log(MK.GuessState.bet_cur_guess);
        }
    }

    /**
     * 展示下注人数
     * */
    showBetPeople(peopleCount) {
        if (peopleCount != null && peopleCount != undefined) {
            peopleCount.forEach((count, idx) => {
                if (count > 10000) {
                    count = count / 10000 + "万";
                }
                this.bo.betBtns[idx].getChildByName("allAssets").getComponent(cc.Label).string = count;
            })
        }
    }

    /**
     * 重复下注
     */
    betRepeat() {

        this.bo.repeatBtn.on(cc.Node.EventType.TOUCH_START, () => {
            MK.GManager.sendRepeatBet();
            // 发送完重复下注消息后隐藏取消自动下注按钮，显示自动下注按钮
            this.hideCancelShowAuto();
        })


    }

    /**
     * 自动下注
     */
    betAuto() {

        this.bo.autoBtns.children.forEach((btn, idx) => {
            let gs = MK.GuessState;
            btn.on(cc.Node.EventType.TOUCH_START, () => {
                let count = btn.getChildByName("num").getComponent(cc.Label).string;
                let sendJson = `{"count":${count}}`;
                // console.log(sendJson);
                MK.GManager.sendAutoBet(sendJson);
            })
        })

    }

    /**
     * 处理自动下注结果
     * */
    getAutoBetting(msg) {
        if (msg != null && msg != undefined) {
            let thisCount = msg.count;
            this.bo.autoCancel.getChildByName("autoCount").getComponent(cc.RichText).string = `<color=#FFF399>自动下注还有<b>${thisCount}</b>次</color>`;
            //显示取消自动下注按钮，隐藏自动下注按钮
            this.bo.autoCancel.active = msg.autoBetting;
            this.bo.autoBtn.active = !msg.autoBetting;
        }

    }

    /**
     * 点击取消自动下注
     * */
    clickCancelAutoBet() {
        this.bo.autoCancel.on(cc.Node.EventType.TOUCH_START, () => {
            MK.GManager.sendAutoCancel();
        })
    }


}
