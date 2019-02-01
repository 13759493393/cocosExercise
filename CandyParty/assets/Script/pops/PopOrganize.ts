const {ccclass, property} = cc._decorator;

@ccclass
export default class PopOrganize extends cc.Component {

    @property(cc.Node)
    checkPoint:cc.Node = null;

    @property([cc.Node])
    btns:Array<cc.Node> = [];

    @property(cc.Node)
    container:cc.Node = null;

    @property(cc.Node)
    coinShort:cc.Node = null;

    @property(cc.Node)
    rechargeTip:cc.Node = null;

    @property(cc.Node)
    pointExchange:cc.Node = null;

    @property(cc.Node)
    exchangeDetail:cc.Node = null;

    @property(cc.Node)
    setting:cc.Node = null;

    @property(cc.Node)
    netBreak:cc.Node = null;

    @property(cc.Node)
    adjustment:cc.Node = null;

    //兑换细节节点
    //去充值
    @property(cc.Node)
    toRecharge:cc.Node = null;

    @property(cc.Node)
    detailIcon:cc.Node = null;

    @property(cc.Node)
    thisProportion:cc.Node = null;

    @property(cc.Node)
    proportions:cc.Node = null;

    @property(cc.Node)
    exchangeStart:cc.Node = null;

    @property(cc.Node)
    closeEDetail:cc.Node = null;

    //充值提示弹窗
    @property(cc.Node)
    tipSure:cc.Node = null;

    @property(cc.Node)
    tipCancel:cc.Node = null;

    //金币不足
    //前往充值
    @property(cc.Node)
    shortToRecharge:cc.Node = null;

    //取消
    @property(cc.Node)
    shortCancel:cc.Node = null;

    //点击兑换点数
    //去充值
    @property(cc.Node)
    toRecharge_exchange:cc.Node = null;

    //去兑换
    @property(cc.Node)
    toExchange_exchange:cc.Node = null;

    //关闭
    @property(cc.Node)
    close_exchange:cc.Node = null;

    //开始游戏
    @property(cc.Node)
    start_exchange:cc.Node = null;




    //注数调整
    @property(cc.Node)
    add1:cc.Node = null;

    @property(cc.Node)
    content1:cc.Node = null;

    @property(cc.Node)
    reduce1:cc.Node = null;

    @property(cc.Node)
    add2:cc.Node = null;

    @property(cc.Node)
    content2:cc.Node = null;

    @property(cc.Node)
    reduce2:cc.Node = null;

    @property(cc.Node)
    backGame_am:cc.Node = null;

    @property(cc.Node)
    close_am:cc.Node = null;

    /*//第一关糖果
    //第一个矩阵
    @property([cc.Node])
    firstCheckAnimate:Array<cc.Node> = [];

    @property(cc.Node)
    firstMatrixNode:cc.Node = null;

    @property(cc.Node)
    firstCandies:cc.Node = null;

    @property(cc.Node)
    beatCount:cc.Node = null;

    @property(cc.Node)
    count:cc.Node = null;

    //第二个矩阵
    @property([cc.Node])
    secondMatrix:Array<cc.Node> = [];

    @property(cc.Node)
    secondMatrixNode:cc.Node = null;

    //补充矩阵
    @property([cc.Node])
    appendMatrix:Array<cc.Node> = [];

    @property(cc.Node)
    appendMatrixNode:cc.Node = null;

    //被克隆的糖果
    @property(cc.Node)
    cloneCandy:cc.Node = null;*/

    @property(cc.Node)
    beatCount:cc.Node = null;

    @property(cc.Node)
    count:cc.Node = null;

    //托管按钮
    @property(cc.Node)
    deposit:cc.Node = null;

    //取消托管
    @property(cc.Node)
    grayDeposit:cc.Node = null;

    //兑换按钮
    @property([cc.Node])
    exchangesBtns:Array<cc.Node> = [];

    //兑换比率
    @property(cc.Node)
    exchangeRatio:cc.Node = null;

}
