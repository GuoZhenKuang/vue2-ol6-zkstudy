/*
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-01-19 20:19:32
 * @LastEditors: 阿匡
 * @Description: 路由跳转界面
 * @FilePath: \vue2-ol-zkstudy\src\router\index.js
 * @仅为学习使用
 */
import Vue from 'vue'
import axios from 'axios'  // 安装axios后引入
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.prototype.$axios = axios  // 将axios挂载到原型上方便使用

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'',
        name:'Map2d',
        component:()=>import('@/components/Map/Map2D')
      },
      {
        path:'/Map3d',
        name:'Map3d',
        component:()=>import('@/components/Map/Map3D')
      },{
        path:'/SwipeMap',
        name:'SwipeMap',
        component:()=>import('@/components/Map/SwipeMap')
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
