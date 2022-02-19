<!--
 * @Author: 阿匡
 * @Date: 2022-02-18 10:28:45
 * @LastEditTime: 2022-02-19 15:01:31
 * @LastEditors: 阿匡
 * @Description: 右侧主要展示图层控制工具栏及相关按钮
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\RightBox\index.vue
 * 仅为学习使用
-->
<template>
  <div class="rightBox">
      <!-- 右侧图层控制展示 -->
      <LayerControl/>
      <!-- 右侧工具栏展示 -->
      <ToolBar/>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import LayerControl from './LayerControl'
export default {
    name:'rightBox',
    components:{LayerControl,ToolBar},
    data() {
        return {
            
        }
    },

}
</script>

<style lang="scss" scope>
.rightBox{
    z-index: 8;
}
</style>