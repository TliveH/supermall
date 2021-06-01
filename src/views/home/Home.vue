<template>
  <div id="home">
    <!-- 标题栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- tabBarControl -->
    <tab-control ref="tabControl1" @tabClick="tabClick" :titles="['流行','新款','精选']" class="tab-control"
                 v-show="isTabFixed"></tab-control>
    <!-- BScroll滚动区域 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :click="true"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐分类 -->
      <RecommendView :recommend="recommend"></RecommendView>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- tabBarControl -->
      <tab-control ref="tabControl2" @tabClick="tabClick" :titles="['流行','新款','精选']"></tab-control>
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 回到顶部,监听组件的原生事件必须要用native修饰符变成原生组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from "../../views/home/childComps/RecommendView";
import FeatureView from "../../views/home/childComps/FeatureView";

import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

// import BScroll from 'better-scroll'

import {getHomeMultidata} from "../../network/home";
import {getHomeGoods} from "../../network/home";
import {itemListtenerMixin} from '../../common/mixin'


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListtenerMixin],
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      //当前吸顶的位置
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //获取Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListene)
  },
  created() {
    //请求多条数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    //手动代码点击一次
    // this.tabClick(0)
  },
  mounted() {
    // this.scroll = new BScroll(new BScroll(this.$refs.scroll))
    // this.scroll = new BScroll(this.$refs.scroll, {
    //   // 上拉加载
    //   pullUpLoad: {
    //     // 当上拉距离超过30px时触发 pullingUp 事件
    //     threshold: -30
    //   },
    //   // 下拉刷新
    //   pullDownRefresh: {
    //     // 下拉距离超过30px触发pullingDown事件
    //     threshold: 30,
    //     // 回弹停留在距离顶部20px的位置
    //     stop: 20
    //   }
    // })
    // this.scroll.on('pullingUp', () => {
    //   console.log('处理上拉加载操作')
    //   setTimeout(() => {
    //     // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
    //     this.scroll.finishPullUp()
    //   }, 2000)
    // })
    // this.scroll.on('pullingDown', () => {
    //   console.log('处理下拉刷新操作')
    //   setTimeout(() => {
    //     console.log('asfsaf')
    //     // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
    //     this.scroll.finishPullDown()
    //   }, 2000)
    // })
  },
  methods: {
    /*
    * 事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 800)
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      /*
      if(-position.y>1000)
        this.isShowBackTop=true
      else this.isShowBackTop=false
      */
      //决定tabControl是否吸顶(position:flxed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    // droprefresh(){
    //   this.getHomeMultidata()
    // },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
    *网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    }
  },
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;*/
}

/*.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}*/

.content {
  /*height: calc(100% - 44px);*/
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {
  height: calc( 100% - 93px );
  overflow: hidden;
  !*margin-top: 44px;*!
}*/
</style>
