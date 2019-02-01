import MK from "./../MiddleKeys";
import GameOrganize from "./GameOrganize";
import SpriteFrame = cc.SpriteFrame;
import hide = cc.hide;

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {

    @property(GameOrganize) go: GameOrganize = null;

    //通关道具位置
    passToolPos = new Array();

    //通关道具数
    passToolNum = 0;

    //消除糖果
    hideCandiesPos = new Array();

    //是否已经托管
    couldDeposit = false;

    //游戏局数
    gameNumber = 1;

    onLoad() {
        MK.gameLogic = this;

        //点击托管
        this.deposit();
    }

    //托管
    deposit() {

        //点击后就不可以托管
        this.go.deposit.on(cc.Node.EventType.TOUCH_START, () => {

            //如果还没开始游戏，托管点击无效
            this.go.grayDeposit.active = true;
            this.go.deposit.active = false;
            this.couldDeposit = true;
            console.log("已经托管");

        });

        //点击后就可以托管
        this.go.grayDeposit.on(cc.Node.EventType.TOUCH_START, () => {

            let isDeposit = MK.popLogic.isDeposit;

            if (isDeposit == false) {
                console.log("不可以托管");
                return;
            }

            console.log("已经取消托管");
            this.go.grayDeposit.active = false;
            this.go.deposit.active = true;
            this.couldDeposit = false;
        })

    }

    //处理消息
    changeCandy(theMsg) {

        console.log("消息数为：" + MK.candyDispatch.messageLength());
        console.log(theMsg);

        let firstM = theMsg.firstMatrix;
        let secondM = theMsg.secondMatrix;
        let resultM = theMsg.result;
        let appendM = theMsg.appendSecond;
        let changeM = theMsg.change;
        let type = theMsg.type;
        let level = theMsg.lv;

        if (level == 3) {
            this.go.firstContainer.x = -360;
            this.go.secondContainer.x = -360;
            this.go.appendContainer.x = -360;
        } else {
            this.go.firstContainer.x = -240;
            this.go.secondContainer.x = -240;
            this.go.appendContainer.x = -240;
        }

        // this.go.appendContainer.y = 800;

        //初始化用户总分和得分
        let userScores = theMsg.userScore;
        if (userScores > 100000000) {
            userScores = Math.floor(userScores / 100000000) + "亿";
        } else if (userScores > 10000) {
            userScores = Math.floor(userScores / 10000) + "万";
        } else {
            userScores = "" + userScores;
        }

        this.go.userScore.getComponent(cc.RichText).string = `<color=#ffffff><b>${userScores}</b></color>`;
        this.go.getScore.getComponent(cc.Label).string = theMsg.totalScore;

        let newFirstM = new Array();
        let newSecondM = new Array();
        let newResultM = new Array();

        if (firstM != null && firstM != undefined) {
            newFirstM = firstM[0].map((col, i) => {
                return firstM.map((cow) => {
                    return cow[i];
                })
            });
            newFirstM.forEach((line, lineIdx) => {
                line.reverse();
            })
        }

        if (secondM != null && secondM != undefined) {
            newSecondM = secondM[0].map((col, i) => {
                return secondM.map((cow) => {
                    return cow[i];
                })
            });
            newSecondM.forEach((line, lineIdx) => {
                line.reverse();
            })
        }

        if (resultM != null && resultM != undefined) {
            newResultM = resultM[0].map((col, i) => {
                return resultM.map((cow) => {
                    return cow[i];
                })
            });
            newResultM.forEach((line, lineIdx) => {
                line.reverse();
            })
        }

        switch (type) {

            case "GAME_START":
                this.firstMCandies(newFirstM, level);
                this.secondMCandies(newSecondM, level);
                break;
            case "GAME_OVER":
                this.gameOver();
                break;
            case "XIAOCHU":
                /*this.markNode(newResultM);
                this.destroyCandy(newResultM);*/
                this.firstInGame(newFirstM, newResultM, level);
                this.secondInGame(changeM, newSecondM, level);
                this.appendInGame(appendM, level);

                break;
            case "PASS_TOOLS":
                this.passToolPos = new Array();
                this.passCandy();
                break;
        }

        if (MK.candyDispatch.messageLength() == 0) {
            if (level == 3 && level == 0) {

                console.log("第三关，没有推送gameOver消息的时候执行");
                //显示确定和下注按钮
                this.go.btnsNode.active = true;
                this.go.btns[0].active = true;
                this.go.btns[1].active = true;

                //当确定和注数按钮显示之后就不可以托管
                this.go.grayDeposit.active = true;
                this.go.deposit.active = false;
                //不托管
                this.couldDeposit = false;
                //不可以托管
                MK.popLogic.isDeposit = false;
            }
        }


    }

    //实例化第一矩阵糖果
    firstMCandies(msg, level) {

        msg.forEach((line, lineIdx) => {
            let col = cc.instantiate(this.go.colCandies);
            this.go.firstContainer.addChild(col);
            col.x = 120 * lineIdx + 60;
            col.y = 0;

            line.forEach((num, numIdx) => {

                if (num == 0) {
                    let pToolPos = [lineIdx, numIdx];
                    this.passToolPos.push(pToolPos);
                }

                let candy;
                let thisNum = num;
                if (thisNum == 0) {
                    thisNum = 0;
                } else {
                    if (level == 1) {
                        thisNum = num;
                    } else if (level == 2) {
                        thisNum += 5;
                    } else if (level == 3) {
                        thisNum += 10;

                    }
                }

                candy = cc.instantiate(this.go.allCandies[thisNum]);
                candy.name = "candy";
                col.addChild(candy);
                candy.x = 0;
                candy.y = 120 * numIdx + 1000;

                let action = cc.moveTo(1, 0, 120 * numIdx).easing(cc.easeBounceOut());
                let active = cc.sequence(cc.delayTime((lineIdx + 1) * 0.125), action);
                candy.runAction(active);
            });

        });
    }

    //实例化第二矩阵糖果
    secondMCandies(msg, level) {

        msg.forEach((line, lineIdx) => {
            let col = cc.instantiate(this.go.colCandies);
            this.go.secondContainer.addChild(col);
            col.x = 120 * lineIdx + 60;
            col.y = 0;
            line.forEach((num, numIdx) => {
                let candy;
                let thisNum = num;
                if (thisNum == 0) {
                    thisNum = 0;
                } else {
                    if (level == 1) {
                        thisNum = num;
                    } else if (level == 2) {
                        thisNum += 5;
                    } else if (level == 3) {
                        thisNum += 10;

                    }
                }
                candy = cc.instantiate(this.go.allCandies[thisNum]);

                candy.name = "candy";
                col.addChild(candy);
                candy.x = 0;
                candy.y = 120 * numIdx + 1000;

                let action = cc.moveTo(1, 0, 120 * numIdx).easing(cc.easeBounceOut());
                let active = cc.sequence(cc.delayTime((lineIdx + 1) * 0.125), action);
                candy.runAction(active);

            });
        });
    }

    //下落完后销毁所有矩阵节点重新创建
    rebuildFirst(msg, level) {

        //初始化通关道具位置矩阵
        this.passToolPos = new Array();

        //销毁第一矩阵所有节点
        this.go.firstContainer.children.forEach((line, lineIdx) => {
            line.children.forEach((node, nodeIdx) => {
                let destroyNode = cc.callFunc(function (node) {
                    node.destroy();
                    node.removeFromParent(true);
                }, this, node);

                let active = cc.sequence(cc.delayTime(0.01), destroyNode);

            });
            line.removeAllChildren(true);
        });


        msg.forEach((line, lineIdx) => {

            line.forEach((num, numIdx) => {
                if (num == 0) {
                    let pToolPos = [lineIdx, numIdx];
                    this.passToolPos.push(pToolPos);
                }
                let candy;
                let thisNum = num;
                if (thisNum == 0) {
                    thisNum = 0;
                } else {
                    if (level == 1) {
                        thisNum = num;
                    } else if (level == 2) {
                        thisNum += 5;
                    } else if (level == 3) {
                        thisNum += 10;

                    }
                }
                candy = cc.instantiate(this.go.allCandies[thisNum]);

                candy.name = "candy";
                this.go.firstContainer.children[lineIdx].addChild(candy);
                candy.x = 0;
                candy.y = 120 * numIdx;

            })
        });


    }

    rebuildSecond(msg, level) {
        //销毁第二矩阵所有节点
        this.go.secondContainer.children.forEach((line, lineIdx) => {
            line.children.forEach((node, nodeIdx) => {
                let destroyNode = cc.callFunc(function (node) {
                    node.destroy();
                    node.removeFromParent(true);
                }, this, node);
                let active = cc.sequence(cc.delayTime(0.01), destroyNode);
            });
            line.removeAllChildren(true);
        });

        msg.forEach((line, lineIdx) => {
            /*let col = cc.instantiate(this.go.colCandies);
            this.go.secondContainer.addChild(col);
            col.x = 120 * lineIdx + 60;
            col.y = 0;*/
            line.forEach((num, numIdx) => {
                let candy;
                let thisNum = num;
                if (thisNum == 0) {
                    thisNum = 0;
                } else {
                    if (level == 1) {
                        thisNum = num;
                    } else if (level == 2) {
                        thisNum += 5;
                    } else if (level == 3) {
                        thisNum += 10;

                    }
                }
                candy = cc.instantiate(this.go.allCandies[thisNum]);

                candy.name = "candy";
                this.go.secondContainer.children[lineIdx].addChild(candy);
                candy.x = 0;
                candy.y = 120 * numIdx;

            })
        })

    }

    //游戏中第一矩阵动画
    firstInGame(msg, result, level) {



        //标记并销毁
        this.markNode(result);
        this.destroyCandy(result);

        this.go.mountNode.getComponent(cc.Sprite).scheduleOnce(() => {
            this.go.firstContainer.children.forEach((line, lineIdx) => {
                line.children.forEach((node, nodeIdx) => {

                    let action = cc.moveTo(0.5, 0, 120 * nodeIdx).easing(cc.easeBounceOut());
                    let active = cc.sequence(cc.delayTime(1), action);
                    node.runAction(active);

                })
            });
        }, 0.1);

        //如果通关糖果数组不为空，就结束行数执行
        /*if (this.passToolPos.length != 0) {
            return;
        }*/

        this.go.mountNode.getComponent(cc.Sprite).scheduleOnce(() => {
            this.rebuildFirst(msg, level);
        }, 2.5)


    }

    //游戏中第二矩阵动画
    secondInGame(msg, msg1, level) {


        this.go.secondContainer.children.forEach((line, lineIdx) => {
            if (msg[lineIdx] != 0) {
                line.children.forEach((node, nodeIdx) => {
                    if (nodeIdx < msg[lineIdx]) {
                        let nodeY = node.y;


                        if (nodeY < -800) {
                            node.y = nodeY;

                            /*this.go.mountNode.getComponent(cc.Sprite).scheduleOnce(()=>{
                                node.destroy();
                                node.removeFromParent(true);
                            },5);*/

                            let destroyNode = cc.callFunc(function (node) {
                                node.destroy();
                                node.removeFromParent(true);
                            }, this, node);
                            let active2 = cc.sequence(cc.delayTime(0.01), destroyNode/*, cc.delayTime(0.1), destroyNode*/);
                            return node.runAction(active2);
                        }

                        let action = cc.moveTo(1, 0, nodeY - (msg[lineIdx] * 120 + 320)).easing(cc.easeBounceOut());

                        if (level == 1) {
                            action = cc.moveTo(1, 0, nodeY - (msg[lineIdx] * 120 + 320)).easing(cc.easeBounceOut());
                        } else if (level == 2) {
                            action = cc.moveTo(1, 0, nodeY - (msg[lineIdx] * 120 + 200)).easing(cc.easeBounceOut());
                        } else if (level == 3) {
                            action = cc.moveTo(1, 0, nodeY - (msg[lineIdx] * 120 + 80)).easing(cc.easeBounceOut());
                        }

                        let active = cc.sequence(cc.delayTime(1), action);

                        node.runAction(active);


                    } else {
                        let nodeY = node.y;
                        let action = cc.moveTo(1, 0, nodeY - (msg[lineIdx] * 120)).easing(cc.easeBounceOut());

                        let active = cc.sequence(cc.delayTime(1), action);
                        node.runAction(active);
                    }

                })
            }

        });

        //如果通关糖果的数组不为空就结束函数执行
        /*if (this.passToolPos.length != 0) {
            return;
        }*/

        this.go.mountNode.getComponent(cc.Sprite).scheduleOnce(() => {
            this.rebuildSecond(msg1, level)
        }, 2.5)


    }

    //添加矩阵先实例化，再动画
    appendInGame(msg, level) {

        this.go.appendContainer.children.forEach((line, lineIdx) => {
            line.children.forEach((node, nodeIdx) => {
                node.destroy();
                node.removeFromParent(true);
            });
            line.removeAllChildren(true);
            line.destroy();
            line.removeFromParent(true);
        });
        this.go.appendContainer.removeAllChildren(true);

        msg.forEach((line, lineIdx) => {

            let col = cc.instantiate(this.go.colCandies);
            this.go.appendContainer.addChild(col);
            col.x = 120 * lineIdx + 60;
            col.y = 0;

            if (line.length != 0) {
                line.forEach((num, numIdx) => {
                    let candy;
                    let thisNum = num;
                    if (thisNum == 0) {
                        thisNum = 0;
                    } else {
                        if (level == 1) {
                            thisNum = num;
                        } else if (level == 2) {
                            thisNum += 5;
                        } else if (level == 3) {
                            thisNum += 10;

                        }
                    }
                    candy = cc.instantiate(this.go.allCandies[thisNum]);

                    candy.name = "candy";
                    col.addChild(candy);
                    candy.x = 0;
                    candy.y = 120 * numIdx;

                    let nodeY = candy.y;
                    let action = cc.moveTo(1, 0, nodeY - (msg[lineIdx].length * 120 + 80)).easing(cc.easeBounceOut());
                    if (level == 1) {
                        action = cc.moveTo(1, 0, nodeY - (msg[lineIdx].length * 120 + 320)).easing(cc.easeBounceOut());
                    } else if (level == 2) {
                        action = cc.moveTo(1, 0, nodeY - (msg[lineIdx].length * 120 + 200)).easing(cc.easeBounceOut());
                    } else if (level == 3) {
                        action = cc.moveTo(1, 0, nodeY - (msg[lineIdx].length * 120 + 80)).easing(cc.easeBounceOut());
                    }

                    let active = cc.sequence(cc.delayTime(1), action);
                    candy.runAction(active);

                })
            }

        });


    }


    //根据result矩阵消除节点
    markNode(result) {

        this.hideCandiesPos = new Array();

        result.forEach((line, lineIdx) => {
            // console.log(this.go.firstContainer.children[lineIdx].children);
            let hideLine = new Array();
            line.forEach((num, numIdx) => {

                if (num != 0) {
                    let hide = [lineIdx, numIdx, num];
                    hideLine.push(hide);
                }

            });
            this.hideCandiesPos.push(hideLine);
        });
    }

    //销毁隐藏糖果
    destroyCandy(msg) {

        this.go.firstContainer.children.forEach((line, lineIdx) => {
            line.children.forEach((node, nodeIdx) => {
                if (msg[lineIdx][nodeIdx] != 0) {

                    let destroyNode = cc.callFunc(function (node) {
                        node.destroy();
                        node.removeFromParent(true);
                    }, this, node);
                    let active = cc.sequence(cc.delayTime(0.01), destroyNode);
                    node.runAction(active);

                }
            })
        })
    }

    //如果为通关糖果
    passCandy() {
        //通关糖果，减少饼干，添加过关道具数
        this.passToolNum += 1;

        if (this.passToolNum <= 15) {

            this.go.checkPointTitle[0].active = true;
            this.go.checkPointTitle[1].active = false;
            this.go.checkPointTitle[2].active = false;

            this.go.rightCookies.children[this.passToolNum - 1].active = false;
        } else if (this.passToolNum > 15 && this.passToolNum <= 30) {

            this.go.checkPointTitle[0].active = false;
            this.go.checkPointTitle[1].active = true;
            this.go.checkPointTitle[2].active = false;

            this.go.leftCookies.children[this.passToolNum - 16].active = false;
        } else if (this.passToolNum > 30) {
            this.go.checkPointTitle[0].active = false;
            this.go.checkPointTitle[1].active = false;
            this.go.checkPointTitle[2].active = true;
        }

        this.go.passNum.getComponent(cc.RichText).string = `<color=#ffdd3e><b> ${this.passToolNum} </b></color>`;

        //清空通关糖果数组
        this.passToolPos = new Array();

    }

    //游戏结束
    gameOver() {

        //局数加一
        this.gameNumber += 1;
        this.go.gameCount.getComponent(cc.Label).string = "" + this.gameNumber;

        //销毁第一，第二矩阵的所有节点
        this.go.firstContainer.children.forEach((line, lineIdx) => {

            line.destroy();
            line.removeFromParent(true);
            this.go.firstContainer.removeAllChildren(true);
        });


        this.go.secondContainer.children.forEach((line, lineIdx) => {

            line.destroy();
            line.removeFromParent(true);
            this.go.secondContainer.removeAllChildren(true);
        });


        this.go.appendContainer.children.forEach((line, lineIdx) => {

            line.destroy();
            line.removeFromParent(true);
            this.go.appendContainer.removeAllChildren(true);
        });

        //托管
        if (this.couldDeposit != false) {
            console.log("真的已经托管");
            //获取发送游戏开始数据，发送游戏开始
            let bCount = this.go.beatCount.getComponent(cc.Label).string;
            let count = this.go.count.getComponent(cc.Label).string;
            let sendData = {beatCount: bCount, count: count};
            MK.candyManager.startSend(JSON.stringify(sendData));
            return;
        }


        //显示确定和下注按钮
        this.go.btnsNode.active = true;
        this.go.btns[0].active = true;
        this.go.btns[1].active = true;

        //当确定和注数按钮显示之后就不可以托管
        this.go.grayDeposit.active = true;
        this.go.deposit.active = false;
        //不托管
        this.couldDeposit = false;
        //不可以托管
        MK.popLogic.isDeposit = false;


    }


}
