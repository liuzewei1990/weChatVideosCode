// Components/LoadmoreLoding/index.js
import assetsPath from "../../config/assetsPath.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status:{
      type:String,
      value:"init"
    }
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
    handleErorrTap(){
      this.triggerEvent('tapError')
    }
  }
})
