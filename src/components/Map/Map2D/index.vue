<!--
 * @Author: 阿匡
 * @Date: 2022-01-05 22:11:57
 * @LastEditTime: 2022-01-27 15:02:01
 * @LastEditors: 阿匡
 * @Description: 原始地图
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\Map2D\index.vue
 * 仅为学习使用
-->
<template>
<div class="height100">
<ToolBar/>
  <div id="map" class="map">
      <div id="popup" class="ol-popup" v-show="isShowPopup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content" class="popup-content"></div>
      </div>
  </div>
</div>
</template>

<script>
import { Map, View } from "ol";
import { transform } from "ol/proj";
import {TileArcGISRest} from "ol/source";
import { Tile as TileLayer} from "ol/layer";
//引入过渡的混合
import subscribeMixin from '@/components/Map/mixin/subscribeMixin'
import executeMixin from '@/components/Map/mixin/executeMixin'
//引入调用工具的方法
import drawControl from '@/components/Map/mixin/drawControl'
import ToolBar from '@/components/ToolBar'
//控制图层的方法
import layerControl from'@/components/Map/mixin/layerControl'
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';

export default {
    name:'initMap',
    mixins:[
      subscribeMixin,
      executeMixin,
      drawControl,
      layerControl
    ],
    components:{
      ToolBar
    },
    data() {
        return {
            ol2dmap:null,//ol二维地图的数据
            popupOverlay:null,//专门用来弹窗的（覆盖物）的数据
            hightLightLayer:null,//高亮图层的数据
            isShowPopup:false,//控制弹窗是否显示
        }
    },
    activated(){
      //当前路由组件被激活时候发生的事件
      let data2D = [
                {
                    is2dMap:true,
                    key:'addGeojson',
                    id:'yqData',
                    name:'GeoJson',
                    checked:false
                },
                {
                    is2dMap:true,
                    key:'addXYZ',
                    id:'tdtData',
                    name:'影像',
                    checked:false
                },{
                    is2dMap:true,
                    key:'addWMTS',
                    id:'zjData',
                    name:'注记',
                    checked:false 
                },{
                    is2dMap:true,
                    key:'addCluster',
                    id:'addesriClusterPoint',
                    name:'聚合图',
                    checked:false
                },{
                    is2dMap:true,
                    key:'addHeatmap',
                    id:'addesriHeatPoint',
                    name:'热力图',
                    checked:false
                }
            ]
      this.$store.commit('setLayerData',data2D)
    },
    methods:{
        initMap(){
                const mapUrl = "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
                this.ol2dmap = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        id:'baseMap',
                        source:new TileArcGISRest({
                            url:mapUrl
                        })
                    }),            
                ],
                view: new View({
                    projection: "EPSG:3857",    //使用3857投影坐标系
                    center: transform([114,38],'EPSG:4326','EPSG:3857'),
                    zoom: 4.5
                })
                });
                //禁用鼠标双击缩放功能
                const doubleClickInteraction = this.ol2dmap.getInteractions().getArray().find(interaction=>{
                  return interaction instanceof DoubleClickZoom
                })
                this.ol2dmap.removeInteraction(doubleClickInteraction)
        },
    },
    mounted() {
      this.initMap()
    },
}
</script>

<style lang="scss" scope>
#map{height:100%;}
/*隐藏ol的一些自带元素*/
</style>