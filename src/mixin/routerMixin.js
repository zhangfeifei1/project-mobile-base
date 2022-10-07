export default {
  /**
     * 离开此路由时触发 钩子函数
     * @param to 跳转路由的属性
     * @param from 当前路由的属性
     * @param next 钩子函数
     * @description 修改页面的meta值，false时再次进入页面会重新请求数据。
     */
  beforeRouteLeave(to, from, next) {
    if (from.path === '/lobby') {
      to.meta.keepAlive = false
      next()
    } else if (to.path === '/lobby') {
      // 如果是首页菜单，则清除缓存
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
    next()
  }
}
