
export default [
  // 菜单页
  {
    path: '/lobby',
    name: 'Lobby',
    components: {
      default: () => import('@/views/home/lobby')
    },
    meta: {
      isdisableback: 'true',
      keepAlive: true
    }
  }
]
