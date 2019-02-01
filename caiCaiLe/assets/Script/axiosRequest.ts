const {ccclass, property} = cc._decorator;
import axios from "./api/Axios.config";

// axios.defaults.url = "http://hallapi.tiangu95.com";
export class guessGetInfo {


    //获取大奖记录
    static  getRecords() {
        //http://hallapi.tiangu95.com/tiangugame/hall/app/guess/getBigWardRecord
        return axios.get("http://hallapi.tiangu95.com/tiangugame/hall/app/guess/getBigWardRecord", {
            params: {
                // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwNTAiLCJpYXQiOjE1NDUxODg1NzMsImV4cCI6MTU0Nzc4MDU3M30.rGWLmIwu2mR9ALHeaogO9TZuEkUX2Vg8i8Y83U3kbRqnpjmNTSKmZHvpYjAL9O7aYvujNVAyQFGLMl9wR8b5Xg"
                token: cc.sys.localStorage.getItem("token")
            }
        })/*.then((res) => {
            console.log(res);
            let resp = res.toString();
            cc.sys.localStorage.setItem("recordsInfo", resp);
        }).catch((err) => {
            console.log(err);
        })*/;
    }

    //获取排行版消息
    static  getRankInfo(theDay) {
        return axios.get("http://hallapi.tiangu95.com/tiangugame/hall/app/guess/getRanking/"+theDay, {
            params: {
                token: cc.sys.localStorage.getItem("token")
            }
        })/*.then((res) => {
            console.log(res);
            cc.sys.localStorage.setItem("rankInfo", res);
        }).catch((err) => {
            console.log(err);
        })*/;
    }
}
