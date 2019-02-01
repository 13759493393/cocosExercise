
const {ccclass, property} = cc._decorator;

@ccclass
export default class PopNodeOrz extends cc.Component {

    @property([cc.Node])
    popBtns:Array<cc.Node> = [];

    @property([cc.Node])
    popContents:Array<cc.Node> = [];

    @property(cc.Node)
    hidePops:cc.Node = null;

    @property([cc.Node])
    rankBtns:Array<cc.Node> = [];

}
