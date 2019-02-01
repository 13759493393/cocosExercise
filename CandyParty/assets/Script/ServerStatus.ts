import MK from "./MiddleKeys";
import {AxiosRequest} from "./AxiosRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ServerStatus extends cc.Component {

    onLoad() {
        MK.axiosRequest = this;
        //获取服务器状态
        this.getServerSta();
    }

    //获取服务器状态
    getServerSta() {
        AxiosRequest.getServerStatus().then((res) => {
            // console.log(res);
            console.log("服务器连接："+res.data.msg);
        }).catch((err) => {
            console.log(err);
        })
    }

}
