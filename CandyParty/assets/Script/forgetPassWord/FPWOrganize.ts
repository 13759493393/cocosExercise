const {ccclass, property} = cc._decorator;

@ccclass
export default class FPWOrganize extends cc.Component {

    @property(cc.Node)
    container:cc.Node = null;

    @property([cc.Node])
    forgetPWView:Array<cc.Node> = [];

    @property(cc.Node)
    telNumbers:cc.Node = null;

    @property(cc.Node)
    reSend:cc.Node = null;

    @property(cc.Node)
    vCode:cc.Node = null;

    @property(cc.Node)
    next:cc.Node = null;

    @property(cc.Node)
    passWord:cc.Node = null;

    @property(cc.Node)
    vriPassWord:cc.Node = null;

    @property(cc.Node)
    ensure:cc.Node = null;

    @property(cc.Node)
    continue:cc.Node = null;

    @property(cc.Node)
    checkPoint:cc.Node = null;

    @property(cc.Node)
    connectView:cc.Node = null;

    @property(cc.Node)
    settingIcon:cc.Node = null;

}
