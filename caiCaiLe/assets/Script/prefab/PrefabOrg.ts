const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabOrg extends cc.Component {

    @property(cc.Prefab)
    poNode:cc.Prefab = null;

    @property(cc.Node)
    parentNode:cc.Node = null;

}
