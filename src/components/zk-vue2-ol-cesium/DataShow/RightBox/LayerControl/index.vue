<!--
 * @Author: 阿匡
 * @Date: 2022-02-18 10:36:55
 * @LastEditTime: 2022-02-18 17:52:25
 * @LastEditors: 阿匡
 * @Description: 图层控制展示
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\RightBox\LayerControl\index.vue
 * 仅为学习使用
-->
<template>
  <div class="layer_tool">
    <div class="layer_right_img">
      <img :src="rightImg" alt="图层图标" />
    </div>
    <div class="layer_right_inner_img">
      <img :src="rightInnerImg" alt="图层内部图标" />
    </div>
    <div class="map_layer_title">图层控制</div>
    <div class="layer_tree">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        @check-change="handleCheckChange"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import executeMixin from "@/components/zk-vue2-ol-cesium/Map/mixin/executeMixin";
import execute3DMixin from "@/components/zk-vue2-ol-cesium/Map/mixin/execute3DMixin";
export default {
  name: "layerTool",
  mixins: [executeMixin, execute3DMixin],
  data() {
    return {
      rightImg: require("../../../../../assets/img/layer.png"),
      rightInnerImg: require("../../../../../assets/img/layer_inner.png"),
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      treeData: [],
      checkNode: false,
    };
  },
  created() {},
  computed: {
    show2dor3d() {
      return this.$store.state.layerData;
    },
  },
  watch: {
    show2dor3d(val) {
      if (val == "2d") {
        this.get2dTreeData();
      } else if (val == "3d") {
        this.get3dTreeData();
      }
    },
  },
  methods: {
    handleCheckChange(checkedNodes, checked) {
      if (!checkedNodes.children) {
        //不接收父节点的数据
        if (checkedNodes.is2dMap && checked) {
          switch (checkedNodes.loadWay) {
            //2维数据加载的方式
            case "addGeojson":
              this.excuteMapMethod("addGeoJson", checkedNodes.code);
              break;
            case "addXYZ":
              this.excuteMapMethod("addXYZ", checkedNodes.code);
              break;
            case "addWMTS":
              this.excuteMapMethod("addWMTX", checkedNodes.code);
              break;
            case "addCluster":
              this.excuteMapMethod("addCluster", checkedNodes.code);
              break;
            case "addHeatmap":
              this.excuteMapMethod("addHeatmap", checkedNodes.code);
              break;
          }
        } else if (checkedNodes.is2dMap) {
          //二维数据取消加载
          this.excuteMapMethod("clearLayer", checkedNodes.code);
        } else if (checkedNodes.is2dMap == false && checked == true) {
          //三维数据加载
          switch (checkedNodes.loadWay) {
            case "addSimulationPoint":
              this.excute3DMapMethod("addSimulationPoint");
              break;
            case "addSimulationModel":
              this.excute3DMapMethod("addSimulationModel");
              break;
          }
        }
      }
    },
    get2dTreeData() {
      this.$axios.get("/TreeJson/2dtree.json").then((res) => {
        this.treeData = res.data.Data;
        let newTreeData = this.arrayToTreeArray(this.treeData, "id", "pid");
        this.data = newTreeData;
      });
    },
    get3dTreeData() {
      this.$axios.get("/TreeJson/3dtree.json").then((res) => {
        this.treeData = res.data.Data;
        let newTreeData = this.arrayToTreeArray(this.treeData, "id", "pid");
        this.data = newTreeData;
      });
    },
    /**
     * @author: 阿匡
     * @description: 把id和pid的数组转换为el-tree能识别的目录树
     * @param {*} arr-原数组
     * @param {*} idField-父节点id
     * @param {*} pidField-子节点id
     * @return {*}
     */
    arrayToTreeArray(arr, idField, pidField) {
      let obj = {};
      let result = [];
      //将数组中的数据转为键值对结构（这里的数组和obj会互相引用）
      arr.map((el) => {
        obj[el[idField]] = el;
      });
      for (let i = 0; i < arr.length; i++) {
        //找出所有的pid先
        //obj[pid]就一定是父节点
        let pid = arr[i][pidField];
        if (pid === null) {
          //先把父节点安排好
          result.push(arr[i]);
          continue;
        }
        if (obj[pid] && obj[pid]["children"]) {
          obj[pid]["children"].push(arr[i]);
        } else {
          obj[pid]["children"] = [arr[i]];
        }
      }
      return result;
    },
  },
};
</script>

<style>
.el-tree {
  background: #030e32;
  color: #d5e0f0;
}
.el-tree-node__content:hover {
  /* 这段代码是当鼠标移动时,节点显示的背景色 */
  background-color: #0042a4;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  /* 当鼠标点击后,再点击空白地方,节点失去焦点时显示的背景色 */
  background-color: #030e33;
}
.el-tree-node:focus > .el-tree-node__content {
  /* 当鼠标点击tree的节点时显示的背景色 */
  background-color: #0042a4;
}
</style>

<style lang="scss" scope>
.layer_tool {
  position: absolute;
  top: 6.875rem /* 110/16 */;
  right: 3.25rem /* 52/16 */;
  width: 12.5rem /* 200/16 */;
  border-radius: 0.25rem /* 4/16 */;
  padding: 0 0 0.625rem /* 10/16 */ 0;
  box-sizing: border-box;
  z-index: 8;
  background: url("../../../../../assets/img/layer_bg.png") center center;
  background-size: 100% 100%;
  height: 50%;
  .layer_right_img {
    position: absolute;
    right: -1.125rem /* 18/16 */;
    top: -3.125rem /* 50/16 */;
    z-index: 8;
  }
  .layer_right_inner_img {
    right: 0.375rem /* 6/16 */;
    position: absolute;
    top: -1.6875rem /* 27/16 */;
  }
  .map_layer_title {
    line-height: 1.25rem /* 20/16 */;
    color: #fe7b00;
    margin-left: 1.25rem /* 20/16 */;
  }
  .layer_tree {
    height: 88%;
    overflow-y: auto;
    overflow-x: hidden;
    width: 98%;
    padding: 5% 0;
    margin-left: 0.1875rem /* 3/16 */;
  }
}
</style>
