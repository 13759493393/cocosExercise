import RECOrg from "./RECOrg";
import MK from "../MiddleKey";
import {guessGetInfo} from "../axiosRequest";
import SpriteFrame = cc.SpriteFrame;


const {ccclass, property} = cc._decorator;

@ccclass
export default class RECLogic extends cc.Component {

    @property(RECOrg)
    recl: RECOrg = null;

    onLoad() {
        MK.RECLogic = this;
        // console.log(this.recl.parentNode.children);
        //加载时执行请求
        this.getRecord();
        //点击执行请求
        this.clickRequest();
    }

    getRecord() {

        //加载时使父节点的所有子节点不显示
        this.recl.parentNode.children.forEach((node) => {
            node.active = false;
        });

        let pNode = this.recl.parentNode;
        guessGetInfo.getRecords().then((res) => {

            // console.log(res);
            if (res != null && res != undefined) {
                for (let i = 0; i < res.data.data.length; i++) {
                    let cNode = cc.instantiate(this.recl.childNode);
                    //获取时间
                    cNode.getChildByName("time").getComponent(cc.Label).string = res.data.data[i].createDate;
                    //获取昵称，并控制昵称长度
                    let niName = res.data.data[i].username;
                    let niArr = [];
                    // niName.split("") 返回的就是一个数组；
                    niArr = niName.split("");
                    if (niArr.length > 4) {
                        niName = niName.slice(0, 3) + "...";
                    }
                    cNode.getChildByName("nickName").getChildByName("name").getComponent(cc.Label).string = niName;
                    //远程加载头像图片
                    cc.loader.load(res.data.data[i].headImg, (err, image) => {
                        image.height = 50;
                        image.width = 50;
                        cNode.getChildByName("nickName").getChildByName("img").getComponent(cc.Sprite).spriteFrame = new SpriteFrame(image);
                    });
                    //获取金额，并修改金额单位
                    let showCount;
                    let theCount = res.data.data[i].count;
                    // console.log(theCount);
                    if (theCount >= 100000000) {
                        showCount = Math.floor(theCount / 100000000) + "亿";
                    } else if (theCount >= 10000) {
                        showCount = Math.floor(theCount / 10000) + "万";
                    }else{
                        showCount = theCount;
                    }
                    // console.log(showCount);
                    cNode.getChildByName("prix").getComponent(cc.Label).string = showCount;
                    // cNode.getChildByName("prix").getComponent(cc.Label).string = res.data.data[i].count/10000 + "万";


                    pNode.addChild(cNode);
                    cNode.active = true;
                }
            }

        });

    }

    //点击大奖记录按钮请求数据
    clickRequest(){
        this.recl.recordBtn.on(cc.Node.EventType.TOUCH_START,()=>{
            //点击后执行请求
            this.getRecord();
        })
    }


}
