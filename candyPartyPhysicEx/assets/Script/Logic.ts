import Orgnization from "./Orgnization";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Logic extends cc.Component {

    @property(Orgnization)
    ooo:Orgnization = null;

    onLoad(){
        //开启物理
        this.openPhysic();
        //开启碰撞
        this.openCollision();
        //画碰撞
        this.paintContainer();

    }

    //开启物理
    openPhysic(){
        let openPhysic = cc.director.getPhysicsManager();
        console.log("开启物理")
        openPhysic.enabled = true;
    }

    //开启碰撞
    openCollision(){
        let manager = cc.director.getCollisionManager();
        console.log("开启碰撞")
        manager.enabled = true;

    }

    paintContainer(){
        let paint = this.ooo.container.getComponent(cc.Graphics);
        paint.strokeColor = cc.Color.RED;
        paint.lineWidth = 5;
        paint.moveTo(-430,310);
        paint.lineTo(-430,-310);
        paint.lineTo(430,-310);
        paint.lineTo(430,310);
        paint.stroke();
    }


}
