<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{ cartLength }}）</div>
    </nav-bar>
    <!-- 商品展示 -->
    <cart-list class="cart-list"></cart-list>
    <!-- 底部 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  /*.cart-list {*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  width: 100%;*/
  /*}*/
</style>
