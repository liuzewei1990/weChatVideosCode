import http from "./http.js";
import config from "../config/index.config.js";

let baseUrl = config[config.build].baseUrl;

/*
* 公共域参数
* token:登录接口获取
* device：设备ID
*/ 

export const getPublicParams = ()=>{
  let publicParams = {
    token: "",
    device: ""
  }

  

  return publicParams;
}



// 获取短信验证码
export const getLoginCode = (data) => http.GET(`${baseUrl}/edu/mobile/login/code`, data);

//用户登录
export const login = (data) => http.POST(`${baseUrl}/edu/mobile/login/in`, data);

//获取首页信息
export const getIndexInfo = (data) => http.POST(`${baseUrl}/edu/mobile/index`, data, { loading: false });




/*
*  用户接口
*/ 

//个人中心
export const getUserIndex = (data) => http.POST(`${baseUrl}/edu/mobile/uc/index`, { ...data, ...getPublicParams()});

//编辑用户信息
export const editUserInfo = (data) => http.POST(`${baseUrl}/edu/mobile/uc/edit`, { ...data, ...getPublicParams() });

//用户消息列表
export const getUserMsgs = (data) => http.POST(`${baseUrl}/edu/mobile/uc/msgs`, { ...data, ...getPublicParams() });

//用户读取消息
export const userReadMsg = (data) => http.POST(`${baseUrl}/edu/mobile/uc/readMsg`, { ...data, ...getPublicParams() });

//获取用户收藏历史
export const getUserColleHistory = (data) => http.POST(`${baseUrl}/edu/mobile/uc/collecteds`, { ...data, ...getPublicParams() });

//获取用户购买历史
export const getUserPayHistory = (data) => http.POST(`${baseUrl}/edu/mobile/uc/payHistory`, { ...data, ...getPublicParams() });

//用户购买会员
export const userPayVip = (data) => http.POST(`${baseUrl}/edu/mobile/uc/vipTypes`, { ...data, ...getPublicParams() });

//获取用户余额
export const getUserMoney = (data) => http.POST(`${baseUrl}/edu/mobile/uc/initTianxian`, { ...data, ...getPublicParams() });

//用户绑定支付宝和名称
export const userBindAlipay = (data) => http.POST(`${baseUrl}/edu/mobile/uc/accountAddOrEdit`, { ...data, ...getPublicParams() });

//用户提现
export const userExportMoney = (data) => http.POST(`${baseUrl}/edu/mobile/uc/tixianSubmit`, { ...data, ...getPublicParams() });

//用户提现明细
export const userExportMoneyList = (data) => http.POST(`${baseUrl}/edu/mobile/uc/tixianList`, { ...data, ...getPublicParams() });

//用户收藏商品
export const userColleGoods = (data) => http.POST(`${baseUrl}/edu/mobile/uc/addCollecteds`, { ...data, ...getPublicParams() });

//用户取消收藏
export const userCancelColleGoods = (data) => http.POST(`${baseUrl}/edu/mobile/uc/cancelCollecteds`, { ...data, ...getPublicParams() });

/*
*  视频接口
*/

//视频列表
export const getVideoList = (data) => http.GET(`${baseUrl}/edu/mobile/product/list`, data, { loading: false });

//视频详情
export const getVideoDetail = (data) => http.POST(`${baseUrl}/edu/mobile/product/detail`, { ...data, ...getPublicParams() });

//视频类别
export const getVideoType = (data) => http.POST(`${baseUrl}/edu/mobile/product/categorys`,data,{loading:false});

//商品项详情
export const getGoodDetail = (data) => http.POST(`${baseUrl}/edu/mobile/product/detailItem`, { ...data, ...getPublicParams() });

/*
*  订单接口
*/

//支付宝vip会员
export const alipayVip = (data) => http.POST(`${baseUrl}/edu/mobile/order/wxPayVip`, { ...data, ...getPublicParams() });

//支付一个商品
export const alipayGoods = (data) => http.POST(`${baseUrl}/edu/mobile/order/wxPayProductItem`, { ...data, ...getPublicParams() });