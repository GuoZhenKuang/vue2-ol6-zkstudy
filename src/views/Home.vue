<!--
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-01-26 14:30:21
 * @LastEditors: 阿匡
 * @Description: 
 * @FilePath: \vue2-ol-zkstudy\src\views\Home.vue
 * 仅为学习使用
-->
<template>
  <div class="home">
    <Header style="flex:1"/>
    <!-- <Map style="flex:15">
      <template v-slot:tool>
        <ToolBar/>
      </template>
    </Map> -->
    <keep-alive>
      <router-view style="flex:15" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header'
import Map from '@/components/Map/Map2D'

export default {
  name: 'Home',
  data() {
    return {
      sendData:{
        id:'001',
        titile:'消息001'
      }
    }
  },
  components: {
    Map,
    Header
  },
  methods:{
    Anotherchange(){
      this.$router.push({
        name:'OhterAbout',
        params:{
          id:this.sendData.id,
          titile:this.sendData.titile
        }
      })
    },
    change(){
      this.$router.push('About')
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

</style>
