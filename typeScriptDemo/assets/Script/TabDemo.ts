const {ccclass, property} = cc._decorator;

@ccclass
export default class TabDemo extends cc.Component {
    @property([cc.Node])
    tabBtns: Array<cc.Node> = [];

    @property([cc.Node])
    contents: Array<cc.Node> = [];

    @property([cc.Node])
    bagBtns: Array<cc.Node> = [];

    @property([cc.Node])
    bagContents: Array<cc.Node> = [];

    @property([cc.Node])
    accountBtns: Array<cc.Node> = [];

    @property([cc.Node])
    accountContents: Array<cc.Node> = [];

    @property(cc.Node)
    bindSucceed: cc.Node = null;

    @property(cc.Node)
    completeChange: cc.Node = null;

    @property([cc.Node])
    completeIpt: Array<cc.Node> = [];

    @property(cc.Node)
    unBind: cc.Node = null;

    @property([cc.Node])
    toggleIpt: Array<cc.Node> = [];

    @property([cc.Node])
    bindTips: Array<cc.Node> = [];

    @property(cc.Node)
    toBinds: cc.Node = null;

    @property([cc.Node])
    maskWindow: Array<cc.Node> = [];

    @property([cc.Node])
    changeCIpt: Array<cc.Node> = [];

    @property(cc.Node)
    changeCBtn: cc.Node = null;

    @property(cc.Node)
    masterSBtn: cc.Node = null;

    @property(cc.Node)
    closeMaterBtn: cc.Node = null;

    @property(cc.Node)
    forgetPWordBtn: cc.Node = null;

    @property(cc.Node)
    closeRPWBtn: cc.Node = null;

    @property([cc.Node])
    giveAndRecord: Array<cc.Node> = [];

    @property(cc.Node)
    giveBtn: cc.Node = null;

    @property(cc.Node)
    closeGBtn: cc.Node = null;

    @property(cc.Node)
    giveRecordBtn: cc.Node = null;

    @property(cc.Node)
    closeGRBtn: cc.Node = null;

    @property(cc.Node)
    pSignIpt: cc.Node = null;

    @property(cc.Node)
    pSignIcon: cc.Node = null;

    @property(cc.Node)
    changeHIBtn: cc.Node = null;

    @property(cc.Node)
    changNiNBtn: cc.Node = null;

    @property(cc.Node)
    niNameIpt: cc.Node = null;

    @property(cc.Node)
    headImage: cc.Node = null;

    @property([cc.Node])
    genderSwitch: Array<cc.Node> = [];

    @property(cc.Node)
    manChecked: cc.Node = null;

    @property(cc.Node)
    womanChecked: cc.Node = null;

    @property([cc.Node])
    bindVerification: Array<cc.Node> = [];


    @property([cc.Node])
    errorTips: Array<cc.Node> = [];

    @property(cc.Node)
    errTipWindow: cc.Node = null;

    @property(cc.Node)
    toggleScenes:cc.Node = null;

    @property(cc.Node)
    PRNode:cc.Node = null;

    @property(cc.Node)
    toAction:cc.Node = null;

    onLoad() {
        this.tab(0);
        this.rightContent(0);
        this.bindEvent();

        //背包切换
        this.bagBtn(0);
        this.bagContent(0);
        this.bagEvent();

        //账号切换
        this.accountBtn(0);
        this.accountContent(0);
        this.accountEvent();

        //绑定提示，绑定成功，尚未绑定
        this.bindTip(0);
        this.bindSuccess();
        this.unBindFn();

        //密码修改完成
        this.PWordChange();

        //前往绑定
        this.toBind();

        //忘记密码找回
        this.changeComplete();

        //模态窗口刚开始隐藏
        this.showMWindow(0, false);

        //隐藏和显示忘记密码窗口
        this.forgetPWord();
        this.closeRPW();

        //显示和隐藏大师窗口
        this.showMasterWindow();
        this.closeMasterWindow();

        //显示隐藏赠送和赠送记录
        this.giveTip();
        this.hideTip();
        this.showRecord();
        this.hideGiveRecord();

        //改变头像和昵称
        this.changeHImg();
        this.changeNiName();

        //性别切换
        this.genderToggle(0);
        this.selectMan();
        this.selectWoman();

        //获取个性签名
        // this.personalSign();
        this.personalBtn();

        //预加载场景a
        this.preLoadScene();

        //场景切换
        this.toggleScene();

        //设置常驻节点
        this.setPRN();

        //切换到action
        this.toggleToAction();

        let sV = cc.sys.localStorage.getItem("localV");
        console.log(sV);

    }

    onDestroy() {
        //销毁账号内容切换和去绑定事件
        this.accountEvent();
        this.toBind();

        //绑定成功事件
        this.bindSuccess();

        // cc.director.getScene()
        //切换场景
        this.toggleScene();

    }

    //切换到action场景
    toggleToAction(){
        this.toAction.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("action_ex");
        })
    }

    //设置常驻节点
    setPRN(){
        cc.game.addPersistRootNode(this.PRNode);
    }

    //取消常驻节点属性
    /*cancelPRN(){
        cc.game.removePersistRootNode(this.PRNode);
    }*/

    //预加载场景
    preLoadScene(){
        cc.director.preloadScene("a",(event)=>{
            console.log("正在预加载场景a")
        })
    }

    //切换场景
    toggleScene(){
        this.toggleScenes.on(cc.Node.EventType.TOUCH_START,()=>{
            cc.director.loadScene("a");
            console.log("已经切换到a场景")
        });

    }

    //错误提示框显示函数
    showTipWindow(tipIdx) {
        this.errTipWindow.active = true;
        this.errTips(tipIdx);

        //定时器延时执行函数
        //setTimeout
        // setInterval()
        //schedulerOnce()
        //scheduler()
        /*this.errTipWindow.getComponent(cc.Sprite).scheduleOnce(()=>{
            this.errTipWindow.active = false;
            this.errTips(tipIdx);
        },3);*/

        this.errTipWindow.getComponent(cc.Sprite).scheduleOnce((event) => {
            this.errTipWindow.active = false;
            this.errTips(tipIdx);
        }, 1.5);
    }

    //隐藏错误提示窗口
    hideErrWin() {
        this.errTipWindow.active = false;
    }

    //错误信息提示函数
    errTips(index) {
        this.errorTips.forEach((tip, idx) => {
            tip.active = false;
        });
        this.errorTips[index].active = true;
    }

    //左边选项卡绑定touch事件
    bindEvent() {
        this.tabBtns.forEach((tab, index) => {
            tab.on(cc.Node.EventType.TOUCH_START, (evt) => {

                this.hideErrWin();//隐藏错误提示窗口
                this.tab(index);
                this.rightContent(index);
            }, this);
        })
    }

    //左边选项卡显隐
    tab(index) {
        this.tabBtns.forEach((tab, ind) => {
            tab.getChildByName("bg").active = false;
        });
        this.tabBtns[index].getChildByName("bg").active = true;
    }

    //右边内容显隐
    rightContent(index) {
        this.contents.forEach((content, idx) => {
            content.active = false;
        });
        this.contents[index].active = true;
    }

    //背包绑定事件
    bagEvent() {
        this.bagBtns.forEach((btn1, index) => {
            btn1.on(cc.Node.EventType.TOUCH_START, (event) => {
                this.bagBtn(index);
                this.bagContent(index);
            }, this)
        })
    }

    //背包选项卡改变事件
    bagBtn(index) {
        this.bagBtns.forEach((btn1, idx) => {
            btn1.getChildByName("bg").active = false;
        });
        this.bagBtns[index].getChildByName("bg").active = true;
    }

    //背包内容改变事件
    bagContent(index) {
        this.bagContents.forEach((content, idx) => {
            content.active = false;
        });
        this.bagContents[index].active = true;
    }

    //账号绑定事件
    accountEvent() {
        this.accountBtns.forEach((btn, index) => {
            btn.on(cc.Node.EventType.TOUCH_START, (event) => {

                this.hideErrWin();//隐藏错误提示窗口
                this.bindTip(0);
                this.accountBtn(index);
                this.accountContent(index);

            })
        })
    }

    //账号选项卡切换
    accountBtn(index) {
        this.accountBtns.forEach((btn, idx) => {
            btn.getChildByName("bg").active = false;
        });
        this.accountBtns[index].getChildByName("bg").active = true;
    }

    //账号内容切换事件
    accountContent(index) {
        this.accountContents.forEach((content, idx) => {
            content.active = false;
        });
        this.accountContents[index].active = true;
    }

    //手机绑定成功
    bindSuccess() {

        this.bindSucceed.on(cc.Node.EventType.TOUCH_START, (event) => {

            //电话号码
            let BPNum = this.bindVerification[0].getComponent(cc.EditBox);
            //密码
            let BPPword = this.bindVerification[1].getComponent(cc.EditBox);
            //验证码
            let BVCode = this.bindVerification[2].getComponent(cc.EditBox);

            let rule01 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            let rule02 = /^[a-zA-Z]\w{5,17}$/;

            //电话验证
            if (BPNum.string === "") {
                this.showTipWindow(0);
                return;
            } else {
                if (!rule01.test(BPNum.string)) {
                    this.showTipWindow(0);
                    BPNum.string = "";
                    return;
                }
            }
            ;

            //密码验证
            if (BPPword.string === "") {
                this.showTipWindow(4);
                return;
            } else {
                if (!rule02.test(BPPword.string)) {
                    this.showTipWindow(4);
                    BPPword.string = "";
                    return;
                }
            }
            ;

            //验证码验证
            if (BVCode.string === "") {
                this.showTipWindow(3);
                return;
            }

            this.bindTip(1);


        }, this)
    }

    //密码修改成功
    PWordChange() {
        this.completeChange.on(cc.Node.EventType.TOUCH_START, () => {

            let vCode = this.completeIpt[0].getComponent(cc.EditBox);
            let pWord = this.completeIpt[1].getComponent(cc.EditBox);

            let rule01 = /^[a-zA-Z]\w{5,17}$/;

            //验证码验证
            if (vCode.string === "") {
                this.showTipWindow(3);
                return false;
            }

            //密码验证
            if (vCode.string === "") {
                this.showTipWindow(4);
                return false;
            } else {
                if (!rule01.test(pWord.string)) {

                    this.showTipWindow(4);
                    pWord.string = "";
                    return false;
                }
            }

            this.showTipWindow(5);

        })
    }


    //手机未绑定（切换账号）
    unBindFn() {
        this.unBind.on(cc.Node.EventType.TOUCH_START, (event) => {

            let accountNum = this.toggleIpt[0].getComponent(cc.EditBox);
            let pNum = this.toggleIpt[1].getComponent(cc.EditBox);

            let rule01 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            let rule02 = /^[a-zA-Z]\w{5,17}$/;

            //账号验证
            if(accountNum.string === ""){
                this.showTipWindow(1);
                return false;
            }else{
                if(!rule01.test(accountNum.string)){
                    this.showTipWindow(1);
                    accountNum.string = "";
                    return false;
                }
            }

            //密码验证
            if(pNum.string === ""){
                this.showTipWindow(4);
                return false;
            }else{
                if(!rule02.test(pNum.string)){
                    this.showTipWindow(4);
                    pNum.string = "";
                    return false;
                }
            }

            this.showTipWindow(6);

            //手机未绑定提示，需要请求验证
            // this.bindTip(2);
        }, this)
    }

    //绑定时切换内容和提示的显示
    bindTip(index) {
        this.bindTips.forEach((content, idx) => {
            content.active = false;
        });
        this.bindTips[index].active = true;
    }

    //前往绑定
    toBind() {
        this.toBinds.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.bindTip(0);
            this.accountBtn(0);
            this.accountContent(0);
        }, this)
    }

    //密码修改完成
    changeComplete(){
        this.changeCBtn.on(cc.Node.EventType.TOUCH_START,()=>{

            let pNum = this.changeCIpt[0].getComponent(cc.EditBox);
            let vNum = this.changeCIpt[1].getComponent(cc.EditBox);
            let pwNum = this.changeCIpt[2].getComponent(cc.EditBox);

            let rule01 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            let rule02 = /^[a-zA-Z]\w{5,17}$/;

            //账号验证
            if(pNum.string === ""){
                this.showTipWindow(1);
                return false;
            }else{
                if(!rule01.test(pNum.string)){
                    this.showTipWindow(1);
                    pNum.string = "";
                    return false;
                }
            }

            //验证码验证
            if(vNum.string === ""){
                this.showTipWindow(3);
                return false;
            }

            //密码验证
            if(pwNum.string === ""){
                this.showTipWindow(4);
                return false;
            }else{
                if(!rule02.test(pwNum.string)){
                    this.showTipWindow(4);
                    pwNum.string = "";
                    return false;
                }
            }

            this.showMWindow(0,false);
            this.showTipWindow(7);

        })
    }

    //模态窗口显示
    showMWindow(index, bool) {
        this.maskWindow.forEach((MWindow, idx) => {
            MWindow.active = false;
        });
        this.maskWindow[index].active = bool;
    }

    //显示大师窗口
    showMasterWindow() {
        this.masterSBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showMWindow(2, true);
        })
    }

    //关闭大师窗口
    closeMasterWindow() {
        this.closeMaterBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showMWindow(2, false);
        })
    }

    //忘记密码去找回
    forgetPWord() {
        this.forgetPWordBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.accountBtn(2);
            this.accountContent(2);
            this.showMWindow(0, true); //找回密码窗口显示

        }, this)
    }

    //关闭找回密码窗口
    closeRPW() {
        this.closeRPWBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showMWindow(0, false);
        }, this)
    }

    //赠送和赠送记录
    GRContent(index, bool) {
        this.giveAndRecord.forEach((content, idx) => {
            content.active = false;
        });
        this.giveAndRecord[index].active = bool;
    }

    //显示赠送提示
    giveTip() {
        this.giveBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showMWindow(1, true);
            this.GRContent(1, true);
        }, this)
    }

    //隐藏赠送提示
    hideTip() {
        this.closeGBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.GRContent(1, false);
            this.showMWindow(1, false);
        }, this)
    }

    //显示记录
    showRecord() {
        this.giveRecordBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.showMWindow(1, true);
            this.GRContent(0, true);
        }, this)
    }

    //隐藏记录
    hideGiveRecord() {
        this.closeGRBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.GRContent(0, false);
            this.showMWindow(1, false);
        })
    }

    //个性签名
    personalSign() {
        let text = this.pSignIpt.getComponent(cc.EditBox).string;
        console.log(text)
    }

    //个性签名按钮
    personalBtn() {
        this.pSignIcon.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.personalSign();
        })
    }

    //点击更换头像
    changeHImg() {
        this.changeHIBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            //回调函数中必须传两个值，否则报错
            cc.loader.loadRes("aaa", cc.SpriteFrame, (err, theHImg) => {
                this.headImage.getComponent(cc.Sprite).spriteFrame = theHImg;
                this.showTipWindow(8);
            });
        })
    }

    //点击修改昵称
    changeNiName() {
        this.changNiNBtn.on(cc.Node.EventType.TOUCH_START, (event) => {
            var text = this.niNameIpt.getChildByName("input").getComponent(cc.EditBox);
            if(text.string === ""){
                this.showTipWindow(10);
                return false;
            }else{
                this.showTipWindow(9);
            }

        })
    }

    //性别切换
    genderToggle(index) {
        this.genderSwitch.forEach((btn, idx) => {
            btn.getChildByName("checked").active = false;
        });
        this.genderSwitch[index].getChildByName("checked").active = true;
    }

    //男士
    selectMan() {
        this.manChecked.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.genderToggle(0);
        })
    }

    //女士
    selectWoman() {
        this.womanChecked.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.genderToggle(1);
        })
    }


}
