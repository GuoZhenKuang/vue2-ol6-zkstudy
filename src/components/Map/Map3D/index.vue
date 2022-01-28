<!--
 * @Author: 阿匡
 * @Date: 2022-01-16 11:09:09
 * @LastEditTime: 2022-01-28 15:23:34
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
import subscribe3DMixin from '@/components/Map/mixin/subscribe3DMixin'
import execute3DMixin from '@/components/Map/mixin/execute3DMixin'
//控制图层的方法
import layer3dControl from'@/components/Map/mixin/layer3DControl'
export default {
  name:'cesiumMap',
  mixins:[subscribe3DMixin,execute3DMixin,layer3dControl],
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
      ],
      cartesian3:undefined
      
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

      //点击显示气泡
      const mouseClickHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
      mouseClickHandler.setInputAction(e=>{
        this.initPopup(this.viewer)
        const {position} =e
        const html = `<div>
           <div>位置</div>
           <div>x:${position.x}</div>
           <div>y:${position.y}</div>
            </div>`
          this.showInfo(position,html)
      },Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    initPopup(viewer){
      const Cesium = this.cesium
      //初始化弹窗
        const container = viewer.container
        const popupContainer = document.createElement("div")
        const html = '<div class="self-define-popup">' +
            '<div class="self-define-popup-close-button">×</div>' +
            '<div class="self-define-popup-content"></div>' +
            '</div>'
        popupContainer.innerHTML = html
        container.appendChild(popupContainer)

        //增加关闭弹窗时候的监听
        const closeElement = document.getElementsByClassName("self-define-popup-close-button")
        if(closeElement&&closeElement[0]){
          //关闭弹窗时候的按钮
          closeElement[0].onclick=()=>{
            const elementPopup = document.getElementsByClassName("self-define-popup")
            if(elementPopup&&elementPopup[0]){
              //关闭弹窗的时候隐藏
              elementPopup[0].style.display = 'none'
              this.cartesian3 = undefined
            }
          }
        }

        //增加三维视图的监听
        this.viewer.scene.postRender.addEventListener(()=>{
          if(this.cartesian3){
            const position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene,this.cartesian3)
            const elementPopup = document.getElementsByClassName('self-define-popup')
              if(elementPopup&&elementPopup[0]){
                //把弹窗显示出来
                elementPopup[0].style.display='block'
                const x = position.x-elementPopup[0].clientWidth/2
                const y = position.y-elementPopup[0].clientHeight+35
                elementPopup[0].style.left = `${x}px`
                elementPopup[0].style.top = `${y}px`
              }
          }
        })
    },
    showInfo(position,html){
      //-----------------不知道这块是干嘛的------------------------------
      const ray = this.viewer.camera.getPickRay(position);
      this.cartesian3 = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      //-----------------不知道这块是干嘛的------------------------------

      //得到弹窗的要素
      const elementPopup = document.getElementsByClassName('self-define-popup')
      if(elementPopup&&elementPopup[0]){
        //把弹窗显示出来
        elementPopup[0].style.display='block'
        const x = position.x-elementPopup[0].clientWidth/2
        const y = position.y-elementPopup[0].clientHeight+35
        elementPopup[0].style.left = `${x}px`
        elementPopup[0].style.top = `${y}px`
      }
      //弹窗内容
      const elementPopupContent = document.getElementsByClassName("self-define-popup-content")
      if(elementPopupContent&&elementPopupContent[0]){
        elementPopupContent[0].innerHTML = ''
        const popupContentContainer = document.createElement("div")
        popupContentContainer.innerHTML = html
        elementPopupContent[0].appendChild(popupContentContainer)
      }

    }

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
</style>