import MK from "../MiddleKeys";
import FPWOrganize from "./FPWOrganize";
import {AxiosRequest} from "../AxiosRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FPWLogic extends cc.Component {

    @property(FPWOrganize)
    fpw:FPWOrganize = null;

    onLoad() {
        MK.forgetPWord = this;
        //点击下一步
        this.clickNext();
        //点击重新发送
        this.clickResend();
        //点击确定注册
        this.clickEnsure();
        //点击继续游戏
        this.clickContinue();
    }

    //点击下一步
    clickNext() {

        this.fpw.next.on(cc.Node.EventType.TOUCH_START, () => {

            const telNumber = this.fpw.telNumbers.getComponent(cc.EditBox).string.trim();
            const vCode = this.fpw.vCode.getComponent(cc.EditBox).string.trim();
            const regular = /^1[34578][0-9]{9}$/;

            //验证电话号码和验证码
            if (telNumber === "" || !regular.test(telNumber)) {
                console.log(telNumber);
                MK.tips.getTips("电话号码输入错误");
                return;
            }
            if (vCode === "") {
                MK.tips.getTips("验证码输入错误");
                return;
            }

            cc.sys.localStorage.setItem("forgetTelNumber",telNumber);

            //显示第二个注册界面
            this.fpw.forgetPWView[1].active = true;
            //隐藏第一个注册界面
            this.fpw.forgetPWView[0].active = false;
        })

    }

    //点击重新发送
    clickResend() {
        this.fpw.reSend.on(cc.Node.EventType.TOUCH_START, () => {
            //TO REQUEST RESEND
        })
    }

    //点击确定
    clickEnsure() {

        this.fpw.ensure.on(cc.Node.EventType.TOUCH_START, () => {

            const pWord = this.fpw.passWord.getComponent(cc.EditBox).string.trim();
            const vPWord = this.fpw.vriPassWord.getComponent(cc.EditBox).string.trim();

            //验证用户名密码是否符合
            if (pWord === "" || pWord.length < 6) {
                if (pWord === "") {
                    MK.tips.getTips("密码不能为空");
                    return;
                }
                if (pWord.length < 6) {
                    MK.tips.getTips("密码最少六位字符");
                    return;
                }
            }
            if (vPWord != pWord) {
                MK.tips.getTips("两次密码输入不一致");
                return;
            }

            cc.sys.localStorage.setItem("findPWord",pWord);
            cc.sys.localStorage.setItem("findVPWord",vPWord);

            //隐藏第二个界面
            this.fpw.forgetPWView[1].active = false;
            //显示第三个界面
            this.fpw.forgetPWView[2].active = true;
        })

    }

    //点击继续进入游戏
    clickContinue() {
        this.fpw.continue.on(cc.Node.EventType.TOUCH_START, () => {
            //隐藏第三个注册界面
            // this.fpw.forgetPWView[2].active = false;
            //显示游戏第一关
            const fTelNumber = cc.sys.localStorage.getItem("forgetTelNumber");
            const pWord = cc.sys.localStorage.getItem("findPWord");
            const vPWord = cc.sys.localStorage.getItem("findVPWord");
            console.log(fTelNumber);
            console.log(pWord);
            console.log(vPWord);
            //找回密码请求
            AxiosRequest.findPWord(fTelNumber,pWord,vPWord).then((res1)=>{
                console.log("密码找回的返回信息：");
                console.log(res1);
                //调用登录接口找回密码后获取token
                AxiosRequest.toLogin(fTelNumber,pWord).then((res2)=>{
                    console.log("找回密码的请求数据：");
                    console.log(res2);
                    const token = res2.data.token;
                    console.log(token);
                    cc.sys.localStorage.setItem("findToken",token);

                    //检查token是否有效
                    AxiosRequest.checkToken(token).then((res3)=>{
                        //如果token有效就根据token获取数据
                        if (res3.data.data === false) {

                            AxiosRequest.getUserInfo(token).then((res4) => {

                                //获取token后建立stomp连接
                                let userId = res4.data.data.userId;
                                MK.candyManager.toConnect(userId);

                                //token有效，根据token获取用户信息
                                this.fpw.forgetPWView[2].active = false;
                                // console.log("找回密码成功，显示连接页面");
                                //显示连接界面
                                this.fpw.connectView.active = true;
                                //延迟3秒进入到游戏未开始界面
                                this.fpw.container.getComponent(cc.Sprite).scheduleOnce(()=>{

                                    this.fpw.connectView.active = false;
                                    this.fpw.checkPoint.active = true;
                                    this.fpw.checkPoint.children.forEach((check,idx)=>{
                                        check.active = false;
                                    });
                                    this.fpw.checkPoint.getChildByName("unStart").active = true;
                                    this.fpw.settingIcon.active = true;
                                    console.log("token有效，获取用户信息：");
                                    console.log(res4);
                                },3)

                            }).catch((error) => {
                                console.log(error)
                            })
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })

                }).catch((error)=>{
                    console.log(error)
                })

            }).catch((error)=>{
                console.log(error);
            });

        })
    }

}
