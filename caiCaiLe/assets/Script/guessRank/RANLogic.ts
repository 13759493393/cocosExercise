import RANOrg from "./RANOrg";
import MK from "../MiddleKey";
import {guessGetInfo} from "../axiosRequest";
import SpriteFrame = cc.SpriteFrame;

const {ccclass, property} = cc._decorator;

@ccclass
export default class RANLogic extends cc.Component {

    @property(RANOrg)
    ran: RANOrg = null;

    //排行版请求传送数据
    rankData:Array<any> = ["today", "yesterday"];

    onLoad() {
        MK.RANLogic = this;

        //获取排行版数据
        this.getRank();
    }

    //隐藏所有子节点
    hideAllChild() {
        this.ran.parentNode.children.forEach((cn, idx) => {
            cn.active = false;
        });
    }

    //获取排行版数据
    getRank() {

        //加载时隐藏所有子节点
        this.hideAllChild();
        //加载时默认执行展示今天排行版
        this.requestRank(this.rankData[0]);

        this.ran.btns.forEach((btn, idx) => {
            btn.on(cc.Node.EventType.TOUCH_START, () => {
                //点击是隐藏所有子节点
                this.hideAllChild();
                //点击时改变排行版数据
                this.requestRank(this.rankData[idx]);

            })
        });

    }


    //请求排行数据
    requestRank(reData){
        let pNode = this.ran.parentNode;
        let cNode = this.ran.childNode;

        guessGetInfo.getRankInfo(reData).then((res) => {
            // console.log(res);
            if (res != null && res != undefined) {
                for (let i = 0; i < res.data.data.length; i++) {
                    let creNode = cc.instantiate(cNode);
                    let rank = "";

                    if (i === 1) {
                        rank = 2 + "nd";
                    } else {
                        rank = i + 1 + "th";
                    }

                    //获取时间
                    creNode.getChildByName("time").getComponent(cc.Label).string = rank;
                    //获取昵称

                    //控制昵称名字长度
                    let theNiName = "";
                    let niName = res.data.data[i].username;
                    let niArr = [];
                    // niName.split("") 返回的就是一个数组；
                    niArr = niName.split("");
                    if (niArr.length > 4) {
                        theNiName = niName.slice(0, 3) + "...";
                    } else {
                        theNiName = niName;
                    }

                    creNode.getChildByName("nickName").getChildByName("name").getComponent(cc.Label).string = theNiName;
                    //远程加载头像图片
                    cc.loader.load(res.data.data[i].headImg, (err, image) => {
                        image.height = 50;
                        image.width = 50;
                        creNode.getChildByName("nickName").getChildByName("img").getComponent(cc.Sprite).spriteFrame = new SpriteFrame(image);
                    });
                    //获取金额
                    //获取金额，并修改金额单位
                    let showCount;
                    let theCount = res.data.data[i].count;
                    if (theCount >= 100000000) {
                        showCount = Math.floor(theCount / 100000000) + "亿";
                    } else if (theCount >= 10000) {
                        showCount = Math.floor(theCount / 10000) + "万";
                    } else{
                        showCount = theCount;
                    }
                    // console.log(showCount);
                    creNode.getChildByName("prix").getComponent(cc.Label).string = showCount;
                    // cNode.getChildByName("prix").getComponent(cc.Label).string = res.data.data[i].count/10000 + "万";


                    pNode.addChild(creNode);
                    creNode.active = true;
                }
            }
        })

    }

}
