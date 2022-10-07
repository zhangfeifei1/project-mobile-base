/**
 * @description 菜单标识配置文件
 */

const state = {
  show: false, // 遮罩标识
  rightText: '', // 标题右侧文字
  encrptParams: {}// 加密参数（加密公钥，加密方式）
}

const mutations = {
  /**
   * @param {Object} state vuex状态数据
   * @param {string} text 右侧文字
   * @description 设置标题右侧文字状态值
   */
  SET_RIGHTTEXT: (state, text) => {
    state.rightText = text
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
