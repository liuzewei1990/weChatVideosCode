// pages/share/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:{},
    radioList:[
      {
        month:"1",
        monery: "25",
        desc:"22.0",
      },
      {
        month: "2",
        monery: "25",
        desc: "22.0",
      },
      {
        month: "3",
        monery: "25",
        desc: "22.0",
      },
      {
        month: "4",
        monery: "25",
        desc: "22.0",
      }
      
    ]
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

  /**
   * 用户点击购买历史
   */
  toHostory:function(){
    wx.navigateTo({
      url: "../tradeHistory/index",
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
    wx.showModal({
      title: '提示',
      content: '选择了' + this.data.checked.month + "个月",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onChecked:function(item){
    console.log(item.detail)
    this.setData({
      checked:item.detail
    })
  }
})