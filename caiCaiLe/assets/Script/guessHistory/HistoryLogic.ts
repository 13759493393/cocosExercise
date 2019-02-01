import HistoryOrg from "./HistoryOrg";
import MK from "../MiddleKey";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryLogic extends cc.Component {

    @property(HistoryOrg)
    ho:HistoryOrg = null;

    onLoad(){
        MK.HistoryLogic = this;
    }

    //隐藏所有子节点
    hideAllChild(){
        this.ho.parentNode.children.forEach((child,idx)=>{
            child.active = false;
        })
    }

    //获取历史开奖记录
    getHistory(history){
        //隐藏所有子节点
        this.hideAllChild();
        let parentNode = this.ho.parentNode;
        if(history != null && history != undefined){
            history.forEach((prix,idx)=>{

                //每次循环都初始化克隆子节点，一个子节点不可以多次被加到同一个父节点
                let childNode = cc.instantiate(this.ho.childNode);
                childNode.getChildByName("text").getComponent(cc.Label).string = prix;
                childNode.getChildByName("NEW_text").active = false;
                if(idx === 0){
                    childNode.getChildByName("NEW_text").active = true;
                }
                parentNode.addChild(childNode);
                childNode.active = true;
            });
            //新的开奖带上new的上标
            // parentNode.children[0].getChildByName("NEW_text").active = true;
        }
    }


}
