<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:<span>{{ totalPrice }}</span>元
    </div>
    <div class="calculate" @click="calClick">
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
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        //使用filter
        // return !(this.$store.state.cartList.filter(item=>!item.checked).length
        //使用find
        // return !this.$store.state.cartList.find(item => !item.checked)
        //普通遍历
        for (let item of this.$store.state.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {//全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else //全部未选中或者部分选中
          this.$store.state.cartList.forEach(item => item.checked = true)
      },
      calClick() {
        if (!this.checkLength) {
         this.$toast.show('请选择要购买的商品')
        }
      }
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
    width: 80px;
  }

  .check-button {
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-right: 5px;
  }

  .price {
    flex: 1;
    text-align: center;
    letter-spacing: 1px;
  }

  .price span {
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
