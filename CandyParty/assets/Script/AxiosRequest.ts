import axios from "./api/axios.config";

export class AxiosRequest {

    //检查服务器状态
    static getServerStatus() {
        // console.log(axios);
        return axios.get("http://139.159.221.171:8045/sweet/api/serverstatus");
    }

    //用户注册
    static toRegister(tel, pWord) {
        return axios.post("http://139.159.221.171:8045/sweet/api/register", {
            mobile: tel,
            password: pWord
        });
    }

    //找回密码
    static findPWord(tel, pWord, confirm) {
        return axios.post("http://139.159.221.171:8045/sweet/api/findpassword", {
            phone: tel,
            password: pWord,
            confirm: confirm
        });
    }

    //检查token是否有效
    static checkToken(tokens){
        //http://139.159.221.171/sweet/api/checkToken
        return axios.post("http://139.159.221.171:8045/sweet/api/checkToken",{
                token:tokens
        })
    }

    //用户登录
    static toLogin(tel,pWord){
        return axios.post("http://139.159.221.171:8045/sweet/api/login",{
            mobile:tel,
            password:pWord
        })
    }

    //根据token获取用户信息
    // token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTI5NzQwNjIzLCJleHAiOjE1MzAzNDU0MjN9.UpV7WNHGc_GrUAMCHvxDrfkqwX3mXQKBabfwBWOUBPgItnaRqyTuX-FuACcOx8Od7BgOlh4QQ4cp4_-1YaEKFg
    static getUserInfo(token){
        return axios.get("http://139.159.221.171:8045/sweet/api/getUserByToken",{
            params:{
                token:token
            }
        })
    }

}
