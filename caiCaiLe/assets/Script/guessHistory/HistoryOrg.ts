const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryOrg extends cc.Component {

    @property(cc.Node)
    parentNode:cc.Node = null;

    @property(cc.Node)
    childNode:cc.Node = null;

}
