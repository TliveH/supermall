<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters([
        'cartList'
      ])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: 100vh;
    overflow: hidden;
  }

  .content {
    /*height: calc(100% - 93px);*/
    height: calc(100% - 143px);
  }

  /*.cart-list {
    width: 100%;
    height: 100%;
  }

  .content {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 99px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
  }*/
</style>
