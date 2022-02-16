<!--
 * @Author: 阿匡
 * @Date: 2022-02-10 14:18:47
 * @LastEditTime: 2022-02-16 15:40:44
 * @LastEditors: 阿匡
 * @Description: 左侧展示栏中间部分展示
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\DataShow\LeftBox\LeftBoxMiddle\index.vue
 * 仅为学习使用
-->
<template>
  <div class="split_bg">
  <div class="split_bg_text">
      <font>实时疫情监控</font>
  </div>
  <div class="search_div">
      <el-autocomplete
       class="inline-input"
       v-model="inputState"
       :fetch-suggestions="querySearch"
       @select="handleSelect"
       :popper-append-to-body="false"
       placeholder="请输入要查找的城市"
      >
      </el-autocomplete>
      <i class="el-icon-search"></i>
  </div>
  </div>
</template>

<script>
export default {
    name:'middleDataShow',
    data() {
        return {
            inputState:'',
            restaurants: [],
        }
    },
    methods:{
        /**
         * @author: 阿匡
         * @description: 获取input焦点时候返回可能得到的值
         * @param {*} queryString-用户输入的值
         * @param {*} cb-传回去的回调函数
         * @return {*}
         */
        querySearch(queryString, cb){
            let restaurants = this.restaurants
            let results = queryString?
            //过滤掉不存在的数据，便是输入中识别到的数据
            restaurants.filter(this.createFilter(queryString)):
            restaurants
            //最后通过callbackk返回建议数据的列表
            cb(results)
        },
        /**
         * @author: 阿匡
         * @description: 创建过滤的条件，用于返回相应的数值
         * @param {*} queryString-用户输入的字符串
         * @return {*}
         */
        createFilter(queryString) {
            //返回这个箭头函数
        return (state) => {
            //返回不存在这个列表中的数据，这里的indexOf也可以换成match方法，是模糊匹配
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        }
      },
      /**
       * @author: 阿匡
       * @description: 初始化时候输入框的数据，一般时通过后台返回
       * @param {*}
       * @return {*}
       */
      loadAll(){
          return[
              {value:'北京',num:20},
              {value:'上海',num:50},
              {value:'广州',num:35},
              {value:'深圳',num:55},
              {value:'杭州',num:88}
          ]
      },
      /**
       * @author: 阿匡
       * @description: 用户当前选择的值
       * @param {*} item
       * @return {*}
       */
      handleSelect(item){
        console.log('我时用户当前选择的值',item)
      }
    },
    mounted(){
        this.restaurants = this.loadAll()
    }

}
</script>
<style lang="scss" scoped>
::v-deep {
.el-input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    background: url('../../../../../assets/img/input_bg.png') center center;
    background-size: 100% 100%;
}
.el-scrollbar__wrap{
    background: #0e3278;
    // overflow-x: hidden;
    overflow-y: auto;
}
.el-autocomplete-suggestion__wrap {
    // max-height: 280px;
    max-height: 8.4375rem /* 135/16 */;
    padding: 10px 0;
    padding-bottom: 1.625rem /* 26/16 */;
    width: 107%;//把滚动条弄走
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    background-color: #0e3278;
    border: 1px solid #021231;
    // border-radius: 4px;
}
.el-autocomplete-suggestion{
    border: 1px solid #021231
}
.el-autocomplete-suggestion li {
        padding: 0 20px;
        margin: 0;
        line-height: 34px;
        cursor: pointer;
        color: #a0b8ba;
        font-size: 14px;
        list-style: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
}
.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
    background-color: #0056df;
}
    
.el-popper[x-placement^='bottom'] .popper__arrow {
    /* top: -6px; */
    /* left: 50%; */
    /* margin-right: 3px; */
    /* border-top-width: 0; */
    /* border-bottom-color: #ebeef5; */
    /* color: red; */
    display: none;
}
.el-popper[x-placement^='top'] .popper__arrow {
    display: none;
}
}


.split_bg{
    background: url('../../../../../assets/img/split_bg.png') center center;
    background-size: 100% 100%;
    width: 94%;
    height: 4.375rem /* 70/16 */;
    .split_bg_text{
        margin-left: 6%;
        line-height: 1.875rem /* 30/16 */;
        color: #d07d00;
        font-weight: 600;
        font-size: .9375rem /* 15/16 */;
    }
    .search_div{
        margin-left: .9375rem /* 15/16 */;
        margin-top: .375rem /* 6/16 */;
        .inline-input{
            width: 94%;
        }
        i{
            position: absolute;
            right: 15%;
            color: #0047a3;
            margin-top: .5rem /* 8/16 */; 
        }
    }    
}
</style>