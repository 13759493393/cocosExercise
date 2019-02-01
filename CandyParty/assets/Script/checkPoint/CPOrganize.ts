const {ccclass, property} = cc._decorator;

@ccclass
export default class CPOrganize extends cc.Component {

    @property(cc.Node)
    container:cc.Node = null;

    @property(cc.Node)
    setting:cc.Node = null;

    @property(cc.Node)
    unStart:cc.Node = null;

    @property(cc.Node)
    first:cc.Node = null;

    @property(cc.Node)
    second:cc.Node = null;

    @property(cc.Node)
    third:cc.Node = null;

    @property(cc.Node)
    exchange:cc.Node = null;

    @property(cc.Node)
    pops:cc.Node = null;

    @property(cc.Node)
    closeSetting:cc.Node = null;

}
