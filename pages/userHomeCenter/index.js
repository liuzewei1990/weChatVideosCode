// pages/userInfo/index.js

// import assetsPath from "../../config/assetsPath.js";
import { upload, uploadImage, editUserInfo } from "../../apis/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSwitch:true,
    userName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
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

  handleSwitch(){
    this.setData({ isSwitch:false});
  },
  confirm(e){
    let userName = e.detail.value;
    var value = userName.userName;
    if (!value){
      wx.showToast({ title: "昵称不能为空！", icon: 'none' })
      return;
    }
    editUserInfo({ userName: value }).then(bool => {
      if (bool) {
        this.setData({ userName: value, isSwitch: true });
      }
      console.log(this)
    })
  },
  chooseImage(){
    wx.chooseImage({
      count:1,
      success: ({ tempFilePaths, tempFiles})=>{

        upload(tempFilePaths[0],"file",{})

          .then(({ url })=>{
            if(typeof url === "string"){
              editUserInfo({ headImg: url}).then(bool=>{
                if(bool){
                  this.setData({ headImg: url });
                  wx.showToast({ title: "修改成功！", icon: 'none' })
                }
              })
            }
          })

          .catch(err=>{
            wx.showToast({ title: err.message, icon: 'none' })
          })
      },
      fail:(err)=>{
        wx.showToast({ title: "未选择图片！", icon: 'none' })
      }
    })
  }
})