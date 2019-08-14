export default {
  data() {
    return {
      month: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dateTime: null,
      clock: null,
      currentDate: null,
      currentTime: null,
      timeInterval: '',
      snackbar: {
        status: false,
        text: '',
        color: ''
      },
      alert: {
        status: false,
        message: '',
        type: 'info'
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.setDateTime()
    }, 1000)
    this.setDateTime()
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDateTime() {
      const date = new Date()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      this.currentDate = date.getFullYear() + '-' + month + '-' + date.getDate()
      const currentDate =
        this.days[date.getDay()] +
        ', ' +
        date.getDate() +
        '-' +
        this.month[date.getMonth()] +
        '-' +
        date.getFullYear()
      const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
      const minute =
        date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      const second =
        date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
      this.currentTime = hour + ':' + minute + ':' + second
      this.dateTime = currentDate + ' ' + this.currentTime
      this.clock = hour + ':' + minute
    },
    showSnackbar(snackbar) {
      this.snackbar = snackbar
    },
    onDismissed() {
      this.alert = {
        status: false,
        message: '',
        type: 'info'
      }
    }
  }
}
