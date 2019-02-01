import FBFOrg from "./FBFOrg";
import Sprite = cc.Sprite;
import SpriteFrame = cc.SpriteFrame;
import easeInOut = cc.easeInOut;
import sequence = cc.sequence;
import easeQuinticActionInOut = cc.easeQuinticActionInOut;
import textureCache = cc.textureCache;
import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class FBFLogic extends cc.Component {

    @property(FBFOrg)
    FBFO: FBFOrg = null;

    onLoad() {

        //逐帧动画
        this.fBFAnimation();

        //加载远程资源
        this.loadResource();

        //动作动画
        // this.toAction();

        //点击改变颜色和不透明度
        this.changeCO();

        //加载啊全部资源
        this.loadAllRes();

        //展示所有扑克牌
        this.showAllPoker();

        //加载百度图片
        this.loadBdImg();

        //获取鼠标位置坐标
        this.getPos();

        //键盘事件
        this.keyEvent();

        /*//重力事件
        this.devEvent();*/

        /*//加载hero图片
        this.loadLocalImg();*/

        //缓动动作
        this.easeAction();

    }

    //逐帧动画
    fBFAnimation() {

        /*let posX = 0;
        let posY = 0;
        let rot = 0;*/

        let sw = 0;

        // console.log(this.FBFO.imgNode);

        this.FBFO.imgNode.getComponent(cc.Sprite).schedule(() => {

            if (this.FBFO.imgNode.x <= 360 && sw === 0) {
                this.FBFO.imgNode.x += 5;
                this.FBFO.imgNode.rotationX += 5;
                this.FBFO.imgNode.rotationY += 5;


                if (this.FBFO.imgNode.x === 360) {
                    sw = 1;
                }

            } else if (this.FBFO.imgNode.x >= 0 && sw === 1) {

                this.FBFO.imgNode.x -= 5;
                this.FBFO.imgNode.rotationX -= 5;
                this.FBFO.imgNode.rotationY -= 5;

                if (this.FBFO.imgNode.x === 0) {
                    sw = 0;
                }
            }


        }, 0.5)

    }

    //加载远程资源
    loadResource() {

        // this.FBFO.imgNode.getComponent(cc.Sprite).spriteFrame

        let imgURL = "http://img.tiangu95.com/upload/20181023/f716282bf29d47f6a33f9adc80eb3d92.png";
        // cc.loader.load({url:imgURL,type:".jpeg"}, (img) => {
        cc.loader.load(imgURL, (err, img) => {

            this.FBFO.imgNode.getComponent(cc.Sprite).spriteFrame = new SpriteFrame(img);
        })

    }

    //action动作练习
    toAction() {
        let n = this.FBFO.imgNode;
        let action = cc.moveBy(3, 350, 350);
        let hide = cc.hide();
        let action_ease = action.easing(easeQuinticActionInOut());

        let seq = cc.sequence(action, hide);
        let spa = cc.spawn(action, hide);


        // n.runAction(action_ease);
        // n.runAction(spa);


        let spa_s = cc.speed(sequence(
            cc.spawn(
                cc.scaleTo(0.5, 0.8, 1.2),
                cc.moveTo(0.5, 0, 200)
            ),
            cc.spawn(
                cc.scaleTo(1, 1, 1),
                cc.moveTo(1, 0, 0)
            ),
            // cc.delayTime(0.5),
            cc.spawn(
                cc.scaleTo(0.5, 1.2, 0.8),
                cc.moveTo(0.5, 0, -200)
            ),
            cc.spawn(
                cc.scaleTo(1, 1, 1),
                cc.moveTo(1, 0, 0)
            )
            // 以1/2的速度慢放动画，并重复5次
        ).repeat(5), 0.5);

        n.runAction(spa_s)

    }

    //点击改变颜色和不透明度
    changeCO() {

        //绑定触摸事件
        this.FBFO.btn.on(cc.Node.EventType.TOUCH_START, () => {
            this.FBFO.changeCO.color = cc.Color.BLUE;
            this.FBFO.changeCO.opacity = 150;
        })

    }

    //加载文件夹下的所有资源
    loadAllRes() {
        cc.loader.loadResDir("poker(noKing)", (err, poker, urls) => {
            console.log(err);
            console.log(poker[40]);
            console.log(urls[40]);
        })
    }

    //展示所有扑克牌
    showAllPoker() {
        cc.loader.loadResDir("poker(noKing)", (err, poker, urls) => {

            let i = 0;

            this.FBFO.showPokers.getComponent(cc.Sprite).schedule(() => {
                if (i < poker.length) {

                    let pbIdx = urls.indexOf("poker(noKing)/pokerBack");
                    if (poker[pbIdx]) {
                        poker.splice(pbIdx, 2);
                        // console.log(poker.splice(pbIdx,2));
                    }

                    this.FBFO.showPokers.getComponent(cc.Sprite).spriteFrame = new SpriteFrame(poker[i]);
                    i += 2;

                    cc.loader.release(poker[i - 4]);

                    //释放图片资源
                    /*let uImg = cc.loader.getDependsRecursively("prefab/pokers")
                    let idx = uImg.indexOf(texture2d._uuid);
                    if(idx === -1){
                        uImg.splice(idx, 1);
                    }
                    cc.loader.release(uImg);*/
                    // cc.delayTime(0.4);


                }
            }, 0.5, 9)

        });

    }

    //重新加载图片
    loadBdImg() {

        // let bImgUrl = "http://seopic.699pic.com/photo/50025/6650.jpg_wh1200.jpg";
        let bImgUrl = "http://img.tiangu95.com/upload/20181023/f716282bf29d47f6a33f9adc80eb3d92.png";
        let bdImg = cc.loader.load(bImgUrl, (err, img) => {
            this.FBFO.loadBdImg.getComponent(cc.Sprite).spriteFrame = new SpriteFrame(img);
        });

    }

    //获取鼠标位置
    getPos() {

        this.FBFO.container.on("mousemove", (event) => {
            let pos_w = cc.v2(event.getLocation());
            let pos = this.FBFO.container.convertToNodeSpaceAR(pos_w);
            this.FBFO.loadBdImg.setPosition(pos);

        }, this);

        /*this.FBFO.loadBdImg.on("mousedown", (event) => {
            let pos_this = cc.v2(event.getLocation());
            let pp = this.FBFO.container.convertToNodeSpaceAR(pos_this);

            let pos = this.FBFO.loadBdImg.parent.convertToWorldSpaceAR(this.FBFO.loadBdImg.position);

            this.FBFO.loadBdImg.setPosition(pp);
        }, this)*/

    }

    /*getNoePos(curNode: cc.Node, targetNode: cc.Node) {
        var worldPs = curNode.parent.convertToWorldSpaceAR(curNode.position);
        var pos = targetNode.convertToNodeSpaceAR(worldPs);
        return pos;
    }*/

    //键盘事件
    keyEvent(){

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,()=>{
            this.onKeyDown(event)
        },this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,()=>{
            this.onKeyUp(event)
        },this);
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.KEY.a:
                console.log('Press a key');
                break;
        }
    }

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.KEY.a:
                console.log('release a key');
                break;
        }
    }

    //加载hero图片
    loadLocalImg(){
        let absPath = "hero";
        cc.loader.loadRes(absPath,cc.SpriteFrame,(err,img)=>{
            img.scaleX = 0.5;
            img.scaleY = 0.5;
            this.FBFO.localImg.getComponent(cc.Sprite).spriteFrame = img;
            this.FBFO.localImg.width = 960;
            this.FBFO.localImg.height = 640;
        })
    }

    //重力事件
    devEvent(){
        // cc.setAccelerometerEnabled(true);
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION,()=>{
            this.onDeviceMotionEvent(event);
        },this)
    }

    //注册重力事件
    onDeviceMotionEvent(event){
        cc.log(event.acc.x + "   " + event.acc.y);
    }


    //缓动动作
    easeAction(){

        let act01 = cc.moveBy(3,300,300);
        let act02 = act01.easing(cc.easeIn(3));
        let act03 = act01.easing(cc.easeBounceInOut());
        let act04 = act01.easing(cc.easeInOut(3));
        let act05 = act01.easing(cc.easeCircleActionInOut());
        let act06 = act01.easing(cc.easeBackOut());
        let act07 = act01.easing(cc.easeBackInOut());
        let act08 = act01.easing(cc.easeBezierAction(9,3,3,9));
        let act09 = act01.easing(cc.easeQuinticActionInOut());

        this.FBFO.loadBdImg.runAction(act02);
    }

}
