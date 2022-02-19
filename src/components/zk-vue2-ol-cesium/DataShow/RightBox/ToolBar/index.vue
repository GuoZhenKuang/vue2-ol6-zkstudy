<!--
 * @Author: 阿匡
 * @Date: 2022-02-19 14:38:05
 * @LastEditTime: 2022-02-19 16:14:26
 * @LastEditors: 阿匡
 * @Description: 工具栏展示
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\RightBox\ToolBar\index.vue
 * 仅为学习使用
-->
<template>
  <div class="rightToolBar">
    <div class="showToolBar" @click="showTool = !showTool">
      <img :src="showToolBarSrc" alt="展示工具的按钮" />
    </div>
    <transition name="tool">
      <div class="allToolBar" v-show="showTool">
        <div class="measure" @click="measureDistance">
          <img :src="showMeasure" alt="量测" />
        </div>
        <div class="measureSurface" @click="measureSurface">
          <img :src="showMeasureSurface" alt="测面" />
        </div>
        <div class="clear" @click="clearAll">
          <img :src="clearSrc" alt="清除" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import executeMixin from "@/components/zk-vue2-ol-cesium/Map/mixin/executeMixin";
import execute3DMixin from "@/components/zk-vue2-ol-cesium/Map/mixin/execute3DMixin";
export default {
  name: "rightToolBar",
  mixins: [executeMixin, execute3DMixin],
  data() {
    return {
      showToolBarSrc: require("../../../../../assets/toolImg/工具.png"),
      showToolCircleSrc: require("../../../../../assets/toolImg/圆圈.png"),
      showMeasure: require("../../../../../assets/toolImg/测量.png"),
      showMeasureSurface: require("../../../../../assets/toolImg/测面.png"),
      clearSrc: require("../../../../../assets/toolImg/清除.png"),
      showTool: false,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
      measureSurface(){
          this.excuteMapMethod('drawMeasure','Polygon')
      },
      measureDistance(){
          this.excuteMapMethod('drawMeasure','LineString')
      },
    clearAll() {
      if (this.currentRoute == "Map2d") {
        // console.log("我是当前的路由状态",this.currentRoute)
        this.excuteMapMethod("allClear");
      } else if (this.currentRoute == "Map3d") {
        this.excute3DMapMethod("clearAllEntities");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.rightToolBar {
  position: absolute;
  top: 5.2rem /* 110/16 */;
  right: 16rem /* 80/16 */;
  // width:12rem /* 100/16 */;
  .showToolBar {
    float: right;
    &:hover {
      cursor: pointer;
    }
  }
  .allToolBar {
    float: right;
    margin-right: 1.25rem /* 20/16 */;
    .measure {
      float: right;
      //   margin-right: 1.25rem /* 20/16 */;
      &:hover {
        cursor: pointer;
      }
    }
    .measureSurface {
      float: right;
      margin-right: 1.25rem /* 20/16 */;
      &:hover {
        cursor: pointer;
      }
    }
    .clear {
      float: right;
      margin-right: 1.25rem /* 20/16 */;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.tool-enter,
.tool-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.tool-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.tool-enter-active {
  transition: all 0.5s ease;
}
</style>
