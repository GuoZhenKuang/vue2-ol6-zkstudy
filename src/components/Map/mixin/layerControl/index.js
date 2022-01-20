/*
 * @Author: 阿匡
 * @Date: 2022-01-17 17:45:14
 * @LastEditTime: 2022-01-20 17:56:07
 * @LastEditors: 阿匡
 * @Description: 控制图层
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\layerControl\index.js
 * @仅为学习使用
 */
import {Vector as VectorLayer } from "ol/layer";
import {Vector as VectorSource,XYZ,WMTS } from "ol/source";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import GeoJSON from "ol/format/GeoJSON";
import {Circle as CircleStyle,Stroke,Style,Fill,Text} from 'ol/style';
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import {get as getProjection} from 'ol/proj.js';
import {getWidth,getTopLeft} from 'ol/extent.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//esrijson转换成geojson
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
// import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
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
           _this.ol2dmap.on("click",function(evt){
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
                  _this.isShowPopup = false
                  _this.popupOverlay.setPosition(undefined);
                  
                }
              }
            })
        },
        addXYZ(id){
          let _this = this
          let xyzSourceLayer = new TileLayer({
            id:id,
            source:new XYZ({
              url:"http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d6990134f027336926823777b1c7b77a"
            })
          })
          _this.ol2dmap.addLayer(xyzSourceLayer)
        },
        addWMTX(id){
          let _this =this
          let projection = getProjection("EPSG:3857")
          let projectionExtent = projection.getExtent();
          let size = getWidth(projectionExtent) / 256;
          let resolutions = new Array(18);
          let matrixIds = new Array(18);
          for (let z = 1; z < 19; ++z) {
            // generate resolutions and matrixIds arrays for this WMTS
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
          }
          let WMTSLayer = new TileLayer({
            id:id,
            source:new WMTS({
              url:"http://t0.tianditu.gov.cn/cia_w/wmts?tk=d6990134f027336926823777b1c7b77a",
              layer:"cia",
              matrixSet:"w",
              format:"tiles",
              style:"default",
              projection:projection,
              tileGrid:new WMTSTileGrid({
                origin: getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds,
              }),
              wrapX:true
            })
          })
          _this.ol2dmap.addLayer(WMTSLayer)
        },
        addCluster(id){
          //针对数据先进行预处理先
          let _this = this
          // let showPosition = null
          _this.$axios.get('/EsriJson/Point.json').then(res=>{
            // console.log("我是得到的Esrijson的数据",res)

            // 方法一
            if(res.data.features.length>0){
              let GeoJsondata ={
                crs:{
                  type:'name',
                  properties:'EPSG:3857'
                },
                features:[],
                type:'FeatureCollection'
              }
              for(let i=0;i<res.data.features.length;i++){
                let geojson = arcgisToGeoJSON(res.data.features[i])
                GeoJsondata.features.push(geojson)
              }
            // 转换后，把转换后加载的数据渲染到界面上
            let readFeatures = new GeoJSON().readFeatures(GeoJsondata,{
              featureProjection:"EPSG:3857"
            })
              // 定义一个矢量数据源,features从geojson中读取
              let clusterVectorSource = new VectorSource({
                features:readFeatures
            })
            let clusterVectorLayer = new VectorLayer({
              id:id,
              source:clusterVectorSource,
              style:new Style({
                image: new CircleStyle({
                  radius: 5,
                  stroke: new Stroke({
                    color: '#fff'
                  }),
                  fill: new Fill({
                    color: '#3399CC'
                  })
                })
              })
            })
            _this.ol2dmap.addLayer(clusterVectorLayer)
            }
            //#region 方法二（遍历生成feature）
            //方法二（遍历生成feature）
            // let num = res.data.features.length
            // if(num>0){
            //   //生成存放features的数组
            //   let features = new Array(num)
            //   for(let i=0;i<num;i++){
            //     let geo = res.data.features[i].geometry
            //     let coordinate = [geo.x,geo.y]
            //     features[i] = new Feature({
            //       geometry:new Point(coordinate),
            //       region:res.data.features[i].attributes["region"],
            //       name: res.data.features[i].attributes["company_na"]
            //     })
            //   }
            //   let clusterVectorSource = new VectorSource({
            //     features:features
            // })
            //   let clusterVectorLayer = new VectorLayer({
            //     id:id,
            //     source:clusterVectorSource,
            //     style:new Style({
            //       image: new CircleStyle({
            //         radius: 5,
            //         stroke: new Stroke({
            //           color: '#fff'
            //         }),
            //         fill: new Fill({
            //           color: '#3399CC'
            //         })
            //       })
            //     })
            //   })
            //   _this.ol2dmap.addLayer(clusterVectorLayer)
            // }
            //#endregion

          })
        },
        addPopup(showLocation,feature){
            let _this= this
            if(feature.name){
            _this.isShowPopup = true
            //存储弹窗的dom元素
            let container = document.getElementById('popup')
            let closer = document.getElementById("popup-closer")
            let content = document.getElementById('popup-content')
            //创建弹窗Overlay对象
            _this.popupOverlay = new Overlay({
              id:'popup',
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
            //清空除了底图以外的图层,先找到除底图以外的图层
            let anOtherLayers = _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id!="baseMap")
            anOtherLayers.map(item=>{
              //清空除底图以外的所有图层
              _this.ol2dmap.removeLayer(item)
            })
            //清空所有的覆盖物
            _this.ol2dmap.getOverlays().clear();
            _this.$store.commit('clickAllClear',Math.random())
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