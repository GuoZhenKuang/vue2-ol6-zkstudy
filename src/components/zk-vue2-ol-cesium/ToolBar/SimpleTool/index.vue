<!--
 * @Author: 阿匡
 * @Date: 2022-01-13 11:36:14
 * @LastEditTime: 2022-03-01 14:56:13
 * @LastEditors: 阿匡
 * @Description: 
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\ToolBar\SimpleTool\index.vue
 * 仅为学习使用
-->
<template>
  <div class="simpleTool" @mouseover="onCurrentToolEnter" >
    <i class="el-icon-s-tools" style="padding:0 3px 0 0 "/>
    <span class="show-tool">
        <span class="useTool">测量工具</span>
        <i class="el-icon-arrow-up" v-show="showTool"/>
        <i class="el-icon-arrow-down" v-show="!showTool"/>       
    </span>
    <div class="showListTool" v-show="showTool"  @mouseleave="onCurrentToolLeave">
        <ul>
            <li
            v-for="toolItem in optionTool"
            :key="toolItem.key"
            @click="onToolClick(toolItem)"
            >
            <span>{{toolItem.name}}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import executeMixin from '@/components/olDemos/Map2D/mixin/executeMixin'
export default {
    name:'simpleTool',
    mixins:[executeMixin],
    data() {
        return {
            showTool:false,
            optionTool:[
                {
                    key:'LineString',
                    name:'测距'
                },
                {
                    key:'Polygon',
                    name:'测面'
                }
            ]
        }
    },
    methods:{
        onCurrentToolEnter(){
            //移进来的时候，展示工具栏
            this.showTool = true
        },
        onCurrentToolLeave(){
            this.showTool = false
        },
        onToolClick(item){
            // console.log("我是点击到的工具",item)
            this.excuteMapMethod('drawMeasure',item.key)
            
        }
    }

}
</script>

<style lang="scss" scoped>
.simpleTool{
    padding: 0 0 0 8px;
}
.showListTool{
    // max-width: 80px;
  // width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  position: absolute;
  z-index: 20;
  // left: 25px;
  top: 43px;
//   left: 0;
  background-color: white;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0px 5px 5px 5px;
  li{
      padding: 0 0 10px 0;
      cursor: pointer;
      //取出li前面的符号
      list-style: none;
      span{
          &:hover{
              border-bottom: 1px solid #009fcd;
          }
      }
  }   
}
</style>