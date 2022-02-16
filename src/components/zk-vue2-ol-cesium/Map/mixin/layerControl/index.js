/*
 * @Author: 阿匡
 * @Date: 2022-01-17 17:45:14
 * @LastEditTime: 2022-01-24 14:40:38
 * @LastEditors: 阿匡
 * @Description: 控制图层
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\layerControl\index.js
 * @仅为学习使用
 */
import {Vector as VectorLayer,Heatmap as HeatmapLayer} from "ol/layer";
import {Vector as VectorSource,XYZ,WMTS, Cluster } from "ol/source";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import GeoJSON from "ol/format/GeoJSON";
import {Circle as CircleStyle,Stroke,Style,Fill,Text} from 'ol/style';
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import {get as getProjection} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {createEmpty,extend,getWidth,getHeight,getTopLeft} from 'ol/extent';
//esrijson转换成geojson
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
// import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        /******* 
         * @author: 阿匡
         * @description: 增加自己读取GeoJSON的数据（该GeoJSON的类型是FeatureJSON）
         * @param {*} id-相应的图层id
         * @return {*}
         */
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
                let feature = _this.ol2dmap.forEachFeatureAtPixel(evt.pixel,item=>{
                  return item
                })
                if(feature){
                //设置弹窗
                _this.addPopup(showPosition,feature)
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
        /******* 
         * @author: 阿匡
         * @description: 增加XYZ类型的图层数据
         * @param {*} id-相应的图层id
         * @return {*}
         */
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
        /******* 
         * @author: 阿匡
         * @description: 增加wmts类型的图层数据
         * @param {*} id-相应的图层id
         * @return {*}
         */
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
        /******* 
         * @author: 阿匡
         * @description: 增加聚合图
         * @param {*} id-该聚合图相应的图层id
         * @return {*}
         */
        addCluster(id){
          let maxFeatureCount = 0
          //聚合的图层
          let clusterLayer = null
          //针对数据先进行预处理先
          let _this = this
          let showPosition = null
          _this.$axios.get('/EsriJson/Point.json').then(res=>{
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
            //设置聚合图的样式
            function styleFunction(feature,resolution){
              //在这个分辨率下做的聚合，所以每次feature.get('features')拿到的数据都不同的
              let style = null
              //计算每个聚合点的半径大小
              let currentResolution = null
              if(resolution!=currentResolution){
                //计算聚合的半径
                calculateClusterInfo(resolution)
                currentResolution= resolution
              }
              let size = feature.get('features').length//每个点当前的聚合数
              if(size>1){
                //设置聚合效果样式
                style = new Style({
                  image:new CircleStyle({
                    radius:feature.get('radius'),//获取聚合的半径大小，聚合点数越多，半径就越大
                    fill:new Fill({
                      color:[255, 153, 0, Math.min(0.8, 0.4 + (size / maxFeatureCount))]
                    })
                  }),
                  text:new Text({
                    textAlign:"center",
                    font: '12px Calibri,sans-serif',
                    text:size.toString(),
                    fill:new Fill({
                      color: '#fff'
                     }),   
                  stroke:new Stroke({
                    color: 'rgba(0, 0, 0, 0.6)',
                    width: 3
                    }),
                  })
                })
              }else{
                //设置没有聚合效果的原始样式
                style =new Style({
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
              }
              return style
              
            }
            //计算每个聚合点的半径大小
            function calculateClusterInfo(resolution){
              maxFeatureCount = 0
              let feature = null
              let radius = null
              //得到当前图层所有的要素（注意这些features是已经聚合过的了，是在当前分辨率下得到聚合的要素）
              let features = clusterLayer.getSource().getFeatures()
              for(let i=0;i<features.length;i++){
                feature = features[i]
                let originalFeatures = feature.get('features')
                //创建一个空区
                let extent = createEmpty()
                let oriFeaturesLength = originalFeatures.length
                for(let j=0;j<oriFeaturesLength;j++){
                  //修改一个区以包括另一个区
                  extend(extent,originalFeatures[j].getGeometry().getExtent())
                }
                maxFeatureCount = Math.max(maxFeatureCount,oriFeaturesLength)
                radius = 0.25*(getWidth(extent)+getHeight(extent)) / resolution
                //修改该要素的半径
                feature.set('radius',radius)
              }

            }

            //加载聚合图
            clusterLayer = new VectorLayer({
              id:id,
              //设置矢量图层的数据源为聚合类型
              source:new Cluster({
                distance:40,//聚合的类型
                //设置聚合数据的来源
                source:clusterVectorSource
              }),
              style:styleFunction//聚合的样式
            })
            _this.ol2dmap.addLayer(clusterLayer)
            //缩放到相应的范围
            _this.ol2dmap.getView().setCenter([12637973.949997703, 2657176.0178779177])
            _this.ol2dmap.getView().setZoom(10)

            //鼠标单击显示弹窗
            _this.ol2dmap.on('click',evt=>{
              showPosition=evt.coordinate
              if(evt.dragging){
                //如果鼠标不是在正常点击则，取消
                return
              }
              let feature = _this.ol2dmap.forEachFeatureAtPixel(evt.pixel,item=>{
                return item
              })
              if(feature){
                //说明此时是有数据的
                _this.addPopup(showPosition,feature)
              }else{
                //说明拿到不数据，隐藏气泡窗口
                if(_this.popupOverlay){
                  _this.isShowPopup = false
                  _this.popupOverlay.setPosition(undefined);
                  
                }

              }

            })
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
        /******* 
         * @author: 阿匡
         * @description: 热力图加载
         * @param {*} id-相应的图层id
         * @return {*}
         */
        addHeatmap(id){
          let _this = this
          _this.$axios.get('/EsriJson/HeatMapPoint.json').then(res=>{
            // console.log("我是热力图的点数据",res)
            let allData = res.data//返回所有的esri的点数据
            if(allData.features.length>0){
              let storeFeatures = new Array(allData.features.length)
              for(let i=0;i<allData.features.length;i++){
                //相应的坐标数据
                let geo = allData.features[i].geometry
                //遍历循环生成相应的feature（通过ol中的Feature类去循环生成）-即只需要使用到数据中的点的位置即可
                storeFeatures[i] = new Feature({
                  geometry: new Point([geo.x,geo.y]),
                  projectNmae:allData.features[i].attributes["项目名称"],
                  weight:allData.features[i].attributes["水位高程"]//权重
                })
              }
              //得到上方的数据后，开始加载相应的热力图
              let heatMapVectorLayer = new HeatmapLayer({
                source:new VectorSource({
                  //热力图的数据来源
                  features:storeFeatures
                }),
                id:id,
                // extent--渲染范围，可选值，默认渲染全部
                blur:15,//模糊大小（单位是像素）
                radius:18,//半径大小默认为8（像素为单位）
                gradient:['#00f','#0ff','#0f0','#ff0','#f00'],//热力图的颜色渐变
                weight:weightFunction//设置权重，值在0-1之间
              })
              //获得数据相应的权重比例
               function weightFunction(feature){
                 let weight = feature.get('weight')
                 weight = parseFloat(weight)/10
                 return weight
               }
               //把图层加到界面上
               _this.ol2dmap.addLayer(heatMapVectorLayer)
               //缩放到相应的范围
               _this.ol2dmap.getView().fit(heatMapVectorLayer.getSource().getExtent(),_this.ol2dmap.getSize())
               //监听缩放事件,根据地图缩放级别设置热力图渲染半径
               _this.ol2dmap.getView().on('change:resolution',()=>{
                 let radius = 2
                 switch(Math.floor(_this.ol2dmap.getView().getZoom())){
                   case 9:
                     radius = 8
                     break
                   case 10:
                     radius = 9
                     break
                     case 11:
                      radius = 10
                      break
                    case 12:
                      radius = 11
                      break
                    case 13:
                      radius = 12
                      break
                    case 14:
                      radius = 13
                      break
                    case 15:
                      radius = 14
                      break
                    case 16:
                      radius = 15
                      break
                    default:
                      if(_this.ol2dmap.getView().getZoom()>16){
                        radius=15
                      }else{
                        radius=8
                      }                  
                 }
                 heatMapVectorLayer.setRadius(radius)
               })
            }
          })
        },
        /******* 
         * @author: 阿匡
         * @description: 显示气泡弹窗
         * @param {*} showLocation-弹窗的位置
         * @param {*} feature-相应的要素数据
         * @return {*}
         */
        addPopup(showLocation,feature){
            let _this= this
            //先清空，否则会生成很多个
            if(_this.popupOverlay){
              // _this.ol2dmap.removeOverlay(_this.popupOverlay)
              _this.popupOverlay=null
            }
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
            if(Object.keys(feature.values_).includes('name')){
              //feature.name这堆数据是针对geojson使用得
            //将弹窗添加到map地图上
            _this.ol2dmap.addOverlay(_this.popupOverlay)
            content.innerHTML=`
                        <table cellspacing="0" cellpadding="0" style="border:1px solid #d9d9d9;width:100%;font-size:12px">
                      <tr>
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                              行&nbsp;&nbsp;政&nbsp;&nbsp;区
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                              ${feature.values_.name}
                          </th>
                      </tr>
                      <tr style="border-bottom:1px solid #d9d9d9;">
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                              新&nbsp;&nbsp;增&nbsp;&nbsp;疑&nbsp;&nbsp;似
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                              ${feature.values_.新增疑似}
                          </th>
                      </tr>
                      <tr style="border-bottom:1px solid #d9d9d9;">
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                              累&nbsp;&nbsp;积&nbsp;&nbsp;死&nbsp;&nbsp;亡
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                              ${feature.values_.累计死亡}
                          </th>
                      </tr>
                      <tr style="border-bottom:1px solid #d9d9d9;">
                          <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;">
                              累&nbsp;&nbsp;积&nbsp;&nbsp;确&nbsp;&nbsp;诊
                          </th>&nbsp;&nbsp;
                          <th style="width:75%;padding:5px;">
                              ${feature.values_.累计确诊}
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
            if(Object.keys(feature.values_).includes('features')&&feature.values_.features.length != 1){
              //说明当前点击得是聚合的要素(整个聚合)
              _this.ol2dmap.addOverlay(_this.popupOverlay)
              content.innerHTML= `当前聚合有${feature.values_.features.length}个公司`
              _this.popupOverlay.setPosition(showLocation)//把 popupOverlay 显示到指定的 x,y坐标
              //为弹窗相应一个关闭的函数
              closer.onclick = function(){
                _this.popupOverlay.setPosition(undefined);
                closer.blur();
                return false
              }
            }else if(Object.keys(feature.values_).includes('features')&&feature.values_.features.length == 1){
              //只有一个要素的时候
              _this.ol2dmap.addOverlay(_this.popupOverlay)
              let popupData = feature.values_.features[0].getProperties()
              content.innerHTML= `
              <table cellspacing="0" cellpadding="0" style="border:1px solid #d9d9d9;width:100%;font-size:12px">
            <tr>
                <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                    责&nbsp;&nbsp;任&nbsp;&nbsp;人
                </th>&nbsp;&nbsp;
                <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                    ${popupData.contacts}
                </th>
            </tr>
            <tr style="border-bottom:1px solid #d9d9d9;">
                <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                    行&nbsp;&nbsp;政&nbsp;&nbsp;区
                </th>&nbsp;&nbsp;
                <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                    ${popupData.region}
                </th>
            </tr>
            <tr style="border-bottom:1px solid #d9d9d9;">
                <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                    地&nbsp;&nbsp;址
                </th>&nbsp;&nbsp;
                <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                    ${popupData.company_ad}
                </th>
            </tr>
            <tr style="border-bottom:1px solid #d9d9d9;">
            <th style="width:25%;text-align:right;padding:5px;border-right:1px solid #d9d9d9;color:#1089ff;border-bottom:1px solid #d9d9d9;">
                公&nbsp;&nbsp;司&nbsp;&nbsp;名&nbsp;&nbsp;称
            </th>&nbsp;&nbsp;
            <th style="width:75%;padding:5px;border-bottom:1px solid #d9d9d9;">
                ${popupData.company_na}
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
        /******* 
         * @author: 阿匡
         * @description: 返回疫情统计相应的style，geojson专用
         * @param {*} feature
         * @return {*}
         */
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
        /******* 
         * @author: 阿匡
         * @description: 清除所有的图层及覆盖物
         * @param {*}
         * @return {*}
         */
        allClear(){
            let _this = this
            //清空除了底图以外的图层,先找到除底图以外的图层
            let anOtherLayers = _this.ol2dmap.getLayers().getArray().filter(item=>item.getProperties().id!="baseMap")
            anOtherLayers.map(item=>{
              //清空除底图以外的所有图层
              _this.ol2dmap.removeLayer(item)
            })
            //清空所有的覆盖物
            //Todo:清一个就少一个
            let olLyrs = _this.ol2dmap.getOverlays().getArray();
            olLyrs.map(item=>{
                item.setPosition(undefined)
            })
            _this.$store.commit('clickAllClear',Math.random())
        },
        /******* 
         * @author: 阿匡
         * @description: 关闭某一个特定的图层
         * @param {*} id-清理图层的id
         * @return {*}
         */
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