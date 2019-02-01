import EDOrg from "./EDOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EDLogic extends cc.Component {

    @property(EDOrg)
    edo:EDOrg = null;

    onLoad(){

        //预发射事件
        this.preEmitE();

        //预派送事件
        this.preDispatchE();

    }

    start(){
        //发射事件
        this.emitE();

        //派送事件
        this.dispatchE();
    }

    //预发射事件
    preEmitE(){
        this.edo.sNode.on("emit",(event)=>{
            console.log(event.detail.mes);
        })
    }

    //发射事件
    emitE(){
        // this.edo.pNode.getComponent(cc.Sprite).scheduleOnce(()=>{
            this.edo.sNode.emit("emit",{
                mes:"节点发射事件"
            })
        // },3)

    }

    //预派送事件
    preDispatchE(){
        this.edo.pNode.on("dispatchE",(event)=>{
            event.stopPropagation();
            console.log("已经阻断事件派送");
            console.log(cc.Event.EventCustom);
        })
    }

    //派送事件
    dispatchE(){
        this.edo.sNode.dispatchEvent(new cc.Event.EventCustom("dispatchE",true));
    }

}
