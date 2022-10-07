<template>
  <div id="app">
    <!-- 标题 -->
    <navbar :title="$route.meta.title||'我的银行'" :right-text="$store.state.app.rightText" :isdisableback="$route.meta.isdisableback=='true'" :fixed="true"/>
    <!-- 内容 -->
    <div class="content">
      <router-view name="navBar"/>
      <!-- 缓存 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="view-router"/>
      </keep-alive>
      <!-- 不缓存 -->
      <router-view v-if="!$route.meta.keepAlive" class="view-router"/>
      <router-view name="tabbar"/>
    </div>
    <!-- 遮罩 -->
    <van-overlay :show="$store.state.app.show" @click="$store.state.app.show = false">
      <div class="wrapper" @click.stop>
        <van-loading />
        <div class="block" >
          加载中...请稍候</div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import navbar from '@/components/NavBar/' // 标题组件
import { Overlay, Loading } from 'vant'
import { getAllApis } from '@/api/wxpocApi' // Api是否加密
// import { getauthorize } from '@/api/wxpocApi' // 授权接口
import { GetUrlParams } from '@/utils/common' // 获取url后的参数方法
import { getEncryptionPublicKey, replayList } from '@/api/encrptApi'
import store from '@/store' // 缓存数据
export default {
  components: {
    navbar: navbar,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay
  },
  data() {
    return {
      title: '登录'
    }
  },
  mounted() {
    // 获取url中的code
    const code = GetUrlParams('code')
    // alert('code:' + code)
    const codeEnc = code
    // const codeEnc = 213213213
    // if (!codeEnc) return
    const data = {
      code: codeEnc || '123'
    }
    console.log(data)
    this.getAllApiList(() => {
      this.getReplayList(() => {
        this.getEncryption(() => {
          // getauthorize(data).then(res => {
          //   sessionStorage.setItem('uuid', JSON.stringify(res.data.uuid))
          // })
        })
      })
    })
    // Promise.all([this.getAllApis, this.getReplayList, this.getEncryption]).then(function(values) {
    //   const res1 = values[0]
    //   const res2 = values[1]
    //   const res3 = values[2]
    //   if (res1 && res2 && res3) {
    //     getauthorize(data).then(res => {
    //       sessionStorage.setItem('uuid', JSON.stringify(res.data.uuid))
    //     })
    //   }
    // })

    // alert('----' + JSON.stringify(res))
    // openid存浏览器缓存

    // sessionStorage.setItem('openId', res.data.openid)
  },
  methods: {
    getAllApiList(callback) {
      // 获取需要加密的接口列表
      getAllApis().then(res => {
        if (res.returnCode === '000000') {
          window.sessionStorage.setItem('apiList', JSON.stringify(res.data))
        }
        callback(true)
      })
    },
    getReplayList(callback) {
      // 获取防重放接口列表
      replayList().then(res => {
        if (res.returnCode === '000000') {
          window.sessionStorage.setItem('replayList', JSON.stringify(res.data))
          console.log(res.data)
        }
        callback(true)
      })
    },
    // 获取加密公钥及加密方式
    getEncryption(callback) {
      getEncryptionPublicKey().then(res => {
        const data = {
          appAsymmetricEncryptionPublicKey: res.data.appAsymmetricEncryptionPublicKey,
          appAsymmetricEncryptionType: res.data.appAsymmetricEncryptionType,
          appSymmetricEncryptionType: res.data.appSymmetricEncryptionType
        }
        store.state.app.encrptParams = data
        console.log(store.state.app.encrptParams)
        callback(data)
      }).catch(() => {
        callback()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  margin-top: 50px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.block {
  margin: 10px 0;
  color: #111;
}
</style>

