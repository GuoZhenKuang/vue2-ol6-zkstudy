<!--
 * @Author: 阿匡
 * @Date: 2022-01-18 17:05:40
 * @LastEditTime: 2022-01-24 10:42:46
 * @LastEditors: 阿匡
 * @Description: 图层控制功能
 * @FilePath: \vue2-ol-zkstudy\src\components\ToolBar\LayerControl\index.vue
 * 仅为学习使用
-->

<template>
    <div class="simpleTool" @mouseover="onCurrentToolEnter">
    <i class="el-icon-s-unfold" style="padding:0 3px 0 0 "/>
    <span class="show-tool">
        <span class="useTool">图层控制</span>
        <i class="el-icon-arrow-up" v-show="showTool"/>
        <i class="el-icon-arrow-down" v-show="!showTool"/>       
    </span>
    <div class="showListTool" v-show="showTool"  @mouseleave="onCurrentToolLeave">
        <ul>
            <li
            v-for="toolItem in optionTool"
            :key="toolItem.id"
            >
            <el-checkbox @change="onToolClick(toolItem)" :label="toolItem.name" v-model="toolItem.checked"></el-checkbox>
            <!-- <span></span> -->
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import executeMixin from '@/components/Map/mixin/executeMixin'
export default {
    name:'layerControl',
    mixins:[executeMixin],
    data() {
        return {
            showTool:false,
            optionTool:[
                {
                    key:'addGeojson',
                    id:'yqData',
                    name:'GeoJson',
                    checked:false
                },
                {
                    key:'addXYZ',
                    id:'tdtData',
                    name:'影像',
                    checked:false
                },{
                    key:'addWMTS',
                    id:'zjData',
                    name:'注记',
                    checked:false 
                },{
                    key:'addCluster',
                    id:'addesriClusterPoint',
                    name:'聚合图',
                    checked:false
                },{
                    key:'addHeatmap',
                    id:'addesriHeatPoint',
                    name:'热力图',
                    checked:false
                }
            ]
        }
    },
    computed:{
        allClear(){
            return this.$store.state.allClear
        }
    },
    watch:{
        allClear(){
            //监听用户是否点击了全部清除，如果全部清除则遍历清除所有的勾选按钮
            this.optionTool.map(item=>{
                item.checked=false
            })
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
            if(item.key=="addGeojson"&& item.checked==true){
                this.excuteMapMethod('addGeoJson',item.id)
            }else if(item.key=="addXYZ"&& item.checked==true){
                this.excuteMapMethod('addXYZ',item.id)
            }else if(item.key=="addWMTS"&& item.checked==true){
                this.excuteMapMethod('addWMTX',item.id)  
            }else if(item.key=="addCluster"&& item.checked==true){
                this.excuteMapMethod('addCluster',item.id)  
            }else if(item.key=="addHeatmap"&& item.checked==true){
                this.excuteMapMethod('addHeatmap',item.id)
            }
            else if(item.checked==false){
                this.excuteMapMethod('clearLayer',item.id)
            }            
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
  left: 0;
  background-color: white;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0px 5px 5px 5px;
  li{
      padding: 10px 0 10px 0;
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