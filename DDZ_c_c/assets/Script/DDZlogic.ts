import DDZorg from "./DDZorg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DDZlogic extends cc.Component {

    @property(DDZorg)
    DDZ:DDZorg = null;

    onLoad(){

        this.DDZ.wom.rotationY = 180;
        this.DDZ.player.rotationY = 180;
    }


}
