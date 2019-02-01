import SignOrganize from "./SignOrganize";
import MK from "./../MiddleKeys";
import {AxiosRequest} from "../AxiosRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SignLogic extends cc.Component {

    @property(SignOrganize)
    sl:SignOrganize = null;

    onLoad(){
        MK.signLogic = this;
        //点击下一步
        this.clickNext();
        //点击重新发送验证码
        this.clickResend();
        //点击确定
        this.clickEnsure();
        //点击继续
        this.clickContinue();

    }

    //点击下一步
    clickNext(){

        this.sl.next.on(cc.Node.EventType.TOUCH_START,()=>{

            const telNumber = this.sl.telNumbers.getComponent(cc.EditBox).string.trim();
            const vCode = this.sl.vCode.getComponent(cc.EditBox).string.trim();
            const regular = /^1[34578][0-9]{9}$/;

            //验证电话号码和验证码
            if(telNumber === "" || !regular.test(telNumber)){
                console.log(telNumber);
                MK.tips.getTips("电话号码输入错误");
                return;
            }
            if(vCode === ""){
                MK.tips.getTips("验证码输入错误");
                return;
            }

            cc.sys.localStorage.setItem("registerTelNumber",telNumber);

            //显示第二个注册界面
            this.sl.signIn[1].active = true;
            //隐藏第一个注册界面
            this.sl.signIn[0].active = false;
        })

    }

    //点击重新发送
    clickResend(){
        this.sl.reSend.on(cc.Node.EventType.TOUCH_START,()=>{
            //TO REQUEST RESEND
        })
    }

    //点击确定注册
    clickEnsure(){

        this.sl.ensure.on(cc.Node.EventType.TOUCH_START,()=>{

            const userName = this.sl.userName.getComponent(cc.EditBox).string.trim();
            const pWord = this.sl.passWord.getComponent(cc.EditBox).string.trim();
            const vPWord = this.sl.vriPassWord.getComponent(cc.EditBox).string.trim();

            //验证用户名密码是否符合
            if(userName === ""){
                MK.tips.getTips("用户名不能为空");
                return;
            }
            if(pWord === "" || pWord.length <6){
                if(pWord === ""){
                    MK.tips.getTips("密码不能为空");
                    return;
                }
                if(pWord.length < 6){
                    MK.tips.getTips("密码最少六位字符");
                    return;
                }
            }
            if(vPWord != pWord){
                MK.tips.getTips("两次密码输入不一致");
                return;
            }

            //保存密码到localstorage
            const localPWord = cc.sys.localStorage.setItem("localPWord",vPWord);

            //隐藏第二个界面
            this.sl.signIn[1].active = false;
            //显示第三个界面
            this.sl.signIn[2].active = true;

            //注册请求
            const telNumber = cc.sys.localStorage.getItem("registerTelNumber");
            /*console.log("电话号码是："+telNumber);
            console.log("密码是："+pWord);*/
            AxiosRequest.toRegister(telNumber,pWord).then((res)=>{
                console.log(res)
            }).catch((error)=>{
                console.log(error);
            })

        })

    }

    //点击继续进入游戏
    clickContinue(){
        this.sl.continue.on(cc.Node.EventType.TOUCH_START,()=>{
            const telNumber = cc.sys.localStorage.getItem("registerTelNumber");
            const pWord = cc.sys.localStorage.getItem("localPWord");

            //自动登录获取token
            AxiosRequest.toLogin(telNumber,pWord).then((res)=>{
                console.log("自动获取token");
                /**
                 * 电话号码：13799999999   密码：123456 的token
                 * eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNiIsImlhdCI6MTU0NzUxNTUyOCwiZXhwIjoxNTQ4MTIwMzI4fQ.
                 * jJb7vq4H8F7sb9xcrvCLPG0I_ybpYY2E67tuRuvYpgXvYEhoo26hSsoBfDxsCgrd1HSz7asHaqxJcyedS9U8zw
                 */
                console.log(res);
                cc.sys.localStorage.setItem("registerToken",res.data.token);

                //根据token获取用户信息
                AxiosRequest.getUserInfo(res.data.token).then((res1)=>{

                    //获取到token后建立连接
                    let userId = res1.data.data.userId;
                    MK.candyManager.toConnect(userId);
                    //进入到游戏连接界面
                    this.sl.signView.active = false;
                    this.sl.connectView.active  =true;

                    //延时3秒进入到游戏未开始界面
                    this.sl.connectView.getComponent(cc.Sprite).scheduleOnce(()=>{
                        this.sl.connectView.active  =false;
                        this.sl.checkPoint.active = true;
                        this.sl.checkPoint.children.forEach((check,idx)=>{
                            check.active = false;
                        });
                        this.sl.settingIcon.active = true;
                        this.sl.checkPoint.getChildByName("unStart").active = true;
                    },3);

                }).catch((error)=>{
                    console.log(error);
                });

            }).catch((error)=>{
                console.log(error);
            });

        })
    }




}
