<template>
  <van-tabbar v-model="active" style="z-index: 1999">
    <van-tabbar-item
      v-for="(tab, index) in tabbar"
      :icon="tab.icon"
      :to="tab.path"
      :dot="tab.dot"
      :info="tab.info"
      :key="index">
      {{ tab.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {

  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
      tabbar: [
        {
          name: '首页',
          path: '/home',
          pathName: 'home',
          icon: 'home-o',
          dot: false,
          info: ''
        },
        {
          name: '社区',
          path: '/items',
          pathName: 'class',
          icon: 'class-full',
          dot: false,
          info: ''
        },
        {
          name: '理财',
          path: '/order',
          pathName: 'cart',
          icon: 'cart-full',
          dot: false,
          info: ''
        },
        {
          name: '我的',
          path: '/user',
          pathName: 'user',
          icon: 'wode',
          dot: false,
          info: ''
        }
      ]
    }
  },

  watch: {
    $route: 'changeActive'
  },

  created() {
    const toName = this.$route.name
    this.setActive(toName)
  },

  methods: {
    changeActive({ name }) {
      this.setActive(name)
    },
    setActive(name) {
      this.tabbar.forEach((tab, i) => {
        if (tab.pathName === name) {
          this.active = i
          return false
        }
      })
    }
  }
}
</script>
