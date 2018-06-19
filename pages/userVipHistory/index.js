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
      {
        "accountNum": "18401762162",
        "money": "101.0",
        "accountName": "宝",
        "accountType": "weixin",
        "orderNum": "201804152244686782",
        "status": "verify"//审核中
      }
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