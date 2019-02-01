const {ccclass, property} = cc._decorator;

@ccclass
export default class Orgnization extends cc.Component {

    @property(cc.Node)
    container:cc.Node = null;

}
