
<template>
  <div>
    <!-- 卡片轮播 -->
    <swiper ref="mySwiper" :options="swiperOption" class="swiper" @slideChangeTransitionEnd="slideChangeTransitionEnd">
      <swiper-slide><img src="@/assets/images/card1.jpg" class="img"></swiper-slide>
      <swiper-slide><img src="@/assets/images/card1.jpg" class="img"></swiper-slide>
      <div slot="pagination" class="swiper-pagination"/>
    </swiper>
    <!-- <img :src="imgCode" @click="reCreateCode"> -->
    <!-- 滑至第一张图 显示以下内容 -->
    <div v-show="activeIndex==0">
      <van-form @submit="onSubmit" @failed="onFailed">
        <!-- 输入卡号 -->
        <van-field
          v-model="cardNo"
          :rules="validate.CardNo==null?[]:validate.CardNo"
          type="digit"
          name="借记卡卡号"
          label="借记卡卡号"
          placeholder="请输入借记卡卡号"
          clearable
          required
        />
        <!-- 输入手机号 -->
        <van-field
          v-model="phone"
          type="tel"
          name="预留手机号"
          label="预留手机号"
          placeholder="请输入预留手机号"
          clearable
          required
        />
        <!-- 输入短信验证码 -->
        <van-field
          v-model="code"
          :rules="validate.CodeNo==null?[]:validate.CodeNo"
          type="text"
          name="短信验证码"
          label="短信验证码"
          placeholder="请输入短信验证码"
          clearable
          required
        >
          <!-- 短信验证码 按钮 -->
          <!-- <div slot="button" class="getCode red" @click="getCode">
            <countdown v-if="counting" :time="60000" @end="countdownend">
              <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
            </countdown>
            <span v-else>获取验证码</span>
          </div> -->
        </van-field >
        <!-- 各种协议 -->
        <!-- <div class="checkBox">
          <van-checkbox v-model="checked1" class="checkItem">接受华夏银行电子银行《个人客户服务协议》</van-checkbox>
          <van-checkbox v-model="checked2" class="checkItem">开通账务变动微信提醒</van-checkbox>
          <van-checkbox v-model="checked3" class="checkItem">同时开通手机银行《安全提示》</van-checkbox>
        </div> -->
        <!-- 绑定提交按钮 -->
        <div style="margin: 16px;">
          <van-button round block type="danger" native-type="submit">
            绑定
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 滑至第二张图 显示以下内容 -->
    <div v-show="activeIndex==1">
      <van-form @submit="onSubmit">
        <!-- 输入信用卡卡号 -->
        <van-field
          v-model="creCardNo"
          :rules="validate.CardNo==null?[]:validate.CardNo"
          type="digit"
          name="信用卡卡号"
          label="信用卡卡号"
          placeholder="请输入信用卡卡号"
          clearable
          required
        />
        <!-- 输入查询密码 -->
        <van-field
          v-model="creTrsPwd"
          :rules="[{ required: true, message: '请填写查询密码' }]"
          type="password"
          name="查询密码"
          label="查询密码"
          placeholder="请输入查询密码"
          clearable
          required
        />
        <!-- 输入预留手机号 -->
        <van-field
          v-model="crePhone"
          :rules="validate.Phone==null?[]:validate.Phone"
          type="tel"
          name="预留手机号"
          label="预留手机号"
          placeholder="请输入预留手机号"
          clearable
          required
        />
        <!-- 输入短信验证码 -->
        <van-field
          v-model="creCode"
          :rules="validate.MsgVali==null?[]:validate.MsgVali"
          required
          type="text"
          name="短信验证码"
          label="短信验证码"
          placeholder="请输入短信验证码"
          clearable

        >
          <!-- 短信验证码 按钮 -->
          <div slot="button" class="getCode red" @click="getCode">
            <countdown v-if="counting" :time="60000" @end="countdownend">
              <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
            </countdown>
            <span v-else>获取验证码</span>
          </div>
        </van-field >
        <div class="checkBox">
          <van-checkbox v-model="checked4" class="checkItem">同时开通手机银行《安全提示》</van-checkbox>
        </div>
        <!-- 提交按钮 绑定 -->
        <div style="margin: 16px;">
          <van-button round block type="danger" native-type="submit">
            绑定
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="text-desc text-center bottom_positon">技术支持: loong easygroup</div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper' // 轮播插件
import 'swiper/css/swiper.css'// 轮播插件样式
import { getMsgCode, bindCard, getImageCode, authTest, verifyCode } from '@/api/wxpocApi'// 接口
import '@/utils/validate'// 验证规则
import { getAllPattern } from '@/api/backMgmtApi'// 接口
export default {
  name: 'BindCard',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      imgCode: '',
      activeIndex: 0, // 轮播当前项
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination'
        }
      }, // 轮播配置参数
      // 借记卡绑定字段
      cardNo: '',
      phone: '',
      code: '',
      checked1: '',
      checked2: '',
      // 信用卡绑定字段
      creCardNo: '',
      creTrsPwd: '',
      crePhone: '',
      creCode: '',
      checked3: '',
      checked4: '',
      // 验证码倒计时标识 true：正在倒计时，false：允许倒计时
      counting: false

    }
  },
  computed: {
    // 获取轮播dom节点
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  activated() {

  },
  mounted() {
    // this.reCreateCode()
    // const data = { }
    // getImageCode(data).then((res) => {
    //   alert(JSON.stringify(res))
    //   const blob = new Blob([res])
    //   const url = window.URL.createObjectURL(blob)
    //   // this.imgCode = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    //   // this.picUrl = window.URL.createObjectURL(res.data)
    //   this.imgCode = url
    // })
    // authTest().then(() => {
    //   // alert('authTest:' + JSON.stringify(res))
    // })
  },
  methods: {
    /**
     * 点击刷新验证码
     * @description 点击刷新验证码
     */
    reCreateCode() {
      const data = { }
      getImageCode(data).then((res) => {
        alert(JSON.stringify(res))
        const blob = new Blob([res])
        const url = window.URL.createObjectURL(blob)
        // this.imgCode = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        // this.picUrl = window.URL.createObjectURL(res.data)
        this.imgCode = url
      })
    },
    /**
     * 轮播完成事件
     * @description 完成一次轮播结束触发事件
     */
    slideChangeTransitionEnd() {
      this.activeIndex = this.swiper.activeIndex
    },
    /**
     * 表单提交
     * @description 借记卡绑卡事件
     */
    // onSubmit() {
    //   const params = {
    //     validationType: 1,
    //     appType: 1,
    //     CardNo: this.cardNo,
    //     CodeNo: this.code
    //   }
    //   getAllPattern(params).then(res => {
    //     debugger
    //     console.log(res)
    //   })
    // },
    onSubmit() {
      // const imgcode = sessionStorage.getItem('imgcode')
      // const openId = sessionStorage.getItem('openId')
      // const p = {
      //   pictureCode: this.code,
      //   lastRev: imgcode
      // }
      // alert(JSON.stringify(p))
      // verifyCode(p).then(res => {
      //   alert(JSON.stringify(res))
      //   if (res.returnCode === '040003' || res.returnCode === '040004') {
      //     this.reCreateCode()
      //   }
      // })
      const openId = 'oqPkFuJ3eqIrX-U0J1SxiapU44dc'// 测试
      const params = {
        openid: openId,
        CardNo: this.cardNo,
        BankAcType: '1',
        Phone: this.phone,
        MsgVali: this.code,
        checked1: true,
        checked2: true,
        checked3: true,
        imgcode: ''
      }
      // // 发送绑卡接口
      const that = this
      bindCard(params).then(res => {
        this.$alert({ message: JSON.stringify(res.message) }).then(() => {
          params.No = that.cardNo
          params.Balance = res.data.Balance
          // 跳转绑卡结果页
          this.$store.state.params = params
        })
      }).catch(error => {
        console.log(error)
      })
      that.$router.push(('/bindCardRes'))
    },
    /**
     * 表单验证错误处理事件
     * @description 表单验证不通过事件
     */
    onFailed() {
      debugger
      // 表单验证
      var flag = this.validate.ruleCheck(this.cardNo, this.validate.CardNo)
      if (!flag) {
        return
      }
      // var flag1 = this.validate.ruleCheck(this.phone, this.validate.Phone)
      // if (!flag1) {
      //   return
      // }
      var flag2 = this.validate.ruleCheck(this.code, this.validate.CodeNo)
      if (!flag2) {
        return
      }
    },
    /**
     * 获取短信验证码
     * @description 获取短信验证码
     */
    getCode() {
      var flag = this.validate.ruleCheck(this.cardNo, this.validate.CardNo)
      if (!flag) {
        return
      }
      var flag1 = this.validate.ruleCheck(this.phone, this.validate.Phone)
      if (!flag1) {
        return
      }
      if (!this.counting) {
        const params = {
          CardNo: this.cardNo,
          BankAcType: '1',
          Phone: this.phone
        }
        getMsgCode(params).then(res => {
          this.$toast({ message: JSON.stringify(res.message), duration: 3000 })
          this.counting = true
        })
      } else {
        this.$toast('请稍后获取！')
        return
      }
    },
    /**
     * 倒计时结束事件
     * @description 倒计时为0时触发事件
     */
    countdownend() {
      this.counting = false
    }
  }

}
</script>

<style lang="scss" scoped>
.swiper{
  // width: 100%;
  height: 250px;
  padding: 10px 0;
}
.img{
    width: 80%;
    padding: 0 10%;
}
.checkBox{
  margin: 20px 14px;
}
.checkItem{
  font-size:15px;
  margin-top: 10px;
}
.text-desc{
  font-size:15px;
}
</style>
