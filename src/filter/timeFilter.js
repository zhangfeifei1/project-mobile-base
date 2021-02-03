/**
 * @author 数字年月日  格式化 '20120113'-》2012-01-10
 * @author：feifei
 */
const TRAN_DATEFilter = (input) => {
  if (!input) return
  var ss = input.match(/^(\d{4})(\d{2})(\d{2})/)
  return ss[1] + '-' + ss[2] + '-' + ss[3]
}

/**
 * @author 数字年月日  格式化 2012-01-08-》2012/01/08
 * @author：feifei
 */
const dealTimeFilter = (input) => {
  if (!input) return
  var ss = input.replace(/-/g, '/')
  return ss
}

/**
 * @author 数字年月日时分秒  格式化 20120110154008-》2012-01-10  15:40:08
 * @author：feifei
 */
const TRAN_TIMESTAMPFilter = (input) => {
  if (!input) return
  var ss = input.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/)
  return ss[1] + '-' + ss[2] + '-' + ss[3] + ' ' + ss[4] + ':' + ss[5] + ':' + ss[6]
}

/**
 * @author 时间戳转成时间
 * 例子： 12222222222=》1970-5-22 19：3:42  从1970年的毫秒数转换成时间格式
 * @author：feifei
 */
const toDateFilter = (input) => {
  if (!input) return
  var date = new Date(parseInt(input))
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

export default {
  install(Vue) {
    Vue.filter('TRAN_DATEFilter', TRAN_DATEFilter)
    Vue.filter('dealTimeFilter', dealTimeFilter)
    Vue.filter('TRAN_TIMESTAMPFilter', TRAN_TIMESTAMPFilter)
    Vue.filter('toDateFilter', toDateFilter)
  }
}

