<!--
 * @Author: 阿匡
 * @Date: 2022-02-14 17:59:35
 * @LastEditTime: 2022-02-17 17:32:35
 * @LastEditors: 阿匡
 * @Description: 左下侧滚动的数据栏
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\LeftBox\LeftBoxDownTable\index.vue
 * 仅为学习使用
-->
<template>
  <div class="monitor_div">
    <vue-seamless-scroll
      :data="recList"
      :class-option="classOption"
      class="search_div"
    >
      <ul>
        <li v-for="rec in recList" :key="rec.code" class="monitor_div_li" @click="showDetail(rec)">
          <div class="search_left_div">
            <font class="w_100 name">{{ rec.name }}</font>
            <font class="w_100">新增确诊：{{ rec.newDiagnosis }}</font>
            <font class="w_100">累计确诊：{{ rec.cumulativeConfirmed }}</font>
          </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "LeftBoxDownTable",
  data() {
    return {
      recList: [
        {
          code: 1,
          name: "广东省",
          newDiagnosis: "35",
          cumulativeConfirmed: "500",
        },
        {
          code: 2,
          name: "北京市",
          newDiagnosis: "35",
          cumulativeConfirmed: "500",
        },
        {
          code: 3,
          name: "广西省",
          newDiagnosis: "35",
          cumulativeConfirmed: "500",
        },
        {
          code: 4,
          name: "湖南省",
          newDiagnosis: "35",
          cumulativeConfirmed: "500",
        },
      ],
    };
  },
  components: {
    vueSeamlessScroll,
  },
  computed: {
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods:{
    showDetail(val){
      this.$emit('getDetail',val)
    }
  }
};
</script>

<style lang="scss" scoped>
.monitor_div {
  width: 90%;
  height: calc(37% - 0.9375rem /* 15/16 */);
  margin-bottom: 1.25rem /* 20/16 */;
  padding-top: 1.25rem /* 20/16 */;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  .search_div {
    height: calc(35% - .9375rem /* 15/16 */);
    width: 100%;
    .monitor_div_li {
      display: flex;
      .search_left_div {
        width: 45%;
        padding: 0.375rem /* 6/16 */ 0.375rem /* 6/16 */;
        display: flex;
        flex-direction: column;
        .name {
          color: #00fdfa;
        }
        font {
          padding: 0.375rem /* 6/16 */ 0;
          color: #fffffa;
        }
      }
    }
    ul {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    li {
      width: 90%;
      height: 7.5rem /* 120/16 */;
      /* border: 1px solid #121970; */
      margin: .375rem /* 6/16 */ .9375rem /* 15/16 */;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      background: url("../../../../../assets/img/border.png") center center;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
}
// 滚动条样式
::-webkit-scrollbar {
    width: 0.05rem;
}
::-webkit-scrollbar-track {
    background-color: #051331;
}
::-webkit-scrollbar-thumb {
    background-color: #051331;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #051331;
}
::-webkit-scrollbar-thumb:active {
    background-color: #051331;
}
</style>