const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOrg extends cc.Component {

    @property(cc.Node)
    topContainer:cc.Node = null;

    @property([cc.Node])
    topPokers:Array<cc.Node> = [];

    @property(cc.Node)
    pokerContainer:cc.Node = null;

    @property([cc.Node])
    pokers:Array<cc.Node> = [];

    @property(cc.Node)
    sure:cc.Node = null;

    @property(cc.Node)
    cancel:cc.Node = null;


}
