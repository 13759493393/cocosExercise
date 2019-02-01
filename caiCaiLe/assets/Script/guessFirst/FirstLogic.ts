import FirstOrg from "./FirstOrg";
import MK from "../MiddleKey";
import SpriteFrame = cc.SpriteFrame;

const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstLogic extends cc.Component {

    @property(FirstOrg)
    fo:FirstOrg = null;

    onLoad(){
        MK.FirstLogic = this;
    }

    //获取第一名
    getFirst(first){
        /*cc.loader.load(first.headwearImg,(err,img)=>{
            img.width = 70;
            img.height = 70;
            this.fo.imgFrame.getComponent(cc.Sprite).spriteFrame = new SpriteFrame(img);
        });*/

        this.fo.imgFrame.width = 70;
        this.fo.imgFrame.height = 70;
        cc.loader.load(first.headImg,(err,img)=>{
            img.width = 65;
            img.height = 65;
            this.fo.img.getComponent(cc.Sprite).spriteFrame = new SpriteFrame(img);
        });



        //控制昵称名字长度
        let theNiName = "";
        let niName = first.username;

        // niName.split("") 返回的就是一个数组；
        let niArr = niName.split("");
        if(niArr.length > 4){
            theNiName = niName.slice(0,3) + "...";
        }else{
            theNiName = niName;
        }

        this.fo.niName.getComponent(cc.Label).string = theNiName;

        let winCount = first.count;

        if(winCount >= 100000000){
            winCount = Math.floor(winCount/100000000) + "亿";
        }else if(winCount >= 10000){
            winCount = Math.floor(winCount/10000) + "万";
        }else{
            winCount = first.count;
        }
        this.fo.money.getComponent(cc.Label).string = winCount;
    }

}
