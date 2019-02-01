const {ccclass, property} = cc._decorator;

@ccclass
export default class Scene01 extends cc.Component {

    @property(cc.Node)
    toS02: cc.Node = null;

    onLoad(){

       //跳转到场景02
        this.toScene02();

        //获取常驻节点挂载信息
        this.getInfo();


    }

    //跳转到场景02
    toScene02(){
        this.toS02.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("scene02");
        });
    }

    //获取常驻节点挂载信息
    getInfo(){
        let thisN = cc.find("residentNode01");
        console.log(thisN.getComponent(cc.Label).string);
        /*let thisNS = cc.find("Canvas/residentNode02");
        console.log(thisNS.getComponent(cc.Label).string);*/
    }

}
