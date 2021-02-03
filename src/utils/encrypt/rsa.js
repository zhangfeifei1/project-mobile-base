/**
 * @description rsa加解密的公共方法
 * @author digua
 * @version 0.1.0
 */
import { JSEncrypt } from 'jsencrypt'
export function rsaEncrypt(message, secret_key) {
  const enc = new JSEncrypt()
  enc.setPublicKey(secret_key)
  const data = enc.encrypt(message)
  return data
}
