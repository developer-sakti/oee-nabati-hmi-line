<template>
  <v-container grid-list-md fill-height fluid class="no-select">
    <v-toolbar app flat class="transparent pt-3 px-5">
      <v-menu offset-y>
        <template slot="activator">
          <v-btn large color="primary" class="pl-1 pr-2">
            <v-icon size="30">
              mdi-account
            </v-icon>
            <span class="title ml-3 text-none">{{
              user.firstname + ' ' + user.lastname
            }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logout()">
            <v-list-tile-title>
              Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-title class="font-weight-bold">
        <span class="ml-5 ">{{ hmi === null ? '' : hmi.name }}</span>
      </v-toolbar-title>
      <v-select
        v-model="lineIdSelected"
        class="ml-5 select-line title font-weight-regular "
        :items="lines"
        item-text="name"
        item-value="id"
        solo
      />
      <v-btn
        large
        round
        color="yellow"
        class="ml-5"
        @click="showReworkDialog()"
      >
        <span class="title font-weight-regular ">rework</span>
      </v-btn>
      <v-spacer />
      <span class="title mr-3 ">
        {{ dateTime }}
      </span>
      <span class="title mr-5 ">
        {{ shift }}
      </span>
    </v-toolbar>
    <v-layout row class="px-5">
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card class="card-rounded mx-3">
          <v-card-text class="pa-0 ma-0">
            <v-snackbar
              v-model="snackbar.status"
              :color="snackbar.color"
              :timeout="3000"
              bottom
              left
            >
              {{ snackbar.text }}
            </v-snackbar>
            <v-toolbar flat dark color="primary" class="round-top px-3">
              <v-layout row class="text-xs-center ">
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>settings</v-icon>
                  <span class="title ml-1">Machine</span>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>mdi-pulse</v-icon>
                  <span class="title ml-1">Action</span>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>mdi-history</v-icon>
                  <span class="title ml-1">History</span>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-card-text>
          <v-card-text>
            <v-layout row class="text-xs-center">
              <v-flex xs8 sm8 md8 lg8 xl8>
                <v-layout
                  v-for="mechine in mechines"
                  :key="mechine.id"
                  row
                  class="text-xs-center "
                  align-center
                >
                  <v-flex xs6 sm6 md6>
                    <span class="title ml-3">{{ mechine.name }}</span>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-btn color="primary" @click="showDowntimeDialog(mechine)">
                      downtime
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs4 sm4 md4 class="pr-3 history-wrapper">
                <vue-scroll :ops="scrollOptions">
                  <v-layout
                    v-for="(histori, index) in downtimeHistories"
                    :key="index"
                    column
                    :class="
                      (index + 1) % 2 == 0
                        ? ' text-xs-left subheading grey-background '
                        : 'text-xs-left subheading '
                    "
                  >
                    <v-flex class="pl-5 pb-0 mt-1">
                      <span>{{ index + 1 }}. </span>
                      <span class="ml-2">{{ histori.type }} |</span>
                      <span class="red--text title">{{ histori.mechine }}</span>
                    </v-flex>
                    <v-flex class="ml-4 pl-5 py-0">
                      <span>
                        {{ histori.reason }}
                        {{
                          '{ ' +
                            histori.duration +
                            ' minutes' +
                            ' }' +
                            ' | ' +
                            histori.shift
                        }}
                      </span>
                    </v-flex>
                    <v-flex class="ml-4 pl-5 pt-0">
                      <span>{{ histori.date }} | {{ histori.time }}</span>
                    </v-flex>
                  </v-layout>
                </vue-scroll>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-fab-transition>
          <!-- eslint-disable-next-line -->
          <v-btn class="mr-5 mb-5"  absolute right bottom fab>
            <v-icon
              size="40"
              class="transparent"
              :color="connected ? 'success' : 'error'"
            >
              {{ connected ? 'wifi' : 'wifi_off' }}
            </v-icon>
          </v-btn>
        </v-fab-transition>
      </v-flex>
    </v-layout>
    <v-dialog v-model="hmiTypeDialog" max-width="30vw" persistent>
      <v-card>
        <v-card-title class="pa-0 ma-0">
          <v-toolbar color="primary" dark>
            <v-spacer />
            <span class="title ">Setup HMI</span>
            <v-spacer />
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-list class="text-xs-center">
            <v-list-tile
              v-for="(item, index) in hmis"
              :key="index"
              @click="selectHMI(item)"
            >
              <v-layout>
                <v-flex>
                  <span>{{ item.name }}</span>
                </v-flex>
              </v-layout>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="downtimeDialog" max-width="70vw" persistent>
      <v-card color="primary" dark flat>
        <v-card-title class="round-top py-0">
          <v-spacer />
          <div class="title-wrapper px-3 pb-2">
            <v-layout column class="text-xs-center">
              <v-flex>
                <span class="headline font-weight-bold ">
                  Downtime
                </span>
              </v-flex>
            </v-layout>
          </div>
          <v-spacer />
          <v-btn icon class="mb-3" @click="resetDowntimeDialog()">
            <v-icon size="30">
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-0">
          <v-layout row justify-center>
            <v-flex xs12 sm12 md12 class="px-3">
              <v-layout justify-center row>
                <v-flex v-if="alert.status" xs12 sm12 md12>
                  <alert
                    :message="alert.message"
                    :type="alert.type"
                    @dismissed="onDismissed"
                  />
                </v-flex>
              </v-layout>
              <v-form>
                <v-layout row>
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular">
                      Machine
                    </span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <span class="subheading font-weight-bold">{{
                      downtimeMachine === null ? '' : downtimeMachine.name
                    }}</span>
                  </v-flex>
                </v-layout>
                <v-layout row align-center class="mt-3">
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular">
                      Date
                    </span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-menu>
                      <template slot="activator">
                        <v-btn light block round>
                          <span class="text-none">{{ downtimeDate }}</span>
                        </v-btn>
                      </template>
                      <v-date-picker v-model="downtimeDate" no-title />
                    </v-menu>
                  </v-flex>
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular ml-5">
                      Category
                    </span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                      v-model="downtimeCategoryId"
                      class="select-option subheading"
                      :items="downtimeCategories"
                      item-text="category"
                      item-value="id"
                      label="Select"
                      solo
                      light
                    />
                  </v-flex>
                </v-layout>
                <v-layout row align-center class="mt-3">
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular">
                      Shift
                    </span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                      v-model="downtimeShiftId"
                      class="select-option subheading"
                      :items="shiftDowntime"
                      item-text="shift_name"
                      item-value="id"
                      label="Select"
                      solo
                      light
                    />
                  </v-flex>
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular ml-5">
                      Reason
                    </span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                      v-model="downtimeReasonId"
                      class="select-option subheading"
                      :items="downtimeReasons"
                      item-text="reason"
                      item-value="id"
                      label="Select"
                      solo
                      light
                    />
                  </v-flex>
                </v-layout>
                <v-layout row align-center class="mt-3">
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular">PO</span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-select
                      v-model="downtimePOId"
                      class="select-option subheading"
                      :items="downtimePOList"
                      item-text="po"
                      item-value="id"
                      label="Select"
                      solo
                      light
                    />
                  </v-flex>
                  <v-flex xs1 sm1 md1>
                    <span class="subheading font-weight-regular ml-5">
                      Duration
                    </span>
                  </v-flex>
                  <v-flex xs1 sm1 md1 class="text-xs-center">
                    <span class="subheading">:</span>
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-menu
                      ref="duration"
                      v-model="duration"
                      full-width
                      :close-on-content-click="false"
                      :return-value.sync="downtimeDuration"
                    >
                      <template slot="activator">
                        <v-text-field
                          v-model="downtimeDuration"
                          solo
                          class="round-text-field"
                          light
                          readonly
                          placeholder="--:--:--"
                        />
                      </template>
                      <v-time-picker
                        v-if="duration"
                        v-model="downtimeDuration"
                        format="24hr"
                        use-seconds
                        reactive
                        @click:second="$refs.duration.save(downtimeDuration)"
                      />
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn
            block
            color="green"
            large
            round
            class="mx-5  mt-3"
            @click="storeDowntime()"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="reworkDialog" max-width="50vw" persistent>
      <v-card color="primary" dark flat>
        <v-card-title class="round-top py-0">
          <v-spacer />
          <div class="title-wrapper px-3 pb-2">
            <v-layout column class="text-xs-center">
              <v-flex>
                <span class="headline font-weight-bold ">
                  Rework
                </span>
              </v-flex>
            </v-layout>
          </div>
          <v-spacer />
          <v-btn icon class="mb-5" @click="resetReworkDialog()">
            <v-icon size="30">
              mdi-close-box-outline
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-5">
          <v-layout justify-center row class="mb-3">
            <v-flex v-if="alert.status" xs12 sm12 md12>
              <alert
                :message="alert.message"
                :type="alert.type"
                @dismissed="onDismissed"
              />
            </v-flex>
          </v-layout>
          <v-layout row justify-center align-center class=" px-5">
            <v-flex xs5 sm5 md5 class="pl-5">
              <span class="subheading font-weight-regular">
                Value
              </span>
            </v-flex>
            <v-flex xs1 sm1 md1 class="text-xs-center">
              <span class="subheading">:</span>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-text-field
                v-model="reworkValue"
                solo
                class="round-text-field .rework-input"
                light
                type="number"
                data-layout="numeric"
                @focus="showKeyboard"
              >
                <template v-slot:append>
                  <span class="black--text mr-3">pcs</span>
                </template>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm12 md12 class="mt-3">
              <vue-touch-keyboard
                v-if="keyboard.visible"
                :options="keyboard.ops"
                :layout="keyboard.layout"
                :cancel="hideKeyboard"
                :accept="accept"
                :input="input"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn
            block
            color="green"
            large
            round
            class="mx-5 "
            @click="storeRework()"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Default from '~/mixins/default.mixins'
export default {
  layout: 'none',
  middleware: ['initHmi', 'auth'],
  mixins: [Default],
  data() {
    return {
      keyboard: {
        visible: false,
        ops: {
          useKbEvents: false,
          preventClickEvent: false
        },
        layout: 'numeric'
      },
      scrollOptions: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true
        },
        bar: {
          keepShow: true,
          background: 'lightblue',
          opacity: 1,
          minSize: 0.1,
          size: '20px'
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          verticalNativeBarPos: 'right'
        }
      },
      hmis: [],
      connected: true,
      shift: 'Shift 1',
      poActiveId: null,
      downtimeDialog: false,
      downtimeDate: null,
      downtimePOId: null,
      downtimePOList: [],
      downtimeCategories: [],
      downtimeCategoryId: null,
      downtimeMachine: null,
      downtimeReasons: [],
      downtimeReasonId: null,
      downtimeDuration: null,
      downtimeHistories: [],
      hmiTypeDialog: false,
      reworkDialog: false,
      reworkCategorySelected: null,
      reworkValue: null,
      lines: [],
      lineIdSelected: null,
      mechines: [],
      shiftDowntime: [],
      downtimeShiftId: null,
      duration: false
    }
  },
  computed: {
    hmi() {
      return this.$store.getters.hmi
    },
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    lineIdSelected(value) {
      this.getDowntimeHistories(value)
    },
    downtimeCategoryId(value) {
      if (value !== null) {
        this.$axios
          .get(
            process.env.SERVICE_URL +
              '/downtime-reason-machine/category?machine_id=' +
              this.downtimeMachine.id +
              '&categori_id=' +
              value
          )
          .then(res => {
            if (res.status == 200) {
              this.downtimeReasons = res.data
            }
          })
      }
    },
    downtimeDate(value) {
      if (this.downtimeShiftId !== null) {
        this.getPOList()
      }
    },
    downtimeShiftId(value) {
      this.getPOList()
    }
  },
  mounted() {
    setInterval(() => {
      if (this.hmi !== null) {
        this.getPOActive()
      }
    }, 5000)
  },
  created() {
    if (this.hmi === null) {
      this.getHmiList()
      this.hmiTypeDialog = true
    } else {
      this.setupHMI()
    }
  },
  methods: {
    getHmiList() {
      this.$axios.get(process.env.SERVICE_URL + '/hmi').then(res => {
        if (res.status == 200) {
          this.hmis = res.data
        }
      })
    },
    selectHMI(hmi) {
      this.$axios
        .get(process.env.SERVICE_URL + '/hmi/lines/machines')
        .then(res => {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              if (hmi.id == res.data[i].id) {
                this.lines = res.data[i].lines
                this.lineIdSelected = res.data[i].lines[0].id
                this.mechines = res.data[i].machines
                this.getPOActive()
                this.getDowntimeHistories(this.lineIdSelected)
              }
            }
          }
        })
      this.$store.dispatch('saveHmi', hmi)
      this.hmiTypeDialog = false
    },
    setupHMI() {
      this.$axios
        .get(process.env.SERVICE_URL + '/hmi/lines/machines')
        .then(res => {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              if (this.hmi.id == res.data[i].id) {
                this.lines = res.data[i].lines
                this.lineIdSelected = res.data[i].lines[0].id
                this.mechines = res.data[i].machines
                this.getPOActive()
              }
            }
          }
        })
    },
    getPOActive() {
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/rencana-produksi/active?date=' +
            this.currentDate +
            '&time=' +
            this.currentTime +
            '+&line_id=' +
            this.lineIdSelected
        )
        .then(res => {
          if (res.status == 200) {
            this.connected = true
            if (res.data === '') {
              this.shift = 'Shift -'
              this.poActiveId = null
            } else {
              this.poActiveId = res.data.id
              this.shift = res.data.shift.shift_name
            }
          } else {
            this.connected = false
            this.poActiveId = null
          }
        })
    },
    getPOList() {
      this.downtimePOList = []
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/rencana-produksi/find/shift?date=' +
            this.downtimeDate +
            '&shift_id=' +
            this.downtimeShiftId +
            '&line_id=' +
            this.lineIdSelected
        )
        .then(res => {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              this.downtimePOList.push({
                id: res.data[i].id,
                po: res.data[i].po_number
              })
            }
          }
        })
    },
    getDowntimeHistories(id) {
      this.downtimeHistories = []
      this.$axios
        .get(process.env.SERVICE_URL + '/downtime/history?line_id=' + id)
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.downtimeHistories.push({
              type: res.data[i].downtime_category.category,
              mechine: res.data[i].machine.name,
              duration: res.data[i].duration,
              shift: res.data[i].shift.shift_name,
              date: res.data[i].created_at.substring(0, 10),
              time: res.data[i].created_at.substring(11, 19)
            })
          }
        })
    },
    showKeyboard(e) {
      this.input = e.target
      this.reworkValue = e.target
      this.keyboard.layout = e.target.dataset.layout
      this.keyboard.visible = true
    },
    accept(text) {
      this.input = text
      this.reworkValue = text
      this.hideKeyboard()
    },
    hideKeyboard() {
      this.keyboard.visible = false
    },
    showDowntimeDialog(mechine) {
      this.downtimeMachine = mechine
      this.$axios
        .get(process.env.SERVICE_URL + '/downtime-category')
        .then(res => {
          if (res.status == 200) {
            this.downtimeCategories = res.data
          }
        })
      this.$axios.get(process.env.SERVICE_URL + '/initial-shift').then(res => {
        if (res.status == 200) {
          this.shiftDowntime = res.data
        }
      })
      this.downtimeDate = this.currentDate
      this.downtimeDialog = true
    },
    resetDowntimeDialog() {
      this.downtimeMachine = null
      this.downtimeDialog = false
      this.downtimeCategories = []
      this.downtimePOId = null
      this.downtimeDuration = null
      this.downtimeShiftId = null
      this.downtimeCategoryId = null
      this.downtimeReasons = []
      this.downtimeReasonId = null
      this.keyboard.visible = false
      this.alert = {
        status: false,
        type: 'info',
        message: ''
      }
    },
    allFieldFilled() {
      if (
        this.downtimeDuration === null ||
        this.downtimeReasonId === null ||
        this.downtimeShiftId === null
      ) {
        return false
      } else {
        return true
      }
    },
    validateDowntimeForm() {
      if (this.downtimeCategoryId !== null) {
        if (this.downtimeCategoryId == 1) {
          if (this.allFieldFilled()) {
            return true
          } else {
            this.alert = {
              status: true,
              type: 'warning',
              message: 'All field are required except PO for Planned Downtime'
            }
            return false
          }
        } else if (this.allFieldFilled()) {
          return true
        } else {
          this.alert = {
            status: true,
            type: 'warning',
            message: 'All field are required'
          }
          return false
        }
      } else if (!this.allFieldFilled()) {
        this.alert = {
          status: true,
          type: 'warning',
          message: 'All field are required'
        }
        return false
      } else {
        return true
      }
    },
    storeDowntime() {
      if (this.validateDowntimeForm()) {
        this.$axios
          .post(process.env.SERVICE_URL + '/downtime', {
            date: this.downtimeDate,
            shiftId: this.downtimeShiftId,
            lineId: this.lineIdSelected,
            duration: this.convertMinutes(this.downtimeDuration),
            rencanaProduksiId: this.downtimePOId,
            machineId: this.downtimeMachine.id,
            downtimeCategoryId: this.downtimeCategoryId,
            downtimeReasonId: this.downtimeReasonId
          })
          .then(res => {
            if (res.data.success) {
              this.resetDowntimeDialog()
              this.snackbar = {
                status: true,
                text: 'Add Downtime succesfully',
                color: 'success'
              }
              this.getDowntimeHistories(this.lineIdSelected)
            } else {
              this.snackbar = {
                status: true,
                text: 'Add downtime failed',
                color: 'error'
              }
            }
          })
      }
    },
    storeRework() {
      if (!this.keyboard.visible) {
        if (this.poActiveId === null) {
          this.alert = {
            status: true,
            type: 'warning',
            message: 'There is no Production order in this line'
          }
        } else if (this.reworkValue == 0) {
          this.alert = {
            status: true,
            type: 'warning',
            message: 'Rework value is required'
          }
        } else {
          this.$axios
            .patch(process.env.SERVICE_URL + '/rencana-produksi/rework-line', {
              total: parseFloat(this.reworkValue),
              rencanaProduksiId: this.poActiveId
            })
            .then(res => {
              if (res.data.success) {
                this.resetReworkDialog()
                this.snackbar = {
                  status: true,
                  text: 'Data rework ditambahkan',
                  color: 'success'
                }
              } else {
                this.snackbar = {
                  status: true,
                  text: 'Data rework gagal ditambahkan',
                  color: 'error'
                }
              }
            })
        }
      } else {
        this.alert = {
          status: true,
          type: 'warning',
          message: 'Close keyboard then click save'
        }
      }
    },
    showReworkDialog() {
      if (this.poActiveId === null) {
        this.snackbar = {
          status: true,
          text: 'There is no active Production Order',
          color: 'info'
        }
      } else {
        this.reworkDialog = true
      }
    },
    resetReworkDialog() {
      this.reworkValue = null
      this.downtimeDuration = 0
      this.reworkDialog = false
      this.alert = {
        status: false,
        type: 'info',
        message: ''
      }
    },
    convertMinutes(time) {
      const temp = time.split(':')
      const minute =
        parseInt(temp[0]) * 60 + parseInt(temp[1]) + parseInt(temp[2]) / 60
      return minute
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.select-line {
  max-width: 12vw;
}

.select-line .v-input__control .v-input__slot {
  margin: 0px;
  border-radius: 20px !important;
  background-color: yellow !important;
}

.select-line .v-input__control .v-input__sl smallot .v-select__slot {
  padding-left: 2vw;
}

.select-option .v-input__control .v-input__slot {
  margin: 0px;
  border-radius: 20px !important;
  background-color: #e5e5e5 !important;
}

.__bar-wrap-is-vertical {
  right: 14px !important;
}

.history-wrapper {
  max-height: 60vh;
  border-left: 2px solid grey;
}
.title-wrapper {
  border-bottom: 3px solid white;
}
.downtime-dialog {
  border-radius: 10px;
}
.v-text-field.v-text-field--solo .v-input__prepend-outer {
  margin: 0px 5px 0px 0px !important;
}
.v-text-field.v-text-field--solo .v-input__append-outer {
  margin: 0px 0px 0px 5px !important;
}
.vue-touch-keyboard .keyboard .key.next.featured {
  display: none;
}
</style>
