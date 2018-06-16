// pages/login/index.js

import assetsPath from "../../config/assetsPath.js";
import { getLoginCode } from "../../apis/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assetsPath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  sendCode:function(){

    // getLoginCode({ phone: "13522199952" }, { res:true,loading:false }).then(res => {
    //   console.log(res) //{ code:"10000",mas:"",data:{} }
    //   if (res.code == 10000) {
    //     this.list = res.data;
    //   } else {
    //     alert(res.msg)
    //   }
    // })

    getUserMsgs({ phone: "13121485350" })
    .then(data=>{
      console.log(data) 
      // data && wx.showToast({ title: "验证码发送成功!"})
      data && wx.showToast({ title: data.msg})
    })


  }
})