<template>
    <div class="check-botton" :class="{check:isChecked}">
      <img src="../../../assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<style scoped>
.check-botton img{
  width: 20px;
  height: auto;
}
.check-botton{
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check{
  border-color: var(--color-high-text);
  background-color: var(--color-high-text);
}
</style>
