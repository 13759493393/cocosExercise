const {ccclass, property} = cc._decorator;

@ccclass
export default class OpenPrixOrg extends cc.Component {

    @property([cc.Node])
    pokers:Array<cc.Node> = [];

    @property(cc.Node)
    oPNode:cc.Node = null;

    @property(cc.Node)
    timer:cc.Node = null;

    @property(cc.Node)
    miTimer:cc.Node = null;

}
