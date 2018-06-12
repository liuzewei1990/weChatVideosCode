// Components/Cell/index.js

import assetsPath from "../../config/assetsPath.js";

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    desc: String,
    isLink:Boolean,
    borderLine:Number,
    borderLineOffset:Number,
    to: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    arrawIcon: assetsPath.arrawIcon
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toUrl(){
      if (!this.properties.to) return;
      console.log("toUrl:", this.properties.to)
      wx.navigateTo({
        url: this.properties.to,
        success: () => {},
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
