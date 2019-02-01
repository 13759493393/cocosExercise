import GameOrg from "./GameOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {

    @property(GameOrg)
    gl:GameOrg = null;

    onLoad(){

        //遍历扑克
        this.pokerArr();

        //按钮绑定事件
        this.pokerAnimate();

    }

    //发牌动画
    pokerAnimate(){
        this.gl.pokers.forEach((poker)=>{
            poker.active = false
        });
        let i=0;
        this.gl.pokerContainer.getComponent(cc.Sprite).schedule(()=>{

            if(i<this.gl.pokers.length){
                this.gl.pokers[i].active = true;
                ++i;
            }

        },0.5,17,1);

    }
    //遍历扑克牌
    pokerArr(){

        let times = [];
        for(let i=0;i<this.gl.pokers.length;++i){
            times.push(0);
        }

        // console.log(times)

        this.gl.pokers.forEach((poker,idx)=>{
            poker.on(cc.Node.EventType.TOUCH_START,()=>{

                // this.gl.pokers[idx].y = 15;

            });
            poker.on(cc.Node.EventType.MOUSE_LEAVE,()=>{

                ++times[idx];
                // console.log(times)
                if(times[idx]%2 === 1){
                    this.gl.pokers[idx].y = 15;
                }else if(times[idx]%2 ===0){
                    this.gl.pokers[idx].y = 0;
                }

            })
        });

        //按钮绑定事件
        this.gl.sure.on(cc.Node.EventType.TOUCH_START,(e)=>{

            //点击确定前清空出牌显示的子元素
            this.gl.topContainer.removeAllChildren(false);

            this.gl.pokers.forEach((poker)=>{

                if(poker.y === 15){
                    poker.active = false;
                    poker.y = 0;
                    poker.parent = this.gl.topContainer;

                    this.gl.topContainer.children.forEach((poker)=>{
                        poker.active = true;
                        poker.on(cc.Node.EventType.TOUCH_START,()=>{
                            poker.y = 0;
                        });
                        poker.on(cc.Node.EventType.MOUSE_LEAVE,()=>{
                            poker.y = 0;
                        })
                    });
                }
            })
        });

        this.gl.cancel.on(cc.Node.EventType.TOUCH_START,(e)=>{
            this.gl.pokers.forEach((poker,idx)=>{
                poker.y = 0;
                times[idx] = 0;
            });
        })

    }

    //初始化牌宽
    pokerWidth(){
        this.gl.pokers.forEach((poker)=>{

            poker.width = 45;
            this.gl.pokerContainer.width = 765;

        });


    }


}
