import assetsPath from "../../config/assetsPath.js";

import { getUserIndex } from "../../apis/index.js";
const app = getApp()
// pages/myHome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assetsPath,
    status:"pageOut",
    isLogin: false,
    userType: {
      "user": "普通用户",
      "vip": "VIP会员"
    }
  },


  share:function(){
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 2000
    })
  },

  exit: function () {
    wx.removeStorageSync('token')
    wx.showToast({
      title: '已退出！',
      icon: 'success',
      duration: 2000
    })
    this.onShow();
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
    this.setData({
      isLogin: wx.getStorageSync('token')?true:false
    })

    if(this.data.isLogin){
      getUserIndex().then(data => {
        this.setData(data);
        this.setData({ status: "pageIn" })
      }).catch(err=>{
        this.setData({ status:"error" })
      })
    }else{
      this.setData({ status: "pageIn" })
    }
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
  
  }


})