import AudioOrg from "./AudioOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioLogic extends cc.Component {

    @property(AudioOrg)
    auL:AudioOrg = null;

    onLoad(){

        // this.vPlayerB();

        //音乐点击播放，暂停，停止
        // this.auToDo();

        /*//视频点击播放，暂停，停止
        this.viToDo();*/

        //resources资源音乐播放、暂停、停止
        this.UDELoad();

        //graphics练习
        this.graphicFunc();

    }

    /*//vPlayer绑定事件
    vPlayerB(){
        this.auL.vPlayer.on(cc.Node.EventType.TOUCH_START,(e)=>{

            let vPlayer = e.detail;
            console.log(vPlayer);
            this.auL.vPlayer.getComponent(cc.VideoPlayer).play();

        },this);
    }*/

    //音乐点击播放，暂停，停止
    auToDo(){
        //点击播放
        this.auL.auBtn[0].on(cc.Node.EventType.TOUCH_START,()=>{
            this.auL.aPlayer.play();
            console.log("音乐播放")
        });
        //点击暂停
        this.auL.auBtn[1].on(cc.Node.EventType.TOUCH_START,()=>{
            this.auL.aPlayer.pause();
            console.log("音乐暂停")
        });
        //点击停止
        this.auL.auBtn[2].on(cc.Node.EventType.TOUCH_START,()=>{
            this.auL.aPlayer.stop();
            console.log("音乐停止")
        });
    }

    //使用dom元素加载音频
    UDELoad(){
        cc.loader.load(cc.url.raw("resources/July_Somewhere.mp3?useDom=1"),()=>{
            this.auL.auBtn[0].on(cc.Node.EventType.TOUCH_START,()=>{
                this.auL.aPlayer.play();
                console.log("resources音乐播放")
            });
            this.auL.auBtn[1].on(cc.Node.EventType.TOUCH_START,()=>{
                this.auL.aPlayer.pause();
                console.log("resources音乐暂停")
            });
            this.auL.auBtn[2].on(cc.Node.EventType.TOUCH_START,()=>{
                this.auL.aPlayer.stop();
                console.log("resources音乐停止播放")
            });
        })
    }

    //视频点击播放，暂停，停止
    /*viToDo(){
        //点击播放
        this.auL.viBtn[0].on(cc.Node.EventType.TOUCH_START,()=>{
            console.log("视频播放")
            this.auL.viBtn[0].getComponent(cc.VideoPlayer).play();
        });
        //点击暂停
        this.auL.viBtn[1].on(cc.Node.EventType.TOUCH_START,()=>{
            console.log("视频暂停")
            this.auL.viBtn[1].getComponent(cc.VideoPlayer).pause();
        });
        //点击停止
        this.auL.viBtn[2].on("clicked",()=>{
            console.log("视频停止")
            this.auL.viBtn[2].getComponent(cc.VideoPlayer).stop();
        });
    }*/

    //graphics画布练习
    graphicFunc(){

        let ctx = this.auL.graphicsEx.getComponent(cc.Graphics);


        //画红线
        ctx.clear();
        ctx.lineWidth = 3;
        ctx.strokeColor = cc.Color.RED;
        ctx.moveTo(50,100);
        ctx.lineTo(275,275);
        ctx.stroke();

        //画三次方贝兹曲线
        ctx.lineWidth = 5;
        ctx.strokeColor = cc.Color.CYAN;
        ctx.moveTo(75,100);
        ctx.bezierCurveTo(90,90, 399,100, 275,300);
        ctx.stroke();

        //画二次方贝兹曲线
        ctx.lineWidth = 5;
        // ctx.strokeColor = cc.color(255,0,216,0.7);
        // ctx.strokeColor = cc.Color.rgb2hsv(255,0,216);
        ctx.strokeColor = cc.Color.MAGENTA;
        ctx.moveTo(100,100);
        ctx.quadraticCurveTo(399,100, 300,300);
        ctx.stroke();

        //画绿圈
        // ctx.clear();
        ctx.circle(300,300,19);
        ctx.fillColor = cc.Color.GREEN;
        ctx.fill();

        //画蓝圈
        // ctx.clear();
        ctx.circle(100,100,19);
        ctx.fillColor = cc.Color.BLUE;
        ctx.fill();


    }



}
