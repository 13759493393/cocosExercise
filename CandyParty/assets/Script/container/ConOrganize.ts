const {ccclass, property} = cc._decorator;

@ccclass
export default class ConOrganize extends cc.Component {

    @property(cc.Node) container: cc.Node = null;

}
