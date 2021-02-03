/**
 * 金额格式化，金额的每三位中间添加,
 * 例子：233,222,110
 * @author：feifei
 */
const amountFilter = (value) => {
  if (value && value != null) {
    value = value + ''
    var left = value.split('.')[0]
    var right = value.split('.')[1]
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00'
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g)
    return (Number(value) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right
  } else if (value === 0) { // 注意===在这里的使用，如果传入的value为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0.00'
  } else {
    return ''
  }
}

/**
 * @author filter template 大写金额转换
 * @author：feifei
 */
const amountUpFilter = (input) => {
  if (input !== undefined) {
    var strOutput = ''
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
    input += '00'
    var intPos = input.indexOf('.')
    if (intPos >= 0) {
      input = input.substring(0, intPos) + input.substr(intPos + 1, 2)
    }
    strUnit = strUnit.substr(strUnit.length - input.length)
    for (var i = 0; i < input.length; i++) {
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(input.substr(i, 1), 1) + strUnit.substr(i, 1)
    }
    return strOutput.replace(/^零角零分$/, '').replace(/零角零分$/, '整').replace(/^零元零角/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, '零元').replace(/零角/, '零').replace(/零元/, '').replace(/零分$/, '')
  }
  return input
}

export default {
  install(Vue) {
    Vue.filter('amountFilter', amountFilter)
    Vue.filter('amountUpFilter', amountUpFilter)
  }
}
