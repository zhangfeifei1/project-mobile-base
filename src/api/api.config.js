/**
 * @description 接口请求公共配置
 * @author digua
 */
const baseUrl = '/pmobile' // 请求的根路径
const timeout = 20000 // 请求的超时时间
const headers = {
  'Content-Type': 'application/json;charset=UTF-8'
} // 请求头信息

export { baseUrl, timeout, headers }
