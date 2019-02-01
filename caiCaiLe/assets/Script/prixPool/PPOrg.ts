const {ccclass, property} = cc._decorator;

@ccclass
export default class PPOrg extends cc.Component {

    @property(cc.Node)
    prixNumber:cc.Node = null;

    @property(cc.Node)
    lastTime:cc.Node = null;

}
