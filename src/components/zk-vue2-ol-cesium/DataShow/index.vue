<!--
 * @Author: 阿匡
 * @Date: 2022-02-08 15:26:26
 * @LastEditTime: 2022-02-18 10:44:17
 * @LastEditors: 阿匡
 * @Description: 大屏左右侧展示数据及设置相应的遮罩
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\index.vue
 * 仅为学习使用
-->
<template>
  <div>
    <!-- 背景遮罩 -->
        <div class="map_left_bg"></div>
        <div class="map_top_bg"></div>
        <div class="map_right_bg"></div>
        <div class="map_bottom_bg"></div>
        <!-- 左侧数据展示栏 -->
        <LeftBox/>
      <!-- 放置存放地图的插槽 -->
      <slot name="showMap"></slot>
      <RightBox/>
  </div>
</template>

<script>
import RightBox from './RightBox'
import LeftBox from './LeftBox'
export default {
  name:'dataShowBackGround',
  components:{
      LeftBox,
      RightBox
  },
  data() {
    return {
      
    }
  },

}
</script>

<style lang="scss" scoped>
.map_left_bg{
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0;
    width: 28%;
    background: url('../../../assets/img/map_left_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}
.map_top_bg{
      position: absolute;
    top: .625rem /* 10/16 */;
    height: 10%;
    left: 0;
    right: 0;
    background: url('../../../assets/img/map_top_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}
.map_right_bg{
    position: absolute;
    top: 10%;
    bottom: 10%;
    right: 0;
    width: 20%;
    background: url('../../../assets/img/map_right_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}
.map_bottom_bg{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10%;
    background: url('../../../assets/img/map_bottom_bg.png') center center;
    background-size: 100% 100%;
    z-index: -6;
}
</style>
