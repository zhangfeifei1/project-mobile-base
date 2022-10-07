
import request from '@/utils/request'
/**
 * 获取数据字典正则表达式
 * @param data

 */
export const getAllPattern = (params) => {
  return request({
    url: 'trans/dictionary/getListByAppTypeAndValidationType',
    params,
    method: 'get'
  })
}
