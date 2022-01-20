<!--
 * @Author: 阿匡
 * @Date: 2022-01-19 20:17:40
 * @LastEditTime: 2022-01-20 15:14:16
 * @LastEditors: 阿匡
 * @Description: 卷帘使用的地图
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\SwipeMap\index.vue
 * 仅为学习使用
-->
<template>
  <div id="swipeMap" class="swipeMap">
    <div id="swipeContainer">
      <div id="swipeDiv">
        <div class="handle"></div>
      </div>
    </div>
    <div class="exit" @click="exitSwipe"><span>退出卷帘</span></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import { transform } from "ol/proj";
import {XYZ} from "ol/source";
import { Tile as TileLayer} from "ol/layer";
export default {
    name:'swipeLayer',
    data() {
        return {
            swipeMap:null//卷帘地图
        }
    },
    mounted(){
        let map = this.initSwipeMap()
        this.initSwipeDom(map)
        this.swipeLayer(map)
    },
    methods:{
        initSwipeMap(){
            const TDTkey = 'd6990134f027336926823777b1c7b77a';
            //必应地图矢量
            let imageLayer = new TileLayer({
                id:'yxtdt',
                source: new XYZ({
                  url:'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='+ TDTkey
                }),
                name: "影像天地图"
            })
            let vecLayer = new TileLayer({
                id: 'sltdt',
                source: new XYZ({
                  url:'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk='+ TDTkey
                }),
                name: "矢量天地图"                
            })
            let map = new Map({
                target:'swipeMap',
                view:new View({
                    projection: "EPSG:3857",    //使用3857投影坐标系
                    center: transform([114,38],'EPSG:4326','EPSG:3857'),
                    zoom: 4.5                    
                }),
                layers:[
                   vecLayer,
                    imageLayer
                ]
            })
            return map
        },
        initSwipeDom(map) {
            var swipe = document.getElementById("swipeContainer");
            var obj = {};
            swipe.onmousedown = function (event) {
                var e = event || window.event;
                // 鼠标点击元素那一刻相对于元素左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
                obj.diffX = e.clientX - this.offsetLeft;
                document.onmousemove = function (event) {
                var e = event || window.event;
                var moveX = e.clientX - obj.diffX;
                if (moveX < 0) {
                    moveX = 0
                } else if (moveX > window.innerWidth - swipe.offsetWidth) {
                    moveX = window.innerWidth - swipe.offsetWidth
                }
                swipe.style.left = moveX + 'px';

                //重新渲染图层
                map.render();
                };
                document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
                }
            };
        },
        swipeLayer(map) {
            var layers = map.getLayers();
            var topLayer = layers.item(layers.getLength() - 1);
            topLayer.on('prerender', function (event) {
                var swipe = document.getElementById("swipeContainer");
                var ctx = event.context;
                //计算图层在canvas画布上需要显示的范围
                var mapSize = map.getSize();
                var height = event.context.canvas.height;
                var width = event.context.canvas.width;
                var swipeWidth = swipe.offsetLeft * width / mapSize[0];
                var tl = [swipeWidth, 0];
                var tr = [width, 0];
                var bl = [swipeWidth, height];
                var br = [width, height];

                ctx.save();
                //绘制裁剪路径
                ctx.beginPath();
                ctx.moveTo(tl[0], tl[1]);
                ctx.lineTo(bl[0], bl[1]);
                ctx.lineTo(br[0], br[1]);
                ctx.lineTo(tr[0], tr[1]);
                ctx.closePath();
                //裁剪，裁剪路径以外的部分不会绘制在canvas上下文中
                ctx.clip();
            });
            topLayer.on('postrender', function (event) {
                var ctx = event.context;
                ctx.restore();
            });
            },
        exitSwipe(){
          this.$router.push('/')
        }        
        },

}
</script>

<style lang="scss" scoped>
    .swipeMap {
      height: 100vh;
      width: 100%;
      position: relative;
    }

    #swipeContainer {
      position: absolute;
      opacity: 0.8;
      width: 0.625rem;
      height: 100%;
      /* margin: 0 auto; */
      top: 0;
      left: 50%;
      background-color: rgba(50, 50, 50, 0.75);
      cursor: col-resize;
      z-index: 2;
    }

    #swipeContainer:hover {
      opacity: 0.5;
    }

    #swipeDiv {
      border: solid 0.5px #ffffff;
      height: 100%;
      width: 0px;
      margin: 0 auto;
    }

    #swipeDiv .handle {
      width: 51px;
      height: 24px;
      margin-top: -12px;
      margin-left: -20px;
      top: 50%;
      left: 0;
      position: absolute;
      z-index: 30;
      font-family: "CalciteWebCoreIcons";
      speak: none;
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      text-indent: 0;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: black;
      color: white;
      opacity: 0.6;
    }

    *,
    *:before,
    *:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    .handle:before {
      margin: 0 18px 0 5px;
      content: "\0399\0399\0399";
      width: 20px;
      height: 24px;
      line-height: 2;
    }

    .handle:after {
      content: "\0399\0399\0399";
      width: 20px;
      height: 24px;
      line-height: 2;
    }
    .exit{
      position: absolute;
      top: 50px;
      left: 50px;
      z-index: 100;
      width: 80px;
      height: 30px;
      background-color:white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      box-shadow: 0px 4px 3px#002133;;
      :hover{
        cursor: pointer;
      }
      
    }
</style>