/*
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-02-16 15:46:56
 * @LastEditors: 阿匡
 * @Description: 路由跳转界面
 * @FilePath: \vue2-ol-zkstudy\src\router\index.js
 * @仅为学习使用
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Screen from '../views/Screen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Screen',
    component: Screen,
    children:[
      {
        path:'',
        name:'Map2d',
        component:()=>import('@/components/zk-vue2-ol-cesium/Map/Map2D'),
        meta:{
          keepAlive:true//判断是否缓存
        }
      },
      {
        path:'/Map3d',
        name:'Map3d',
        component:()=>import('@/components/zk-vue2-ol-cesium/Map/Map3D'),
        meta:{
          keepAlive:true//判断是否缓存
        }
      },{
        path:'/SwipeMap',
        name:'SwipeMap',
        component:()=>import('@/components/zk-vue2-ol-cesium/Map/SwipeMap'),
        meta:{
          keepAlive:true//判断是否缓存
        }
      }
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
