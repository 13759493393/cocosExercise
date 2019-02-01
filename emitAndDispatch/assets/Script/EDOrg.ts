const {ccclass, property} = cc._decorator;

@ccclass
export default class EDOrg extends cc.Component {

    @property(cc.Node)
    pNode:cc.Node = null;

    @property(cc.Node)
    fNode:cc.Node = null;

    @property(cc.Node)
    sNode:cc.Node = null;

}
