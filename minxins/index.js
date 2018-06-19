

export let loadMore = {

  data: {
    status: "init",
    //首次加载完成
    _pageShow:false,
  },

  //下拉刷新
  onPullDownRefresh() {
    
    //重置query对象 清空数据 初始化状态
    this.setData({
      query: { start: 0, length: 20 },
      status:"init"
    });

    this.loadData(this.data.query,true);

  },

  //监听下拉加载
  onReachBottom() {
    console.log("上拉")
    let query = this.data.query;

    if (this.data.status === "loadingEnd") {
      query.start++;
      this.setData({ query })
    }

    this.loadData(this.data.query);
  },

  //loadData数据
  loadData(query,isRefresh) {
    console.log(this)
    if (!this.api) {
      wx.showToast({ title: '请在page中声明api方法', icon: 'none' });
      return;
    }
    console.log("query:", query)
    //如果已经加载完毕 阻止函数
    if (this.data.status == "notData" || this.data.status == "null" || this.data.status == "loading") return;

    isRefresh || this.setData({ status: "loading" });

    query.keyword = "";
    query.categoryCode = "";


    this.api(query)
      .then(data => {
        wx.stopPullDownRefresh();

        if (data.list.length == 0 && query.start == 0){
          this.setData({ status: "null", _pageShow: true,list:[] });
          return;
        };
        
        if (isRefresh)
          this.setData({ list: data.list });
        else 
          this.setData({ list: this.data.list.concat(data.list) });

        this.setData({ status: "loadingEnd"})

        data.isMore == "none" && this.setData({ status: "notData" });
        // if (data.list.length == 0 && query.start == 0) this.setData({ status: "null" });

        //让page显示
        this.setData({ _pageShow: true });
      })
      .catch(err => {
        this.setData({ status: "error", _pageShow: true });
        wx.stopPullDownRefresh();

        //处理当网络出错时并且是刷新操作，清空list数组数据，避免数据累加问题。
        isRefresh && this.setData({ list: [] })
      })

  },

  //加载出错时
  onTapError() {
    console.log("onTapError")
    this.loadData(this.data.query);
  },
}