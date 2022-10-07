import request from '@/utils/request'

/**
 * 获取加密公钥
 * @param data

 */
export const getEncryptionPublicKey = (data) => {
  return request({
    url: 'base/app/getEncryptionPublicKey',
    data,
    method: 'post'
  })
}

/**
 * 刷新动态配置
 * @param params 上传参数
 */
export const refresh = ({ id }) => {
  const params = { id: id }
  // const params = {id:id,namespace:namespace,nacosGroup:nacosGroup,databaseTable:databaseTable,nacosKey:nacosKey,fields:fields}
  return request({
    url: 'trans/dynamicconfiguration/renewConfig',
    params,
    method: 'get'
  })
}

/**
 * 获取防重放列表
 * @param data

 */
export const replayList = (params) => {
  return request({
    url: 'initial/antiReplacementApi/list',
    params,
    method: 'get'
  })
}

