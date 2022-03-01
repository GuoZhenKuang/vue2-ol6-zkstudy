<!--
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-03-01 10:31:37
 * @LastEditors: 阿匡
 * @Description: 大屏界面
 * @FilePath: \vue2-ol-zkstudy\src\views\Screen.vue
 * 仅为学习使用
-->
<template>
  <div class="home">
    <Header/>
    <SystemMenus/>
    <DataShow>
      <template #showMap>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      </template>
    </DataShow>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/zk-vue2-ol-cesium/Header'
import SystemMenus from '@/components/zk-vue2-ol-cesium/SystemMenu'
import DataShow from '@/components/zk-vue2-ol-cesium/DataShow'

export default {
  name: 'Screen',
  data() {
    return {
    }
  },
  components: {
    Map,
    Header,
    SystemMenus,
    DataShow
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
.home{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 1260px;
    z-index: -9;
    overflow: hidden;
}

</style>
