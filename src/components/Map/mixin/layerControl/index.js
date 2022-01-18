/*
 * @Author: 阿匡
 * @Date: 2022-01-17 17:45:14
 * @LastEditTime: 2022-01-18 17:55:56
 * @LastEditors: 阿匡
 * @Description: 控制图层
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\layerControl\index.js
 * @仅为学习使用
 */
import {Vector as VectorLayer } from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import {Stroke,Style,Fill,Text} from 'ol/style';
import Overlay from "ol/Overlay";
export default {
    data() {
        return {
            
        }
    },
    methods: {
        addGeoJson(id){
            let _this = this
            let showPosition = null
            _this.$axios.get("/GeoJson/20220105-全国疫情数据.json").then(res=>{
            //读取数据
            let readFeature = new GeoJSON().readFeatures(res.data,{
                dataProjection:"EPSG:4326",
                featureProjection:"EPSG:3857"
            })
            //定义一个矢量数据源,features从geojson中读取
            let vectorSource = new VectorSource({
                features:readFeature
            })
            // 定义一个矢量图层vectorLayer，源source为vectorSource，样式style为样式函数styleFunction
            let vectorLayer = new VectorLayer({
                id:id,
                source:vectorSource,
                style:_this.styleFunction
            })
            _this.ol2dmap.addLayer(vectorLayer)
            })
           _this.ol2dmap.on("singleclick",function(evt){
             if(_this.hightLightLayer){
               //如果有高亮图层则清除
               _this.ol2dmap.removeLayer(_this.hightLightLayer)
             }
                showPosition=evt.coordinate
                //判断是否判断是否有要素，再给要素赋值
              if(_this.ol2dmap.hasFeatureAtPixel(evt.pixel)){
                let feature = _this.ol2dmap.getFeaturesAtPixel(evt.pixel)[0]
                let featureData = _this.ol2dmap.getFeaturesAtPixel(evt.pixel)[0].getProperties()
                //设置弹窗
                _this.addPopup(showPosition,featureData)
                //高亮要素
                let hightLightStyle = new Style({
                  stroke:new Stroke({
                    color:'#33CCFF',
                    lineDash:[4],
                    width:3
                  }),
                  fill:new Fill({
                    color:'rgba(255, 255, 0, 0.1)'
                  })
                })
                _this.hightLightLayer = new VectorLayer({
                  source:new VectorSource({
                    features:[feature]
                  }),
                  zIndex:5,
                  style:hightLightStyle
                })
                _this.ol2dmap.addLayer(_this.hightLightLayer)

              }else{
                //点击其他地方的时会取消弹窗
                if(_this.popupOverlay){
                  _this.popupOverlay.setPosition(undefined);
                  _this.isShowPopup = false
                }
              }
            })
        },
        addPopup(showLocation,feature){
            let _this= this
            _this.isShowPopup = true
            //存储弹窗的dom元素
            let container = document.getElementById('popup')
            let closer = document.getElementById("popup-closer")
            let content = document.getElementById('popup-content')
            //创建弹窗Overlay对象
            _this.popupOverlay = new Overlay({
              element:container,
              autoPan:true,
              autoPanAnimation:{
                duration:250//自动平移的效果动画时间9毫秒
              }
            });
            //将弹窗添加到map地图上
            _this.ol2dmap.addOverlay(_this.popupOverlay)
            content.innerHTML=`
                        <table cellspacing="0" cellpadding="0" style="border:1px solid #d9d9d9;width:100%;font-size:12px">
                      <tr>
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                              行&nbsp;&nbsp;政&nbsp;&nbsp;区
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                              ${feature.name}
                          </th>
                      </tr>
                      <tr style="border-bottom:1px solid #d9d9d9;">
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                              新&nbsp;&nbsp;增&nbsp;&nbsp;疑&nbsp;&nbsp;似
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                              ${feature.新增疑似}
                          </th>
                      </tr>
                      <tr style="border-bottom:1px solid #d9d9d9;">
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                              累&nbsp;&nbsp;积&nbsp;&nbsp;死&nbsp;&nbsp;亡
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                              ${feature.累计死亡}
                          </th>
                      </tr>
                      <tr style="border-bottom:1px solid #d9d9d9;">
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;">
                              累&nbsp;&nbsp;积&nbsp;&nbsp;确&nbsp;&nbsp;诊
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;">
                              ${feature.累计确诊}
                          </th>
                      </tr>
                    </table>
            `
            _this.popupOverlay.setPosition(showLocation)//把 popupOverlay 显示到指定的 x,y坐标
            
            //为弹窗相应一个关闭的函数
            closer.onclick = function(){
              _this.popupOverlay.setPosition(undefined);
              closer.blur();
              return false
            }
  
          },
        //返回累计确诊人数得样式的函数
        styleFunction(feature){
            let dataProperties = feature.getProperties()
            //根据疫情人数返回不同颜色得样式
            function getColorFromPeople(val){
              if(val<10){
                return "rgb(211, 211, 159)"
              }else if(val>=10&&val<100){
                return "rgb(209, 186, 85)"
              }else if(val>=100&&val<500){
                return "rgb(201, 141, 44)"
              }else if(val>=500&&val<1000){
                return "rgb(164, 94, 29)"
              }else if(val>=1000&&val<2000){
                return "rgb(127, 53, 17)"
              }else if(val>=2000){
                return "rgb(93, 12, 8)"
              }else if(val==0){
                return "rgb(211, 211, 159)"
              }
            }
            switch(dataProperties.geometry.getType()){
              case "MultiPolygon":
              case "Polygon":
              return new Style({
                stroke: new Stroke({
                    color: "white",
                    lineDash: [4],
                    width: 1
                  }),
                  fill: new Fill({
                    color: getColorFromPeople(dataProperties.累计确诊)
                  }),
                  text:new Text({
                    font: '12px Calibri,sans-serif',
                    text:`${dataProperties.name}\n累计确诊人数${dataProperties.累计确诊.toString()}人`,
                    textAlign:"center",
                    fill: new Fill({
                        color: '#000'
                      }),
                    stroke: new Stroke({    //文字边界宽度与颜色
                    color: '#fff',
                    width: 2
                  })
                  })
                })
            }
        },
        allClear(){
            let _this = this
            let drawLayerLength = _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id=="lineAndArea").length
            if(drawLayerLength>0){
                let drawLayerArray =  _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id=="lineAndArea")
                drawLayerArray.map(item=>{
                    _this.ol2dmap.removeLayer(item)
                })
            }
            _this.ol2dmap.getOverlays().clear();
        },
        clearLayer(id){
            let _this = this
            let drawLayerLength = _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id==id).length
            if(drawLayerLength>0){
                let drawLayerArray =  _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id==id)
                drawLayerArray.map(item=>{
                    _this.ol2dmap.removeLayer(item)
                })
            }
        }
    },
}