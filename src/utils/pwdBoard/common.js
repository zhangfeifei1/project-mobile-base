/* eslint-disable */
var completeKeyboard = null
var numberKeyboard = null
var intervalId = null
var currentInputID = null // 引入当前获取焦点的输入框，解决频繁点击一个输入框会闪屏问题
var spaceImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXQAAAA8CAYAAAB2H0HmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQxRDI1QjcwMDNBNjExRTc4RkU2QjlGMjQzMTAxMTM0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQxRDI1QjcxMDNBNjExRTc4RkU2QjlGMjQzMTAxMTM0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDFEMjVCNkUwM0E2MTFFNzhGRTZCOUYyNDMxMDExMzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDFEMjVCNkYwM0E2MTFFNzhGRTZCOUYyNDMxMDExMzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6tsXG2AAAXvUlEQVR42uxd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'
var checkBoxShowMessage = [['闪现', '不闪现'], ['有效果', '无效果'], ['加密框', '非加密框'], ['带声音', '无声音'], ['修改', '不修改']]

// 点击完成键监听
function doneCallback(sipBoxId) {
  console.log(sipBoxId + '  done!')
  clearCursor(sipBoxId)
  currentInputID = null
}
// 输入改变监听
function inputChangeCallback(sipBoxId, type, length) {
  console.log(sipBoxId + '  ' + (type === 1 ? 'INSERT' : 'DELETE') + ' currentLength:' + length)
  if (sipBoxId === 'SIPBox3' && length >= 0) {
    var keyboard = getKeyboard(sipBoxId)
    updateGridValue(document.getElementById('SIPBox3'), keyboard.getEncryptState(sipBoxId))
  }
}
// 输入框初始化
export function initInput() {
  console.log('userAgent: ' + window.navigator.userAgent)
  initCompleteKeyboard()
  initNumberKeyboard()
  //   initSipBoxNum('SIPBox2')
  initSipBoxComplete('SIPBox1')
//   initSipBoxComplete('SIPBox3')
}

// 触摸屏幕监听
function setUpEvent(elem, eventType, handler) {
  return (elem.attachEvent ? elem.attachEvent('on' + eventType, handler)
    : ((elem.addEventListener) ? elem.addEventListener(eventType, handler, false) : null))
}

// 初始化全键盘
function initCompleteKeyboard() {
  if (completeKeyboard === null) {
    completeKeyboard = new CFCAKeyboard(KEYBOARD_TYPE_COMPLETE)
  }
  completeKeyboard.bindInputBox('SIPBox1')
  completeKeyboard.bindInputBox('SIPBox3')
  completeKeyboard.setDoneCallback(doneCallback)
  completeKeyboard.setInputChangeCallback(inputChangeCallback)
  completeKeyboard.hideKeyboard()
}

// 初始化数字键盘
function initNumberKeyboard() {
  if (numberKeyboard === null) {
    numberKeyboard = new CFCAKeyboard(KEYBOARD_TYPE_NUMBER)
  }
  numberKeyboard.bindInputBox('SIPBox2')
  numberKeyboard.setDoneCallback(doneCallback)
  numberKeyboard.setInputChangeCallback(inputChangeCallback)
  numberKeyboard.hideKeyboard()
}

// 初始化全键盘完成
function initSipBoxComplete(sipboxId) {
  var sipBox = document.getElementById(sipboxId)
  setUpEvent(sipBox, 'focus', function(event) {
    sipBox.blur()// 注意：iOS必须.blur()防止在iOS11上出现键盘被遮挡问题
    clearCursor('SIPBox2')
    var eleCursor = document.getElementById(sipboxId + 'Cursor')
    eleCursor.style.display = 'inline-block'
    eleCursor.style.background = 'transparent'
    completeKeyboard.bindInputBox(sipboxId)
    var serverRandom = document.getElementById('serverRandom').value
    if (CFCA_OK != completeKeyboard.setServerRandom(serverRandom, sipboxId)) { alert('setServerRandom error') }
    if (numberKeyboard.isShowing()) {
      numberKeyboard.hideKeyboard()
    }
    if (currentInputID !== sipboxId) {
      completeKeyboard.showKeyboard()
      currentInputID = sipboxId
    }
    intervalId = setInterval(function() {
      if (eleCursor.style.background != 'transparent' &&
            // firefox
            eleCursor.style.background != 'transparent none repeat scroll 0% 0%') {
        eleCursor.style.background = 'transparent'
      } else {
        eleCursor.style.background = 'blue'
      }
    }, 500)
  })
}

// 初始化数字键盘完成
function initSipBoxNum(sipboxId) {
  var sipBox = document.getElementById(sipboxId)
  setUpEvent(sipBox, 'focus', function(event) {
    sipBox.blur()
    clearCursor('SIPBox1')
    var eleCursor = document.getElementById(sipboxId + 'Cursor')
    eleCursor.style.display = 'inline-block'
    eleCursor.style.background = 'transparent'
    numberKeyboard.bindInputBox(sipboxId)
    var serverRandom = document.getElementById('serverRandom').value
    if (CFCA_OK != numberKeyboard.setServerRandom(serverRandom, sipboxId)) { alert('setServerRandom error') }
    if (completeKeyboard.isShowing()) {
      completeKeyboard.hideKeyboard()
    }
    if (currentInputID !== sipboxId) {
      numberKeyboard.showKeyboard()
      currentInputID = sipboxId
    }
    intervalId = setInterval(function() {
      if (eleCursor.style.background != 'transparent' &&
            // firefox
            eleCursor.style.background != 'transparent none repeat scroll 0% 0%') {
        eleCursor.style.background = 'transparent'
      } else {
        eleCursor.style.background = 'blue'
      }
    }, 500)
  })
}

// 获取当前的键盘
function getKeyboard(sipboxId) {
  if (sipboxId === 'SIPBox1' || sipboxId === 'SIPBox3') {
    return completeKeyboard
  } else {
    return numberKeyboard
  }
}

// 设置属性
function setProperty(sipboxId) {
  var keyboard = getKeyboard(sipboxId)
  keyboard.bindInputBox(sipboxId)
  var isShowLastCharacter = !!document.getElementById('isDisplayPlant').checked
  var outputType = document.getElementById('outputTypeHash').checked
    ? OUTPUT_TYPE_HASH : OUTPUT_TYPE_ORIGINAL
  var cipherType = document.getElementById('cipherTypeSM2').checked
    ? CIPHER_TYPE_SM2 : CIPHER_TYPE_RSA
  var isEncrypted = !!document.getElementById('isEncryptSip').checked
  var minLength = parseInt(document.getElementById('minLength').value)
  var maxLength = parseInt(document.getElementById('maxLength').value)
  var inputRegex = document.getElementById('inputRegex').value
  var serverRandom = document.getElementById('serverRandom').value
  var randomType = document.getElementById('NONE').checked
    ? KEYBOARD_DISORDER_NONE
    : (document.getElementById('DIGITAL').checked ? KEYBOARD_DISORDER_ALL : KEYBOARD_DISORDER_ONLY_DIGITAL)
  var doneTitle = document.getElementById('finishTitle').value
  var backTitle = document.getElementById('backTitle').value
  var isChangeDoneTitle = document.getElementById('isChangeDoneTitle').checked
  var isChangeBackTitle = document.getElementById('isChangeBack').checked
  var isChangeSpaceIcon = document.getElementById('isChangeSpaceIcon').checked
  if (CFCA_OK != keyboard.showLastCharacter(isShowLastCharacter, sipboxId)) alert('showLastCharater error')
  if (CFCA_OK != keyboard.setMinLength(minLength, sipboxId)) alert('setMinLength error')
  if (CFCA_OK != keyboard.setMaxLength(maxLength, sipboxId)) alert('setMaxLength error')
  if (CFCA_OK != keyboard.setOutputType(outputType, sipboxId)) alert('setOutputType error')
  if (CFCA_OK != keyboard.setEncryptState(isEncrypted, sipboxId)) alert('setEncryptState error')
  if (CFCA_OK != keyboard.setServerRandom(serverRandom, sipboxId)) alert('setServerRandom error')
  if (CFCA_OK != keyboard.setCipherType(cipherType, sipboxId)) alert('setCipherType error')
  if (CFCA_OK != keyboard.setRandomType(randomType, sipboxId)) alert('setRandomType error')
  if (CFCA_OK != keyboard.setInputRegex(inputRegex, sipboxId)) alert('setInputRegex error')
  if (isChangeDoneTitle) {
    keyboard.setFinishBtnTitle(doneTitle)
  }
  if (isChangeSpaceIcon) {
    keyboard.setSpaceKeyImage(spaceImageData, 100, 20)
  }
  if (sipboxId === 'SIPBox3') {
    updateGridValue(document.getElementById('SIPBox3'))
  }
  if (isChangeBackTitle && (sipboxId === 'SIPBox1' || sipboxId === 'SIPBox3')) { keyboard.setBackBtnTitle(backTitle) }
}

// 清空输入
function clearInput(sipboxId) {
  var keyboard = getKeyboard(sipboxId)
  keyboard.clearInputValue(sipboxId)
  if (sipboxId === 'SIPBox3') {
    updateGridValue(document.getElementById('SIPBox3'))
  }
}

// 获取加密结果
export function getEncrypt(sipboxId) {
// 设置sm2类型
  const cipherType = CIPHER_TYPE_SM2 // CIPHER_TYPE_SM2 : CIPHER_TYPE_RSA;

  var keyboard = getKeyboard(sipboxId)
  keyboard.setCipherType(cipherType, sipboxId)
  //   var resultTextarea = document.getElementById('encryptedResult')
  var resultTextarea = { value: '' }
  //   resultTextarea.value = ''
  var encryptedInputValue = keyboard.getEncryptedInputValue(sipboxId)
  var passwordStrengthLevel = keyboard.getCipherAttributes(sipboxId)
  var errorCode = keyboard.getErrorCode(sipboxId).toString(16)
  if (errorCode != CFCA_OK) {
    resultTextarea.value += '加密输入数据错误: 0x' + errorCode + '\n'
    // return resultTextarea.value
  } else {
    resultTextarea.value += '加密输入数据: ' + encryptedInputValue + '\n'
  }
  var encryptedClientRandom = keyboard.getEncryptedClientRandom(sipboxId)
  errorCode = keyboard.getErrorCode(sipboxId).toString(16)
  if (errorCode != CFCA_OK) {
    resultTextarea.value += '加密客户端随机数错误: 0x' + errorCode + '\n'
    return resultTextarea.value
  } else {
    resultTextarea.value += '加密客户端随机数: ' + encryptedClientRandom + '\n'
  }
  resultTextarea.value += '弱密码判断:'
  resultTextarea.value += '小写字母:' + passwordStrengthLevel[0]
  resultTextarea.value += '大写字母:' + passwordStrengthLevel[1]
  resultTextarea.value += '数字:' + passwordStrengthLevel[2]
  resultTextarea.value += '符号:' + passwordStrengthLevel[3]
  resultTextarea.value += '是否完全连续:' + passwordStrengthLevel[4]
  resultTextarea.value += '是否完全重复:' + passwordStrengthLevel[5]
  resultTextarea.value += '连续字符个数:' + passwordStrengthLevel[6]
  resultTextarea.value += '重复字符个数:' + passwordStrengthLevel[7]
  return resultTextarea.value
}

// 检测两次输入是否一致
function checkEqual(sipboxId1, sipboxId2) {
  if (completeKeyboard.checkInputValueMatch(sipboxId1, sipboxId2)) {
    alert('SIPBox1与SIPBox3输入内容一致!')
  } else {
    alert('SIPBox1与SIPBox3输入内容不一致!')
  }
}

// 获取版本号
function getVersion() {
  alert('Version: ' + getCFCAKeyboardVersion())
}

// 显示网格控件键盘，
function showKeyboard(id) {
  var input = document.getElementById(id)
  input.blur()
  completeKeyboard.bindInputBox('SIPBox3')
  completeKeyboard.setMaxLength(6, 'SIPBox3')
  completeKeyboard.setMinLength(6, 'SIPBox3')
  var serverRandom = document.getElementById('serverRandom').value
  if (CFCA_OK !== completeKeyboard.setServerRandom(serverRandom, 'SIPBox3')) alert('setServerRandom error')
  if (numberKeyboard.isShowing()) {
    numberKeyboard.hideKeyboard()
  }
  if (currentInputID !== 'SIPBox3') {
    completeKeyboard.showKeyboard()
    currentInputID = 'SIPBox3'
  }
}

// 更新网格控件显示的值
function updateGridValue(element, isEncryptState) {
  var boxIDs = ['box0', 'box1', 'box2', 'box3', 'box4', 'box5']
  if (isEncryptState || (isEncryptState == undefined)) {
    for (var i = 0; i < 6; i++) {
      var currentBox = document.getElementById(boxIDs[i])
      if (i < element.value.length) {
        currentBox.innerHTML = '*'
      } else {
        currentBox.innerHTML = ''
      }
    }
  } else {
    for (var i = 0; i < 6; i++) {
      var currentBox = document.getElementById(boxIDs[i])
      if (i < element.value.length) {
        currentBox.innerHTML = element.value.charAt(i)
      } else {
        currentBox.innerHTML = ''
      }
    }
  }
}

function onCheckTypeChange(id, index) {
  var currentCheckBox = document.getElementById(id)
  var currentValue = document.getElementById(id + 'Value')
  currentValue.innerHTML = updateCheckBoxValue(index, currentCheckBox.checked)
}

function updateCheckBoxValue(index, type) {
  if (type) {
    return checkBoxShowMessage[index][0]
  } else {
    return checkBoxShowMessage[index][1]
  }
}

function showProperty(sipboxId) {
  var keyboard = getKeyboard(sipboxId)
  var isShowing = keyboard.isShowing()
  var isEncryptState = keyboard.getEncryptState(sipboxId)
  var cipherType = keyboard.getCipherType(sipboxId)
  var maxInput = keyboard.getMaxLength(sipboxId)
  var weakCipherInfo = keyboard.getCipherAttributes(sipboxId)
  var keyboardHeight = keyboard.getKeyboardHeight(sipboxId)
  var keyBoardPropertyMessage =
        '键盘是否显示：' + isShowing + '\n' +
        '是否是加密状态：' + isEncryptState + '\n' +
        '加密类型：' + cipherType + '\n' +
        '最大长度：' + maxInput + '\n' +
        '弱密码状态' + '\n' +
        '小写字母:' + weakCipherInfo[0] +
        '大写字母:' + weakCipherInfo[1] +
        '数字:' + weakCipherInfo[2] +
        '符号:' + weakCipherInfo[3] + '\n' +
        '键盘高度：' + keyboardHeight
  alert(keyBoardPropertyMessage)
}

function clearCursor(sipboxId) {
  var eleCursor = document.getElementById(sipboxId + 'Cursor')
  if (eleCursor) {
    clearInterval(intervalId)
    intervalId = null
    eleCursor.style.display = 'none'
  }
}

// window.onload = initInput
setUpEvent(document, 'touchstart', function(e) {
  var elem = e.srcElement || e.target
  var noNeedHideIds = [
    'CompleteKeyboard', 'NumberKeyboard',
    'SIPBox1', 'SIPBox2', 'SIPBox3',
    'getProperty1', 'getProperty2', 'getProperty3',
    'clearSIPBox1', 'clearSIPBox2', 'clearSIPBox3',
    'getSIPBox1Value', 'getSIPBox2Value', 'getSIPBox3Value',
    'checkInputValueMatch', 'getVersion', 'box0', 'box1', 'box2',
    'box3', 'box4', 'box5'
  ]
  while (elem) {
    if (noNeedHideIds.indexOf(elem.id) !== -1) {
      return
    }
    elem = elem.parentNode
  }
  clearCursor(currentInputID)
  completeKeyboard.hideKeyboard()
  numberKeyboard.hideKeyboard()
  currentInputID = null
})
export function removeToken() {

}
