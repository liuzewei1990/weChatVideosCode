// pages/share/index.js
import { getUserMsgs } from "../../apis/index.js";
import { loadMore } from "../../minxins/index.js";
Page({
  ...loadMore,
  api: getUserMsgs,
  /**
   * 页面的初始数据
   */
  data: {
    ...loadMore.data,
    status:"init",
    list:[],
    query: {
      start: 0,
      length: 20
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadData(this.data.query);
  },

})