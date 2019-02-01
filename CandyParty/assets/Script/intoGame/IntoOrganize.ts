const {ccclass, property} = cc._decorator;

@ccclass
export default class IntoOrganize extends cc.Component {

    //游戏正在连接界面
    @property(cc.Node)
    connectView:cc.Node = null;

    //登录界面
    @property(cc.Node)
    loginView:cc.Node = null;

    //关卡界面
    @property(cc.Node)
    checkPoint:cc.Node = null;

    @property(cc.Node)
    settingIcon:cc.Node = null;

    //交互停顿糖果
    @property(cc.Node)
    interactiveCandy:cc.Node = null;

    //交互停顿label
    @property(cc.Node)
    interactiveConnect:cc.Node = null;

    //兑换细节
    //姓名
    @property(cc.Node)
    exchangeName:cc.Node = null;

    //金币
    @property(cc.Node)
    goldNum:cc.Node = null;

    //用户总分
    @property(cc.Node)
    userScore:cc.Node = null;

}
