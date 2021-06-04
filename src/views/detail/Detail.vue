<template>
  <div id="detail">
    <!--  导航栏  -->
    <detail-nav-bar class="detail-nav" ref="detailNav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" :pull-up-load="true">
      <!--  轮播图  -->
      <detail-swiper :top-images="topImage"></detail-swiper>
      <!--  商品基本信息  -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!--  用户评论  -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <!--  店铺信息  -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--  商品详情信息  -->
      <detail-images-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"
                          ref="images"></detail-images-info>
      <!--  商品参数信息  -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!--  商品推荐  -->
      <goods-list :goods="recommendList" :is-recommend="true" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :is-show="isShow"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailImagesInfo from './childComps/DetailImagesInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import GoodsList from '../../components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/content/backTop/BackTop'
  // import Toast from '../../components/common/toast/Toast'

  import {getDetail, getRecommend, Goods, Shop, GoodsParams} from '../../network/detail'
  import {itemListtenerMixin} from '../../common/mixin'
  import {debounce} from '../../common/utils'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailCommentInfo,
      DetailShopInfo,
      DetailImagesInfo,
      DetailParamInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
      BackTop,
      // Toast,
    },
    mixins: [itemListtenerMixin],
    data() {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        isShowBackTop: false,
        currentIndex: 0,
        // message:'',
        // isShow:false
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详细数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //获取数据
        const data = res.result
        //获取顶部的图片轮播数据
        this.topImage = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //用户评论
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        //创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //保存商品的详细信息
        this.detailInfo = data.detailInfo
        //获取尺寸的参数信息
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      })
      //请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommendList = res.data.list;
      })
      //给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.images.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    mounted() {
    },
    destroyed() {
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListene)
    },
    methods: {
      detailImageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 800)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 800)
      },
      contentScroll(position) {
        //获取Y值
        const positionY = -position.y
        //positionY与themeTopYs中的值进行对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          /*if (this.currentIndex != i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY > this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex=this.currentIndex
          }*/
          // this.currentIndex !=i &&
          if ((positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > this.$refs.images.$el.offsetTop
      },
      addToCart() {
        //获取购物车显示的商品信息
        const product = {}
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.lowNowPrice
        product.iid = this.iid
        //将商品添加到购物车
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res)
          // console.log(this.$toast)
        })
        // alert('添加购物车成功')
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 93px);
  }
</style>
