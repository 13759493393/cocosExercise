cc.Class({
    extends: cc.Component,

    properties: {


    },

    onLoad (){

       var btn1 = this.node.getChildByName("personal_information");
       var btn2 = this.node.getChildByName("my_backpack");
       var btn3 = this.node.getChildByName("account_security");



       btn1.on(cc.Node.EventType.MOUSE_DOWN,function(event){

           btn1.getChildByName("bg").active = true;
           btn2.getChildByName("bg").active = false;
           btn3.getChildByName("bg").active = false;


       },this);

        btn2.on(cc.Node.EventType.MOUSE_DOWN,function(event){

            btn1.getChildByName("bg").active = false;
            btn2.getChildByName("bg").active = true;
            btn3.getChildByName("bg").active = false;

        });

        btn3.on(cc.Node.EventType.MOUSE_DOWN,function(event){

            btn1.getChildByName("bg").active = false;
            btn2.getChildByName("bg").active = false;
            btn3.getChildByName("bg").active = true;

        })

    },



    start () {

    },

    // update (dt) {},
});
