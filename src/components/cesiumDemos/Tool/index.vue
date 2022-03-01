<!--
 * @Author: 阿匡
 * @Date: 2022-03-01 14:49:34
 * @LastEditTime: 2022-03-01 14:58:55
 * @LastEditors: 阿匡
 * @Description: 三维视图的工具栏
 * @FilePath: \vue2-ol-zkstudy\src\components\cesiumDemos\Tool\index.vue
 * 仅为学习使用
-->
<template>
  <div class="toolBar">
      <Measure/>
  </div>
</template>

<script>
import Measure from './Measure'
export default {
    name:'toolBar3d',
    components:{Measure}
}
</script>

<style>
  .toolBar{
    position: absolute;
    top: 80px;
    left: 25px;
    z-index: 100;
    min-width: 140px;
    box-shadow:0 7px 5px -5px #d0d0d0;
    color: #7e7e7e;
    border: 1px solid #e3e3e3;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
</style>