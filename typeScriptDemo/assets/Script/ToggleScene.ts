const {ccclass, property} = cc._decorator;

@ccclass
export default class ToggleScene extends cc.Component {

    @property(cc.Node)
    toNewScene: cc.Node = null;

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Node)
    PRNode: cc.Node = null;

    @property(cc.Node)
    thisNode:cc.Node = null;

    @property(cc.Node)
    targetNode:cc.Node = null;

    @property(cc.Node)
    dispatchNode:cc.Node = null;

    @property(cc.SpriteFrame)
    sprite:cc.SpriteFrame = null;

    @property(cc.Node)
    cloneN:cc.Node = null;

    @property(cc.Prefab)
    crePre:cc.Prefab = null;

    @property(cc.Prefab)
    poolNode:cc.Prefab = null;

    @property(cc.Node)
    nodeTree:cc.Node = null;

    @property([cc.Node])
    actNodes:Array<cc.Node> = [];

    @property(cc.Node)
    toActionS:cc.Node = null;

    onLoad(){
        this.toggleScene();

        //坐标装换
        this.changePos(this.thisNode,this.targetNode);

        //预置监听事件
        this.preEmitEvent();

        //预置派送事件
        this.preDEvent();

        //阻止派送事件冒泡
        // this.DEvent();

        //websocket网络协议
        this.wSocket();

        //创建新节点
        this.createNode();

        //克隆已有和设置预置
        this.cloneAndPre();

        //销毁节点
        this.destroyN();

        //对象池
        this.objPool();

        //action
        // this.actFunc();

        //切换到action场景
        this.toggleToActiveS();

    }

    start(){
        //发射监听事件
        this.emitEvent();
    }

    //场景切换
    toggleScene(){
        this.toNewScene.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("personalCentric");
            console.log("已经切换到个人中心场景")
        })
    }

    toggleToActiveS(){
        this.toActionS.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("action_ex");
            console.log("已经切换到action场景")
        })
    }

    //当前节点转换成目标节点
    changePos(CNode:cc.Node,TNode:cc.Node){
        let WPos = CNode.convertToWorldSpaceAR(CNode.position);
        let TPos = TNode.convertToNodeSpaceAR(WPos);

        this.targetNode.getComponent(cc.Sprite).scheduleOnce(()=>{
            this.targetNode.setPosition(100,100);
        },3);


        console.log(CNode.position);
        console.log(WPos);
        console.log(TNode.position);
        console.log(TPos);
        return TPos;
    }

    //坐标转化方法
    getNoePos(curNode: cc.Node, targetNode: cc.Node) {
        var worldPs = curNode.parent.convertToWorldSpaceAR(curNode.position);
        var pos = targetNode.convertToNodeSpaceAR(worldPs);
        return pos;
    }

    //设置常驻节点
    //预置发射事件
    preEmitEvent(){
        this.targetNode.on("EmitE",(event)=>{
            console.log(event.detail.msg)
        })
    }

    //发射事件
    emitEvent(){
        this.targetNode.getComponent(cc.Sprite).scheduleOnce((event)=>{
            this.targetNode.emit("EmitE",{
                msg:"this is emit event !"
            })

        },3);
    }

    //预置派送事件
    preDEvent(){
        this.dispatchNode.dispatchEvent(new cc.Event.EventCustom("dispatchE",true));
        console.log("事件向上传递到根元素");
        this.DEvent();
    }

    //派送事件(阻止冒泡)
    DEvent(){
        this.thisNode.on("dispatchE",(event)=>{
            event.stopPropagation();
            console.log("阻止事件派送，传递到中间元素");
            console.log(event.currentTarget);
        })
    }

    //WebSocket网络协议
    wSocket(){
        let ws = new WebSocket("ws://echo.websocket.org");
        ws.onopen = (event)=>{
            console.log("onopen event is todo")
        };
        ws.onmessage = (event)=>{
            console.log("onmessage event is todo")
        }
    }

    //创建新节点
    createNode(){
        let cNode = new cc.Node("button");
        let btn = cNode.addComponent(cc.Sprite);
        btn.spriteFrame = this.sprite;
        cNode.parent = this.targetNode;
        console.log(cNode)

        /*var node = new cc.Node('Sprite');
        var sp = node.addComponent(cc.Sprite);

        sp.spriteFrame = this.sprite;
        node.parent = this.node;*/

    }

    //克隆已有节点和设置预置节点
    cloneAndPre(){
        let scene = cc.director.getScene();
        let cloneNode = cc.instantiate(this.cloneN);
        cloneNode.parent = scene;
        cloneNode.setPosition(500,500);

        console.log("克隆已有成功");

        let creP = cc.instantiate(this.crePre);
        creP.parent = this.targetNode;
        creP.setPosition(300,300);
        console.log("设置预置成功");

    }

    //销毁节点
    destroyN(){
        this.targetNode.getComponent(cc.Sprite).scheduleOnce(()=>{
            this.sprite.destroy();
            this.crePre.destroy();
            this.cloneN.destroy();
        },5);
    }

    //对象池
    objPool(){
        let pool = new cc.NodePool();
        let count = 5;
        for(let i=0;i<=count;i++){
            let theNode = cc.instantiate(this.poolNode);
            pool.put(theNode);
        }

        //判断节点池中是否有节点
        let poolN = null;
        if(pool.size()>0){
            poolN = pool.get();
        }else{
            poolN = cc.instantiate(this.poolNode);
        }
        poolN.parent = this.nodeTree;
        // poolN.getComponent("PoolN").init();

        console.log(pool.size());
        console.log(poolN);

        //销毁的节点放入对象池
        pool.put(poolN);

        pool.clear();
        console.log(pool.size());

    }


    //action
    /*actFunc(){
        let act01 = cc.moveTo(2,500,500);
        let act02 = cc.rotateTo(2,360,360);
        let act03 = cc.sequence(act01,cc.moveTo(2,500,-500));
        let act04 = cc.spawn(act01,act02);

        this.actNodes[0].runAction(act01);
        this.actNodes[1].runAction(act02);
        this.actNodes[2].runAction(act03);
        this.actNodes[3].runAction(act04);

    }*/

    //遍历actNode
    /*actNode(index){
        this.actNodes.forEach((nod,idx)=>{
            nod.active = false;
        });
        this.actNodes[index].active = true;
    }*/




}
