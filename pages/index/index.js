//index.js

//获取应用实例
const app = getApp()

import { getIndexInfo, getVideoList } from "../../apis/index.js";
import { loadMore } from "../../minxins/index.js";

let products = [
  {
    categoryCode: "",
    id: "",
    playCounts: "",
    productImage: "",
    productName: "",
    summary: "",
    uploadTime: ""
  }, {
    categoryCode: "",
    id: "",
    playCounts: "",
    productImage: "",
    productName: "",
    summary: "",
    uploadTime: ""
  }, {
    categoryCode: "",
    id: "",
    playCounts: "",
    productImage: "",
    productName: "",
    summary: "",
    uploadTime: ""
  }, {
    categoryCode: "",
    id: "",
    playCounts: "",
    productImage: "",
    productName: "",
    summary: "",
    uploadTime: ""
  }, {
    categoryCode: "",
    id: "",
    playCounts: "",
    productImage: "",
    productName: "",
    summary: "",
    uploadTime: ""
  }, {
    categoryCode: "",
    id: "",
    playCounts: "",
    productImage: "",
    productName: "",
    summary: "",
    uploadTime: ""
  },
]

Page({

  api: getVideoList,
  ...loadMore,
  data: {
    ...loadMore.data,
    banners: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    second_height:0,
    defaultIndex:0,
    tabsFixed:false,
    query: { keyword: "", categoryCode: "", start: 0, length: 20 },
    categorys:[
      {
        categoryName: "",
        categoryCode: ""
      }, {
        categoryName: "",
        categoryCode: ""
      }, {
        categoryName: "",
        categoryCode: ""
      }, {
        categoryName: "",
        categoryCode: ""
      }, {
        categoryName: "",
        categoryCode: ""
      }, {
        categoryName: "",
        categoryCode: ""
      }
    ],
    list: []
  },

  onLoad: function () {

    getIndexInfo().then(data => {
      this.setData({
        banners: data.banners,
        categorys: data.categorys
      })

      this.handleChecked({
        detail:{
          ...this.data.categorys[this.data.defaultIndex]
        }
      });
      // this.loadData();
    })
  },
  setScrollViewHeight: function(e) {

    // console.log('onLoad')
    var that = this
    // 获取系统信息
    var query = wx.createSelectorQuery(),
      offsetTop = 0;
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(123, res[0]);
      //取高度
      console.log(res[0].top);
      offsetTop = res[0].top * 2;
      console.log(offsetTop)

      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          // 可使用窗口宽度、高度
          console.log('height=' + res.windowHeight);
          console.log('width=' + res.windowWidth);
          // 计算主体部分高度,单位为px
          that.setData({
            // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
            second_height: res.windowHeight - res.windowWidth / 750 * offsetTop
          })

        }
      })
    })
  },

  //tabs切换查询条件
  handleChecked(item){
    let categoryCode = item.detail.categoryCode;
    let categoryName = item.detail.categoryName;

    this.setData({
      query: {
        // keyword: categoryName,
        categoryCode: categoryCode,
        start: 0,
        length: 20
      }
    })
    this.setData({ status: "loadingEnd" })
    // this.setData({list: []});
    if (this.data.list.length>this.data.query.length){
      wx.pageScrollTo({
        scrollTop: 150, //160
        duration: 0
      })
    }
    this.loadData(this.data.query,true);
  },

  

  // 滚动监听 tabs组件 fixed定位
  onPageScroll(e){
    if (e.scrollTop > 160){
      this.setData({ tabsFixed:true })
    }else{
      this.setData({ tabsFixed: false })
    }
  }
})



