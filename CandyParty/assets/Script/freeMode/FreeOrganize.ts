const {ccclass, property} = cc._decorator;

@ccclass
export default class FreeOrganize extends cc.Component {

    @property([cc.Node])
    leftNeon: Array<cc.Node> = [];

    @property([cc.Node])
    rightNeon: Array<cc.Node> = [];

    @property([cc.Node])
    lineBgs:Array<cc.Node> = [];

    @property(cc.Sprite)
    MountComponent:cc.Sprite = null;

    @property(cc.Node)
    animateNode1:cc.Node = null;

    @property(cc.Node)
    animateNode2:cc.Node = null;


}
