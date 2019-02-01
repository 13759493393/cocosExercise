import CPOrganize from "./CPOrganize";
import MK from "../MiddleKeys";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CPLogic extends cc.Component {

    @property(CPOrganize) cpo: CPOrganize = null;

    onLoad() {
        MK.checkPointLogic = this;
    }

    start(){
        //点击兑换点数
        this.clickExchange();
        //显示或关闭设置
        this.clickSetting();
    }

    //点击兑换点数
    clickExchange() {
        this.cpo.exchange.on(cc.Node.EventType.TOUCH_START, () => {
            this.cpo.pops.active = true;
            this.cpo.pops.children.forEach((pop, idx) => {
                pop.active = false
            });
            this.cpo.pops.getChildByName("exchange_detail").active = true;
            this.cpo.pops.getChildByName("mask").active = true;

            //发送初始化游戏消息
            let token;
            let registerToken = cc.sys.localStorage.getItem("registerToken");
            let logInToken = cc.sys.localStorage.getItem("logInToken");
            let findToken = cc.sys.localStorage.getItem("findToken");
            if(registerToken != null){
                token = registerToken
            }
            if(logInToken!=null){
                token = logInToken;
            }
            if(findToken != null){
                token = findToken;
            }

            //发送游戏初始化请求
            MK.candyManager.gameInitSend();

        })
    }

    //点击设置或关闭设置
    clickSetting(){
        this.cpo.setting.on(cc.Node.EventType.TOUCH_START,()=>{
            this.cpo.pops.active = true;
            this.cpo.pops.children.forEach((pop,idx)=>{
                pop.active = false;
            });
            this.cpo.pops.getChildByName("setting").active = true;
        });

        this.cpo.closeSetting.on(cc.Node.EventType.TOUCH_START,()=>{
            this.cpo.pops.active = false;
        })
    }

}
