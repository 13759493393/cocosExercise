const {ccclass, property} = cc._decorator;

class ItemList {

    @property(cc.Integer)
    ID: number = 0;

    @property(cc.String)
    itemName: string = "";

    @property(cc.Integer)
    itemPrice: number = 0;

    @property(cc.SpriteFrame)
    sfIcon: cc.SpriteFrame = null;
}

@ccclass
export default class ItemOrg extends cc.Component {

    @property(ItemList)
    itemList: Array<ItemList> = [];

    @property(cc.Integer)
    id: number = 0;

    @property(cc.Label)
    iName: cc.Label = null;

    @property(cc.Label)
    price: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Prefab)
    iPrefab: cc.Prefab = null;

    @property(cc.Node)
    pNode: cc.Node = null;


}
