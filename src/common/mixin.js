import {debounce} from './utils'

export const itemListtenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    //监听item中图片加载完成，进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    //对监听的时间进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
