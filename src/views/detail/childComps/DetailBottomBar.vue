<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buyClick">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      },
      buyClick(){
        this.$router.replace('/cart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item > div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 1px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 14px;
    color: #fff;
    line-height: 49px;
  }

  .bar-right .cart {
    background-color: #FFECEF;
    color: #ff4466;
  }

  .bar-right .buy {
    background: linear-gradient(90deg, rgb(255, 87, 119), rgb(255, 70, 143));
  }

  .cart {
    height: 48px;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  .buy {
    height: 48px;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
</style>
