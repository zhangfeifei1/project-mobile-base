
export default [
  // 密码键盘页
  {
    path: '/pwdBoard',
    name: 'PwdBoard',
    components: {
      default: () => import('@/views/pwdBoard/pwdBoard')
    },
    meta: {
      isdisableback: 'true',
      keepAlive: true
    }
  }
]

