<!--
 * @Author: your name
 * @Date: 2022-01-12 18:01:20
 * @LastEditTime: 2022-01-17 17:26:23
 * @LastEditors: 阿匡
 * @Description: 工具栏
 * @FilePath: \vue2-ol-zkstudy\src\components\ToolBar\index.vue
-->
<template>
  <div class="toolBar">
    <SimpleTool/>
    <Clear/>
  </div>
</template>

<script>
import Clear from '@/components/ToolBar/Clear'
import SimpleTool from '@/components/ToolBar/SimpleTool'
export default {
  name:'ToolBar',
  data() {
    return {
      
    }
  },
  components:{SimpleTool,Clear}

}
</script>

<style lang="scss" scoped>
/* .tool{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:100%
} */
  .toolBar{
    position: absolute;
    top: 127px;
    left: 144px;
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