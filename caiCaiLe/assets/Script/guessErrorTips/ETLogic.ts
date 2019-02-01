import ETOrg from "./ETOrg";

const {ccclass, property} = cc._decorator;
import MK from "../MiddleKey";

@ccclass
export default class ETLogic extends cc.Component {

    @property(ETOrg)
    eto: ETOrg = null;

    onLoad() {
        MK.ErrorTips = this;
    }

    //显示错误提示
    showError(msg) {
        if (msg != null && msg != undefined) {
            this.eto.betBtns.forEach((btn, idx) => {

                btn.on(cc.Node.EventType.TOUCH_START, () => {
                    return;
                })

            });

        }
    }
}
