
function HTTP(obj, config){

  let defaultConfig = {
    res:false,
    loading:true
  }

  config = { ...defaultConfig, ...config }

  config.loading && wx.showLoading({title: '加载中'});

  return new Promise((resolve, reject)=>{

    let options = {
      url: "",
      method: "",
      data: {},
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.statusCode == 200) {
          let data = res.data;

          if (config.res){
            //返回 { code:10000,msg:"消息",data:[] }
            resolve(data) 
          }else{
            // 返回 data:[]
            if (data.code == "10000") {
              resolve(data.data || true)
            } else {
              wx.showToast({ title: data.msg, icon: "none", duration: 2000 })
            }
          }
        }else{
          wx.showToast({ title: "HTTP:状态码异常", icon: "none", duration: 2000 })
          reject(new Error("HTTP:状态码异常"));
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: "网络异常，请稍后再试！", icon: "none", duration: 2000 })
        reject(new Error("网络异常，请稍后再试！"));
      },
      complete:()=>{
        
      }
    }

    options = { ...options, ...obj };

    if (options.url && options.method) {
      wx.request(options);
    } else {
      wx.showToast({title: 'HTTP：缺失参数',icon: "none",duration: 2000})
    }
  })

}



export default{
  GET(url, data, config){
    return HTTP({ url, data, method: "GET" }, config);
  },
  POST(url, data, config){
    return HTTP({ url, data, method: "POST" }, config);
  }
}