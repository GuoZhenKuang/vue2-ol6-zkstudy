<!--
 * @Author: 阿匡
 * @Date: 2022-03-01 11:41:28
 * @LastEditTime: 2022-03-01 14:27:29
 * @LastEditors: 阿匡
 * @Description: 二维数据展示
 * @FilePath: \vue2-ol-zkstudy\src\components\olDemos\LayerData\index.vue
 * 仅为学习使用
-->
<template>
  <div class="layer2dTree">
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
</template>

<script>
import executeMixin from "../Map2D/mixin/executeMixin";
export default {
  name: "layer2dControlData",
  mixins:[executeMixin],
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      treeData: [],
    };
  },
  methods: {
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
    get2dTreeData() {
      this.$axios.get("/TreeJson/2dtree.json").then((res) => {
        this.treeData = res.data.Data;
        let newTreeData = this.arrayToTreeArray(this.treeData, "id", "pid");
        this.data = newTreeData;
      });
    },
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
        }
      }
    },
  },
  mounted() {
    this.get2dTreeData();
  },
};
</script>
<style>
.el-tree {
  background: transparent;
  color: #d5e0f0;
  border-radius: 1.5625rem /* 25/16 */;
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
.layer2dTree {
  height: 88%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 96%;
  padding: 7% 4px;
  margin-left: 0.1875rem /* 3/16 */;
  border-radius: 25px;
}
</style>
