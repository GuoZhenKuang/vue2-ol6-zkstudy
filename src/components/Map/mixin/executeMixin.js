
export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      excuteMapMethod (name, ...params) {
        const methodProxy = {
          method: name,
          params
        }
        this.$store.commit('addExecuteFunName', methodProxy)
      }
    },
    computed: {
    },
    watch: {
    }
  }
  