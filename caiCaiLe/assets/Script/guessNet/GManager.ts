/*import SoketJs from "../Lib/sockjs";
import Stomp from "../Lib/stomp";*/
import MK from "../MiddleKey";

const {ccclass, property} = cc._decorator;
@ccclass
export default class GManager extends cc.Component {

    stompBuild = null;

    theToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwMDIiLCJpYXQiOjE1NDcxNjg4NTUsImV4cCI6MTU0OTc2MDg1NX0.n1sog9yn92fhvRw81RAPXKte-6W4Mw9EIvPEHBCFACPwnQitNy8m3Dq1u4jKhelydiCSTw4J3Y_A-uZP3DhdBw";

    info: object = {
        userId: 100056
    };

    /*@property(Msg)
    thisMsg:Msg;*/

    onLoad() {

        MK.GManager = this;
        this.toConnect();
        // console.log("进入请求")

        // cc.game.addPersistRootNode(this.node);
        cc.sys.localStorage.setItem("token", this.theToken);
        cc.sys.localStorage.setItem("info", this.info);

        //判断游戏切换前后台
        // this.toggleGame();
    }

    disConnect() {
        if (this.stompBuild != null) {
            this.stompBuild.disContact();
        }
        this.stompBuild = null;
    }

    toConnect() {

        if (this.stompBuild != null) {
            this.disConnect();
        }

        const socket = new SockJS("http://hallapi.tiangu95.com/tiangugame/hall/ws-start", undefined, {transports: ["websocket"]});
        // const socket = new SockJS(`http://api.lmkj.ink/server/index.php?`, undefined, {transports: ["websocket"]});
        this.stompBuild = Stomp.over(socket);
        // console.log(this.stompBuild);
        this.stompBuild.heartbeat.outgoing = 2000;
        this.stompBuild.heartbeat.incoming = 2000;

        this.stompBuild.connect(
            {token:this.theToken},
            (frame)=>{
                this.subscribeMessage();
            },(error)=>{
                cc.error(error);
            });
        this.stompBuild.debug = (str)=>{
            cc.info(str);
        }

        /*this.stompBuild.connect(
            {token: this.theToken},
            (frame) => {
                this.subscribeMessage();
                // console.log("执行分发消息");
            }, (error) => {
                cc.error(error)
            });
        this.stompBuild.debug = (str) => {
            // console.info(str)
        }*/
    }

    subscribeMessage() {

        let userId = this.info.userId;
        console.log(userId);

        //分发公共消息
        this.stompBuild.subscribe("/topic/guessgame", (msg) => {

            let message = JSON.parse(msg.body);
            // console.log(message);
            this.putMessage(message);
        });

        //分发个人消息
        this.stompBuild.subscribe(`/user/${userId}/guessgame`, (msg) => {
            // console.log("个人消息："+msg);
            let message = JSON.parse(msg.body);
            this.putMessage(message);
        });

        //分发错误消息
        this.stompBuild.subscribe(`/user/${userId}/guess/error`, (msg) => {
            // console.log(msg);
            let message = JSON.parse(msg.body);
            this.putMessage(message);
        })


    }

    //放入消息
    putMessage(mesg) {
        // MS.GDispatch.put(msg);
        MK.GDispatch.put(mesg);
    }

    //发送玩家进入游戏消息
    sendEnter() {
        this.stompBuild.send("/tiangugame/guess/enterGuess", {token: this.theToken});
    }

    //发送用户下注消息
    sendBet(betMsg) {
        this.stompBuild.send("/tiangugame/guess/betting", {token: this.theToken}, betMsg);
    }

    //发送自动投币消息
    sendAutoBet(autoMsg) {
        this.stompBuild.send("/tiangugame/guess/setAutoBetting", {token: this.theToken}, autoMsg);
    }

    //发送取消自动投币消息
    sendAutoCancel() {
        this.stompBuild.send("/tiangugame/guess/clearAutoBetting", {token: this.theToken});
    }

    //发送重复下注消息
    sendRepeatBet() {
        this.stompBuild.send("/tiangugame/guess/repeatBetting", {token: this.theToken});
    }

}
