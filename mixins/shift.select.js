export default {
  data() {
    return {
      shift: []
    }
  },
  created() {
    this.$axios.get(process.env.SERVICE_URL + '/initial-shift').then(res => {
      this.shift = res.data
    })
  }
}
