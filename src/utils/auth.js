/**
 * @description 授权认证方法
 * @author digua
 * @version 0.1.0
 */
import Cookies from 'js-cookie'
// token key值
const TokenKey = 'X-Litemall-Admin-Token'
// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
