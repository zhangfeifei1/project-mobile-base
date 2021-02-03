/**
 * @author 自动续存类型过滤器
 * @author：feifei
 */
const reDepositTypeFilter = (input) => {
  switch (input) {
    case '0':
      input = '不转存'
      break
    case '1':
      input = '本金转存'
      break
    case '2':
      input = '本息转存'
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * @author 交易渠道标识过滤器
 * @author：feifei
 */
const TransChannelFilter = (input) => {
  switch (input) {
    case 'ALP':
      input = '支付宝'
      break
    case 'ARS':
      input = '自动应答系统'
      break
    case 'CAM':
      input = '卡管理系统'
      break
    case 'CMS':
      input = '现金管理系统'
      break
    case 'IBP':
      input = '超级网银（他行汇款）'
      break
    case 'IBS':
      input = '网银（网上银行）'
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * @author 币种符号过滤器
 * @author：feifei
 */
const currencyCodeFilter = (input) => {
  switch (input) {
    case 'CNY':
      input = '￥' // 人民币
      break
    case 'KRW':
      input = '₩' // 韩币
      break
    case 'USD':
      input = '$' // 美元
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * @author 币种翻译过滤器
 * @author：feifei
 */
const currencyFilter = (input) => {
  switch (input) {
    case 'CNY':
      input = '人民币' // 人民币
      break
    case 'KRW':
      input = '韩币' // 韩币
      break
    case 'USD':
      input = '美元' // 美元
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * @author 国籍翻译过滤器
 * @author：feifei
 */
const countryFilter = (input) => {
  switch (input) {
    case 'CN':
      input = '中国'
      break
    case 'KR':
      input = '韩国'
      break
    case 'OT':
      input = '其他'
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * @author 性别翻译过滤器
 * @author：feifei
 */
const sexFilter = (input) => {
  switch (input) {
    case 'F':
      input = '女'
      break
    case 'M':
      input = '男'
      break
    default:
      input = '自定义'
      break
  }
  return input
}

/**
 * @author 空值显示暂无
 * @author：feifei
 */
const nullFilter = (input) => {
  if (input === null || input === undefined | input === '') {
    return '暂无'
  }
  return input
}

export default {
  install(Vue) {
    Vue.filter('reDepositTypeFilter', reDepositTypeFilter)
    Vue.filter('TransChannelFilter', TransChannelFilter)
    Vue.filter('currencyCodeFilter', currencyCodeFilter)
    Vue.filter('currencyFilter', currencyFilter)
    Vue.filter('countryFilter', countryFilter)
    Vue.filter('sexFilter', sexFilter)
    Vue.filter('nullFilter', nullFilter)
  }
}
