<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 1000) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    /*justify-content: center;*/
    /*align-items: center;*/
    text-align: center;
    width: 50%;
    height: 70px;
    line-height: 70px;
    /*font-weight: 900;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*padding: 10px 12px;*/
    z-index: 999;
    color: #eeeeee;
    /*background-color: rgba(0, 0, 0, .5);*/
    background: linear-gradient(90deg, rgba(255, 87, 119,.8), rgba(255, 70, 143,.8));
    letter-spacing: 1px;
  }
</style>
