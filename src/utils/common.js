/**
 * @description 基础方法库
 * @author digua
 * @version 0.1.0
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
   * @param {number} time
   * @param {string} option
   * @returns {string}
   */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
    )
  }
}

/**
   * @param {string} url
   * @returns {Object}
   */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          // .replace(/(?<!=)=(?!=)/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
  )
}

/**
   * 生成随机len位数字
   */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
   * 将普通列表无限递归转换为树
   * @param  {[type]} list       [普通的列表，必须包括 opt.primaryKey 指定的键和 opt.parentKey 指定的键]
   * @param {[type]} opt [配置参数，支持 primaryKey(主键 默认id) parentKey(父级id对应键 默认pid) nameKey(节点标题对应的key 默认name) valueKey(节点值对应的key 默认id) checkedKey(节点是否选中的字段 默认checked，传入数组则判断主键是否在此数组中) startPid(第一层扫描的PID 默认0) currentDept(当前层 默认0) maxDept(最大递归层 默认100) childKey(递归完成后子节点对应键 默认list) deptPrefix(根据层级重复的前缀 默认'')]
   * @return {[type]}            [description]
   */
export const listConvertTree = (array, opt) => {
  const obj = {
    primaryKey: opt.primaryKey || 'id',
    parentKey: opt.parentKey || 'pid',
    startPid: opt.startPid || 0,
    currentDept: opt.currentDept || 0,
    maxDept: opt.maxDept || 100,
    childKey: opt.childKey || 'children'
  }
  return listToTree(array, obj.startPid, obj.currentDept, obj)
}
/**
   *  实际的递归函数，将会变化的参数抽取出来
   * @param list
   * @param startPid
   * @param currentDept
   * @param opt
   * @returns {Array}
   */
export const listToTree = (array, startPid, currentDept, opt) => {
  if (opt.maxDept < currentDept) {
    return []
  }
  let child = []
  if (array && array.length > 0) {
    child = array.map(item => {
      // 筛查符合条件的数据（主键 = startPid）
      if (typeof item[opt.parentKey] !== 'undefined' && item[opt.parentKey] === startPid) {
        // 满足条件则递归
        const nextChild = listToTree(array, item[opt.primaryKey], currentDept + 1, opt)
        // 节点信息保存
        if (nextChild.length > 0) {
          item['hasChild'] = true
          item[opt.childKey] = nextChild
        } else {
          item['hasChild'] = false
        }
        return item
      }
    }).filter(item => {
      return item !== undefined
    })
  }
  return child
}

export const encBase64 = (str) => {
  return window.btoa(str)
}
export const decBase64 = (str) => {
  return window.atob(str)
}
export const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
}

/**
 * [通过参数名获取url中的参数值]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param  {[string]} queryName [参数名]
 * @return {[string]}           [参数值]
 */
export const GetUrlParams = (queryName) => {
  var query = decodeURI(window.location.search.substring(1))
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === queryName) { return pair[1] }
  }
  return null
}

export function dataURItoBlob(dataURI, type) {
  var binary = atob(dataURI.split(',')[1])
  var array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: type })
}
// 上传文件用canvas做压缩
export function beforeAvatarUpload(file) {
  console.log(file)
  const imgQuality = 0.01 // 压缩质量
  return new Promise(resolve => {
    const reader = new FileReader()
    const image = new Image()
    image.onload = (imageEvent) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const width = image.width * imgQuality
      const height = image.height * imgQuality
      canvas.width = width
      canvas.height = height
      context.clearRect(0, 0, width, height)
      context.drawImage(image, 0, 0, width, height)
      const dataUrl = canvas.toDataURL(file.type)
      const blobData = dataURItoBlob(dataUrl, file.type)
      console.log(blobData)
      // this.$refs['test'].src = dataUrl
      resolve(blobData)
    }
    reader.onload = e => { image.src = e.target.result }
    reader.readAsDataURL(file)
  })
}
