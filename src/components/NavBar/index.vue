<template>
  <div>
    <van-nav-bar
      :title="title"
      :fixed="true"
      :left-arrow="!isdisableback"
      :left-text="!isdisableback?'返回':''"
      :right-text="getText"
      @click-right="onClickRight"
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      type: String,
      default: '首页'
    },
    rightText: {
      type: String,
      default: ''
    },
    isdisableback: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    getText() {
      return this.$store.state.app.rightText
    }
  },
  watch: {

  },

  created() {

  },

  methods: {
    onClickLeft() {
      this.$router.go(-1)
      // wx.showToast({ title: '点击返回', icon: 'none' })
    },
    onClickRight() {
      this.$parent.$emit('rightAction', this.rightText)
      // wx.showToast({ title: '点击按钮', icon: 'none' })
    }
  }
}
</script>
