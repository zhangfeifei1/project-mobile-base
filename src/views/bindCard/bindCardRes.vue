<template>
  <div>
    <van-icon class="icon-success" color="#a00" name="success" size="3rem"/>
    <div class="suc-box">绑定成功</div>
    <van-cell :value="paramsData.No|accNoEncFilter" title="卡号" />
    <van-cell :value="paramsData.Balance|amountFilter" title="账户余额" />
    <div style="margin: 16px;">
      <van-button round block type="danger" class="btn" @click="onAcctQryClick">
        账户查询
      </van-button>
      <van-button round block type="danger" class="btn">
        华夏银行APP下载
      </van-button>
      <van-button round block type="danger" class="btn">
        账户追加
      </van-button>
      <van-button round block type="danger" class="btn">
        一键签约动帐提醒
      </van-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BindCardRes',
  data() {
    return {
      paramsData: {}

    }
  },
  activated() {
    // 获取router的params参数
    // this.paramsData = this.$route.params
    this.paramsData = this.$store.state.params
  },
  mounted() {
    // 获取router的params参数
    // this.paramsData = this.$route.params
    this.paramsData = this.$store.state.params
  },

  methods: {
    /**
     * 跳转账户查询按钮
     * @description 跳转账户查询按钮
     */
    onAcctQryClick() {
      // 返回回到绑卡录入页
      this.$router.replace({
        name: 'Account'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.suc-box{
    font-size: 16px;
    color: #a00;
    font-weight: bold;
    text-align: center;
    margin: 25px 0;
}
.icon-success{
    text-align: center;
    width: 100%;
}
.btn{
    margin: 16px 0;
}
</style>
