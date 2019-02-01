const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOrganize extends cc.Component {

    /*//第一矩阵
    @property([cc.Node])
    firstM:Array<cc.Node> = [];

    @property(cc.Node)
    firstMNode:cc.Node = null;

    //第二矩阵
    @property([cc.Node])
    secondM:Array<cc.Node> = [];

    @property(cc.Node)
    secondMNode:cc.Node = null;

    //添加矩阵
    @property([cc.Node])
    appendM:Array<cc.Node> = [];

    @property(cc.Node)
    appendMNode:cc.Node = null;

    //克隆糖果
    @property(cc.Node)
    cloneCandy:cc.Node = null;

    //确定和下注按钮
    @property([cc.Node])
    btns:Array<cc.Node> = [];

    @property(cc.Node)
    btnsNode:cc.Node = null;

    @property(cc.Node)
    mountNode = null;

    @property(cc.Node)
    passNum:cc.Node = null;

    @property(cc.Node)
    rightCookies:cc.Node = null;

    @property(cc.Node)
    leftCookies:cc.Node = null;*/

    //确定和下注按钮
    @property([cc.Node])
    btns:Array<cc.Node> = [];

    @property(cc.Node)
    btnsNode:cc.Node = null;

    //prefab资源
    @property(cc.Prefab)
    colCandies:cc.Prefab = null;

    //所有糖果
    @property([cc.Prefab])
    allCandies:Array<cc.Prefab> = [];

    //三个矩阵节点容器
    @property(cc.Node)
    firstContainer:cc.Node = null;

    @property(cc.Node)
    secondContainer:cc.Node = null;

    @property(cc.Node)
    appendContainer:cc.Node = null;

    @property(cc.Node)
    mountNode:cc.Node = null;

    @property(cc.Node)
    leftCookies:cc.Node = null;

    @property(cc.Node)
    rightCookies:cc.Node = null;

    @property(cc.Node)
    passNum:cc.Node = null;

    //用户总分
    @property(cc.Node)
    userScore:cc.Node = null;

    //得分
    @property(cc.Node)
    getScore:cc.Node = null;

    //托管
    @property(cc.Node)
    deposit:cc.Node = null;

    //取消托管，灰色托管按钮
    @property(cc.Node)
    grayDeposit:cc.Node = null;

    //下注比例
    @property(cc.Node)
    beatCount:cc.Node = null;

    @property(cc.Node)
    count:cc.Node = null;

    //游戏局数节点
    @property(cc.Node)
    gameCount:cc.Node = null;

    //关卡标题
    @property([cc.Node])
    checkPointTitle:Array<cc.Node> = [];


}
