<!--
 * @Author: 阿匡
 * @Date: 2022-02-09 11:33:15
 * @LastEditTime: 2022-02-18 10:31:28
 * @LastEditors: 阿匡
 * @Description: 左侧工具栏上边的表格数据
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\LeftBox\LeftBoxTopTable\index.vue
 * 仅为学习使用
-->
<template>
<div class="table_box_div">
    <div class="table_box">
        <!-- <ul> -->
         <!--  在实现列表过渡的时候，如果需要过渡的元素，是通过v-for循环渲染出来的，不能使用transition包裹，需要使用transitionGroup -->
        <!--  如果要为v-for循环创建的元素设置动画，必须为每一个元素设置 :key属性 -->
         <!-- 给transition-group 添加appear属性，实现页面刚展出来时候，入场时候的效果 -->
        <transition-group
        name="custom-classes-transition"
        tag="ul"
        class="table_list"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeInDown"
        mode="out-in"
        >
        <li
        v-for="log in logList"
        :key="log.code"
        >
        <div class="table_title">
            <img src="../../../../../assets/img/table_title.png">
        </div>
        <div class="table_info">
            <font class="w_50">{{log.name}}</font>
            <font class="w_50"
            >新增确诊:{{log.newDiagnosis}}人</font>
        </div>
        <div class="table_time">
            <font class="w_50">{{log.time}}</font>
        </div>
        </li>
        </transition-group>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
export default {
    name:'leftTopTable',
    created(){
        this.getEpidemicData()
    },
    data() {
        return {
            logList: [],
        }
    },
    methods:{
        getEpidemicData(){
            //获取疫情数据并生成相应的展示数据
            //获取public的文件可以直接/去获取相应的文件夹
            this.$axios.get('/GeoJson/20220105-全国疫情数据.json').then(res=>{
                let allData = res.data.features
                //清空当前展示的数据先，之后的数据从这里进行获取
                // this.logList = []
                let newData = []
                allData.map(item=>{
                    newData.push({
                        name:item.properties.省份,
                        newDiagnosis:item.properties.新增确诊,
                        cumulativeConfirmed:item.properties.累计确诊,
                        code:item.id,
                        time:dayjs(this.randomDate(new Date('2022-02-10 00:00:00'), new Date())).format('YYYY-MM-DD HH:mm:ss')
                    })
                })
                this.logList = this.getRandomArrayElements(newData,3)
                setInterval(() => {
                    let item = _.sample(newData)
                    if(_.includes(this.logList,item)){
                        //如果已经有这个参数的话，则针对这个参数进行过滤
                        let filterData = _.without(newData,item)
                        item = _.sample(filterData)
                        this.logList.splice(this.logList.length-1,1)
                        this.logList.splice(0,0,item)
                    }else{
                        this.logList.splice(this.logList.length-1,1)
                        this.logList.splice(0,0,item)
                    }
                }, 3000);
            })
        },
        /**
         * @author: 阿匡
         * @description: 返回数组中随机的数据
         * @param {*} array-原数组
         * @param {*} count-用户想要返回的数据
         * @return {*}
         */
        getRandomArrayElements(array,count){
            let newArray = array.slice(0)
            let i = array.length
            let min = i-count
            while(i-->min){
                let index = Math.floor((i+1)*Math.random())
                let temp = newArray[index]
                newArray[index] = newArray[i]
                newArray[i] = temp
            }
            if(newArray){
                return newArray.slice(min)
            }
        },
        /**
         * @author: 阿匡
         * @description: 随机生成一个日期
         * @param {*} startDate-开始的区间
         * @param {*} endDate-结束的区间
         * @return {*}
         */
        randomDate(startDate, endDate) {
            let date = new Date(
                +startDate + Math.random() * (endDate - startDate)
            )
            let hour = (0 + Math.random() * (23 - 0)) | 0
            let minute = (0 + Math.random() * (59 - 0)) | 0
            let second = (0 + Math.random() * (59 - 0)) | 0
            date.setHours(hour)
            date.setMinutes(minute)
            date.setSeconds(second)
            return date
        },
    }

}
</script>

<style lang="scss" scoped>
.table_box_div{
    width: 94%;
    height: calc(35% - .9375rem /* 15/16 */);
    position: relative;
        .table_box{
        height: 100%; 
        width: 100%;
        .table_list{
            height: 100%;
            width: 94%;
            overflow-y: hidden;
            overflow-x: hidden;
            li{
                width: 90%;
                list-style:none;//去掉li里面的符号
                /* //height: 0.56rem; */
                height: 29%;
                padding: 0 .3125rem /* 5/16 */;
                margin: .625rem /* 10/16 */ .9375rem /* 15/16 */;
                background: url('../../../../../assets/img/border.png') center center;
                background-size: 100% 100%; 
                .table_title{
                    width: 3.75rem /* 60/16 */;
                    height: 35%;
                    margin-top: -.375rem /* 6/16 */;
                }
                .table_info{
                    height: 28%;
                    line-height: 28%;
                    color: #ed2329;
                    font-weight: 800;
                    font-size: .875rem /* 14/16 */;
                    margin-top: 1%;
                }
                .table_time{
                    width: 100%;
                    height: 30%;
                    font{
                        color: #a0b8ba;
                        font-size: .8125rem /* 13/16 */; 
                    }
                }
                .w_50{
                    width: 50%;
                }
            }
        }
        }
}
</style>
