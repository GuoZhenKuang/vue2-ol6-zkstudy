<!--
 * @Author: your name
 * @Date: 2022-01-12 18:01:20
 * @LastEditTime: 2022-01-14 11:51:21
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue2-zkstudy\src\components\ToolBar\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="toolBar">
    <SimpleTool/>
  </div>
</template>

<script>
import SimpleTool from '@/components/ToolBar/SimpleTool'
export default {
  name:'ToolBar',
  data() {
    return {
      
    }
  },
  components:{SimpleTool}

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
    top: 50px;
    left: 50px;
    z-index: 100;
    width: 120px;
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