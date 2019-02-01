const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioOrg extends cc.Component {

    /*@property(cc.Node)
    vPlayer:cc.Node = null;*/

    @property(cc.AudioSource)
    aPlayer:cc.AudioSource = null;

    @property([cc.Node])
    auBtn:Array<cc.Node> = [];

    @property([cc.Node])
    viBtn:Array<cc.Node> = [];

    @property(cc.Node)
    graphicsEx:cc.Node= null;


}
