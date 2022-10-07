/**
 * 账户格式化，四位一空格
 * @author：feifei
 */
const accNoSpcFilter = (value) =>
  value ? value.replace(/(.{4})/g, '$1 ') : value

  /**
 * 账户格式化，去除四位一空格
 * @author：feifei
 */
const accNoSpcDelFilter = (value) =>
  value ? value.replace(/\s*/g, '') : value

/**
 * 账户格式化，卡号显示前六后四，中间空格
 * 例子：622612 ****** 1234
 * @author：feifei
 */
const accNoEncFilter = (value) => {
  if (value !== undefined) {
    if (value.length > 10) {
      value = value.substr(0, 6) + ' ****** ' + value.substr(value.length - 4)
    }
  }
  return value
}

/**
 * 账户状态翻译
 * @author：feifei
 */

const accountStatusFilter = (input) => {
  switch (input) {
    case '00':
      input = '正常'
      break
    case '01':
      input = '休眠账户（睡眠户）'
      break
    case '02':
      input = '取消'
      break
    case '03':
      input = '注销（销户）'
      break
    case '04':
      input = '编入营业外收入'
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * 手机号码加密  123****5678
 * @author：feifei
 */
const dimPhoneNumFilter = (input) => {
  if (input !== undefined) {
    return input.substring(0, 3) + ' **** ' + input.substring(input.length - 4)
  }
  return input
}

export default {
  install(Vue) {
    Vue.filter('accNoSpcFilter', accNoSpcFilter)
    Vue.filter('accNoEncFilter', accNoEncFilter)
    Vue.filter('accountStatusFilter', accountStatusFilter)
    Vue.filter('accNoSpcDelFilter', accNoSpcDelFilter)
    Vue.filter('dimPhoneNumFilter', dimPhoneNumFilter)
  }
}

