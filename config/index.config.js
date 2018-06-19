export default {
  build:"dev",//上线改成pro

  //开发环境配置
  dev:{
    assetsPath:"/images/@2x",
    baseUrl:"http://www.huifakeji.com:8080",
    device:"wechatDevice"
  },

  //生产环境配置
  pro:{
    assetsPath: "",
    baseUrl: "http://www.huifakeji.com",
    device: "wechatDevice"
  }

}