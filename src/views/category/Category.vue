<template>
  <div id="category">
    <!--  标题栏  -->
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--  左侧导航栏  -->
    <category-detail :category-detail-list="categoryList" @categoryDetailClick="categoryDetailClick"></category-detail>
    <Scroll class="category-scroll" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!--  右侧数据显示  -->
      <sub-category :category-list="subcategoryList"></sub-category>
      <TabControl :titles="titleList" @tabClick="tabClick" ref="tabControl"></TabControl>
      <goods-list :goods="categoryDetailList"></goods-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import CategoryDetail from './childComps/CategoryDetail'
  import SubCategory from './childComps/SubCategory'
  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goods/GoodsList'

  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/content/backTop/BackTop'

  import {getCategory, getSubcategory, getCategoryDetail} from '../../network/category'

  export default {
    name: 'Category',
    data() {
      return {
        categoryList: [],
        subcategoryList: [],
        categoryDetailList: [],
        titleList: ["流行", "新款", "精选"],
        currentIndex: 0,
        isShowBackTop: false
      }
    },
    components: {
      NavBar,
      CategoryDetail,
      SubCategory,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      this.getCategory()
    },
    methods: {
      /*
      *事件监听相关方法
      */
      categoryDetailClick({maitKey, index}) {
        // 防止反复请求
        if (this.currentIndex === index) return;
        this.currentIndex = index;
        // 每次切换分类初始化tabControl的下标
        this.$refs.tabControl.currentIndex = 0;
        //每次切换刷新
        // 请求对应的推荐列表
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
        this.getSubcategory(maitKey);
      },
      tabClick(index) {
        const typeList = ["pop", "new", "sell"];
        // 切换类型数据
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 800)
      },
      contentScroll(position) {
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      /*
      *网络请求相关方法
      */
      getCategory() {
        getCategory().then(res => {
          // console.log(res)
          this.categoryList = res.data.category.list
          this.$nextTick(() => {
            this.getSubcategory(this.categoryList[0].maitKey);
            this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
          });
        })
      },
      getSubcategory(key) {
        getSubcategory(key).then(res => {
          // console.log(res.data.list);
          this.subcategoryList = [...res.data.list];
        });
      },
      getCategoryDetail(key, type) {
        getCategoryDetail(key, type).then(res => {
          // console.log(res);
          this.categoryDetailList = [...res];
        });
      },
    },
    activated() {
      this.$store.commit("setLoading", true);
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
    position: relative;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: white;
  }

  .category-scroll {
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 100px;
    overflow: hidden;
    height: calc(100% - 94px);
  }
</style>
