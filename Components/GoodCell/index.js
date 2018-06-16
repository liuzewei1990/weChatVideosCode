// Components/GoodCell/index.js

import assetsPath from "../../config/assetsPath.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    borderLine:Boolean,
    reverse:Boolean,
    videoUrl:String,
    title:String,
    num:String,
    date:String,
    to:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    assetsPath
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toUrl() {
      if (!this.properties.to) return;
      console.log("toUrl:", this.properties.to)
      wx.navigateTo({
        url: this.properties.to,
        success: () => { },
        fail: () => {
          wx.showToast({
            title: '网络异常，请重试！',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }

  }
})
