/*
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-02-16 19:06:39
 * @LastEditors: 阿匡
 * @Description: 
 * @FilePath: \vue2-ol-zkstudy\src\main.js
 * @仅为学习使用
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'

import axios from 'axios'  // 安装axios后引入
import 'element-ui/lib/theme-chalk/index.css'
import "ol/ol.css";
// 公共样式
import "@/style/body.scss";
import "@/style/ol.scss"
import "@/style/desinAnimate.scss"

// 引入cesium相关文件
const cesium = require("cesium/Cesium.js");
const widgets = require("cesium/Widgets/widgets.css");
Vue.prototype.cesium = cesium;
Vue.prototype.widgets = widgets;

Vue.prototype.$axios = axios  // 将axios挂载到原型上方便使用

import { Message } from 'element-ui'
Vue.prototype.$message = Message

// elment-ui
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
