const {ccclass, property} = cc._decorator;
import MK from "./MiddleKeys";

@ccclass
export default class TipTemplate extends cc.Component {

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    tips:cc.Node = null;

    onLoad(){
        MK.tips = this;
    }

    getTips(tip){
        this.tips.getComponent(cc.Label).string = tip;
        this.content.active = true;

        this.tips.getComponent(cc.Label).scheduleOnce(()=>{
            this.content.active = false;
        },1);

    }

}
