// pages/play/index.js
import assetsPath from "../../config/assetsPath.js";
import { getVideoDetail } from "../../apis/index.js";
import { userColleGoods } from "../../apis/index.js";
import { userCancelColleGoods } from "../../apis/index.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assetsPath,
    second_height: 0,
    list:[],
    isSummary:false,
    // "productName": "大数据云计算课程",
    // "summary": "让你怀抱大数据的美好未来",//视频简介
    // "preImage": "http://www.uhuijia.com.cn/huifa/video/computer/1.jpg",//视频预览图
    // "videoUrl": "",//视频URL
    // "playCounts": 300,//视频点击数量
    // "fee": 100.0,//视频费用
    // "isBuy": "buyed", //buyed=购买过   nobuy=没有购买
    //   "isCollect": "noCollected",//视频是否收藏（noCollected=未收藏；collected=已收藏）
    // "items": [{
    //   "image": "http://www.uhuijia.com.cn/huifa/video/computer/1.jpg",//列表展示第一集
    //   "id": "1"
    // }, {
    //   "image": "http://www.uhuijia.com.cn/huifa/video/computer/2.jpg",//列表展示第二集
    //   "id": "2"
    // }, {
    //   "image": "http://www.uhuijia.com.cn/huifa/video/computer/3.jpg",//列表展示第三集
    //   "id": "3"
    // }, {
    //   "image": "http://www.uhuijia.com.cn/huifa/video/computer/4.jpg",//列表展示第四集
    //   "id": "4"
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad', options)
    let id = options.id
    this.setData({
      id: id
    })
    console.log(id)
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          second_height: res.windowHeight - res.windowWidth / 750 * 300
        })

      }
    })
    getVideoDetail({productId:id}).then(data=>{
      this.setData(data)
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
    // //创建节点选择器
    // var query = wx.createSelectorQuery();
    // //选择id
    // query.select('#mjltest').boundingClientRect()
    // query.exec(function (res) {
    //   //res就是 所有标签为mjltest的元素的信息 的数组
    //   console.log(res);
    //   //取高度
    //   console.log(res[0].height);
    // })
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

  onLoadData(){
    console.log("请求数据")
  },

  onWatchData(list){
    this.setData({
      list:list
    })

  },
  switchSummary(){
    this.setData({
      isSummary: !this.data.isSummary
    })

  },
  switchIsCollect(){
    if (!app.checkUserAuth())return;

    // 收藏
    if (this.data.isCollect =='noCollected'){
      userColleGoods({productId:this.data.id}).then(data=>{
        this.setData({
          isCollect: "collected"
        })
      })
    }else{
      // 取消收藏
      userCancelColleGoods({ productId: this.data.id }).then(data=>{
        this.setData({
          isCollect: "noCollected"
        })
      })
    }
  }
})