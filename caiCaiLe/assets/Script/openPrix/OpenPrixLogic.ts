import OpenPrixOrg from "./OpenPrixOrg";
import MK from "../MiddleKey";
import SpriteFrame = cc.SpriteFrame;

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(OpenPrixOrg)
    opo: OpenPrixOrg = null;

    onLoad() {

        MK.OpenPrixLogic = this;
    }

    //开奖
    openPrix(cards, seconds) {

        //显示开奖结果
        let dePath = "poker(noKing)/";
        if (cards != null && cards != undefined) {
            cards.forEach((card, idx) => {
                // console.log(idx);
                let pathPoker = card.cardType;
                let pathIdx = card.number;

                cc.loader.loadRes(dePath + pathPoker + "/" + pathIdx, (err, poker) => {

                    this.opo.pokers[idx].getComponent(cc.Sprite).spriteFrame = new SpriteFrame(poker);
                })
            })
        }

        //如果在未开奖状态保持显示牌背
        if (seconds != 0) {
            this.opo.pokers.forEach((poker, idx) => {
                cc.loader.loadRes(dePath + "pokerBack", (err, poke) => {

                    poker.getComponent(cc.Sprite).spriteFrame = new SpriteFrame(poke);

                })
            })

        }

    }

    //获取扑克牌
    getPoker() {

        //开奖
        this.opo.oPNode.getComponent(cc.Sprite).schedule(() => {

            let poker = [];
            let pokArr = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

            for (let x = 0; x < 3; x++) {
                let pokerIdx = Math.floor(Math.random() * 13);
                let path = "";
                let dir = "";

                for (let i = 0; i < 4; i++) {
                    let dirN = Math.floor(Math.random() * 4);
                    if (dirN === 0) {
                        dir = "spade/";
                    } else if (dirN === 1) {
                        dir = "heart/";
                    } else if (dirN === 2) {
                        dir = "club/";
                    } else if (dirN === 3) {
                        dir = "block/";
                    }
                }

                path = dir + pokArr[pokerIdx];
                poker.push(path);
                // console.log(poker);
                if (poker[x] == poker[x - 1]) {
                    poker.splice(x, 1);
                    x += 1;
                }
                // console.log(poker)

                if (poker[x] !== undefined) {
                    cc.loader.loadRes("poker(noKing)/" + poker[x], cc.SpriteFrame, (err, poker) => {
                        this.opo.pokers[x].getComponent(cc.Sprite).spriteFrame = poker;
                    })
                }


            }

        }, 1, 9);


    }

}
