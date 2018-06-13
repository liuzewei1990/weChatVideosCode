// Components/Radiovip/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    month: String,
    monery: String,
    desc:String,
    list:Array,
    checkedindex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  ready(){
    let dataset = {
      checkedindex: this.properties.checkedindex,
      item: this.properties.list[this.properties.checkedindex]
    }
    this.setChecked(dataset);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChecked(e){
      let dataset = e.currentTarget.dataset;
      this.setChecked(dataset);
    },

    setChecked(dataset){
      this.setData({
        checkedindex: dataset.checkedindex
      })
      this.triggerEvent('checked', dataset.item)
    }
  }
})
