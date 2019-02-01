import MK from "./../MiddleKeys";
import RegOrganize from "./RegOrganize";
import {AxiosRequest} from "../AxiosRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RegLogic extends cc.Component {

    @property(RegOrganize)
    ro:RegOrganize = null;

    onLoad() {
        MK.registerLogic = this;
        //点击登录
        this.clickRegister();
        //点击自动登录
        this.clickAutoRegister();
        //点击注册
        this.clickSignIn();
        //点击忘记密码
        this.clickForgetPassWord();

    }

    //点击登录
    clickRegister(){

        this.ro.register.on(cc.Node.EventType.TOUCH_START,()=>{

            const userName = this.ro.userName.getComponent(cc.EditBox).string.trim();
            const pWord = this.ro.passWord.getComponent(cc.EditBox).string.trim();
            const regular = /^1[34578][0-9]{9}$/;

            //登录请求
            AxiosRequest.toLogin(userName,pWord).then((res)=>{
                console.log(res);



                if(userName === "" || !regular.test(userName)){
                    MK.tips.getTips("手机号码输入错误");
                    return;
                }
                if(pWord === ""){
                    MK.tips.getTips("密码不能为空");
                    return;
                }
                if(res.data.code != 0){
                    MK.tips.getTips(res.data.msg);
                    return;
                }
                // MK.tips.getTips("登录成功！");

                //存储token
                cc.sys.localStorage.setItem("logInToken",res.data.token);
                //根据token获取用户信息
                AxiosRequest.getUserInfo(res.data.token).then((res1)=>{

                    //获取到token后建立stomp连接
                    let userIds = res1.data.data.userId;
                    MK.candyManager.toConnect(userIds);

                    //进入到游戏连接界面
                    this.ro.registerView.active = false;
                    console.log("登录成功，显示连接界面");
                    this.ro.connectView.active = true;
                    //延时3秒进入游戏未开始界面
                    this.ro.connectView.getComponent(cc.Sprite).scheduleOnce(()=>{
                        this.ro.connectView.active = false;
                        this.ro.checkPoint.active = true;
                        this.ro.checkPoint.children.forEach((check,idx)=>{
                            check.active = false
                        });
                        this.ro.settingIcon.active = true;
                        this.ro.checkPoint.getChildByName("unStart").active = true;
                    },3);

                }).catch((error)=>{
                    console.log(error)
                });

            }).catch((error)=>{
                console.log(error);
            });


        })
    }

    //点击自动登录
    clickAutoRegister(){
        let clickNum = 0;
        this.ro.autoRegister.on(cc.Node.EventType.TOUCH_START,()=>{
            clickNum += 1;
            if(clickNum%2 === 1){
                this.ro.toggleCheck.getComponent(cc.Toggle).isChecked = true;
                return;
            }
            if(clickNum%2 === 0){
                this.ro.toggleCheck.getComponent(cc.Toggle).isChecked = false;
                return;
            }
        })
    }

    //点击注册
    clickSignIn(){
        this.ro.signIn.on(cc.Node.EventType.TOUCH_START,()=>{
            //隐藏自身
            this.ro.registerView.active = false;
            //显示第一个注册界面
            this.ro.signInViews.active = true;   //显示父级
            //隐藏其他子集
            this.ro.signInViews.children.forEach((view,idx)=>{
                view.active = false;
            });
            this.ro.signInViews.children[0].active = true;   //显示子集
        })
    }

    //点击忘记密码
    clickForgetPassWord(){
        this.ro.forgetPWords.on(cc.Node.EventType.TOUCH_START,()=>{
            //隐藏自身
            this.ro.registerView.active = false;
            //显示第一个忘记密码界面
            this.ro.forgetViews.active = true;   //显示父级
            //隐藏其他子界面
            this.ro.forgetViews.children.forEach((view,idx)=>{
                view.active = false;
            });
            this.ro.forgetViews.children[0].active = true;   //显示子集
        })
    }



}
