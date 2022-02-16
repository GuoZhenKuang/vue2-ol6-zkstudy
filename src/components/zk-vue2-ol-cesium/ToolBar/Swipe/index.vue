<!--
 * @Author: 阿匡
 * @Date: 2022-01-19 20:05:45
 * @LastEditTime: 2022-02-16 15:43:01
 * @LastEditors: 阿匡
 * @Description: 卷帘
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\ToolBar\Swipe\index.vue
 * 仅为学习使用
-->
<template>
  <div class="swipe">
      <span style="padding:0 8px 0 0 ">|</span>
      <i class="el-icon-s-order" style="padding:0 3px 0 0 "/>
      <span @click="swipeLayer" class="clearClick">卷帘</span>
  </div>
</template>

<script>
import executeMixin from '@/components/zk-vue2-ol-cesium/Map/mixin/executeMixin'
export default {
    name:'swipeLayer',
    mxixins:[executeMixin],
    methods:{
        swipeLayer(){
            this.$router.push('SwipeMap')
        }
    }

}
</script>

<style lang="scss" scoped>
.swipe{
    padding: 0 10px 0 10px;
    .clearClick{
        cursor: pointer;
    }
}
</style>
