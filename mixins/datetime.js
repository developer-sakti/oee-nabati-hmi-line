export default {
  data() {
    return {
      currentTime: null,
      currentDate: null,
      currentDateTime: null,
      currentDayDateTime: null,
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
      day: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  },
  created() {
    const date = new Date()

    this.currentDate =
      date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()

    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    const minute =
      date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    const second =
      date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
    this.currentTime = hour + ':' + minute + ':' + second

    this.currentDateTime =
      this.formatDate(this.currentDate) + ' ' + this.currentTime

    this.currentDayDateTime =
      this.day[date.getDay()] + ', ' + this.currentDate + ' ' + this.currentTime
  },
  methods: {
    formatDate(date) {
      const temp = date.split('-')
      return temp[2] + ' ' + this.month[parseInt(temp[1]) - 1] + ' ' + temp[0]
    }
  }
}
