<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:<span class="totalPrice">{{totalPrice}}</span>
    </div>
    <div class="calculate">
      结算:{{(checkLength)}}
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/checkButton/CheckButton'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      // isSelectAll(){
      //   this.$store.state.cartList
      // }
    }
  }
</script>

<style scoped>
  /*.bottom-bar {
    height: 40px;
    background-color: red;
    position: relative;
  }*/
  .bottom-bar {
    position: fixed;
    display: flex;
    width: 100%;
    height: 50px;
    bottom: 49px;
    background-color: #eee;
    line-height: 50px;
    font-size: 16px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 90px;
  }

  .check-button {
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-right: 5px;
  }

  .price {
    flex: 1;
    text-align: right;
    letter-spacing: 1px;
  }

  .totalPrice {
    color: var(--color-high-text);
  }

  .calculate {
    width: 110px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
    border-radius: 25px;
    margin: 0px 7px;
  }
</style>
