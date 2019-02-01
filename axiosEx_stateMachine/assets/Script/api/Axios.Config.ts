const axios = require("axios");   //注意直接引入axios不需要添加路径

axios.defaults.baseURL = "http://hallapi.tiangu95.com";  //是defaults不是default

function getGold() {
    return axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType", {
        params: {
            type: "GOLD"
        }
    })
}

function getDiamond() {
    return axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType", {
        params: {
            type: "DIAMOND"
        }
    })
}

axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType",{
    params:{
        type:"DIAMOND"
    }
}).then((response)=>{

    console.log(response.data)

}).catch((err)=>{
    console.log(err)
});

axios.all([getGold(), getDiamond()]).then(axios.spread((getGold, getDiamond) => {

    console.log(getGold.data);
    console.log(getDiamond.data);

    //可以通过localstorage来存储数据以便在之后取用
    localStorage.setItem("data01", JSON.stringify(getGold.data));
    localStorage.setItem("data02", JSON.stringify(getDiamond.data));

}));

export default axios;
