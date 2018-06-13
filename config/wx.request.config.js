



export default{
  get(){
    const requestTask = wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })

    requestTask.abort() // 取消请求任务
  },
  post(){

  }
}