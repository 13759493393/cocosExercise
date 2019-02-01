import GraphicsOrg from "./GraphicsOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GraphicsLogic extends cc.Component {

    @property(GraphicsOrg)
    gl: GraphicsOrg = null;

    @property(cc.Integer)
    tNum: number = 0;


    onLoad() {

        //画正方形
        this.graphics();

        //画八卦（通过画圆弧）
        this.paintE();

        //执行animation动画的函数
        // this.nineFunction(999);

        //程序控制动画执行
        this.programControl();

        //开启碰撞
        // this.collideSys();
        //调用碰撞接口
        let manage = cc.director.getCollisionManager();
        //开启碰撞系统
        manage.enabled = true;
        //开启debug碰撞描绘
        manage.enabledDebugDraw = true;
        //显示碰撞边界盒   没什么毛用
        manage.enabledDrawBoundingBox = true;

        //开启物理世界开关
        this.physicSys();

        //col动作
        this.colAnimation();

        /*//执行碰撞回调函数
        let theOther = this.gl.col02.getComponent(cc.Collider);

        this.onCollisionEnter(theOther);
        this.onCollisionStay(theOther);
        this.onCollisionExit(theOther);*/

    }

    //每帧执行检测碰撞函数
    update(){
        this.collisionFunction();
    }

    //检测是否碰撞后执行函数
    collisionFunction(){
        let y1 = this.gl.col01.y;
        let y2 = this.gl.col02.y;

        if(y1-y2<=36 && y1-y2>=-36){
            this.gl.col01.color = cc.Color.RED;
            this.gl.col02.color = cc.Color.BLUE;
        }else {
            this.gl.col01.color = cc.Color.WHITE;
            this.gl.col02.color = cc.Color.WHITE;
        }
    }

    //碰撞产生时候调用
    onCollisionEnter(other) {
        console.log("检测到碰撞");

        this.gl.col01.color = cc.Color.RED;
        this.tNum++;
        console.log(this.tNum);

    }

    //碰撞中调用
    onCollisionStay(other) {
        console.log('在碰撞中');
    }

    //碰撞后调用
    onCollisionExit(other) {
        console.log("碰撞已经结束");
        this.tNum--;
        console.log(this.tNum);
        if (this.tNum === 0) {
            this.gl.col01.color = cc.Color.WHITE;
        }
    }

    graphics() {

        let ctx = this.gl.gNode.getComponent(cc.Graphics);

        //画八卦
        ctx.clear();
        /*ctx.lineWidth = 5;
        ctx.strokeColor = cc.Color.BLACK;*/
        ctx.rect(-250, -250, 500, 500);
        ctx.fillColor = cc.Color.RED;
        ctx.fill();

        /*ctx.lineWidth = 1;
        ctx.strokeColor = cc.Color.BLACK;
        ctx.circle(0,0,120);
        ctx.stroke();*/

        /*ctx.lineWidth = 5;
        ctx.strokeColor = cc.Color.BLACK;
        ctx.rect(-180,-180,360,360);
        ctx.stroke();*/

        ctx.lineWidth = 5;
        ctx.strokeColor = cc.Color.BLACK;
        ctx.moveTo(-180, -72);
        ctx.lineTo(-180, 72);
        ctx.lineTo(-72, 180);
        ctx.lineTo(72, 180);
        ctx.lineTo(180, 72);
        ctx.lineTo(180, -72);
        ctx.lineTo(72, -180);
        ctx.lineTo(-72, -180);
        ctx.lineTo(-180, -72);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeColor = cc.Color.BLACK;
        ctx.moveTo(0, 120);
        ctx.bezierCurveTo(80, 120, 80, 0, 0, 0);
        ctx.bezierCurveTo(-80, 0, -80, -120, 0, -120);
        ctx.bezierCurveTo(160, -120, 160, 120, 0, 120);
        // ctx.stroke();
        ctx.fillColor = cc.Color.BLACK;
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeColor = cc.Color.WHITE;
        ctx.moveTo(0, 120);
        ctx.bezierCurveTo(80, 120, 80, 0, 0, 0);
        ctx.bezierCurveTo(-80, 0, -80, -120, 0, -120);
        ctx.bezierCurveTo(-160, -120, -160, 120, 0, 120);
        // ctx.stroke();
        ctx.fillColor = cc.Color.WHITE;
        ctx.fill();

        ctx.circle(0, 60, 9);
        ctx.fillColor = cc.Color.BLACK;
        ctx.fill();

        ctx.circle(0, -60, 9);
        ctx.fillColor = cc.Color.WHITE;
        ctx.fill();

        //画圆角矩形
        ctx.lineWidth = 3;
        ctx.strokeColor = cc.Color.BLACK;
        ctx.roundRect(200, 200, 150, 100, 30);
        ctx.stroke();

        //画圆弧
        ctx.lineWidth = 3;
        ctx.strokeColor = cc.Color.WHITE;
        ctx.arc(0, 0, 150, 1.5 * Math.PI, 0.5 * Math.PI);
        ctx.close();
        ctx.stroke();

    }

    //画八卦
    paintE() {

        //定义组件
        let paint = this.gl.gNode_E.getComponent(cc.Graphics);

        //画矩形
        paint.rect(-300, -300, 600, 600);
        paint.fillColor = cc.Color.RED;
        paint.fill();

        //画正八边形
        paint.lineWidth = 5;
        paint.strokeColor = cc.Color.BLACK;
        paint.moveTo(-240, -96);
        paint.lineTo(-240, 96);
        paint.lineTo(-96, 240);
        paint.lineTo(96, 240);
        paint.lineTo(240, 96);
        paint.lineTo(240, -96);
        paint.lineTo(96, -240);
        paint.lineTo(-96, -240);
        paint.lineTo(-240, -96);
        paint.stroke();

        //画右边半圆
        paint.arc(0, 0, 180, 0.5 * Math.PI, 1.5 * Math.PI);
        paint.close();
        paint.fillColor = cc.Color.WHITE;
        paint.fill();

        //画左边半圆
        paint.arc(0, 0, 180, 1.5 * Math.PI, 0.5 * Math.PI);
        paint.close();
        paint.fillColor = cc.Color.BLACK;
        paint.fill();

        //画上边大圆
        paint.circle(0, 90, 90);
        paint.fillColor = cc.Color.WHITE;
        paint.fill();

        //画下边大圆
        paint.circle(0, -90, 90);
        paint.fillColor = cc.Color.BLACK;
        paint.fill();

        //画上边小圆
        paint.circle(0, 90, 9);
        paint.fillColor = cc.Color.BLACK;
        paint.fill();

        //画下边小圆
        paint.circle(0, -90, 9);
        paint.fillColor = cc.Color.WHITE;
        paint.fill();

    }

    //动画中的函数
    nineFunction() {
        console.log("执行animation函数");
    }

    //代码控制动画播放
    programControl() {
        let aComp = this.gl.aniNode.getComponent(cc.Animation);
        aComp.play("animation01", 2);

        this.gl.aniNode.getComponent(cc.Label).scheduleOnce(() => {
            aComp.pause("animation01");
        }, 3);

        let ani02 = this.gl.aniNode02.getComponent(cc.Animation);
        ani02.play("animation02", 0.5);

        this.gl.aniNode02.getComponent(cc.RichText).scheduleOnce(() => {
            ani02.pause("animation02");
        }, 5);

        this.gl.aniNode02.getComponent(cc.RichText).scheduleOnce(() => {
            aComp.resume("animation01");
            ani02.resume("animation02");
            console.log("已经恢复动画01的播放");
            console.log("已经恢复动画02的播放");
        }, 7);

        //设置动画播放速度
        aComp.play("animation01").speed = 2;
        ani02.play("animation02").speed = 0.5;

    }


    //碰撞系统
    /*collideSys() {

        //调用碰撞接口
        let manage = cc.director.getCollisionManager();
        //开启碰撞系统
        manage.enabled = true;
        //开启debug碰撞描绘
        manage.enabledDebugDraw = true;
        //显示碰撞边界盒   没什么毛用
        manage.enabledDrawBoundingBox = true;

    }*/

    /*let colliS = this.gl.aniNode.getComponent(cc.Collider);
    let colliO = this.gl.aniNode02.getComponent(cc.Collider);*/

    /*//碰撞开始时执行一次
    onBeginContact(contact, selfCollider, otherCollider) {
        cc.log("onBeginContact!");

        //获取碰撞事件的世界属性
        let worldManifold = contact.getWorldManifold();

        //获取碰撞发生地点的世界坐标，返回json数组，[0:vec2, 1:vec2, ...]
        let points = worldManifold.points;
        //调用碰撞位置点
        console.log(points[0]);
        console.log(points[1]);

    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact, selfCollider, otherCollider) {
        console.log("碰撞结束");
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact, selfCollider, otherCollider) {
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {
    }*/


    //物理系统
    physicSys() {

        //开启物理系统管理器
        cc.director.getPhysicsManager().enabled = true;
        //显示碰撞组件显示范围

        //绘制调试信息
        cc.director.getPhysicsManager().debugDrawFlags = 0;

    }

    //刚体碰撞系统
    onBeginContact(contact,other,selves){
        console.log("刚体开始碰撞")
    }

    colAnimation(){
        let act01 = cc.moveTo(3,0,0);
        let act02 = cc.moveTo(3,0,300);

        let act03 = cc.repeat(cc.sequence(act01,act02),9);
        let act04 = cc.repeat(cc.sequence(act02,act01),9);

        this.gl.col01.runAction(act03);
        this.gl.col02.runAction(act04);

    }

}
