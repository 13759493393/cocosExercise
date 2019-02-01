import RockerOrg from "./RockerOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RockerLogic extends cc.Component {

    @property(RockerOrg)
    ro: RockerOrg = null;

    onLoad() {
        //动作绑定
        this.actionBind();

    }

    update() {

        //执行八个方向
        this.eightArea();
        //执行四个方向
        // this.fourArea();
        //执行所有方向
        // this.allArea();

    }

    //动作绑定
    actionBind() {
        this.ro.panel.on(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.ro.panel.on(cc.Node.EventType.TOUCH_END, this.onEnd, this);
        this.ro.panel.on(cc.Node.EventType.TOUCH_CANCEL, this.onEnd, this);
    }

    //摇杆跟随
    onMove(e) {
        let pos = this.ro.panel.convertToNodeSpaceAR(e.getLocation());
        let radius = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
        if (this.ro.background.width / 2 >= radius) {
            this.ro.front.setPosition(pos);
        } else {
            //atan2()函数返回点与x轴的夹角，语法为atant2(y,x) *注意是先y轴再x轴
            let posX = Math.cos(Math.atan2(pos.y, pos.x)) * (this.ro.background.width / 2);
            let posY = Math.sin(Math.atan2(pos.y, pos.x)) * (this.ro.background.width / 2);
            this.ro.front.setPosition(posX, posY);
        }
        //把角度转换成度数形式
        this.ro.angel = Math.atan2(pos.x, pos.y) * (180 / Math.PI);

        //移动物体根据角度旋转相应的角度
        //rotation是默认绕Z轴旋转
        this.ro.moveObj.rotation = this.ro.angel;

        //设置速度
        this.ro.speed = Math.sqrt(Math.pow(this.ro.front.x, 2) + Math.pow(this.ro.front.y, 2)) / 100;

    }

    //触摸结束
    onEnd(e) {
        this.ro.front.setPosition(0, 0);
        this.ro.angel = 0;
    }

    //四个区域
    fourArea() {
        //因为this.ro.angel是根据三角形正弦函数产生的，所以在0到180度之间
        if (this.ro.angel >= 45 && this.ro.angel <= 135) {
            this.ro.moveObj.x += this.ro.speed;
        } else if (this.ro.angel >= -135 && this.ro.angel <= -45) {
            this.ro.moveObj.x -= this.ro.speed;
        } else if (this.ro.angel > -45 && this.ro.angel < 0 || this.ro.angel > 0 && this.ro.angel < 45) {
            this.ro.moveObj.y += this.ro.speed;
        } else if (this.ro.angel > 135 && this.ro.angel < 180 || this.ro.angel > -180 && this.ro.angel < -135) {
            this.ro.moveObj.y -= this.ro.speed;
        }
    }

    //八个区域
    eightArea() {
        if (this.ro.angel > 0 && this.ro.angel <= 22.5 || this.ro.angel > -22.5 && this.ro.angel < 0) {
            this.ro.moveObj.y += this.ro.speed;
        } else if (this.ro.angel > 157.5 && this.ro.angel < 180 || this.ro.angel > -180 && this.ro.angel < -157.5) {
            this.ro.moveObj.y -= this.ro.speed;
        } else if (this.ro.angel > 67.5 && this.ro.angel < 112.5) {
            this.ro.moveObj.x += this.ro.speed;
        } else if (this.ro.angel < -67.5 && this.ro.angel > -112.5) {
            this.ro.moveObj.x -= this.ro.speed;
        } else if (this.ro.angel > 22.5 && this.ro.angel < 67.5) {
            this.ro.moveObj.x += this.ro.speed / 1.414;
            this.ro.moveObj.y += this.ro.speed / 1.414;
        } else if (this.ro.angel > 112.5 && this.ro.angel < 157.5) {
            this.ro.moveObj.x += this.ro.speed / 1.414;
            this.ro.moveObj.y -= this.ro.speed / 1.414;
        } else if (this.ro.angel > -67.5 && this.ro.angel < -22.5) {
            this.ro.moveObj.x -= this.ro.speed / 1.414;
            this.ro.moveObj.y += this.ro.speed / 1.414;
        } else if (this.ro.angel > -157.5 && this.ro.angel < -112.5) {
            this.ro.moveObj.x -= this.ro.speed / 1.414;
            this.ro.moveObj.y -= this.ro.speed / 1.414;
        }
    }

    //所有区域
    allArea() {
        if (this.ro.angel === 0) {
            return;
        }
        this.ro.moveObj.x += Math.cos(this.ro.angel * (Math.PI / 180)) * this.ro.speed;
        this.ro.moveObj.y += Math.sin(this.ro.angel * (Math.PI / 180)) * this.ro.speed;
    }

}
