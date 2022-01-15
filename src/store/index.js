/*
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-01-15 11:34:29
 * @LastEditors: 阿匡
 * @Description: 
 * @FilePath: \vue2-ol-zkstudy\src\store\index.js
 * @仅为学习使用
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    executeMehod: [], // 执行的方法名称
  },
  mutations: {
    addExecuteFunName(state, methodProxy) {
      state.executeMehod.push(methodProxy)
    },
    setExecuteFunName(state, methodProxys) {
      state.executeMehod = methodProxys
    },
  },
  actions: {
  },
  modules: {
  }
})
