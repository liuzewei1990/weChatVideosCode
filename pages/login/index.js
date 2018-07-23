// pages/login/index.js

import assetsPath from "../../config/assetsPath.js";
import config from "../../config/index.config.js";
import { getLoginCode,login } from "../../apis/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assetsPath,
    verifyCodeTime:"发送验证码",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad:",options)
    this.setData({ redirect: options.redirect || ""});

    options.msg && wx.showToast({ title: options.msg, icon: "none" });
  },

  mobileInputEvent: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  //获取短信验证码
  sendCode: function (e) {
    if (this.data.buttonDisable) return false;

    let regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; 
    if (!regMobile.test(this.data.mobile)) {
      wx.showToast({ title: '手机号有误！',icon:"none" })
      return false;
    }

    getLoginCode({ phone: this.data.mobile }).then(data => {
      if(data){
        wx.showToast({ title: "验证码发送成功!" });

        let c = 60;
        let intervalId = setInterval(() => {
          c = c - 1;
          this.setData({ verifyCodeTime: c + 's后重发',buttonDisable: true });
          if (c == 0) {
            clearInterval(intervalId);
            this.setData({ verifyCodeTime: '发送验证码',buttonDisable: false });
          }
        }, 1000);

      }
    })
  },

  //登录接口
  userLogin(e){
    let values = e.detail.value;
    
    //手机号正则  
    let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; 
    if (!phoneReg.test(values.phone)){
      wx.showToast({ title: "请填写正确的手机号！",icon:"none" });
      return;
    }

    if(values.code.length < 6){
      wx.showToast({ title: "请填写正确的验证码！", icon: "none" });
      return;
    }

    //设备标识
    values["device"] = config[config.build].device;

    login(values).then(data=>{
      try{
        let token = data.token;
        wx.setStorageSync("token", token);
        // 如果没有redirct地址，则去userHome用户中心
        if (this.data.redirect){
          wx.redirectTo({
            url: `/${decodeURIComponent(this.data.redirect)}`,
            success: () => { },
            fail: () => {
              wx.showToast({ title: '网络异常，请重试！', icon: 'none', duration: 2000 })
            }
          });
        }else{
          //非Tab页面只有switchTab方法才能回到Tab页面
          // wx.switchTab({
          //   url: "/pages/userHome/index",
          //   success: () => { },
          //   fail: () => {
          //     wx.showToast({ title: '网络异常，请重试！', icon: 'none', duration: 2000 })
          //   }
          // })
          wx.navigateBack();
        }

      }catch(err){
        console.log(err.message);
        wx.showToast({ title: "登录失败，请重试！", icon: "none" });
      }
    })

  }
})