import IntoOrganize from "./IntoOrganize";
import MK from "../MiddleKeys";
import {AxiosRequest} from "../AxiosRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IntoLogic extends cc.Component {

    @property(IntoOrganize) into: IntoOrganize = null;

    onLoad() {
        MK.intoGameLogic = this;
        //检查token是否有效
        this.checkTokenHave();
        //循环播放动画
        this.animationLoop();
    }

    //游戏交互循环播放动画
    animationLoop() {
        //进入游戏交互
        console.log("动画循环播放");
        let animate01 = this.into.interactiveCandy.getComponent(cc.Animation);
        let animate02 = this.into.interactiveConnect.getComponent(cc.Animation);
        let ani01 = animate01.play();
        let ani02 = animate02.play();
        ani01.repeatCount = Infinity;
        ani02.repeatCount = Infinity;
    }

    //检查是否有token
    checkTokenHave() {
        let registerToken = cc.sys.localStorage.getItem("registerToken");
        let logInToken = cc.sys.localStorage.getItem("logInToken");
        let findToken = cc.sys.localStorage.getItem("findToken");
        console.log("registerToken:" + registerToken);
        console.log("logInToken:" + logInToken);
        console.log("findToken:" + findToken);

        if (registerToken != null) {
            //如果token不为null；检查token是否有效
            this.checkToken(registerToken);
            return;
        }
        if (logInToken != null) {
            //如果token不为null；检查token是否有效
            this.checkToken(logInToken);
            return;
        }
        if (findToken != null) {
            this.checkToken(findToken);
            return;
        }
        //如果token不存在就跳转到登录界面
        this.into.connectView.active = false;
        this.into.loginView.active = true;
        this.into.loginView.getChildByName("register").active = true;

    }

    //检查token是否有效
    //如果token有效,根据token获取用户信息
    checkToken(token) {
        AxiosRequest.checkToken(token).then((res1) => {
            console.log("token连接：" + res1.data.msg);
            console.log(res1);



            //如果token有效就根据token获取数据
            if (res1.data.data === false) {

                AxiosRequest.getUserInfo(token).then((res2) => {
                    console.log(res2);

                    //处理用户名，金币数，当前分数
                    let userName = "" + res2.data.data.username;
                    let userGold =  res2.data.wallet.money;
                    let userScores =  res2.data.wallet.score;
                    let niArr = [];
                    //控制用户姓名长度
                    niArr = userName.split("");
                    if (niArr.length > 4) {
                        userName = userName.slice(0, 3) + "...";
                    } else {
                        userName = userName;
                    }
                    //改变用户金币数单位
                    if(userGold > 100000000){
                        userGold = Math.floor(userGold/100000000) + "亿";
                    }else if(userGold > 10000){
                        userGold = Math.floor(userGold/10000) + "万";
                    }else{
                        userGold = "" + userGold;
                    }
                    //改变用户当前总分单位
                    if(userScores > 100000000){
                        userScores = Math.floor(userScores/100000000) + "亿";
                    }else if(userScores > 10000){
                        userScores = Math.floor(userScores/10000) + "万";
                    }else{
                        userScores = "" + userScores;
                    }


                    //赋值姓名，金币数，总分
                    this.into.exchangeName.getComponent(cc.Label).string = userName;
                    this.into.goldNum.getComponent(cc.Label).string = userGold;
                    this.into.userScore.getComponent(cc.Label).string = `当前分数：${userScores}分`;

                    let userId = res2.data.data.userId;
                    //建立stomp连接
                    MK.candyManager.toConnect(userId);

                    //延时3秒进入游戏
                    this.into.connectView.getComponent(cc.Sprite).scheduleOnce(() => {
                        this.into.connectView.active = false;
                        this.into.checkPoint.active = true;
                        this.into.checkPoint.getChildByName("unStart").active = true;
                        this.into.settingIcon.active = true;
                    }, 3)


                }).catch((error) => {
                    console.log(error)
                })
            }

        }).catch((error) => {
            console.log(error);
        })
    }

}
