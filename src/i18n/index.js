/**
 * @description 国际化配置
 * 例子
 * vue文件中手动修改国际化:
 * this.$i18n.locale='en'
 * 显示数据:
 * {{ $t('name') }}
 * @author digua
 * @version 0.1.0
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import opt from '@/settings/defaultSetting'
Vue.use(VueI18n)
// 引用各种语言配置文件
import zh from './config/zh'// 中文
import en from './config/en'// 英文
const i18n = new VueI18n({
  locale: opt.locale, // 用this.$i18n.locale='en'来修改
  messages: {
    zh,
    en
  }
})
export default i18n
