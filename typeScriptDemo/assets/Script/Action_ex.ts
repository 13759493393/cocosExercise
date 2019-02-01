const {ccclass, property} = cc._decorator;
// const  axios = require（"https://unpkg.com/axios/dist/axios.min.js"）

@ccclass
export default class Action_ex extends cc.Component {

    @property([cc.Node])
    actNodes:Array<cc.Node> = [];

    @property(cc.Node)
    stopActNode:cc.Node = null;

    @property(cc.Node)
    toA:cc.Node = null;

    @property(cc.Node)
    toPerC:cc.Node = null;


    onLoad () {

        //执行action
        this.actFunction();

        //切换到场景A
        this.toggleToA();

        //切换到个人中心
        this.toggleToPerc();

        //获取sys
        this.getSys();

    };

    //切换到a场景
    toggleToA(){
        this.toA.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("a")
        })
    }

    //切换到个人中心场景
    toggleToPerc(){
        this.toPerC.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("personalCentric")
        })
    }


    //action
    actFunction(){
        let act01 = cc.moveTo(2,0,300);
        let act02 = cc.moveBy(2,300,300);
        let act03 = cc.rotateBy(2,300,300);
        let act04 = cc.sequence(act02,cc.moveBy(2,0,-300));
        let act05 = cc.spawn(act02,act03);
        let act06 = cc.repeat(
            cc.sequence(
                cc.moveBy(2, 200, 0),
                cc.moveBy(2, -200, 0)
            ), 5);
        let act07 = cc.scaleBy(2,0.5,0.7);

        this.actNodes[0].runAction(act06);
        this.actNodes[1].runAction(act07);
        this.actNodes[2].runAction(act04);
        this.actNodes[3].runAction(act05);

        this.stopActNode.getComponent(cc.Sprite).scheduleOnce(()=>{
            this.actNodes[0].stopAction(act02);
            this.actNodes[1].stopAction(act03);
            this.actNodes[2].stopAction(act04);
            this.actNodes[3].stopAction(act05);
        },20);

    };

    //请求练习
    requestFunction(){

    }

    //sys练习
    getSys(){
        let language = cc.sys.LANGUAGE_CHINESE;
        let os = cc.sys.OS_ANDROID;
        let bOs = cc.sys.BROWSER_TYPE_ANDROID;
        let lanNow = cc.sys.now();
        let garB = cc.sys.garbageCollect();
        let dump = cc.sys.dump();

        // let batteryL = cc.sys.getBatteryLevel();

        cc.sys.localStorage.setItem("localV",lanNow);
        console.log("localStorge的值是："+cc.sys.localStorage.getItem("localV"));


        this.stopActNode.getComponent(cc.Sprite).scheduleOnce(()=>{
            cc.sys.openURL("http://www.baidu.com");
        },25);

        console.log(language);
        console.log(os);
        console.log(bOs);
        console.log(lanNow);
        console.log(garB);
        console.log(dump);


    }

}
