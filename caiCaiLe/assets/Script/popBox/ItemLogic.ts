import extend = cc.js.extend;
import ItemOrg from "./ItemOrg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemLogic extends cc.Component {

   @property(ItemOrg)
    iLogic:ItemOrg = null;

   init(data){
       this.iLogic.id = data.id;
       this.iLogic.price.string = data.itemPrice;
       this.iLogic.iName.string = data.itemName;
       this.iLogic.icon.spriteFrame = data.sfIcon;
   }

   onLoad(){

       for(let i=0;i<this.iLogic.itemList.length;i++){

           let item = cc.instantiate(this.iLogic.iPrefab);
           let data = this.iLogic.itemList[i];
           this.iLogic.pNode.addChild(item);
           item.getComponent("ItemList").init({

               id:data.ID,
               iName:data.itemName,
               price:data.itemPrice,
               icon:data.sfIcon

           })


       }


   }


}
