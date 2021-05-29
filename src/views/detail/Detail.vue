<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :pull-up-load="true">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImage"></detail-swiper>
      <!-- 商品基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 用户评论 -->
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情信息 -->
      <detail-images-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-images-info>
      <!-- 商品参数信息 -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- 商品推荐 -->
      <goods-list :goods="recommendList" :is-recommend="true"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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

import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

import {getDetail, getRecommend, Goods, Shop, GoodsParams} from '../../network/detail'
import {itemListtenerMixin} from '../../common/mixin'

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
    Scroll,
    BackTop
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
      isShowBackTop: false,
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
  },
  mounted() {
  },
  destroyed() {
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListene)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 800)
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
