<!--
 * @Author: 阿匡
 * @Date: 2022-03-01 10:33:52
 * @LastEditTime: 2022-03-01 17:26:07
 * @LastEditors: 阿匡
 * @Description: 加载三维视图
 * @FilePath: \vue2-ol-zkstudy\src\components\cesiumDemos\Map3D\index.vue
 * 仅为学习使用
-->
<template>
  <div class="box3d">
    <div id="cesiumContainer" class="cesiumView"></div>
  </div>
</template>

<script>
//引入过渡的混合
import subscribe3DMixin from "./mixin/subscribe3DMixin";
import execute3DMixin from "./mixin/execute3DMixin";
//控制图层的方法
import layer3dControl from "@/components/zk-vue2-ol-cesium/Map/mixin/layer3DControl";
export default {
  name: "cesiumDemo",
  mixins: [subscribe3DMixin, execute3DMixin, layer3dControl],
  data() {
    return {
      viewer: null, //三维视图窗体
      cartesian3: undefined,
    };
  },
  mounted() {
    this.resolveKHR();
    this.init3DMap();
  },
  methods: {
    /**
     * @author: 阿匡
     * @description: 初始化三维模型
     * @param {*}
     * @return {*}
     */
    init3DMap() {
      const Cesium = this.cesium;
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjY4N2U3Zi04NWU3LTQ4NjAtODA1Yi0zODk4OTM2MGZjYTEiLCJpZCI6ODA1NTcsImlhdCI6MTY0MzAwNzM0N30.fw2JyeiMteYPK6azGkFXwdED-wKWHfE1TbhTEXowNSY";
      this.viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
        //取消创建右上角图层后，必须指定底图的数据源，否则会显示不出来--这里指定的是高德的数据源
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
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
      // this.viewer.imageryLayers.addImageryProvider(
      //   new Cesium.UrlTemplateImageryProvider({
      //     url:"http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
      //   })
      // )
      //创建一个默认的地形数据--用这个地形数据的前提是，能练到它那边国外的服务器，否则是没用的--而且会导致啥都看不到
      // this.viewer.terrainProvider = new Cesium.createWorldTerrain();

      //创建加入3dtile数据
      let tiles = this.viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: "/3dTileData/tileset.json",
          maximumScreenSpaceError: 1, //最大的屏幕空间误差
          maximumNumberOfLoadedTiles: 1000, //最大加载瓦片个数
          name: "香港数据",
        })
      );
      tiles.readyPromise
        .then(function (tileset) {
          var cartographic = Cesium.Cartographic.fromCartesian(
            tileset.boundingSphere.center
          );
          var surface = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            cartographic.height
          );
          var offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            options.offset.z
          );
          var translation = Cesium.Cartesian3.subtract(
            offset,
            surface,
            new Cesium.Cartesian3()
          );
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        })
        .otherwise(function (e) {
          throw e;
        });
      //开启地形检测
      this.viewer.zoomTo(tiles);
      this.viewer.scene.globe.depthTestAgainstTerrain = true;
    },
    //解决Unsupported glTF Extension: KHR_technique_webgl的问题
    resolveKHR() {
      const Cesium = this.cesium;
      var fixGltf = function (gltf) {
        if (!gltf.extensionsUsed) {
          return;
        }
        var v = gltf.extensionsUsed.indexOf("KHR_technique_webgl");
        var t = gltf.extensionsRequired.indexOf("KHR_technique_webgl");
        if (v !== -1) {
          gltf.extensionsRequired.splice(t, 1, "KHR_techniques_webgl");
          gltf.extensionsUsed.splice(v, 1, "KHR_techniques_webgl");
          gltf.extensions = gltf.extensions || {};
          gltf.extensions["KHR_techniques_webgl"] = {};
          gltf.extensions["KHR_techniques_webgl"].programs = gltf.programs;
          gltf.extensions["KHR_techniques_webgl"].shaders = gltf.shaders;
          gltf.extensions["KHR_techniques_webgl"].techniques = gltf.techniques;
          var techniques = gltf.extensions["KHR_techniques_webgl"].techniques;

          gltf.materials.forEach(function (mat, index) {
            gltf.materials[index].extensions["KHR_technique_webgl"].values =
              gltf.materials[index].values;
            gltf.materials[index].extensions["KHR_techniques_webgl"] =
              gltf.materials[index].extensions["KHR_technique_webgl"];

            var vtxfMaterialExtension =
              gltf.materials[index].extensions["KHR_techniques_webgl"];

            for (var value in vtxfMaterialExtension.values) {
              var us = techniques[vtxfMaterialExtension.technique].uniforms;
              for (var key in us) {
                if (us[key] === value) {
                  vtxfMaterialExtension.values[key] =
                    vtxfMaterialExtension.values[value];
                  delete vtxfMaterialExtension.values[value];
                  break;
                }
              }
            }
          });
          techniques.forEach(function (t) {
            for (var attribute in t.attributes) {
              var name = t.attributes[attribute];
              t.attributes[attribute] = t.parameters[name];
            }

            for (var uniform in t.uniforms) {
              var name = t.uniforms[uniform];
              t.uniforms[uniform] = t.parameters[name];
            }
          });
        }
      };
      Object.defineProperties(Cesium.Model.prototype, {
        _cachedGltf: {
          set: function (value) {
            this._vtxf_cachedGltf = value;
            if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
              fixGltf(this._vtxf_cachedGltf._gltf);
            }
          },
          get: function () {
            return this._vtxf_cachedGltf;
          },
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.box3d {
  .cesiumView {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    z-index: -9;
    top: 0.1rem;
  }
}
</style>