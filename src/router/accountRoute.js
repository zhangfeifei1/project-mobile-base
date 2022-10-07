
export default [
  // 我的账户
  {
    path: '/account',
    name: 'Account',
    components: {
      default: () => import('@/views/account/account')
    },
    meta: {
      title: '我的账户',
      keepAlive: true
    }
  },
  // 账户详情
  {
    path: '/accountDetail',
    name: 'AccountDetail',
    components: {
      default: () => import('@/views/account/accountDetail')

    },
    meta: {
      title: '账户详情',
      keepAlive: true
    }
  }
]
