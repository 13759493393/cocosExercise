const {ccclass, property} = cc._decorator;

@ccclass
export default class ExtendsPackageOrg extends cc.Component {

    @property(cc.AudioSource)
    audioS:cc.AudioSource = null;

}
