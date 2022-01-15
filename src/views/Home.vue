/*
 * @Author: mikey.zhaopeng 
 * @Date: 2022-01-14 11:23:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-01-14 11:25:47
 */
<template>
  <div class="home">
    <Map>
      <template v-slot:tool>
        <ToolBar/>
      </template>
    </Map>
      <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Map from '@/components/Map/Map2D'
import ToolBar from '@/components/ToolBar'
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
    ToolBar
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
  .qiehuan{
    position:absolute;
    z-index: 100;
  }
}

</style>
