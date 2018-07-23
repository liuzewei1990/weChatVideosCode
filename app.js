//app.js
import { alipayAuth } from "/apis/index.js"
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        if (res.errMsg == "login:ok"){
          // let appid = "wx860b49b76e545c06";
          // let secret = "b95593ec40ea10520763205d8cfb45a2";
          let code = res.code;
          this.globalData.code = code;
          //请求openid 支付需要
          // wx.request({
          //   url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code",
          //   method: 'GET',
          //   header: {
          //     'content-type': 'application/json'
          //   },
          //   success: (res)=>{
          //   console.log(res)  
          //     if (res.statusCode == 200){
          //       let { openid, session_key } = res.data;
          //       if (openid){
          //         this.globalData.openid = openid;
          //       }else{
          //         wx.showToast({ title: "获取openid失败！", icon: "none", duration: 2000 })
          //       }
          //     }
          //   }
          // });
        }
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log("getUserInfo:", res)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  //检查是否登录
  isLogin(){
    try{
      let token = wx.getStorageSync('token');
      return token?true:false;
    } catch (err){
      wx.showToast({ title: err.message, icon: "none" })
      return false;
    }
  },
  //检查是否登录 跳登录页面
  checkUserAuth(options){
    options = options || {};
    if (this.isLogin()) return true;
    else {
      wx.redirectTo({
        url: "/pages/login/index?redirect=" + (options.redirect || ""),
        success: () => { },
        fail: () => {
          wx.showToast({ title: '网络异常，请重试！', icon: 'none', duration: 2000 })
        }
      });
    }
  },
  //支付授权
  payAuth(callback){
    //授权一次
    if (this.globalData.isPayAuth){
      (typeof callback === "function") && callback();
      return;
    }
    alipayAuth({ code: this.globalData.code}).then(data=>{
      if (data === true){
        this.globalData.isPayAuth = true;
        (typeof callback === "function") && callback();
      }
    })
  },

  globalData: {
    userInfo: null,
    isLogin:false,
    ajax:"init",
    code:null
  }
})