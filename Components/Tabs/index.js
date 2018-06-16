// Components/Tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value:[]
    },
    //设置默认选中
    checkedindex: {
      type: Number,
      value: 0
    },

    isScroll:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  ready() {
    // let dataset = {
    //   checkedindex: this.properties.checkedindex,
    //   item: this.properties.list[this.properties.checkedindex]
    // }
    // this.setChecked(dataset);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChecked(e) {
      let dataset = e.currentTarget.dataset;
      this.setChecked(dataset);
    },

    setChecked(dataset) {
      this.setData({
        checkedindex: dataset.checkedindex
      })
      this.triggerEvent('checked', dataset.item)
    }
  }
})
