/**
 * @description aes加解密的公共方法
 * @author digua
 * @version 0.1.0
 */

// import CryptoJS from 'crypto-js'
// // aes加密
// export function aesEncrypt(message, secret_key) {
//   secret_key = secret_key || 'f7244837c4701df4f47e540682405e5e'
//   // 十六进制转字节数组再转字符串
//   secret_key = String.fromCharCode.apply(null, Str2Bytes(secret_key))
//   // 偏移量
//   let iv = ''

//   // Latin1 转换
//   secret_key = CryptoJS.enc.Latin1.parse(secret_key)
//   iv = secret_key

//   // Encrypt
//   var ciphertext = CryptoJS.AES.encrypt(message, secret_key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
//   })
//   return ciphertext.toString()
// }
// // 解密
// export function aesDecrypt(message, secret_key) {
//   secret_key = secret_key || 'f7244837c4701df4f47e540682405e5e'
//   // 十六进制转字节数组再转字符串
//   secret_key = String.fromCharCode.apply(null, Str2Bytes(secret_key))
//   var key = CryptoJS.enc.Latin1.parse(secret_key)
//   var decrypt = CryptoJS.AES.decrypt(message, key, { iv: key, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
//   return decrypt.toString(CryptoJS.enc.Utf8)
// }
const asmcrypto = require('asmcrypto.js')
export function aesEncrypt(message, secret_key) {
  const text_btoa = window.btoa(unescape(encodeURIComponent(message)))
  const text = asmcrypto.base64_to_bytes(text_btoa)
  const keyArr = Str2Bytes(secret_key)
  const key = new Uint8Array(keyArr)
  console.log(key)
  const nonce = key
  const encText = asmcrypto.AES_GCM.encrypt(text, key, nonce)
  const cipherText = asmcrypto.bytes_to_base64(encText)
  console.log('加密：' + cipherText)
  return cipherText
}
// 解密
export function aesDecrypt(message, secret_key) {
  const tt = asmcrypto.base64_to_bytes(message)
  const keyArr = Str2Bytes(secret_key)
  const key = new Uint8Array(keyArr)
  const nonce = key
  const decText = asmcrypto.AES_GCM.decrypt(tt, key, nonce)
  const ttt = asmcrypto.bytes_to_base64(decText)
  const decodeText = decodeURIComponent(escape(window.atob(ttt)))
  console.log('解密：' + decodeText)
  return decodeText
}
// 十六进制字符串转字节数组
function Str2Bytes(str) {
  var pos = 0
  var len = str.length
  if (len % 2 !== 0) {
    return null
  }
  len /= 2
  var hexA = []
  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2)
    var v = parseInt(s, 16)
    hexA.push(v)
    pos += 2
  }
  return hexA
}
