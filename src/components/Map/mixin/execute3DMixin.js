/*
 * @Author: 阿匡
 * @Date: 2022-01-27 14:54:40
 * @LastEditTime: 2022-01-27 15:00:14
 * @LastEditors: 阿匡
 * @Description: 三维的执行者
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\execute3DMixin.js
 * @仅为学习使用
 */
export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      excute3DMapMethod (name, ...params) {
        const methodProxy = {
          method: name,
          params
        }
        this.$store.commit('addExecute3DFunName', methodProxy)
      }
    },
    computed: {
    },
    watch: {
    }
  }
