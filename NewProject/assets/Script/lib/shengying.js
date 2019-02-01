
cc.Class({
    extends: cc.Component,
    properties: {
        audioSource: [], /*音乐资源*/
        nanaudio: [],   /*男生音效*/
        nvaudio: []     /*女生音效*/
    },
    onLoad: function () {

        this._YingLiang = 1;
        this._YingXiao = 1;
        cc.SY = this;
        var YingLiang = parseFloat( cc.sys.localStorage.getItem('yingyue'));
        var YingXiao  =  parseFloat(  cc.sys.localStorage.getItem('yingxiao'));
        if(cc.sys.localStorage.getItem('yingxiao') == null){
            YingXiao = 1;
        }
        if(cc.sys.localStorage.getItem('yingyue') == null){
        
            YingLiang = 1;
        }
        this._YingLiang = YingLiang;
        this._YingXiao = YingXiao;
 
    },zyconfig(data){

        if(data.audioSource){

            for(var i = 0; i < data.audioSource.length ; i++){
                this.yinxiaojiazia(2,i,data.audioSource[i]);    
            }
        }

        if(data.nanaudio){

            for(var i = 0; i < data.nanaudio.length ; i++){
                this.yinxiaojiazia(1,i,data.nanaudio[i]);
            }
        }

        if(data.nvaudio){

            for(var i = 0; i < data.nvaudio.length ; i++){
                this.yinxiaojiazia(0,i,data.nvaudio[i]);
            }
        }

    },yinxiaojiazia(lxm,i,zhis){

        cc.loader.loadRes(zhis, cc.AudioClip, function (err, clip) {
         
            if(err){
                return ;
            }
          
            if(lxm == 1){

                cc.SY.nanaudio[i] =clip;
            }else if(lxm == 2){

                var iid = cc.audioEngine.play(clip, true,0);
                cc.audioEngine.pause(iid);
                cc.SY.audioSource[i] =iid;

            }else{
                cc.SY.nvaudio[i] =(clip);
            }
        });

    },yingyuep(id){
        /*音乐播放 id*/

        if( typeof( this.audioSource[id] ) == "undefined" ){
            this.scheduleOnce(function(){
                this.yingyuep(id);
            },1.5);
            return  ;
        }

        var state = cc.audioEngine.getState(this.audioSource[id]);
        if(state  == '-1'){
            this.scheduleOnce(function(){
                this.yingyuep(id);
            },1.5);
            return  ;
        }
        if ( typeof( this.audioSource[id] ) == "undefined"  ) return;
        cc.audioEngine.setVolume(this.audioSource[id],this._YingLiang);
        cc.audioEngine.resume( this.audioSource[id]);
        /*设置处理*/
        cc.audioEngine.setCurrentTime(this.audioSource[id], 0.0);

    },yingyuet(id){
        /*音乐停止*/
        if (!this.audioSource ||  typeof( this.audioSource[id] ) == "undefined"  ) return;
        cc.audioEngine.stop(this.audioSource[id]);

    },yingyuez(id){
        /*音乐暂停*/
        if (!this.audioSource||  typeof( this.audioSource[id] ) == "undefined"  ) return;
        cc.audioEngine.pause(this.audioSource[id]);

    },yingyuec(id){
        /*音乐重放*/
        if (!this.audioSource|| typeof( this.audioSource[id] ) == "undefined"   ) return;
        cc.audioEngine.resume(this.audioSource[id]);

    },yingyueallstop(){
        /*暂停所有音乐*/
        if ( this._YingLiang <= 0 ) return;
        for(var i = 0; i <this.audioSource.length;i++){
            cc.audioEngine.pause(this.audioSource[i]);  
        }

    },yingyueallsetnum(){
        /*设置音乐音量*/
        for(var i = 0; i <this.audioSource.length;i++){
            cc.audioEngine.setVolume(this.audioSource[i], this._YingLiang*1);
        }

    },yingxiaop(id,sex){
        /*音效播放*/
        if(this._YingXiao <= 0){
           return   ;
        }
        if(sex == '0'){
            if (!this.nvaudio||   typeof( this.nvaudio[id] ) == "undefined" ) return;
            cc.audioEngine.play(this.nvaudio[id], false, (this._YingXiao *1 +0.2));
        }else{
            if (!this.nanaudio||  typeof( this.nanaudio[id] ) == "undefined" ) return;
            cc.audioEngine.play(this.nanaudio[id], false,(this._YingXiao*1+0.2));
        }

    },yingxiaopurl(url){

        /*播放音效文件名*/
        var lujin = url;
        
        if(lujin){
            cc.loader.loadRes(lujin, cc.AudioClip, function (err, clip) {
                cc.audioEngine.play(clip, false,(cc.SY._YingXiao*1+0.2));
            });
        }

    },yingyuepurl( url ){

        /*播放音月文件名*/

        var lujin = url;
        if(lujin){

            cc.loader.loadRes(lujin, cc.AudioClip, function (err, clip) {
                
                cc.SY.audioSource.push(cc.audioEngine.play(clip, true,(cc.SY._YingLiang*1)));
            });
        }

    },stopAll(){
        /*所有音效停止*/
        cc.audioEngine.stopAll();
    },pauseAll(){
        /*所有音效暂停*/
        cc.audioEngine.pauseAll();
    },resumeAll(){
        /*所有音效重放*/
        cc.audioEngine.resumeAll();

    },setyingxiao(num){
        /*音效音量*/
        num = parseFloat(num);
        if(num > 1){
            num = 1;
        }else if(num <=0){
             num = 0.0;
        }
        this._YingXiao = num;
        cc.sys.localStorage.setItem('yingxiao',num);

    },setyingyue(num){
        /*音月音量*/
        num = parseFloat(num);
        if(num > 1){
            num = 1;
        }else if(num <=0){
             num = 0.0;
        }
        this._YingLiang = num;
        this.yingyueallsetnum();
        cc.sys.localStorage.setItem('yingyue',num);

    },duqu(){

        /*读取音量*/
        return [this._YingLiang,this._YingXiao]; 
    }

});
