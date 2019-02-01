const {ccclass, property} = cc._decorator;
/*const func = cc.Enum({Four_Orientation: 0,
    Eight_Orientation: 1,
    All_Orientation: 2,});*/

@ccclass
export default class RockerOrg extends cc.Component {

    @property(cc.Node)
    front: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Node)
    panel: cc.Node = null;

    @property(cc.Float)
    speed: number = 0;

    @property(cc.Node)
    moveObj: cc.Node = null;

    @property(cc.Float)
    angel: number = 0;


}
