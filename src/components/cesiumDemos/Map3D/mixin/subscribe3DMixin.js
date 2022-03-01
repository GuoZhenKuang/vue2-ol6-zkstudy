/*
 * @Author: 阿匡
 * @Date: 2022-01-27 14:55:18
 * @LastEditTime: 2022-01-27 15:00:03
 * @LastEditors: 阿匡
 * @Description: 三维的订阅者
 * @FilePath: \vue2-ol-zkstudy\src\components\Map\mixin\subscribe3DMixin.js
 * @仅为学习使用
 */
export default {
    computed: {
      get3DExecuteFunName() {
        return this.$store.state.execute3DMehod
      }
    },
    watch: {
      get3DExecuteFunName(val) {
        if (val.length) {
            val.forEach(methodProxy => {
                try {
                  //这里做了一个方法代理
                  this[methodProxy.method](...methodProxy.params)
                } catch (err) {
                  console.error(err)
                }
            })
            // 执行完之后置空
            this.$store.commit('set3DExecuteFunName', [])
          }
      }
    }
  }
  