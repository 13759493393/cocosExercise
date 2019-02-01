import Layout = cc.Layout;

const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(cc.Node) candy: cc.Node = null;

    @property(cc.Node) parentNode: cc.Node = null;

    @property(cc.Node) sliderContainer: cc.Node = null;

    @property(cc.Node) pSlider: cc.Node = null;

    @property(cc.Node) sSlider: cc.Node = null;

    @property(cc.Node) slideCandy: cc.Node = null;

    @property([cc.Node]) candies: Array<cc.Node> = [];

    @property(cc.Node) appendNode: cc.Node = null;


    @property(cc.Node) layoutNode: cc.Node = null;

    @property([cc.Node]) layout: Array<cc.Node> = [];

    @property(cc.Node) layoutClick: cc.Node = null;

    @property([cc.Node]) matrix:Array<cc.Node> = [];

    onLoad() {
        this.candyActive();
        this.touchPlay();

        this.layoutTest();

    }

    //糖果跳动动作
    candyActive() {
        let active01 = cc.moveTo(2, 0, 60).easing(cc.easeBounceOut());
        let active03 = cc.moveTo(2, 0, 180).easing(cc.easeBounceOut());
        let active04 = cc.moveTo(2, 0, 300).easing(cc.easeBounceOut());
        let active05 = cc.moveTo(2, 0, 420).easing(cc.easeBounceOut());
        let active02 = cc.jumpTo(2, 0, 0, 30, 5);

        let active7 = cc.sequence(cc.delayTime(0.15), active03);
        let active8 = cc.sequence(cc.delayTime(0.3), active04);
        let active9 = cc.sequence(cc.delayTime(0.5), active05);

        let activeCandy = this.candy;
        // activeCandy.runAction(active01);
        // activeCandy.runAction(active02);
        this.candies[0].runAction(active01);
        this.candies[1].runAction(active7);
        this.candies[2].runAction(active8);
        this.candies[3].runAction(active9);

        let addNode = cc.instantiate(this.appendNode);
        console.log(addNode);

    }

    //触摸执行
    touchPlay() {
        this.pSlider.on(cc.Node.EventType.TOUCH_MOVE, this.slideAnimation, this);
        this.pSlider.on(cc.Node.EventType.TOUCH_START, this.slideAnimation, this);
    }

    //滑动块滑动
    slideAnimation(e) {

        let thePos = this.pSlider.convertToNodeSpaceAR(e.getLocation());
        if (thePos.x < -200) {
            this.slideCandy.x = 0;
            this.sSlider.width = 0
        } else if (thePos.x > 200) {
            this.slideCandy.x = 400;
            this.sSlider.width = 400;
        } else {
            this.slideCandy.x = Math.floor(thePos.x) + 200;
            this.sSlider.width = Math.floor(thePos.x) + 200;
        }

        /*let wordPos = this.pSlider.convertToWorldSpaceAR(thePos);
        let lPos = this.pSlider.convertToNodeSpaceAR(wordPos);*/

        // console.log(thePos);
        /*console.log(wordPos);
        console.log(lPos);*/

    }

    //layout测试
    layoutTest() {
        /*this.layoutNode.getComponent(cc.Layout).type = "VERTICAL";
        this.layoutNode.getComponent(cc.Layout).resizeMode = "CONTAINER";*/
        let count = 0;
        this.layoutClick.on(cc.Node.EventType.TOUCH_START, () => {

            // this.layout[count].active = false;

            if (count % 2 === 0) {
                this.layoutNode.getComponent(cc.Layout).enabled = true;

                this.matrix.forEach((line,lineIdx)=>{
                    line.getComponent(cc.Layout).enabled = true;
                });

                count += 1;
                return;
            }
            if (count % 2 === 1) {
                this.layoutNode.getComponent(cc.Layout).enabled = false;
                this.layout.forEach((node, idx) => {
                    node.y += 300;
                });

                this.matrix.forEach((line,lineIdx)=>{
                    line.getComponent(cc.Layout).enabled = false;
                    line.children.forEach((node,nodeIdx)=>{
                        node.y -= 480;
                    });
                });

                count += 1;
                return;
            }




        })

    }


}
