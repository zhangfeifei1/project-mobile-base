/**
 * @description 所有数据存取方法
 * @author digua
 * @version 0.1.0
 */
import {
  validatenull
} from '@/utils/validate'
const keyName = 'ly-'
/**
* @description 存储Storage
* @param {Object} name key值 keyName+name
* @param {Object} content 内容
* @param {Object} type 存储类型，为session时使用sessionStorage否则使用localStorage
* @example
*  setStore({
    name: 'access_token',
    content: state.access_token,
    type: 'session'
  })
*/
export const setStore = (params = {}) => {
  // let {
  //   name,
  //   content,
  //   type,
  // } = params;
  params.name = keyName + params.name
  const obj = {
    dataType: typeof (params.content),
    content: params.content,
    type: params.type,
    datetime: new Date().getTime()
  }
  if (params.type) window.sessionStorage.setItem(params.name, JSON.stringify(obj))
  else window.localStorage.setItem(params.name, JSON.stringify(obj))
}
/**
* @description 获取Storage
* @param {Object} name key值 keyName+name
* @param {Object} type true：返回sessionStorage数据，false或者无值，返回localStorage数据
* @example
*  getStore({
    name: 'access_token',
  })
*/
export const getStore = (params = {}) => {
  // let {
  //   name,
  //   type
  // } = params;
  const name = keyName + params.name
  // params.name = keyName + params.name
  let obj = {}

  let content = ''
  content = obj
  if (params.type) {
    obj = window.sessionStorage.getItem(name)
  } else {
    obj = window.localStorage.getItem(name)
  }

  if (validatenull(obj)) return
  obj = JSON.parse(obj)

  if (obj.dataType === 'string') {
    content = obj.content
  } else if (obj.dataType === 'number') {
    content = Number(obj.content)
  } else if (obj.dataType === 'boolean') {
    content = obj.content
  } else if (obj.dataType === 'object') {
    content = obj.content
  }
  return content
}
/**
 * @description 删除Storage
 * @param {Object} name key值 keyName+name
 * @param {Object} type true：删除sessionStorage，false或者无值，删除localStorage
 * @example
 *  removeStore({
      name: 'access_token',
      type: 'session'
    })
*/
export const removeStore = (params = {}) => {
  // let {
  //   name,
  //   type
  // } = params;
  params.name = keyName + params.name
  if (params.type) {
    window.sessionStorage.removeItem(params.name)
  } else {
    window.localStorage.removeItem(params.name)
  }
}

/**
 * @description 获取全部存储数据
 * @param {Object} type true：获取sessionStorage所有数据，false或者无值，获取localStorage所有数据
 * @example
 *  getAllStore({
      type: 'session'
    })
*/
export const getAllStore = (params = {}) => {
  const list = []
  // let {
  //   type
  // } = params;
  if (params.type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i),
          type: 'local'
        })
      })
    }
  }
  return list
}

/**
 * @description 清空全部存储数据
 * @param {Object} type true：清空sessionStorage所有数据，false或者无值，清空localStorage所有数据
 * @example
 *  clearStore({
      type: 'session'
    })
*/
export const clearStore = (params = {}) => {
  // let { type } = params;
  if (params.type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
