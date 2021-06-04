<template>
  <div class="category-detail">
    <scroll class="category-detail-scroll">
      <ul class="category-detail-menu" v-for="(item,index) in CategoryDetailList">
        <li :key="index" :class="{active:index===currentIndex}" @click="categoryDetailClick(item,index)">
          {{item.title}}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll'

  export default {
    name: "CategoryLeftBar",
    data() {
      return {
        currentIndex: 0
      };
    },
    components: {
      Scroll
    },
    props: {
      CategoryDetailList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      categoryDetailClick(item, index) {
        const obj = {
          maitKey: item.maitKey,
          index
        };
        this.currentIndex = index;
        this.$emit("categoryDetailClick", obj);
      }
    }
  }
</script>

<style scoped>
  .category-detail {
    width: 100%;
  }

  .category-detail-scroll {
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 49px;
    left: 0;
    overflow: hidden;
    width: 100px;
    background-color: #f6f6f6;
  }

  .category-detail-menu {
    font-size: 14px;
    line-height: 44px;
    width: 100px;
    height: 44px;
    user-select: none;
    text-align: center;
    color: #666666;
    border: 0;
    outline: none;
    background: none
  }

  .active {
    color: var(--color-high-text);
    border-left: 5px solid var(--color-tint);
    background-color: #ffffff;
  }
</style>
