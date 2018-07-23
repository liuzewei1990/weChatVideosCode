// pages/play/index.js
import assetsPath from "../../config/assetsPath.js";
import { getVideoDetail, getGoodDetail, userColleGoods, userCancelColleGoods, getVideoList, alipayGoods } from "../../apis/index.js";
import utils from "../../utils/util.js";
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
    isLogin:false,
    itemId:0,
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
  onLoad: function ({ id, categoryCode}) {
    console.log("生命周期：onLoad")
    this.setData({ categoryCode: categoryCode})
    this.ajaxGetVideoDetail(id);
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        // console.log('height=' + res.windowHeight);
        // console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          second_height: res.windowHeight - res.windowWidth / 750 * 300
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("生命周期：onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("生命周期：onShow")
    this.setData({ isLogin: app.isLogin() });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期：onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期：onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.ajaxGetVideoDetail(this.data.id);
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

  //用户点击收藏
  switchIsCollect(){
    if (!app.checkUserAuth({ redirect: this.getRedirect() }))return;

    // 收藏
    if (this.data.isCollect =='noCollected'){
      userColleGoods({productId:this.data.id}).then(data=>{
        this.setData({
          isCollect: "collected"
        })
        wx.showToast({ title: "收藏成功", icon: 'success' });
      })
    }else{
      // 取消收藏
      userCancelColleGoods({ productId: this.data.id }).then(data=>{
        this.setData({
          isCollect: "noCollected"
        })
        wx.showToast({ title: "取消成功", icon: 'success' });
      })
    }
  },


  //相关视频点击
  linkVideo(e){
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    this.ajaxGetVideoDetail(id);
  },

  //剧集点击
  playNum(e){
    let dataset = e.currentTarget.dataset;
    let itemId = dataset.id;
    this.getGoodDetail(itemId);
  },

  //获取视频详情
  ajaxGetVideoDetail(id) {
    if(!id){
      wx.showToast({ title: "出错啦！请重新尝试~", icon: 'none' });
      return;
    }
    this.setData({ id: id })
    // this.setData({ productName: "" })
    getVideoDetail({ productId: id }).then(data => {
      
      let items = data.items;
      //默认播放商品项的第一条数据
      if(items instanceof Array && items.length > 0){
        let itemId = items[0].id;
        //获取商品项详情
        this.getGoodDetail(itemId,data);
        //获取推荐列表
        this.getVideoList();
      }else{
        this.setData(data);
      }
    }).catch(err=>{
      console.log(1111111,err)
    })
  },

  //获取商品项详情
  getGoodDetail(itemId,detailData){

    this.setData({ itemId });
    getGoodDetail({ itemId }).then(data => {
      wx.stopPullDownRefresh();
      this.setData({ ...detailData, ...data});
    })
  },

  //获取推荐列表数据
  getVideoList(){
    //清空推荐列表
    this.setData({ list: [] })
    if (this.data.isLogin) {
      getVideoList({ categoryCode: this.data.categoryCode, start: "0", length: "5" }).then(data => {
        this.setData({ list: data.list })
      })
    }
  },

  //用户点击购买视频
  buyVideo() {
    if (!app.checkUserAuth({ redirect: this.getRedirect() })) return;
    //支付授权
    app.payAuth(this.payGoodsOrder);
  },

  //用户购买视频下单
  payGoodsOrder(){
    if (!this.data.itemId){
      wx.showToast({ title: "商品id不存在，无法下单！", icon: 'none' });
      return;
    }
    alipayGoods({ productItemId: this.data.itemId }).then(data => {
      wx.requestPayment(
        {
          ...data,
          success:(res) =>{
            console.log("支付", res)
            if (res.errMsg == "requestPayment:ok") {
              wx.showToast({ title: "付款成功！", icon: 'none' });
              this.ajaxGetVideoDetail(this.data.id);
            } else {
              wx.showToast({ title: "付款失败！", icon: 'none' });
            }
          },
          fail: function (res) { },
          complete: function (res) { }
        }
      )
    })
  },

  //用户点击购买会员
  buyVip() {

    if (!app.checkUserAuth({ redirect: this.getRedirect() })) return;
    wx.navigateTo({
      url: "/pages/userVip/index",
      success: () => { },
      fail: () => {
        wx.showToast({ title: '网络异常，请重试！', icon: 'none', duration: 2000 })
      }
    })
  },

  //用户手动点击登录
  toLoginPage(){
    app.checkUserAuth({ redirect: this.getRedirect()});
  },

  //获取登录成功重定向的url
  getRedirect(){
    let redirect = `${utils.getCurrentPageUrl()}?id=${this.data.id}&categoryCode=${this.data.categoryCode}`;
    redirect = encodeURIComponent(redirect);
    return redirect;
  }
})