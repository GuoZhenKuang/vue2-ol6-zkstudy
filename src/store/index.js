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
