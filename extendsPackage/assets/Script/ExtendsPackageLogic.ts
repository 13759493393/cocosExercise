import ExtendsPackageOrg from "./ExtendsPackageOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExtendsPackageLogic extends cc.Component {

    @property(ExtendsPackageOrg)
    epo:ExtendsPackageOrg = null;

    onLoad(){
        console.log(this.epo.audioS.volume);
    }

}
