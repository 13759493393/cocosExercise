import MK from "./MiddleKeys";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CandyState extends cc.Component {

    //托管点击次数
    depositNum = 0;

    onLoad(){
        MK.candyState = this;
    }

}
