import MK from "../MiddleKeys";
import FreeOrganize from "./FreeOrganize";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FreeLogic extends cc.Component {

    @property(FreeOrganize) fo: FreeOrganize = null;

    onLoad() {
        MK.freeLogic = this;
        //霓虹灯动画
        // this.neonAnimation();
        //霓虹灯动画
        this.animationLoop();
    }

    update() {

    }

    //霓虹灯动画
    neonAnimation() {

        //初始化霓虹灯和背景
        this.initNeon(0);

        let i = 1;
        this.fo.MountComponent.schedule(() => {

            if (i < 5) {
                this.initNeon(i);
                i++;
                if (i === 5) {
                    i = 1;
                }
            }
        }, 0.1)
    }

    //初始化霓虹灯和背景
    initNeon(index) {
        //初始化霓虹灯
        this.fo.leftNeon.forEach((neon, idx) => {
            neon.active = false
        });
        this.fo.rightNeon.forEach((neon, idx) => {
            neon.active = false;
        });
        this.fo.lineBgs.forEach((bg, idx) => {
            bg.active = false;
        });
        this.fo.leftNeon[index].active = true;
        this.fo.rightNeon[index].active = true;
        this.fo.lineBgs[index].active = true;
    }

    //动画循环播放
    animationLoop(){
        console.log("动画循环播放");
        let animate01 = this.fo.animateNode1.getComponent(cc.Animation);
        let animate02 = this.fo.animateNode2.getComponent(cc.Animation);
        let ani01 = animate01.play();
        let ani02 = animate02.play();
        ani01.repeatCount = Infinity;
        ani02.repeatCount = Infinity;
    }

}
