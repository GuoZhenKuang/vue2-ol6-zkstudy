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
