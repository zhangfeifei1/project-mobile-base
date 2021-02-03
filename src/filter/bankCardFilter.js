/**
 * @author 卡号后四位
 * @author：feifei
 */
const bankCardFilter = (value) =>
  value ? value.substr(value.length - 4) : value

export default {
  install(Vue) {
    Vue.filter('bankCardFilter', bankCardFilter)
  }
}
