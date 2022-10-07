import Vue from 'vue'
import App from './App.vue'
import store from './store' // 缓存数据
import router from './router/router.config' // 路由配置
import i18n from './i18n/'// 国际化文件配置

import 'amfe-flexible'// 适配使用

import '@/filter/filter.config' // 公共过滤器
import mixin from '@/mixin/routerMixin' // 路由拦截器配置
// import '@/assets/scss/global.scss' // 公共样式
import '@/assets/scss/iconfont/iconfont.css' // 设置矢量图

import 'vant/lib/index.css'
import 'vant/lib/icon/local.css' // 使用vant ui框架
import '@/utils/vantConfig' // 注册vant相关组件配置

import config from '@/settings/defaultSetting' // 添加公共配置文件

import '@/utils/validate'// 验证规则
// 倒计时组件
import VueCountdown from '@chenfengyuan/vue-countdown'
Vue.component(VueCountdown.name, VueCountdown)
// Vue.use(filters)
Vue.mixin(mixin)
// 模拟交易数据
import {
  mockXHR
} from '../mock'

if (process.env.NODE_ENV === 'development') {
// 使用mock数据 放开注释
  mockXHR()
}
Vue.config.productionTip = false

const opt = {
  router,
  store,
  render: h => h(App)
}
// 判断是否会用国际化
if (config.useI18n) {
  opt.i18n = i18n
}
new Vue(opt).$mount('#app')
