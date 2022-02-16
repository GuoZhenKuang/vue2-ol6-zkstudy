<!--
 * @Author: 阿匡
 * @Date: 2022-02-08 14:48:59
 * @LastEditTime: 2022-02-16 15:44:48
 * @LastEditors: 阿匡
 * @Description: 工具菜单栏
 * @FilePath: \vue2-ol-zkstudy\src\components\zk-vue2-ol-cesium\SystemMenu\index.vue
 * 仅为学习使用
-->
<template>
      <div class="systemModule" >
          <!-- <span :class="{activeMenu:activeMenu==item.name}" @click="menuChange(item.name)" v-for="item in moduleOption" :key="item.key">{{item.name}}</span> -->
          <div
          v-for="item in moduleOption"
          :key="item.key"
           @click="menuChange(item.key)"
          :class="['system_item', { active: idCode === item.key }]"
          >
            {{item.name}}
          </div>
      </div>
</template>

<script>
export default {
    name:'SystemMenus',
    data() {
        return {
            idCode: '2d',
            moduleOption:[
                {
                key:'2d',
                name:'二维展示'
                },
                {
                    key:'3d',
                    name:'三维展示'
                }
                ],
        }
    },
    methods:{
    menuChange(key){
      this.idCode = key
      if(key=='3d'){
        this.$router.push('Map3d')
      }else{
        this.$router.push('/')
      }
    }
    }

}
</script>

<style lang="scss" scoped>
    .systemModule{
      position: absolute;
      right: 1.25rem /* 20/16 */;
      width: 17.5rem /* 280/16 */;
      display: flex;
      top: 1.875rem /* 30/16 */;
      .system_item{
        background: url('../../../assets/img/button.png') center center;
        background-size: 100% 100%;
        width: 50%;
        height: 1.75rem /* 28/16 */;
        text-align: center;
        line-height: 1.75rem /* 28/16 */;
        font-size: .875rem /* 14/16 */;
        color: #fff;
        cursor: pointer;
      }
      .system_item.active,
      .system_item:hover{
          background: url('../../../assets/img/button_hover.png') center center;
          background-size: 100% 100%;
      }
    }
</style>