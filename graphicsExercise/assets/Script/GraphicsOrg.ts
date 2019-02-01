const {ccclass, property} = cc._decorator;

@ccclass
export default class GraphicsOrg extends cc.Component {

    @property(cc.Node)
    gNode:cc.Node = null;

    @property(cc.Node)
    gNode_E:cc.Node = null;

    @property(cc.Node)
    aniNode:cc.Node = null;

    @property(cc.Node)
    aniNode02:cc.Node = null;

    /*@property(cc.Node)
    colli01:cc.Node = null;

    @property(cc.Node)
    colli02:cc.Node = null;*/

    @property(cc.Node)
    col01:cc.Node = null;

    @property(cc.Node)
    col02:cc.Node = null;

}
