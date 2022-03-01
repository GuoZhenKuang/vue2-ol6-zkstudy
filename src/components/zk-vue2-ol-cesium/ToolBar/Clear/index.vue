<!--
 * @Author: 阿匡
 * @Date: 2022-01-17 17:06:43
 * @LastEditTime: 2022-03-01 14:55:41
 * @LastEditors: 阿匡
 * @Description: 清除功能
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\ToolBar\Clear\index.vue
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
import executeMixin from '@/components/olDemos/Map2D/mixin/executeMixin'
export default {
    name:'clear',
    mixins:[executeMixin],
    methods:{
        clear(){
            this.excuteMapMethod("allClear");
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