import PhysicOrg from "./PhysicOrg";
import pointEqualToPoint = cc.pointEqualToPoint;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicLogic extends cc.Component {

    @property(PhysicOrg)
    po: PhysicOrg = null;

    onLoad() {
        //开启物理系统
        this.openPhysic();

        //开启碰撞系统
        this.openColSys();

        //执行刚体测试函数
        this.rigidTest();

        //画圆圈
        this.paintCicle();

        //获取刚体质量
        this.getMass();

        //关节旋转运动
        let act001 = cc.rotateTo(3, 0, 360);
        this.po.rot.runAction(act001);

        //获取鼠标位置使刚体跟随鼠标运动
        this.getPos();

        //遥感控制
        this.controlFun();

        //遥感控制
        this.controlFun();

    }

    /*update(){
        //遥感控制
        this.controlFun();
    }*/

    //遥感控制
    controlFun() {

        //画圆圈
        let paint = this.po.controlCircle.getComponent(cc.Graphics);

        paint.lineWidth = 5;
        paint.strokeColor = cc.Color.RED;
        paint.circle(0, 0, 36);
        paint.stroke();

        this.po.controlView.on(cc.Node.EventType.MOUSE_MOVE, (event) => {

            let pos_w = cc.v2(event.getLocation());
            let pos = this.po.controlView.convertToNodeSpaceAR(pos_w);
            this.po.sphere.setPosition(pos);

            let sX = this.po.sphere.x;
            let sY = this.po.sphere.y;
            console.log(sX);
            console.log(sY);

            if (sX >= sY || sX * (-1) >= sY) {
                this.po.moveNode.x += sX * 0.1;
                this.po.moveNode.y += sY*0.1;

            }

            if (sX <= sY || sX <= sY * (-1)) {
                this.po.moveNode.x += sX * 0.1;
                this.po.moveNode.y += sY * 0.1;

            }


        }, this);

        //往左自加
        this.po.left.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.left.getComponent(cc.Sprite).schedule(() => {
                this.po.moveNode.x += -0.36;
            }, 0.1);

        }, this);

        //在节点上离开屏幕时关闭定时器
        /*this.po.left.on(cc.Node.EventType.TOUCH_END, () => {
            this.po.left.getComponent(cc.Sprite).unschedule(() => {
                this.po.moveNode.x += -0.36;
            }, 0.1);

        }, this);*/

        //往右自加
        this.po.right.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.right.getComponent(cc.Sprite).schedule(() => {
                this.po.moveNode.x += 0.36;
            }, 0.1);

        }, this);


        //往上自加
        this.po.top.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.top.getComponent(cc.Sprite).schedule(() => {
                this.po.moveNode.y += 0.36;
            }, 0.1);

        }, this);

        //往下自加
        this.po.bottom.on(cc.Node.EventType.TOUCH_START, () => {
            this.po.bottom.getComponent(cc.Sprite).schedule(() => {
                this.po.moveNode.y -= 0.36;
            }, 0.1);

        }, this);

        this.po.controlView.on(cc.Node.EventType.MOUSE_LEAVE, (event) => {

            this.po.sphere.setPosition(0, 0);
            this.po.moveNode.x += 0;
            this.po.moveNode.y += 0;

        }, this)


    }

    //获取鼠标位置刚体跟随
    getPos() {

        this.po.container.on("mousemove", (event) => {

            let pos_w = cc.v2(event.getLocation());
            let pos = this.po.container.convertToNodeSpaceAR(pos_w);
            this.po.c09.setPosition(pos);

        })

    }

    /*update(){

        //获取刚体质量
        this.getMass();

    }*/

    //开启物理系统
    openPhysic() {

        let pb = cc.director.getPhysicsManager();
        pb.enabled = true;
        pb.debugDrawFlags = 0; //表示不绘制调试信息
        pb.gravity = cc.v2(0, -320); //设置重力参数，默认为-320，即10m/s^2（标准气压下的重力）

        let point = this.po.point.getPosition();
        let point01 = this.po.rectP01.getPosition();
        let point02 = this.po.rectP02.getPosition();
        let re = cc.Rect.fromMinMax(point01, point02);

        console.log(point);
        console.log(point01);
        console.log(point02);
        console.log(re);

        let tpb = pb.testPoint(point);
        let tRe = pb.testAABB(re);

        console.log(tpb);
        console.log(tRe);

        let radial = pb.rayCast(point02, point01, cc.RayCastType.All);
        console.log(radial);

    }

    //开启碰撞系统
    openColSys() {

        /*console.log("已经打开了碰撞系统");
        let cb = cc.director.getCollisionManager();
        cb.enabled = true;
        cb.enabledDebugDraw = true;
        cb.enabledDrawBoundingBox = true;*/

        console.log("已经开启碰撞系统");
        //调用碰撞接口
        let manage = cc.director.getCollisionManager();
        //开启碰撞系统
        manage.enabled = true;
        //开启debug碰撞描绘
        manage.enabledDebugDraw = true;
        //显示碰撞边界盒   没什么毛用
        manage.enabledDrawBoundingBox = true;

    }

    //刚体特性测试
    rigidTest() {

        let rigid01 = this.po.rigid01.getComponent(cc.RigidBody).getMass();
        let rigid02 = this.po.rigid02.getComponent(cc.RigidBody).getMass();
        console.log(rigid01);
        console.log(rigid02);

        //获取移动速度
        let rBase = this.po.rigid01.getComponent(cc.RigidBody);
        let collide = this.po.collide.getComponent(cc.RigidBody);

        let velocity = rBase.linearVelocity;
        let damp = rBase.linearDamping;
        console.log(velocity);
        console.log(damp);

        /*let p02 = this.po.rigid02.getPosition();
        let pw02 = this.po.rigid02.convertToWorldSpaceAR(p02);*/

        //获取旋转速度
        let alv = rBase.angularVelocity;
        console.log(alv);

        //获取旋转速度衰减参数
        let alDamp = rBase.angularDamping;
        console.log(alDamp);

        //固定旋转，刚体在跳动的时候就不会旋转，只会垂直上下跳动
        /*rBase.fixedRotation = true;
        collide.fixedRotation = true;*/

        //开启碰撞监听，调用碰撞函数
        rBase.enabledContactListener = true;

        //获取刚体世界坐标
        let wp01 = rBase.getWorldPosition();
        console.log(wp01);

        //获取刚体世界旋转
        let wr01 = collide.getWorldRotation();
        console.log(wr01);

        //获取刚体质心
        let crb01 = rBase.getLocalCenter();
        let crb02 = rBase.getWorldCenter();

        let ccol01 = collide.getLocalCenter();
        let ccol02 = collide.getWorldCenter();

        console.log(crb01);
        console.log(crb02);
        console.log(ccol01);
        console.log(ccol02);

    }

    //刚体质量获取
    getMass() {

        let c09 = this.po.c09.getComponent(cc.RigidBody);
        let c07 = this.po.c07.getComponent(cc.RigidBody);
        let c03 = this.po.c03.getComponent(cc.RigidBody);
        let c01 = this.po.c01.getComponent(cc.RigidBody);

        let m09 = c09.getMass();
        let m07 = c07.getMass();
        let m03 = c03.getMass();
        let m01 = c01.getMass();

        console.log(m09);
        console.log(m07);
        console.log(m03);
        console.log(m01);

    }

    //画圆圈
    paintCicle() {
        let paint = this.po.graphicNode.getComponent(cc.Graphics);

        /*paint.lineWidth = 5;
        paint.strokeColor = cc.Color.RED;
        paint.moveTo(-600, 350);
        paint.lineTo(600, 350);
        paint.lineTo(600, -350);
        paint.lineTo(-600, -350);
        paint.close();
        paint.stroke();*/

        paint.lineWidth = 9;
        paint.strokeColor = cc.Color.RED;
        paint.arc(0, 0, 350, 0 * Math.PI, 1 * Math.PI);
        paint.stroke();

        let paint02 = this.po.graphicNode01.getComponent(cc.Graphics);

        paint02.lineWidth = 9;
        paint02.strokeColor = cc.Color.RED;
        paint02.arc(0, 0, 350, 1 * Math.PI, 2 * Math.PI);
        paint02.stroke();

    }

    /*//开始碰撞时调用
    onCollisionEnter(other, self) {
        console.log("开始碰撞")
    }

    //在碰撞产生后，在碰撞结束前，每次计算完碰撞结果后调用
    onCollisionStay(other, self) {
        console.log("碰撞产生")
    }

    //当碰撞结束后调用
    onCollisionExit(other, self) {
        console.log("碰撞结束");
    }*/


    // 在函数碰撞体刚开始接触时调用一次 onBeginContact contact selfCollider
    onBeginContact(contact, selfCollide, otherCollide) {
        console.log("开始物理碰撞");
    }

    // 在两个碰撞体结束接触时被调用一次
    onEndContact(contact, setCollide, otherCollide) {
        console.log("物理碰撞结束");
    }

    // 每次要处理碰撞体接触逻辑是被调用
    onPreSolve(contact, selfCollide, otherCollide) {
        console.log("处理物理碰撞逻辑");
    }

    // 每次处理完碰撞体接触时被调用
    onPostSolve(contact, selfCollide, otherCollide) {
        console.log("物理碰撞体接触");
    }


}
