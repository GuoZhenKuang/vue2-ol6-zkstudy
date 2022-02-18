<!--
 * @Author: 阿匡
 * @Date: 2022-01-15 12:02:31
 * @LastEditTime: 2022-02-18 10:20:46
 * @LastEditors: 阿匡
 * @Description: 头部
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\Header\index.vue
 * 仅为学习使用
-->
<template>
  <div class="headDiv">
    <div class="logo_title">疫情防控练习demo</div>
  </div>
</template>

<script>
export default {
  name:"Header",
  data() {
    return {
    }
  },
  created(){
  },
  methods:{
  }

}
</script>

<style lang="scss" scoped>
.headDiv{
    z-index: 1;
    height: 3.125rem /* 50/16 */;
    background: url('../../../assets/img/top.png') center center;
    background-size: 100% 100%;
    .logo_title{
      font-size: 1.5rem /* 24/16 */;
      text-align: center;
      color: #bbe6fd;
      font-weight: bold;
      padding-top: .425rem /* 10/16 */;
    }
}
</style>