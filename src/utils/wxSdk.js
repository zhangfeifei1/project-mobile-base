import wx from 'weixin-js-sdk' // 微信的jssdk

export function shareApp() {
  // 微信分享配置
  wx.ready(function() {
    var that = this
    wx.onMenuShareAppMessage({
      title: window.document.title,
      desc: 'jssdk页面功能',
      link: window.location.href,
      success: function() {
        that.$toast.success('分享成功')
      }
    })
  })
}
