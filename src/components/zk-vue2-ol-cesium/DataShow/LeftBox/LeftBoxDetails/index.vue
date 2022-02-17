<!--
 * @Author: 阿匡
 * @Date: 2022-02-17 17:13:49
 * @LastEditTime: 2022-02-17 17:56:19
 * @LastEditors: 阿匡
 * @Description: 左下侧数据详情信息
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\LeftBox\LeftBoxDetails\index.vue
 * 仅为学习使用
-->
<template>
<div>
<div class="monitor_back_div" @click="exitDetail">
    <i class="el-icon-d-arrow-left"></i>
    <div class="monitor_back_title"><font>返回疫情监控列表</font></div>
</div>
  <div class="monitor_detail_div">
    <div class="monitor_info_div">
      <div class="monitor_left_info">
        <div class="monitor_item">
          <font class="name_color">{{ detailInfo.name }}</font>
        </div>
        <div class="monitor_item">
          <font class="title_color">新增确诊</font>
          <font class="text_color">{{ detailInfo.newDiagnosis }}</font>
        </div>
        <div class="monitor_item">
          <font class="title_color">历史确诊</font>
          <font class="text_color">{{ detailInfo.cumulativeConfirmed }}</font>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "LeftBoxDetails",
  props: ["detailInfo"],
  methods:{
      exitDetail(){
          this.$emit('exitDetail')
      }
  }
};
</script>

<style lang="scss" scoped>
.monitor_back_div{
    width: 77%;
    background: #002e66;
    padding: .625rem /* 10/16 */;
    border-radius: .375rem /* 6/16 */;
    /* margin: 0.08rem 0.15rem; */
    color: #00edea;
    display: flex;
    cursor: pointer;
    height:0.625rem /* 26/16 */;
    margin-top: .9375rem /* 15/16 */;
    margin-left: .9375rem /* 15/16 */;  
    .monitor_back_title{
        line-height: 0.625rem /* 26/16 */;
        font-size: 0.9rem /* 16/16 */;
    }
    i{
        line-height: 0.625rem /* 26/16 */;
    }
}
.monitor_detail_div {
  width: 94%;
  height: calc(37% - 0.9375rem /* 15/16 */);
  margin-bottom: 1.25rem /* 20/16 */;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  .monitor_info_div {
    background: url("../../../../../assets/img/border.png") center center;
    background-size: 100% 100%;
    width: 78%;
    padding: 0.375rem /* 6/16 */ 0.9375rem /* 15/16 */;
    display: flex;
    margin: 0.625rem /* 10/16 */ 0.9375rem /* 15/16 */;
    .monitor_left_info {
      width: 65%;
      .monitor_item {
        padding: 0.375rem /* 6/16 */ 0;
        color: #fff;
        .name_color {
          color: #00edea;
          font-size: 1rem /* 16/16 */;
        }
        .title_color {
          color: #00beff;
        }
        .text_color {
          color: #fff;
        }
      }
    }
  }
}
</style>
