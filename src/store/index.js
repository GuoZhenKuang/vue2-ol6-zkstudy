/*
 * @Author: 阿匡
 * @Date: 2022-01-05 21:48:52
 * @LastEditTime: 2022-01-27 15:01:43
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
    execute3DMehod: [],
    allClear:0,
    layerData:[]//存放图层控制的数据
  },
  mutations: {
    setLayerData(state,data){
      state.layerData=data
    },
    clickAllClear(state,data){
      state.allClear = data
    },
    addExecute3DFunName(state, methodProxy){
      state.execute3DMehod.push(methodProxy)
    },
    set3DExecuteFunName(state, methodProxys){
      state.execute3DMehod = methodProxys
    },
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
