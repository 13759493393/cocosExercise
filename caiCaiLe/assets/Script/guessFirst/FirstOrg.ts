const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstOrg extends cc.Component {

    @property(cc.Node)
    imgFrame:cc.Node = null;

    @property(cc.Node)
    img:cc.Node = null;

    @property(cc.Node)
    niName:cc.Node = null;

    @property(cc.Node)
    money:cc.Node = null;

}
