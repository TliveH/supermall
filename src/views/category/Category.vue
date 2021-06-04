<template>
  <div id="category">
    <!--  标题栏  -->
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--  左侧导航栏  -->
    <category-detail :category-detail-list="categoryList" @categoryDetailClick="categoryDetailClick"></category-detail>
    <Scroll class="category-scroll">
      <!--  右侧数据显示  -->
      <sub-category :category-list="subcategoryList"></sub-category>
    </Scroll>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import CategoryDetail from './childComps/CategoryDetail'
  import SubCategory from './childComps/SubCategory'

  import Scroll from '../../components/common/scroll/Scroll'

  import {getCategory, getSubcategory, getCategoryDetail} from '../../network/category'

  export default {
    name: 'Category',
    data() {
      return {
        categoryList: [],
        subcategoryList: [],
        categoryDetailList: [],
        currentIndex: 0,
      }
    },
    components: {
      NavBar,
      CategoryDetail,
      SubCategory,
      Scroll
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
      },


      /*
      *网络请求相关方法
      */
      getCategory() {
        getCategory().then(res => {
          // console.log(res)
          this.categoryList = res.data.category.list
          // this.$nextTick(() => {
          //   this.getSubcategory(this.categoryList[0].maitKey);
          //   this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
          // });
        })
      },
      getSubcategory(key) {
        getSubcategory(key).then(res => {
          console.log(res.data.list);
          this.subcategoryList = [...res.data.list];
        });
      },
      getCategoryDetail(key, type) {
        getCategoryDetail(key, type).then(res => {
          // console.log(res);
          this.categoryDetailList = [...res];
        });
      },
    }
  }
</script>

<style scoped>
  #category {
    /*padding-top: 44px;*/
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
  }
</style>
