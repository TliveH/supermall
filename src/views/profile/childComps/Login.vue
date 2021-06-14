<template>
  <div class="login">
    <div class="user-pic">
      <img src="../../../assets/img/common/kangna.jpg" class="user-pic-img"/>
    </div>
    <div class="user-info">
      <a
        href="https://login.m.taobao.com/login.htm?redirectURL=https%3A%2F%2Fmain.m.taobao.com%2Fmytaobao%2Findex.html%3Fspm%3Da215s.7406091.toolbar.i0">登录/注册</a>
      <div class="phone-num">
        <img alt="" class="icon-phone" src="../../../assets/img/profile/phone.svg"/>
        <p>暂未绑定手机号</p>
      </div>
    </div>
    <a href="https://login.m.taobao.com/login.htm?redirectURL=https%3A%2F%2Fmain.m.taobao.com%2Fmytaobao%2Findex.html%3Fspm%3Da215s.7406091.toolbar.i0" class="profile-arrow-right">
      <img alt="" src="../../../assets/img/profile/arrow_right.svg"/>
    </a>
  </div>
</template>

<script>
  export default {
    name: "Login",
  };
</script>

<style scoped>
  .login {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    padding: 0 20px;
    background-color: #eeeeee;
  }

  .user-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
  }

  .user-pic .user-pic-img {
    display: block;
    width: 60px;
    height: 60px;
  }

  .user-info {
    font-size: 16px;
    margin-left: 20px;
    color: #ff5777;
  }

  .user-info p {
    margin-left: 3px;
  }

  .user-info a {
    color: #ff5777;
  }

  .user-info .phone-num {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .icon-phone {
    display: inline-block;
    width: 16px;
    height: 16px;
  }

  .profile-arrow-right {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
  }

  .profile-arrow-right img {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
</style>
