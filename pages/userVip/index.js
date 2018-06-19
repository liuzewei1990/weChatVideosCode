// pages/share/index.js
import { userPayVip } from "../../apis/index.js";
import { alipayVip } from "../../apis/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:{},
    checkedindex:0,
    vipList:[
      {
        id:"",
        vipMonth:"",
        payMoney: "",
        showDesc:"",
      },
      {
        id: "",
        vipMonth: "",
        payMoney: "",
        showDesc: "",
      },
      {
        id: "",
        vipMonth: "",
        payMoney: "",
        showDesc: "",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userPayVip().then(data=>{
      this.setData(data);
      this.onChecked({
        detail:this.data.vipList[this.data.checkedindex]
      });
    })

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

  /**
   * 用户点击购买历史
   */
  toHostory:function(){
    wx.navigateTo({
      url: "../userVipHistory/index",
      success: () => { },
      fail: () => {
        wx.showToast({
          title: '网络异常，请重试！',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  tradeBtn:function(){
    // wx.showModal({
    //   title: '提示',
    //   content: '选择了' + this.data.checked.vipMonth + "个月",
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    console.log("会员下单", this.data.checked);
    if (this.data.checked.id){
      alipayVip({ vipTypeId: this.data.checked.id }).then(data => {
        console.log(data)
      })
    }else{
      wx.showToast({ title: '无法下单，请联系客服！', icon: 'none' })
    }
   
  },

  onChecked:function(item){
    console.log(111,item.detail)
    this.setData({
      checked:item.detail
    })
  }
})