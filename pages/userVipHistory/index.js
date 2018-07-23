// pages/moneyDetailed/index.js
import { userExportMoneyList } from "../../apis/index.js";

import { loadMore } from "../../minxins/index.js";
Page({
  ...loadMore,
  api: userExportMoneyList,
  /**
   * 页面的初始数据
   */
  data: {
    ...loadMore.data,
    list:[
    ],
    query:{
      start: 0,
      length: 20
    },
    statusType:{
      verify: "审核中",
      fail: "提现失败",
      success:"提现成功",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(this.data.query);
  }
})