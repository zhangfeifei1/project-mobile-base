
export default [
  // ่ๅ้กต
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
