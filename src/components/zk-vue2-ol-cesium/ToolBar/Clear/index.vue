<!--
 * @Author: 阿匡
 * @Date: 2022-01-17 17:06:43
 * @LastEditTime: 2022-02-16 15:42:44
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
import executeMixin from '@/components/zk-vue2-ol-cesium/Map/mixin/executeMixin'
import execute3DMixin from '@/components/zk-vue2-ol-cesium/Map/mixin/execute3DMixin'
export default {
    name:'clear',
    mixins:[executeMixin,execute3DMixin],
    computed: {
        currentRoute(){
            return this.$route.name
        }
    },
    methods:{
        clear(){
            // console.log("我是清除")
            if(this.currentRoute=="Map2d"){
                // console.log("我是当前的路由状态",this.currentRoute)
                this.excuteMapMethod('allClear')
            }else if(this.currentRoute=="Map3d"){
                this.excute3DMapMethod('clearAllEntities')
            }
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