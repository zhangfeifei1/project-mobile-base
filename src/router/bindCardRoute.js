
export default [
  // 绑卡页面
  {
    path: '/bindCard',
    name: 'BindCard',
    components: {
      default: () => import('@/views/bindCard/bindCard')
    },
    meta: {
      title: '绑卡',
      keepAlive: true
    }
  },
  // 绑卡结果页面
  {
    path: '/bindCardRes',
    name: 'BindCardRes',
    components: {
      default: () => import('@/views/bindCard/bindCardRes')
    },
    meta: {
      title: '绑卡结果',
      keepAlive: true
    }
  }
]

