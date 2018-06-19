

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

    //true 表示刷新操作
    this.loadData(this.data.query,true);

  },

  //监听下拉加载
  onReachBottom() {
    console.log("上拉")
    //只有状态为 loadingEnd的时候：才能load
    if (this.data.status === "loadingEnd") {
      let query = this.data.query;
      query.start++;
      this.setData({ query })
      this.loadData(this.data.query);
    }
  },

  //loadData数据
  loadData(query,isRefresh) {
    if (!this.api) {
      wx.showToast({ title: '请在page中声明api方法', icon: 'none' });
      return;
    }

    console.log("query:", query)
    //如果已经加载完毕 || 没有数据 || 正在加载中 == 阻止执行
    if (this.data.status == "notData" || this.data.status == "null" || this.data.status == "loading") return;

    //如果是刷新操作，不显示loading
    isRefresh || this.setData({ status: "loading" });

    query.keyword = "";
    query.categoryCode = "";

    //页面声明的相应接口调用
    this.api(query)
      .then(data => {
        //收起下拉刷新loading条
        wx.stopPullDownRefresh();

        //暂无数据
        if (data.list.length == 0 && query.start == 0){
          this.setData({ status: "null", _pageShow: true,list:[] });
          return;
        };
        
        //刷新重新赋值 || 下拉加载更多
        if (isRefresh)
          this.setData({ list: data.list });
        else 
          this.setData({ list: this.data.list.concat(data.list) });

        //重置loadingEnd状态 注意：loadingEnd 和 loading都会显示加载动画
        this.setData({ status: "loadingEnd"})

        //检查是否有更多数据
        data.isMore == "none" && this.setData({ status: "notData" });

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