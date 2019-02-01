import PrefabOrg from "./PrefabOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabLogic extends cc.Component {

    @property(PrefabOrg)
    po: PrefabOrg = null;

    onLoad() {



    }

    start() {



    }

}
