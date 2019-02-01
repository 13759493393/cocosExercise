
import PopNodeOrz from "./PopNodeOrz";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PopLogic extends cc.Component {
    @property(PopNodeOrz)
    orz:PopNodeOrz = null;


    onLoad(){

        //点击显示弹窗
        this.popBtn();

        //开始时隐藏弹窗蒙版
        this.orz.hidePops.active = false;

        //点击隐藏所有弹窗
        this.hidePops();

        //切换今天昨天排行
        this.toggleRank(0);
        this.rankBtn();

    }

    //点击显示弹窗内容
    showPopContent(index){
        this.orz.popContents.forEach((content,idx)=>{
            content.active = false;
        });
        this.orz.popContents[index].active = true;
    }

    //点击弹窗按钮
    popBtn(){
        this.orz.popBtns.forEach((btn,idx)=>{
            btn.on(cc.Node.EventType.TOUCH_START,()=>{
                this.showPopContent(idx);
                this.orz.hidePops.active = true;
            })
        })
    }

    //点击隐藏所有弹窗
    hidePops(){
        this.orz.hidePops.on(cc.Node.EventType.TOUCH_START,()=>{
            this.orz.popContents.forEach((content)=>{
                content.active = false;
                this.orz.hidePops.active = false;
            })
        })
    }

    //排行选中背景切换
    toggleRank(index){
        this.orz.rankBtns.forEach((btn)=>{
            btn.getChildByName("check").active = false;
        });
        this.orz.rankBtns[index].getChildByName("check").active = true;
    }

    //点击切换排行按钮
    rankBtn(){
        this.orz.rankBtns.forEach((btn,idx)=>{
            btn.on(cc.Node.EventType.TOUCH_START,()=>{
                this.toggleRank(idx);
            })
        })
    }

}
