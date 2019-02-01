const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicOrg extends cc.Component {

    @property(cc.Node)
    point:cc.Node = null;

    @property(cc.Node)
    rectP01:cc.Node = null;

    @property(cc.Node)
    rectP02:cc.Node = null;

    @property(cc.Node)
    rigid01:cc.Node = null;

    @property(cc.Node)
    rigid02:cc.Node = null;

    @property(cc.Node)
    collide:cc.Node = null;

    @property(cc.Node)
    graphicNode:cc.Node = null;

    @property(cc.Node)
    graphicNode01:cc.Node = null;

    @property(cc.Node)
    c09:cc.Node = null;

    @property(cc.Node)
    c07:cc.Node = null;

    @property(cc.Node)
    c03:cc.Node = null;

    @property(cc.Node)
    c01:cc.Node = null;

    @property(cc.Node)
    rot:cc.Node = null;

    @property(cc.Node)
    container:cc.Node = null;

    @property(cc.Node)
    controlView:cc.Node = null;

    @property(cc.Node)
    controlCircle:cc.Node = null;

    @property(cc.Node)
    sphere:cc.Node = null;

    @property(cc.Node)
    moveNode:cc.Node = null;

    @property(cc.Node)
    left:cc.Node = null;

    @property(cc.Node)
    right:cc.Node = null;

    @property(cc.Node)
    top:cc.Node = null;

    @property(cc.Node)
    bottom:cc.Node = null;

}
