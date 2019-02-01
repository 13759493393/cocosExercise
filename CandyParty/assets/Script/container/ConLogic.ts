import MK from "../MiddleKeys";
import ConOrganize from "./ConOrganize";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConLogic extends cc.Component {

    @property(ConOrganize) co: ConOrganize = null;

    onLoad() {

        MK.container = this;

        /*//开启物理
        this.openPhysic();

        //开启碰撞
        this.openCollision();

        //画容器
        // this.paintContainer();

        //画碰撞体
        this.paintCollision();*/

    }

    //画容器
    /*paintContainer() {
        //paint part01
        let paint01 = this.co.part01.getComponent(cc.Graphics);
        paint01.clear();
        paint01.lineWidth = 5;
        paint01.strokeColor = cc.Color.RED;
        paint01.moveTo(-62.5, 525);
        paint01.lineTo(-62.5, -525);
        paint01.lineTo(62.5, -525);
        paint01.lineTo(62.5, 525);
        // paint01.lineTo(-250, 525);
        paint01.stroke();

        //paint part02
        let paint02 = this.co.part02.getComponent(cc.Graphics);
        paint02.clear();
        paint02.lineWidth = 5;
        paint02.strokeColor = cc.Color.RED;
        paint02.moveTo(-62.5, 525);
        paint02.lineTo(-62.5, -525);
        paint02.lineTo(62.5, -525);
        paint02.lineTo(62.5, 525);
        // paint02.lineTo(-125, 525);
        paint02.stroke();

        //paint part03
        let paint03 = this.co.part03.getComponent(cc.Graphics);
        paint03.clear();
        paint03.lineWidth = 5;
        paint03.strokeColor = cc.Color.RED;
        paint03.moveTo(-62.5, 525);
        paint03.lineTo(-62.5, -525);
        paint03.lineTo(62.5, -525);
        paint03.lineTo(62.5, 525);
        // paint03.lineTo(0, 525);
        paint03.stroke();

        //paint part04
        let paint04 = this.co.part04.getComponent(cc.Graphics);
        paint04.clear();
        paint04.lineWidth = 5;
        paint04.strokeColor = cc.Color.RED;
        paint04.moveTo(-62.5, 525);
        paint04.lineTo(-62.5, -525);
        paint04.lineTo(62.5, -525);
        paint04.lineTo(62.5, 525);
        // paint04.lineTo(125, 525);
        paint04.stroke();
    }*/

    //画碰撞体
    paintCollision(){
        let paint = this.co.container.getComponent(cc.Graphics);
        paint.clear();
        paint.lineWidth = 10;
        paint.strokeColor = cc.Color.TRANSPARENT;
        paint.moveTo(0,1050);
        paint.lineTo(0,0);
        paint.lineTo(500,0);
        paint.lineTo(500,1050);
        paint.stroke();
    }

    //开启物理系统
    openPhysic() {
        let pSys = cc.director.getPhysicsManager();
        // console.log("开启物理系统");
        pSys.enabled = true;
        /*pSys.debugDrawFlags = 0;
        pSys.gravity = cc.v2(0,-320);*/

    }

    //开启碰撞体
    openCollision() {
        // console.log("开启碰撞");
        let manager = cc.director.getCollisionManager();
        //开启碰撞系统
        manager.enabled = true;
        /*manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;*/
    }


}
