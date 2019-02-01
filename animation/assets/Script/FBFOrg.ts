const {ccclass, property} = cc._decorator;

@ccclass
export default class FBFOrg extends cc.Component {

    @property(cc.Node)
    imgNode:cc.Node = null;

    @property(cc.Node)
    btn:cc.Node = null;

    @property(cc.Node)
    changeCO:cc.Node = null;

    @property(cc.Node)
    showPokers:cc.Node = null;

    @property(cc.Node)
    loadBdImg:cc.Node  = null;

    @property(cc.Node)
    container:cc.Node = null;

    @property(cc.Node)
    localImg:cc.Node = null;

}
