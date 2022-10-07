<template>
  <div>

    <van-cell-group>
      <input id="serverRandom" class="sip" placeholder="输入服务器随机数" value="MTIzNDU2Nzg5MDk4NzY1NA==" style="display:none">
      <span id="SIPBox1Cursor" class="cursor"/>
      <van-field id="SIPBox1" v-model="value" name="SIPBox1" label="文本" placeholder="" />
    </van-cell-group>
    <van-button @click="getPwd('SIPBox1')">获取密码加密结果</van-button>
  </div>
</template>
<script>
import { initInput, getEncrypt } from '@/utils/pwdBoard/common'
export default {
  name: 'PwdBoard',
  components: {

  },
  data() {
    return {
      value: ''
    }
  },
  activated() {

  },
  mounted() {
    // setMenuOther()
    this.init()
  },
  methods: {

    init() {
      this.$nextTick(() => {
        initInput()
      })
    },
    getPwd(id) {
      const msg = getEncrypt(id)
      alert(msg)
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
