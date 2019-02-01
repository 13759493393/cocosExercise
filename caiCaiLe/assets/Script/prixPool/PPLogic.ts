import PPOrg from "./PPOrg";
import MK from "../MiddleKey";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PPLogic extends cc.Component {

    @property(PPOrg)
    ppo: PPOrg = null;

    onLoad() {
        MK.PPLogic = this;

    }

    prixNumber(prixNum) {

        if(prixNum >= 100000000){
            prixNum = Math.floor(prixNum/100000000) + "亿";
        }else if(prixNum >= 10000){
            prixNum = Math.floor(prixNum/10000) + "万";
        }

        this.ppo.prixNumber.getComponent(cc.Label).string = prixNum;
    }

    //获取上次三条时间
    getLast(seconds) {
        // 878423
        let day = Math.floor(seconds / (24 * 60 * 60));
        let hour = Math.floor(seconds % (24 * 60 * 60) / 3600);
        let minute = Math.floor(seconds % (24 * 60 * 60 ) % 3600 / 60);

        this.ppo.lastTime.getComponent(cc.Label).string = day + "天" + hour + "小时" + minute + "分";
    }

}
