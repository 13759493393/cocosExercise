const {ccclass, property} = cc._decorator;

@ccclass
export default class DDZorg extends cc.Component {

    @property(cc.Node)
    wom:cc.Node = null;

    @property(cc.Node)
    player:cc.Node = null;

}
