/**
 * @description 所有验证方法
 * @author digua
 * @version 0.1.0
 */
import Vue from 'vue'
import { Toast } from 'vant'
import { getAllPattern } from '@/api/backMgmtApi'// 接口

// export const idCard = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/

// export const mobileReg = /^1[0-9]{10}$/

// export const address = val => {
//   const value = val.trim()
//   return value.length >= 5 && value.length <= 100
// }

// export const userName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/

// export const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/

// 添加变量属性
function add(name, value) {
  const obj = { }
  obj[name] = value// 返回参数
  console.log(JSON.stringify(obj))
  Object.assign(Vue.prototype.validate, obj)
  debugger
  return
}

const clientNoPattern = /^[0-9]+$/ // 客户号数字正则
const cardNoPattern = /^([1-9]{1})(\d{15}|\d{18})$/ // 银行卡号正则
const phoneNoPattern = /^1[3-9]\d{9}$/ // 手机号码正则
const msgNoPattern = /^[0-9]{6}$/ // 短信验证码正则

const clientNoRequiredMsg = '客户号不能为空！'
const clientNoPatternMsg = '客户号必须为数字！'
const cardNoRequiredMsg = '借记卡卡号不能为空！'
const cardNoPatternMsg = '卡号必须为16或19位的数字！'
const phoneNoRequiredMsg = '手机号码不能为空！'
const phoneNoPatternMsg = '手机号码验证不通过！'
const msgNoRequiredMsg = '短信验证码不能为空！'
const msgNoPatternMsg = '短信验证码必须为6位数字！'
/**
 * @param {string}{rule} 第一个是需要校验的参数，第二个是校验规则
 * @returns {Boolean}
 */
export function ruleCheck(val, ruleStr) {
  console.log(Vue)
  debugger
  let flag = true
  try {
    if (ruleStr === null) {
      return true
    }
    ruleStr.forEach(v => {
      debugger
      if (v.required === true) {
        if (!val) {
          Toast(v.message)
          throw new Error('ending')
        }
      }
      if (v.pattern) {
        if (!v.pattern.test(val)) {
          Toast(v.message)
          throw new Error('ending')
        }
      }
    })
  } catch (e) {
    console.log(e)
    if (e.message === 'ending') {
      flag = false
    }
  }
  return flag
}
/**
 * @param {string} clientNo 客户号验证   ClientNoPatternMsg ClientNoRequiredMsg
 * @returns {Boolean}
 */
export function isClientNo() {
  const pattern = clientNoPattern
  return [{ required: true, message: clientNoRequiredMsg }, { pattern, message: clientNoPatternMsg }]
}
/**
 * @param {string} cardNo 银行卡号验证   CardNoPatternMsg CardNoRequiredMsg
 * @returns {Boolean}
 */
export function isCardNo() {
  const pattern = cardNoPattern
  return [{ required: true, message: cardNoRequiredMsg }, { pattern, message: cardNoPatternMsg }]
}
/**
 * @param {string} phoneNo 手机号验证
 * @returns {Boolean}
 */
export function isPhoneNo() {
  const pattern = phoneNoPattern
  return [{ required: true, message: phoneNoRequiredMsg }, { pattern, message: phoneNoPatternMsg }]
}
/**
 * @param {string} msgNo 短信验证码验证
 * @returns {Boolean}
 */
export function isMsgNo() {
  const pattern = msgNoPattern
  return [{ required: true, message: msgNoRequiredMsg }, { pattern, message: msgNoPatternMsg }]
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}

Vue.prototype.validate = {

  ruleCheck: ruleCheck
}
// 获取后台的所有验证规则
const params = {
  validationType: 1,
  appType: 1
}
getAllPattern(params).then(res => {
  console.log(res)
  if (res.returnCode === '000000') {
    debugger
    res.data.records.forEach(v => {
      if (v.validationFlag === '1') {
        var pattern = new RegExp(v.validationRule)
        var message = v.validationPrompt
        var patternRes = [{ pattern, message }]
        add(v.name, patternRes)
      } else {
        add(v.name, [])
      }
    })
    debugger
    console.log(Vue.prototype.validate)
  } else {
    Toast(res.message)
  }
})
