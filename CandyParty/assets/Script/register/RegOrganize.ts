const {ccclass, property} = cc._decorator;

@ccclass
export default class RegOrganize extends cc.Component {

    @property(cc.Node)
    userName: cc.Node = null;

    @property(cc.Node)
    passWord:cc.Node = null;

    @property(cc.Node)
    signIn:cc.Node = null;

    @property(cc.Node)
    register:cc.Node = null;

    @property(cc.Node)
    autoRegister:cc.Node = null;

    @property(cc.Node)
    toggleCheck:cc.Node = null;

    @property(cc.Node)
    forgetPWords:cc.Node = null;

    @property(cc.Node)
    signInViews:cc.Node = null;

    @property(cc.Node)
    forgetViews:cc.Node = null;

    @property(cc.Node)
    registerView:cc.Node = null;

    @property(cc.Node)
    checkPoint:cc.Node = null;

    @property(cc.Node)
    connectView:cc.Node = null;

    @property(cc.Node)
    settingIcon:cc.Node = null;


}
