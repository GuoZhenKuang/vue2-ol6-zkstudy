<!--
 * @Author: 阿匡
 * @Date: 2022-01-16 11:09:09
 * @LastEditTime: 2022-01-26 18:00:44
 * @LastEditors: 阿匡
 * @Description: Cesium学习
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\Map3D\index.vue
 * 仅为学习使用
-->
<template>
  <div class="box3d">
    <ToolBar/>
    <div id="cesiumContainer" class="cesiumView"></div>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar'
//引入过渡的混合
import subscribeMixin from '@/components/Map/mixin/subscribeMixin'
import executeMixin from '@/components/Map/mixin/executeMixin'
//控制图层的方法
import layer3dControl from'@/components/Map/mixin/layer3DControl'
export default {
  name:'cesiumMap',
  mixins:[subscribeMixin,executeMixin,layer3dControl],
  data(){
    return{
      viewer:null,//三维视图窗体
      //模拟点的数据
      simulatePointData:[
        {
          id:'01',
          x:'113.27599',
          y:'23.11705',
          psName:'公司1'
        },{
          id:'02',
          x:'113.37599',
          y:'23.12705',
          psName:'公司2'
        },{
          id:'03',
          x:'113.17599',
          y:'23.22705',
          psName:'公司3'
        }
      ]
      
    }
  },
  components:{
      ToolBar
    },
    activated(){
      let data3DLayer = [
        {
          is2dMap:false,
          key:'addSimulationPoint',
          id:'simulationPoint',
          name:'模拟点',
          checked:false
        },{
          is2dMap:false,
          key:'addSimulationModel',
          id:'simulationModel',
          name:'模拟三维模型',
          checked:false
        }
      ]
      this.$store.commit('setLayerData',data3DLayer)
    },
  methods:{
    /**
     * @author: 阿匡
     * @description: 初始化三维模型
     * @param {*}
     * @return {*}
     */
    init3DMap(){
      const Cesium = this.cesium
      Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjY4N2U3Zi04NWU3LTQ4NjAtODA1Yi0zODk4OTM2MGZjYTEiLCJpZCI6ODA1NTcsImlhdCI6MTY0MzAwNzM0N30.fw2JyeiMteYPK6azGkFXwdED-wKWHfE1TbhTEXowNSY"
      this.viewer = new Cesium.Viewer("cesiumContainer",{
        baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
        //取消创建右上角图层后，必须指定底图的数据源，否则会显示不出来--这里指定的是高德的数据源
        imageryProvider:new Cesium.UrlTemplateImageryProvider({
          url:"https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        }),
        geocoder: false, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
        navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
        homeButton: false, // 如果设置为false，将不会创建右上角主页(房子)按钮。
        sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
        animation: false, // 如果设置为false，将不会创建左下角动画小部件。
        timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
        fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
        scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
        shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
        // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
        infoBox: false, // 是否显示点击要素之后显示的信息
        sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
        fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了全屏按钮，但是键盘按F11 浏览器也还是会进入全屏

      });
      this.viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
      //除了高德地形图，这边还给它加上高德影像注记图
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url:"http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
        })
      )
      this.viewer.terrainProvider = new Cesium.createWorldTerrain();
      //设置初始的位置Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
      const boundingSphere = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(113.27599, 23.11705, 100),15000
      )
      //定位到初始的位置
      this.viewer.camera.flyToBoundingSphere(boundingSphere,{
        // 定位到初始位置的过渡时间，设置成0，就没有过渡，类似一个过场的动画时长
        duration:0
      })
    },

  },
  mounted(){
    this.init3DMap()
  }

}
</script>

<style scoped lang="scss">
.box3d{
  height: 90%;
  .cesiumView{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  }
}
// #cesiumContainer {
//   width: 100%;
//   height: 100%;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
// }
</style>