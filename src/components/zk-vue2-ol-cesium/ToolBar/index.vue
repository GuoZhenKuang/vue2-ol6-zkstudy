<!--
 * @Author: your name
 * @Date: 2022-01-12 18:01:20
 * @LastEditTime: 2022-02-16 15:43:08
 * @LastEditors: 阿匡
 * @Description: 工具栏
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\ToolBar\index.vue
-->
<template>
  <div class="toolBar">
    <LayerControl/>
    <template v-if="$route.name=='Map2d'">
    <SimpleTool/>
    <Swipe/>
    </template>
      <Clear/>
  </div>
</template>

<script>
import LayerControl from '@/components/zk-vue2-ol-cesium/ToolBar/LayerControl'
import Swipe from '@/components/zk-vue2-ol-cesium/ToolBar/Swipe'
import Clear from '@/components/zk-vue2-ol-cesium/ToolBar/Clear'
import SimpleTool from '@/components/zk-vue2-ol-cesium/ToolBar/SimpleTool'
export default {
  name:'ToolBar',
  data() {
    return {
      activedRoute:''
    }
  },
  components:{SimpleTool,Clear,LayerControl,Swipe},

}
</script>

<style lang="scss" scoped>
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