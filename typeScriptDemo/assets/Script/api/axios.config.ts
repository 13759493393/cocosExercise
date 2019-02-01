const axios = require("axios");
// const qs = require("qs"); //通过引入qs模块来格式化代码

axios.defaults.baseURL = "http://hallapi.tiangu95.com";

/**
 *    基础路径：http://hallapi.tiangu95.com
 *    /tiangugame/hall/app/hall/shop/getShopItemByType
 *
 * */

/*axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType", qs.stringify({"data": JSON.stringify({"type": "GOLD"})})).then((response) => {
    console.log(response)
}).catch((err) => {
    console.log(err)
});*/

// let data01;
// let data02;

function getGold(){
    return axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType",{
        params:{
            type:"GOLD",
            // exchangetype:
        }
    })
}

function getDiamond(){
    return axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType",{
        params:{
            type:"DIAMOND",
            // exchangetype:
        }
    })
}

axios.get("/tiangugame/hall/app/hall/shop/getShopItemByType",{
    params:{
        type:"EXCHANGE_TOOL",
        exchangetype:""
    }
}).then((response) => {
    console.log(response.data);
}).catch((err) => {
    console.log(err)
});

axios.all([getGold(),getDiamond()]).then(axios.spread((getGold,getDiamond)=>{

    // let gold = JSON.stringify(getGold.data);
    localStorage.setItem("data01",JSON.stringify(getGold.data));
    localStorage.setItem("data02",JSON.stringify(getDiamond.data));
    console.log(getGold.data);
    // console.log(getDiamond.data);

}));

console.log(JSON.parse(localStorage.getItem("data01")));
console.log(JSON.parse(localStorage.getItem("data02")));


export default axios;