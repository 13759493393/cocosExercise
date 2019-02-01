const {ccclass, property} = cc._decorator;

@ccclass
export default class HelloWorld extends cc.Component {

    @property(cc.Node)
    rNode: cc.Node = null;

    @property(cc.Node)
    rNodeS:cc.Node = null;

    @property(cc.Node)
    toS01:cc.Node = null;

    @property
    text: string = 'hello';

    onLoad(){

        //设置常驻节点,根节点
        this.setResidentNode();

        //常驻节点，子节点
        // this.setResidentNS();

        //跳转到场景01
        this.toScene01();

    }

    //设置常驻节点,根节点
    setResidentNode(){
        cc.game.addPersistRootNode(this.rNode);

        this.rNode.getComponent(cc.Label).string = "常驻节点测试,根节点";
        console.log(this.rNode.getComponent(cc.Label).string)

    }

    //设置常驻节点，子节点
    /*setResidentNS(){
        cc.game.addPersistRootNode(this.rNodeS);
        this.rNodeS.getComponent(cc.Label).string = "常驻节点测试，子节点";
        console.log(this.rNodeS.getComponent(cc.Label).string);
    }*/

    //跳转到场景01
    toScene01(){
        this.toS01.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("scene01");
        });
    }

}
