// pages/share/index.js
import assetsPath from "../../config/assetsPath.js";
import { getUserColleHistory } from "../../apis/index.js";
import { loadMore } from "../../minxins/index.js";
Page({
  ...loadMore,
  api: getUserColleHistory,

  /**
   * 页面的初始数据
   */
  data: {
    ...loadMore.data,
    list: [],
    status:"init",
    query:{
      start:0,
      length:20
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(this.data.query);
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
})