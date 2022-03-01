<!--
 * @Author: 阿匡
 * @Date: 2022-03-01 10:26:34
 * @LastEditTime: 2022-03-01 15:00:36
 * @LastEditors: 阿匡
 * @Description: Cesium的Demo的集合
 * @FilePath: \vue2-ol-zkstudy\src\views\CesiumDemosHome.vue
 * 仅为学习使用
-->
<template>
  <div class="home">
    <div class="user_info">
      <ul>
        <li @click="logout">
          <i class="el-icon-remove-outline"></i><span>返回主界面</span>
        </li>
      </ul>
    </div>
    <Map3D />
    <LayerControl>
      <template #showLayer>
        <Layer3dData />
      </template>
    </LayerControl>
    <ToolBar3d/>
  </div>
</template>

<script>
import Layer3dData from "@/components/cesiumDemos/Layer3dData";
import LayerControl from "@/components/public/LayerControl";
import Map3D from "@/components/cesiumDemos/Map3D";
import ToolBar3d from "@/components/cesiumDemos/Tool";
export default {
  name: "cesiumHome",
  components: { Map3D, LayerControl, Layer3dData, ToolBar3d },
  methods: {
    logout() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-width: 1260px;
  z-index: -9;
  overflow: hidden;
  .user_info {
    position: absolute;
    top: 4%;
    right: 1%;
    z-index: 2;
    background-color: white;
    ul {
      float: right;
      li {
        list-style: none; /*去除无序列表前面的符号*/
        margin-right: 1.875rem /* 30/16 */;
        float: left;
        cursor: pointer;
        i {
          line-height: 1.25rem /* 20/16 */;
          font-size: 1rem /* 16/16 */;
          color: #3176b8;
          float: left;
        }
        span {
          line-height: 1.25rem /* 20/16 */;
          font-size: 0.875rem /* 14/16 */;
          margin-left: 0.3125rem /* 5/16 */;
          float: left;
          color: #3176b8;
        }
      }
    }
  }
}
</style>