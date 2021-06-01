<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      mouseWheel: true,
      click: this.click,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      pullDownRefresh: this.pullDownRefresh
    })
    //监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    //监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
    //监听下拉事件
    this.scroll.on('pullingDown', () => {
      this.$emit('pullingDown')
    })
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
    /*//下拉刷新加载数据
    handlepullingDown(callback) {
      this.scroll.on("pullingDown", () => {
        callback();
      })
    },
    //下拉刷新加载数据完毕通知better-scroll
    handlefinishPullDown() {
      this.scroll.finishPullDown();//通知bettwer-scroll已经加载完毕
      this.scroll.refresh();//重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    },
    //上拉加载更多
    handlepullingUp(callback) {
      this.scroll.on("pullingUp", () => {
        callback()
      })
    },
    handlefinishPullUp() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    }*/
  }
}
</script>

<style scoped>

</style>
