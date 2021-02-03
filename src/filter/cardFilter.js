/**
 * 卡类型翻译
 * @author：feifei
 */
const cardTypeFilter = (input) => {
  switch (input) {
    case 'PDBC':
      input = '借记卡'
      break
    case 'PTIM':
      input = '定期存款 整存整取'
      break
    case 'PNDB':
      input = '通知存款（1天）'
      break
    case 'PNDA':
      input = '通知存款（7天）'
      break
    case 'PIDA':
      input = '零存整取'
      break
    case 'PSAV':
      input = '活期存款'
      break
    case 'PYWA':
      input = '友利智卡'
      break
    case 'PYLC':
      input = '易刷贷卡'
      break
    case 'PYWB':
      input = '友利智卡'
      break
    case 'PYCC':
      input = '留学生信用卡'
      break
    case 'PYWC':
      input = '友利智卡'
      break
    case 'PYWD':
      input = '友利智卡'
      break
    default:
      input = '自定义卡'
      break
  }
  return input
}

/**
 * 卡状态翻译
 * @author：feifei
 */

const cardStatusFilter = (input) => {
  switch (input) {
    case '00':
      input = '注销'
      break
    case '01':
      input = '正常'
      break
    case '02':
      input = '重发'
      break
    default:
      input = '自定义'
      break
  }
  return input
}

export default {
  install(Vue) {
    Vue.filter('cardTypeFilter', cardTypeFilter)
    Vue.filter('cardStatusFilter', cardStatusFilter)
  }
}
