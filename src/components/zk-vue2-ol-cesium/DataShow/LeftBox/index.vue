<!--
 * @Author: 阿匡
 * @Date: 2022-02-09 09:51:23
 * @LastEditTime: 2022-02-16 15:41:16
 * @LastEditors: 阿匡
 * @Description: 左侧数据展示栏
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\LeftBox\index.vue
 * 仅为学习使用
-->
<template>
  <div class="left_box">
    <!-- 时间戳 -->
    <div class="date">
      <font>{{curDate}}</font>
      <span>{{curTime}}</span>
    </div>
    <!-- 确诊数据展示 -->
    <div class="info_main_div">
      <div class="info_div">
        <div class="info_title">今日确诊</div>
        <div class="info_num_today">
          <div class="info_today_item">3</div>
          <div class="info_today_item">0</div>
          <div class="info_today_item">7</div>
        </div>
      </div>
      <div class="info_split_line"></div>
      <div class="info_div">
        <div class="info_title">历史确诊</div>
        <div class="info_num">
            <div class="info_history_item">1</div>
            <div class="info_history_item">4</div>
            <div class="info_history_item">1</div>
            <div class="info_history_item">1</div>
            <div class="info_history_item">2</div>
            <div class="info_history_item">8</div>
        </div>
    </div>
    </div>
    <!-- 分割线 -->
    <div class="split_line"></div>
    <!-- 上半部分的table数据加载 -->
    <LeftBoxTopTable/>
    <!-- 中间部分数据加载 -->
    <LeftBoxMiddle/>
    <!-- 下面部分数据滚动展示 -->
    
  </div>
</template>

<script>
import dayjs from 'dayjs'
import LeftBoxTopTable from './LeftBoxTopTable'
import LeftBoxMiddle from './LeftBoxMiddle'
export default {
  name:'leftBox',
  components:{
    LeftBoxTopTable,
    LeftBoxMiddle
  },
  created(){
    //定时，每秒改变时间的展示
    setInterval(() => (this.curTime = dayjs().format('HH:mm:ss')), 1000)
  },
  data() {
    return {
      curTime:dayjs().format('HH:mm:ss'),
      curDate: dayjs().format('YYYY年MM月DD日'),
    }
  },
}
</script>

<style lang="scss" scoped>
.left_box{
    width: 20%;
    position: absolute;
    left: .625rem /* 10/16 */;
    top: 3.125rem /* 50/16 */;
    bottom: 0;
    z-index: 9;
    background: url('../../../../assets/img/leftbox_bg.png') center center;
    background-size: 100% 100%;
    .date{
      position: absolute;
      color: #0091f6;
      font-weight: 600;
      top: -.9375rem /* 15/16 */;
    }
    .info_main_div{
      width: 90%;
      height: calc(12% - .9375rem /* 15/16 */);
      margin-bottom: 5%;
      padding-top: 10%;
      position: relative;
      display: flex;
      .info_div{
          width: 50%;
          display: flex;
          flex-direction: column;
          height: calc(30% - .9375rem /* 15/16 */);
          .info_title{
                font-size: .875rem /* 14/16 */;
                text-align: center;
                color: #fff;
          }
          .info_num_today{
                width: 50%;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 5% 0;
                margin-left: 2.5625rem /* 41/16 */;
                .info_today_item{
                      background: #ff5b56;
                      padding: 5%;
                      font-size: 1.625rem /* 26/16 */;
                      margin: 3%;
                      color: #fff;
                }
          }
          .info_num{
                width: 50%;
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 5% 0;
                .info_history_item{
                      background: #0056df;
                      padding: 5%;
                      font-size: 1.625rem /* 26/16 */;
                      margin: 3%;
                      color: #fff;
                }

          }
      }
      .info_split_line{
      background: url('../../../../assets/img/info_split_line.png') center center;
      background-size: 100% 100%;
      width: .125rem /* 2/16 */;
      margin-top: 0.2%;
      margin-right: 1.25rem /* 20/16 */;
      }
    }
    .split_line{
    background: url('../../../../assets/img/split_line.png') center center;
    background-size: 100% 100%;
    width: 94%;
    height: .375rem /* 6/16 */;
    }
}
</style>