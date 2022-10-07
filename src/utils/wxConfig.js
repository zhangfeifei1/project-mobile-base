import wx from 'weixin-js-sdk'
import router from '@/router'
import { getConfig } from '@/api/wxpocApi'
const actions = ['openLocation', 'getLocation', 'updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'uploadImage', 'previewImage', 'getLocalImgData', 'downloadImage', 'closeWindow', 'hideMenuItems', 'scanQRCode', '', '', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']

router.afterEach(async(to) => {
  const _url = window.location.origin + to.fullPath
  // 非ios设备，切换路由时候进行重新签名
  if (window.__wxjs_is_wkwebview !== true) {
    const config = await getConfig(_url, actions)
    wx.config(config)
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: 'wx63d888c54735bdee', // 必填，公众号的唯一标识
    //   timestamp: , // 必填，生成签名的时间戳
    //   nonceStr: '', // 必填，生成签名的随机串
    //   signature: '',// 必填，签名
    //   jsApiList: actions // 必填，需要使用的JS接口列表
    // });
  }
})
// ios 设备进入页面则进行js-sdk签名
if (window.__wxjs_is_wkwebview === true) {
  const _url = window.location.href.split('#')[0]
  getConfig(_url, actions).then(function(res) {
    wx.config(res)
  })
}
