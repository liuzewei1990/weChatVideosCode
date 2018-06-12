// Components/Msg/index.js


import assetsPath from "../../config/assetsPath.js"; 
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    headerUrl: String,
    isLink: Boolean,
    minW: Boolean,
    title: String,
    desc: String,
    time:String,
    borderLine:Boolean
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

  }
})
