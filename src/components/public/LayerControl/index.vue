<!--
 * @Author: 阿匡
 * @Date: 2022-03-01 11:19:18
 * @LastEditTime: 2022-03-01 11:52:53
 * @LastEditors: 阿匡
 * @Description: 通用的图层控制模块
 * @FilePath: \vue2-ol-zkstudy\src\components\public\LayerControl\index.vue
 * 仅为学习使用
-->
<template>
  <div class="layer_tool">
    <div class="layer_right_img">
      <img :src="rightImg" alt="图层图标" />
    </div>
    <div class="layer_right_inner_img">
      <img :src="rightInnerImg" alt="图层内部图标" />
    </div>
    <div class="map_layer_title">图层控制</div>
    <slot name="showLayer"></slot>
  </div>
</template>

<script>
export default {
    name:'layerControl_public',
    data(){
        return{
            rightImg:require('../img/layer.png'),
            rightInnerImg:require('../img/layer_inner.png')
        }
    }
}
</script>

<style lang="scss" scope>
.layer_tool{
  position: absolute;
  top: 6.875rem /* 110/16 */;
  right: 3.25rem /* 52/16 */;
  width: 12.5rem /* 200/16 */;
  border-radius: 0.25rem /* 4/16 */;
  padding: 0 0 0.625rem /* 10/16 */ 0;
  box-sizing: border-box;
  z-index: 8;
  background: url("../img/layer_bg.png") center center;
  background-size: 100% 100%;
  height: 50%;
  .layer_right_img {
    position: absolute;
    right: -1.125rem /* 18/16 */;
    top: -3.125rem /* 50/16 */;
    z-index: 8;
  }
  .layer_right_inner_img {
    right: 0.375rem /* 6/16 */;
    position: absolute;
    top: -1.6875rem /* 27/16 */;
  }
  .map_layer_title{
    line-height: 1.25rem /* 20/16 */;
    color: #fe7b00;
    margin-left: 1.25rem /* 20/16 */;
  }
}
</style>