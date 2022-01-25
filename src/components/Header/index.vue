<!--
 * @Author: 阿匡
 * @Date: 2022-01-15 12:02:31
 * @LastEditTime: 2022-01-25 10:19:58
 * @LastEditors: 阿匡
 * @Description: 头部
 * @FilePath: \vue2-ol-zkstudy\src\components\Header\index.vue
 * 仅为学习使用
-->
<template>
  <div class="headDiv">
    <span class="title">练习Demo</span>
    <div class="systemModule" >
          <span :class="{activeMenu:activeMenu==item.name}" @click="menuChange(item.name)" v-for="item in moduleOption" :key="item.key">{{item.name}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name:"Header",
  data() {
    return {
      moduleOption:[
        {
        key:'2d',
        name:'二维ol项目'
      },
      {
        key:'3d',
        name:'三维cesium项目'
      },{
        key:'Echart',
        name:'Echart大屏设计'
      }
      ],
      activeMenu:'二维ol项目'
    }
  },
  methods:{
    menuChange(item){
      this.activeMenu = item
      if(item=='三维cesium项目'){
        this.$router.push('Map3d')
      }else{
        this.$router.push('/')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.headDiv{
    background-color: #002133;
    width: 100%;
    height: 100%;
    z-index: 100;
    .title{
        color: white;
        font-size: 25px;
        position: absolute;
        top: 10px;
        left: 8px;
    }
    .systemModule{
      // float: right;
      position: absolute;
      right: 150px;
      top: 14px;
      color: white;
      span{
        font-size: 20px;
        margin: 0 15px 0 15px;
        cursor: pointer;
      }
    }
    .activeMenu{
      color: #0b4c81
    }
}
</style>