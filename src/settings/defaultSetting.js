module.exports = {
  /**
   *  是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false, // 是否使用国际化配置 true：使用，false:不使用
  locale: 'zh', // zh:中文，en:英文
  /**
   *  api请求基础配置
   */
  apiUrl: {
    baseUrl: '/pmobile',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }, // 请求头信息
    timeout: 20000// 请求超时时间
  },
  /**
   * 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home'
}
