<!--
 * @Author: 阿匡
 * @Date: 2022-02-16 17:09:45
 * @LastEditTime: 2022-02-16 17:48:36
 * @LastEditors: 阿匡
 * @Description: 登录页面
 * @FilePath: \vue2-ol-zkstudy\src\components\login\index.vue
 * 仅为学习使用
-->
<template>
  <div class="wrap">
    <video-bg :sources="[require('../../assets/homeImg/movie.mp4')]">
    </video-bg>
    <div class="form_wrap">
      <div class="form_title">
        <span>用户登录</span>
      </div>
      <div class="form_item">
        <i class="el-icon-user"></i>
        <input placeholder="请输入用户名" v-model="userName" />
      </div>
      <div class="form_item">
        <i class="el-icon-edit"></i>
        <input placeholder="请输入密码" type="password" v-model="password" />
      </div>
      <div class="form_button" @click="login">
        <span>登 录</span>
      </div>
    <div class="form_wrap_bg"></div>
    </div>
  </div>
</template>

<script>
import VideoBg from "vue-videobg";
export default {
  name: "LoginPage",
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  components: {
    VideoBg,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .VideoBg video {
  position: absolute;
  top: 50%;
  left: 50%;
  visibility: hidden;
  filter: blur(15px);
  /*加滤镜*/
  /*-webkit-filter:grayscale(100%);*/
  /*filter:grayscale(100%);//背景灰度设置*/
  z-index: -12;
}

.form_wrap {
  padding: 1.25rem /* 20/16 */;
  height: 20.625rem /* 330/16 */;
  position: absolute;
  top: 33%;
  left: 37%;
  width: 25rem /* 400/16 */;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

  .form_title {
    text-align: center;
    font-size: 1.375rem /* 22/16 */;
    color: #fff;
    height: 3.5rem /* 56/16 */;
    line-height: 3.5rem /* 56/16 */;
    letter-spacing: 0.125rem /* 2/16 */;
    font-weight: 100;
    margin-top: 2%;
  }

  .form_item {
    width: 90%;
    margin: 1.25rem /* 20/16 */ 5%;
    border: solid 1px #6395c8;
    border-radius: 0.25rem /* 4/16 */;
    background: #23429a;
    color: #fff;

    i {
      color: #cbd2e6;
      height: 1rem /* 16/16 */;
      width: 1rem;
      font-size: 1rem;
      padding: 0.625rem /* 10/16 */;
      line-height: 1rem;
    }

    input {
      width: 80%;
      border: none;
      background: none;
      height: 1.875rem /* 30/16 */;
      font-size: 1rem /* 16/16 */;
      color: #fff;
    }
  }
  .form_button{
          width: 90%;
    height: 2rem /* 32/16 */;
    margin: 1.25rem /* 20/16 */ 5%;
    text-align: center;
    line-height: 2rem /* 32/16 */;
    background: url('../../assets/homeImg/login_text_bg.png') no-repeat center
        center;
    background-size: 100% 100%;
    border-radius: .25rem /* 4/16 */;
    color: #fff;
    font-size: 1.125rem /* 18/16 */;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
  }
  .form_wrap_bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: url('../../assets/homeImg/nav_bg.png') center center;
    background-size: 100% 100%;  
  }
}
</style>