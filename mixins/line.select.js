export default {
  data() {
    return {
      line: []
    }
  },
  created() {
    this.$axios.get(process.env.SERVICE_URL + '/line').then(res => {
      this.line = res.data
    })
  }
}
