const {ccclass, property} = cc._decorator;

@ccclass
export default class BetOrg extends cc.Component {

    @property(cc.Node)
    autoBtn: cc.Node = null;

    @property(cc.Node)
    countBtn: cc.Node = null;

    @property(cc.Node)
    autoCancel:cc.Node = null;

    @property(cc.Node)
    repeatBtn: cc.Node = null;

    @property([cc.Node])
    betBtns: Array<cc.Node> = [];

    @property(cc.Node)
    autoBtns:cc.Node = null;

    @property(cc.Node)
    countBtns:cc.Node = null;

}
