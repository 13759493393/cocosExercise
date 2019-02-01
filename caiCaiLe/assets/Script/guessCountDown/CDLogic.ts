import CDOrg from "./CDOrg";
import MK from "../MiddleKey";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CDLogic extends cc.Component {

    @property(CDOrg)
    cdor: CDOrg = null;

    onLoad() {
        MK.CDLogic = this;
    }

    //开奖倒计时
    prixCountDown(second) {
        if (second < 10) {
            this.cdor.timeNode.getComponent(cc.Label).string = "0" + second;
        } else {
            this.cdor.timeNode.getComponent(cc.Label).string = second;
        }
    }

    //结算倒计时
    settleCountDown(second) {
        this.cdor.timeNode.getComponent(cc.Label).string = "0" + second;
    }

}
