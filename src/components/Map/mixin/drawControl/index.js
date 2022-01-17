/*
 * @Author: 阿匡
 * @Date: 2022-01-14 09:45:39
 * @LastEditTime: 2022-01-17 17:44:55
 * @LastEditors: 阿匡
 * @Description: 
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\drawControl\index.js
 * @仅为学习使用
 */
import { Vector as VectorLayer } from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import {Circle,Stroke,Style,Fill} from 'ol/style';
import Draw from 'ol/interaction/Draw';
import Overlay from 'ol/Overlay';
import {LineString, Polygon} from 'ol/geom';
import {unByKey} from 'ol/Observable';
import {
    getArea,
    getLength
  } from 'ol/sphere';
export default {
    data() {
        return {
        }
    },
    methods:{
        drawMeasure(measureType){
            let _this = this
            let sketch=null//当前绘制出来的图形
            let helpTooltipElement=null//鼠标上面提示的文本要素div
            let helpTooltip=null//鼠标提示的展示的覆盖物
            let measureTooltipElement=null//测量工具提示要素div
            let measureTooltip=null//测量工具覆盖物
            let continuePolygonMsg='继续点击绘制多边形'//当用户绘制多边形的时候展示这个
            let continueLineMsg='继续点击绘制线'//当用户绘制线要素的时候展示的信息

            //设计一个资源
            _this.drawSource = new VectorSource()
            //先制作一个存放线和面的矢量图层
            let lineAndAreaVecotr = new VectorLayer({
                id:'lineAndArea',
                source:_this.drawSource,
                style:new Style({
                    fill:new Fill({
                        color:'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke:new Stroke({
                        color:'#ffcc33',
                        width:2
                    }),
                    image:new Circle({
                        radius:7,
                        fill:new Fill({
                            color:'#ffcc33'
                        })
                    })
                }),
                zIndex:16
            })
            //加载到当前地图上
            _this.ol2dmap.addLayer(lineAndAreaVecotr)
           /******* 
            * @author: 阿匡
            * @description: 鼠标移动时候触发的事件
            * @param {*} evt
            * @return {*}
            */
           function pointerMoveHandler(evt){
               if(evt.dragging){
                   return
               }
               let helpMsg='请点击开始绘制'
               if(sketch){
                   let geom =sketch.getGeometry();
                   if(geom instanceof Polygon){
                    helpMsg = continuePolygonMsg
                   }else if(geom instanceof LineString){
                    helpMsg = continueLineMsg;
                   }
               }
               helpTooltipElement.innerHTML = helpMsg;
               helpTooltip.setPosition(evt.coordinate);
               helpTooltipElement.classList.remove('hidden');
           }
           //监听鼠标在移动的时候这个
           _this.ol2dmap.on('pointermove',pointerMoveHandler)
           //监听鼠标移出事件，当鼠标移出的时候，不用显示提示信息
           _this.ol2dmap.getViewport().addEventListener('mouseout',()=>{
            helpTooltipElement.classList.add('hidden')
           })
           /******* 
            * @author: 阿匡
            * @description: 格式化获取长度的数据
            * @param {*} line线数据
            * @return {*}返回格式化后线的长度数据
            */
           function formatLength(line){
               //获取投影坐标系
               let sourceProj = _this.ol2dmap.getView().getProjection();
               //ol/sphere里有getLength()和getArea()用来测量距离和区域面积，默认的投影坐标系是EPSG:3857, 其中有个options的参数，可以设置投影坐标系
               let length = getLength(line,{
                   projection:sourceProj
               })
               let output = null
               if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                  ' ' + 'km';
              } else {
                output = (Math.round(length * 100) / 100) +
                  ' ' + 'm';
              }
              return output
           }
           /******* 
            * @author: 阿匡
            * @description: 格式化获取面积的数据
            * @param {*} polygon
            * @return {*}返回格式化后面的面积数据
            */
           function formatArea(polygon){
            //获取投影坐标系
            let sourceProj = _this.ol2dmap.getView().getProjection();
            let area = getArea(polygon, {projection: sourceProj})
            let output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
            }
            return output;               
           }
           //创建帮助提示
           function createHelpTooltip(){
               if(helpTooltipElement){
                   //先移除原来的数据先
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
               }
               helpTooltipElement = document.createElement('div');
               helpTooltipElement.className = 'ol-tooltip hidden';
               helpTooltip = new Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
              });
              _this.ol2dmap.addOverlay(helpTooltip);

           }
           //创建测量提示
           function createMeasureTooltip(){
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
              }
              measureTooltipElement = document.createElement('div');
              measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
              measureTooltip = new Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
              });
              _this.ol2dmap.addOverlay(measureTooltip); 
           }

           //开始加与地图的交互操作
           function addInteraction(){
            let listener=null//监听绘制要素
               let draw = new Draw({
                   source:_this.drawSource,
                   type:measureType,
                   style:new Style({
                    fill: new Fill({
                      color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                      color: 'rgba(0, 0, 0, 0.5)',
                      lineDash: [10, 10],
                      width: 2
                    }),
                    image: new Circle({
                      radius: 5,
                      stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                      }),
                      fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                      })
                    })
                  })
               })
               _this.ol2dmap.addInteraction(draw)
               //创建提示要素
               createMeasureTooltip();
               createHelpTooltip();
               //绘制开始
               draw.on('drawstart',(evt)=>{
                   //设置图形
                   sketch = evt.feature
                   //测量要素展示信息的位置
                   let tooltipCoord = evt.coordinate
                   //监听要素变化
                   listener = sketch.getGeometry().on('change',(evt)=>{
                       let geom = evt.target;
                       let output = null
                       if(geom instanceof Polygon){
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                       } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                      }
                      measureTooltipElement.innerHTML = output;
                      measureTooltip.setPosition(tooltipCoord);                      
                   })
               },_this)
               //绘制结束
               draw.on('drawend',()=>{
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static measureNum';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                //取消事件监听
                unByKey(listener);
                _this.ol2dmap.un('pointermove', pointerMoveHandler);
                _this.ol2dmap.removeInteraction(draw);
                helpTooltipElement.classList.add('hidden');
                //帮助提示的数据清空
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
               },_this)

           }
           addInteraction()
        }
    }
}