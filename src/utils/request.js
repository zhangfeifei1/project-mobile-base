/**
 * @description 通讯公共方法
 * @author digua
 * @version 0.1.0
 */
import axios from 'axios'
import {
  Dialog
} from 'vant'
// import qs from 'qs'
import store from '@/store'
import qs from 'qs'
import { apiUrl } from '@/settings/defaultSetting'
// import { encrypt, decrypt } from '@/utils/encrypt/aes' // aes加解密方法
import { guid } from '@/utils/common' // base64和生成uuid方法
// import { RSAencrypt } from '@/utils/encrypt/rsa' // rsa加解密方法
import { getToken } from '@/api/wxpocApi'// 接口
import { aesEncrypt, aesDecrypt } from '@/utils/encrypt/aes' // aes加解密方法
import { rsaEncrypt } from '@/utils/encrypt/rsa' // rsa加解密方法
import { sm2Encrypt } from '@/utils/encrypt/sm2'// sm2加密方法
import { sm4Encrypt, sm4Decrypt } from '@/utils/encrypt/sm4'// sm4加解密方法

// axios 配置
const service = axios.create({
  // defaultSetting.js中的配置
  baseURL: apiUrl.baseUrl, // 请求根路径
  headers: apiUrl.headers, // 配置公共请求头
  timeout: apiUrl.timeout // 超时时间
})
let uuidKey = ''
// 请求拦截器
service.interceptors.request.use(
  config => {
    store.state.app.show = true // 打开遮罩
    // config.headers = apiUrl.headers // 配置公共请求头

    config.headers['Accept'] = 'application/json,*/*'// accept暂定设置为*/*，微信端需设置为 application/json,*/* 后台需要
    config.headers['appid'] = window.wxConfig.loongeasyAppid// 设置为该应用的appid
    encrptSetting(config)// 设置请求头配置
    if (config.url.slice(0, 1) !== '/') {
      // 处理接口未加/的请求路径添加/
      config.url = '/' + config.url
    }
    if (config.url === '/captcha/picture/createCode') {
      config.headers['imgCode'] = guid()
      config.responseType = 'blob'
      window.sessionStorage.setItem('lastRev', config.headers['imgCode'])
    }
    if (config.headers.responseType === 'blob') {
      // 如果请求头中含有responseType=blob，需要改返回头类型为blob.接口返回二进制流，需配置此项
      config.responseType = 'blob'
    }
    if (config.method === 'post') {
      // post请求
      if (isEncryptData(config)) {
        // 如果需要加密报文
        const symmetryEncrept = store.state.app.encrptParams.appSymmetricEncryptionType// 获取非对称加密方式
        const dataString = JSON.stringify(config.data)// 对报文数据进行加密
        const dataEnc = isEncryptType(symmetryEncrept, dataString, uuidKey)// 加密数据
        // if (process.env.NODE_ENV === 'standard')  {
        if (window.wxConfig.standardMessage === 'true') {
          config.data = dataEnc
        } else {
          config.data = { request: dataEnc }
        }
        
      } else {
        // 如果不需要加密报文
        let data = config.data
        if (!data) { data = {} }
        // if (process.env.NODE_ENV === 'standard')  {
        if (window.wxConfig.standardMessage === 'true') {
          config.data = data
        } else {
          config.data = { request: data }
        }
      }
    } else {
      let params = config.params
      if (isEncryptData(config)) {
        // 接口加密
        const appSymmetricEncryptionType = store.state.app.encrptParams.appSymmetricEncryptionType// 获取对称加密方式
        const paramsString = qs.stringify(config.params)// 数据序列号
        const params = isEncryptType(appSymmetricEncryptionType, paramsString, uuidKey)// 加密数据
        config.params = { request: params }
      } else {
        // 接口不加密
        if (JSON.stringify(params) !== '{}') {
          // 如果是空对象不传参数
          params = qs.stringify(params)
          // if (process.env.NODE_ENV === 'standard')  {
          if (window.wxConfig.standardMessage === 'true') {
            config.params = params 
          }else{
            config.params = { request: params }
          }
          
        }
      }
    }
    return config
  },
  err => Promise.reject(err)
)

// 返回拦截器
service.interceptors.response.use(
  response => {
    store.state.app.show = false // 关闭遮罩
    if (response.headers['content-disposition'] != null && response.headers['content-disposition'].indexOf('attachment') !== -1) {
      // 返回头里含有content-disposition并且有attachment字符串代表是返回的二进制流需要将data直接返回给页面
      return Promise.resolve(response.data)
    }
    
    if (response.config.url === '/captcha/picture/createCode') {
      // 如果是图片验证码交易，直接返回
      return Promise.resolve(response.data)
    }
    if (response.config.url !== '/token/token/getToken') {
      // 如果不是获取uuid交易
      if (isReplay(response.config)) {
        // 是防重放交易
        let uuidRes = sessionStorage.getItem('uuid')
        // uuid使用完重新后台生成新的防重放uuid
        if (uuidRes && uuidRes !== 'null' && uuidRes !== 'undefined') {
          uuidRes = JSON.parse(uuidRes)
          if (uuidRes.length <= 2) {
            // 当uuid小于2个时，重新申请uuid
            getToken().then((res) => {
              sessionStorage.setItem('uuid', JSON.stringify(res.data))
            }).catch(() => {

            })
          }
        }
      }
    }
    if (response.config.url !== '/initial/api/list' && response.config.url !== 'initial/antiReplacementApi/list') {
      // 如果不是获取加密接口列表，不是获取防重放接口列表交易
      if (response.data.isEncrypt === '1') {
        // 接口加密，需解密
        const symmetryEncrept = store.state.app.encrptParams.appSymmetricEncryptionType// 获取对称加密方式
        response.data = JSON.parse(isDecryptType(symmetryEncrept, response.data.response, uuidKey))
      } else {
        // 接口不加密
        response.data = JSON.parse(response.data.response)
      }
    }
    const res = response.data // 获取数据
    if (res.returnCode === '000000') {
      // 平台设置000000为交易成功成功
      return Promise.resolve(res)
    } else if (res.returnCode === '4040') {
      // 会话超时，需要重新进行oauth授权
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx63d888c54735bdee&redirect_uri=http%3a%2f%2f192.168.230.11%3a8080&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'// oath授权地址
      // location.reload() //测试使用
      return Promise.reject(res)
    } else if (res.returnCode === '040003' || res.returnCode === '040004') {
      // 验证码验证失败，重新刷新验证码
      return Promise.resolve(res)
    } else {
      // 失败
      Dialog.alert({
        title: '警告',
        message: JSON.stringify(res.message)
      })

      return Promise.reject(res)
    }
  }, error => {
    console.log('err' + error) // for debug
    store.state.app.show = false // 关闭遮罩
    let uuidRes = sessionStorage.getItem('uuid')
    if (uuidRes) {
      // 交易失败需要清掉一个uuid
      uuidRes = JSON.parse(uuidRes)
      uuidRes.pop()
    }

    sessionStorage.setItem('uuid', JSON.stringify(uuidRes))

    Dialog.alert({
      title: '警告',
      message: '禁止访问'
    })
    return Promise.reject(error)
  })
// 对数据进行加密，请求头配置token
function encrptSetting(config) {
  const key = store.state.app.encrptParams.appAsymmetricEncryptionPublicKey// 获取对称加密公钥
  const noSymmetryEncrept = store.state.app.encrptParams.appAsymmetricEncryptionType// 获取对称加密方式
  let rev = ''
  if (isEncryptData(config)) {
    if (isReplay(config)) {
      // 加密 防重放
      // 获取防重复提交的uuid
      let uuid = sessionStorage.getItem('uuid')
      if (uuid && uuid !== 'null' && uuid !== 'undefined' && uuid.length >= 1) {
        // 清掉1个uuid
        uuid = JSON.parse(uuid)
        uuidKey = uuid.pop()
        sessionStorage.setItem('uuid', JSON.stringify(uuid))
      } else {
        if (config.url === '/wechat/auth/auth') {
          // 第一个交易要前端生成key值
          uuidKey = guid()
        }
      }
      rev = isEncryptType(noSymmetryEncrept, uuidKey, key)// 对对称加密公钥进行加密
    } else {
      // 加密 不防重放
      uuidKey = guid() // 用uuid生成对称加密公钥
      rev = isEncryptType(noSymmetryEncrept, uuidKey, key)// 对对称加密公钥进行加密
    }
  } else {
    if (isReplay(config)) {
      // 不加密 防重放
      // 获取防重复提交的uuid
      let uuid = sessionStorage.getItem('uuid')
      if (uuid && uuid !== 'null' && uuid !== 'undefined' && uuid.length >= 1) {
        // 清掉1个uuid
        uuid = JSON.parse(uuid)
        uuidKey = uuid.pop()
        sessionStorage.setItem('uuid', JSON.stringify(uuid))
      } else {
        if (config.url === '/wechat/auth/auth') {
          // 第一个交易要前端生成key值
          uuidKey = guid()
        }
      }
      rev = uuidKey
    } else {
      // 不加密 不防重放
      rev = ''
    }
  }
  config.headers.BL = sessionStorage.getItem('openId')
  config.headers.rev = rev
}
// 是否需要加密数据 return ture：需要加密。 return false：不需要加密。
function isEncryptData(config) {
  const allApiList = window.sessionStorage.getItem('apiList')
  const allApiList1 = JSON.parse(allApiList)
  if (config.url.indexOf('?') !== -1) {
    config.url = config.url.split('?')[0]
  }
  try {
    allApiList1.forEach(v => {
      let url = config.url
      if (url === '/wcb/myaccount' || url === '/wcb/auth') {
        url = url + '/**'
      }
      if (v.path.indexOf(url) !== -1) {
        throw new Error('ending')
      }
    })
    return false
  } catch (e) {
    if (e.message === 'ending') {
      return true
    } else {
      return false
    }
  }
}
// 是否需要防重放 return ture：需要防重放。 return false：不需要防重放。
function isReplay(config) {
  const allApiList = window.sessionStorage.getItem('replayList')
  const allApiList1 = JSON.parse(allApiList)
  try {
    allApiList1.forEach(v => {
      if (v.path.indexOf(config.url) !== -1) {
        throw new Error('ending')
      }
    })
    return false
  } catch (e) {
    if (e.message === 'ending') {
      return true
    } else {
      return false
    }
  }
}
/**
 * @description 根据加密类型进行相应加密
 * @param {*} type 加密类型
 * @param {*} data 需要加密的数据
 * @param {*} publickey 公钥
 * @param {*} cipherMode 0：c1c2c3 1:c1c3c2
 */
function isEncryptType(type, data, publickey, cipherMode) {
  if (type === 'AES') {
    return encryptAES(data, publickey)
  } else if (type === 'RSA') {
    return encryptRSA(data, publickey)
  } else if (type === 'SM2') {
    return encryptSM2(data, publickey, cipherMode)
  } else if (type === 'SM4') {
    return encryptSM4(data, publickey)
  }
}
function isDecryptType(type, data, privatekey) {
  if (type === 'AES') {
    return decryptAES(data, privatekey)
  } else if (type === 'SM4') {
    return decryptSM4(data, privatekey)
  }
}

// aes加密
function encryptAES(data, publickey) {
  return aesEncrypt(data, publickey)
}
// aes解密
function decryptAES(data, privatekey) {
  return aesDecrypt(data, privatekey)
}
// rsa加密
function encryptRSA(data, publickey) {
  return rsaEncrypt(data, publickey)
}
// sm2加密
function encryptSM2(data, publickey, cipherMode) {
  return sm2Encrypt(data, publickey, cipherMode)
}

// sm4加密
function encryptSM4(data, publickey) {
  return sm4Encrypt(data, publickey)
}
// sm4解密
function decryptSM4(data, privatekey) {
  return sm4Decrypt(data, privatekey)
}

export default service
