import MK from "../MiddleKey";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GHandler extends cc.Component {

onLoad(){
    MK.GHandler = this;
}

}
