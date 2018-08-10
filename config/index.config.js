export default {
  build:"pro",//上线改成pro

  //开发环境配置
  dev:{
    assetsPath:"/images/@2x",
    baseUrl:"http://www.huifakeji.com:8080",
    payUrl:"https://yhsxy.uhuijia.com.cn",
    uploadUrl:"https://www.uhuijia.com.cn",
    device:"wechatDevice"
  },

  //生产环境配置
  pro:{
    assetsPath: "/images/@2x",
    baseUrl: "https://yhsxy.uhuijia.com.cn",
    payUrl: "https://yhsxy.uhuijia.com.cn",
    uploadUrl: "https://www.uhuijia.com.cn",
    device: "wechatDevice"
  }

}