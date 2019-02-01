const axios = require("axios");
// axios.defaults.url = "http://hallapi.tiangu95.com";

/*axios.get("http://hallapi.tiangu95.com/tiangugame/hall/app/guess/getBigWardRecord",{
    params:{
        // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAwNTAiLCJpYXQiOjE1NDUxODg1NzMsImV4cCI6MTU0Nzc4MDU3M30.rGWLmIwu2mR9ALHeaogO9TZuEkUX2Vg8i8Y83U3kbRqnpjmNTSKmZHvpYjAL9O7aYvujNVAyQFGLMl9wR8b5Xg"
    token:cc.sys.localStorage.getItem("token")
    }
}).then((res)=>{
    console.log(res);
    let resp = res.toString();
    cc.sys.localStorage.setItem("recordsInfo",resp);
}).catch((err)=>{
    console.log(err);
});*/

/*axios.get("http://hallapi.tiangu95.com/tiangugame/hall/app/guess/getRanking/yesterday",{
    params:{
        token:cc.sys.localStorage.getItem("token")
    }
}).then((res)=>{
    console.log(res);
    cc.sys.localStorage.setItem("rankInfo",res);
}).catch((err)=>{
    console.log(err);
});*/

export default axios;