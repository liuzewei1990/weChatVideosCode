// pages/share/index.js
import assetsPath from "../../config/assetsPath.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    status:"init",
    query:{
      page:1,
      limit:20,
      status:"SUBMITTING"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(this.data.query);
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
    console.log("上拉")



    let query = this.data.query;

    if(this.data.status !== "error"){
      query.page ++;
    }

    this.setData({query})
    this.loadData(this.data.query);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  loadData(data){
    //如果已经加载完毕 阻止函数
    if(this.data.status == "notData") return;

    this.setData({status:"loading"});

    let checkData = (data) => {
      if (data.resultCode == 0) {
        this.setData({
          list: this.data.list.concat(data.data.list)
        })
        //检查是否有更多数据
        if (data.data.list.length < 20) {
          this.setData({ status: "notData" })
        }
      }
      //如果网络错误
      else if (data.resultCode == 500) {
        this.setData({ status: "error" })
      }
      //未知错误
      else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }

    wx.request({
      url: 'https://to.yeepiao.com/myInvoice/elecBillRecord/123',
      data: data,
      method:"GET",
      dataType:"json",
      success:(res)=>{
        let data = res.data;
        
        checkData(data) //{resultCode:0,resultMsg:"",data:{}}
      }
    })
  },

  onTapError(){
    console.log("onTapError")
    this.loadData(this.data.query);
  },

  randomFrom(lowerValue, upperValue){
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  },

})