<template>
  <div>
    <!-- 菜单 -->
    <van-grid>
      <van-grid-item icon="photo-o" text="绑卡" @click="gotoMenu('BindCard')"/>
      <van-grid-item icon="photo-o" text="我的账户" @click="gotoMenu('Account')"/>
      <van-grid-item icon="photo-o" text="密码控件" @click="gotoMenu('PwdBoard')"/>
    </van-grid>
    <button @click="tt">测试</button>
  </div>
</template>
<script>

import { Grid, GridItem, Dialog } from 'vant'
import { test } from '@/api/wxpocApi'
export default {
  name: 'Lobby',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      flag: true
    }
  },
  activated() {

  },
  mounted() {
    // setMenuOther()
    this.init()
  },
  methods: {
    tt() {
      test({ a: 1 }).then(res => {
        alert(JSON.stringify(res))
      })
    },
    init() {

    },
    /**
     * 菜单跳转事件
     * @param id 菜单对应的路由名称
     * @description 点击某一项菜单跳转事件
     */
    gotoMenu(id) {
      if (!this.flag) {
        this.$toast('该用户禁止访问！')
        return
      }
      if (!id) {
        this.$toast('该功能正在开发中...')
        return
      }
      this.$router.push({
        name: id
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
