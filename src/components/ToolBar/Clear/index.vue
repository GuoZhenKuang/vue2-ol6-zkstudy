<!--
 * @Author: 阿匡
 * @Date: 2022-01-17 17:06:43
 * @LastEditTime: 2022-01-17 17:50:16
 * @LastEditors: 阿匡
 * @Description: 清除功能
 * @FilePath: \vue2-ol-zkstudy\src\components\ToolBar\Clear\index.vue
 * 仅为学习使用
-->
<template>
  <div class="clear">
      <span style="padding:0 8px 0 0 ">|</span>
      <i class="el-icon-delete-solid" style="padding:0 3px 0 0 "/>
      <span @click="clear" class="clearClick">清除</span>
  </div>
</template>

<script>
import executeMixin from '@/components/Map/mixin/executeMixin'
export default {
    name:'clear',
    mixins:[executeMixin],
    methods:{
        clear(){
            // console.log("我是清除")
            this.excuteMapMethod('clear')
        }
    }
}
</script>

<style lang="scss" scoped>
.clear{
    padding: 0 10px 0 10px;
    .clearClick{
        cursor: pointer;
    }
}
</style>