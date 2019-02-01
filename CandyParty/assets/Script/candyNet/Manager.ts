import MK from "./../MiddleKeys";
import {AxiosRequest} from "../AxiosRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Manager extends cc.Component {

    stompConnect = null;
    tokenIs = null;
    // theToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTU0NzQ1NTY4NSwiZXhwIjoxNTQ4MDYwNDg1fQ.GM37WljmU2OTBuSfLkHLdzV7RDyTWx_AwmdoeY943-Ctm2Q8s23VHVWjzyXbGkn-e_LAT2ErKn3hYwZUOTevFw";


    onLoad() {
        MK.candyManager = this;
        //建立stomp连接
        // this.toConnect();
    }

    update(){
        //每帧检查是否有token
        this.checkTokenIs();
    }

    //检查是否有token
    checkTokenIs(){
        let registerToken = cc.sys.localStorage.getItem("registerToken");
        let logInToken = cc.sys.localStorage.getItem("logInToken");
        let findToken = cc.sys.localStorage.getItem("findToken");
        /*console.log("token们:");
        console.log(registerToken);
        console.log(logInToken);
        console.log(findToken);*/
        if(registerToken != null){
            this.tokenIs = registerToken;
            return;
        }
        if(logInToken!=null){
            this.tokenIs = logInToken;
            return;
        }
        if(findToken != null){
            this.tokenIs = findToken;
            return;
        }
    }

    //未连接
    unConnect() {
        if (this.stompConnect != null) {
            this.stompConnect.unConnect();
        }
        this.stompConnect = null;
    }

    //建立连接
    toConnect(userId) {
        //如果stompConnect不为null，使之为null；
        if (this.stompConnect != null) {
            this.unConnect();
        }

        //http://139.159.221.171/sweet/ws-start
        const socket = new SockJS("http://139.159.221.171:8045/sweet/ws-start", undefined, {transports: ["websocket"]});
        this.stompConnect = Stomp.over(socket);
        console.log(this.stompConnect);
        this.stompConnect.heartbeat.outgoing = 2000;
        this.stompConnect.heartbeat.incomming = 2000;

        /*//游戏初始化
        this.stompConnect.connect({token:this.theToken},()=>{
            this.stompConnect.subscribe("/ws-sweet/user/gameinit", (msg) => {
                console.log("game init");
                console.log(msg)
            });
        },(error)=>{
            console.log(error);
        });*/

        //建立stomp连接后每帧执行分发消息
        this.stompConnect.connect({token: this.tokenIs}, (frame) => {
            //每帧执行分发消息
            this.subscribeMessage(userId);
        }, (error) => {
            cc.error(error);
        });
        this.stompConnect.debug = (str) => {
            console.info(str);
        };

    }

    //分发消息
    subscribeMessage(userId) {

        //用户订阅信息
        ///user/用户下标/sweet
        this.stompConnect.subscribe(`/user/${userId}/sweet`, (msg) => {
            console.log("放入sweet消息");
            /*console.log(msg);
            console.log(JSON.parse(msg.body));*/
            //放入消息
            this.putMsg(msg.body);
        });

        //广播消息
        this.stompConnect.subscribe("/topic/sweet", (msg) => {
            console.log(msg);
            //放入消息
            // this.putMsg(msg);
        });

        this.stompConnect.subscribe(`/user/${userId}/other`, (msg) => {
            console.log(msg);
            console.log(JSON.parse(msg.body))
            //放入消息
            // this.putMsg(msg);
        });



    }

    //广播消息
    subscribeRadioMsg(){
        this.stompConnect.subscribe("/topic/sweet", (msg) => {
            console.log(msg);
            //放入消息
            // this.putMsg(msg);
        });
    }

    //放入消息
    putMsg(msg) {
        MK.candyDispatch.putMessage(msg);
    }

    //游戏开始发送消息
    startSend(msg) {
        this.stompConnect.send("/ws-sweet/user/gamestart",{token:this.tokenIs}, msg);
    }

    //兑换比率发送消息
    exchangeSend(msg) {
        this.stompConnect.send("/ws-sweet/user/exchange",{token:this.tokenIs}, msg);
    }

    //发送初始化游戏
    gameInitSend(){
        this.stompConnect.send("/ws-sweet/user/gameinit",{token:this.tokenIs});
    }


}
