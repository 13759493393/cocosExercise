const {ccclass, property} = cc._decorator;

@ccclass
export default class ETOrg extends cc.Component {

    @property(cc.Node)
    tipParent:cc.Node = null;

    @property(cc.Node)
    tips:cc.Node = null;

    @property([cc.Node])
    betBtns:Array<cc.Node> = [];


}
