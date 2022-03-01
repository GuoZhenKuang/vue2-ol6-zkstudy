export default {
    computed: {
      getExecuteFunName() {
        return this.$store.state.executeMehod
      }
    },
    watch: {
      getExecuteFunName(val) {
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
            this.$store.commit('setExecuteFunName', [])
          }
      }
    }
  }
  