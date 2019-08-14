<template>
  <v-container grid-list-md fill-height fluid>
    <v-toolbar app flat class="transparent pt-3 px-5">
      <v-card class="round-right" width="15vw" color="primary" dark>
        <v-card-title class="pa-2 no-select">
          <v-icon size="35">
            mdi-account
          </v-icon>
          <span class="title ml-3">Operator</span>
        </v-card-title>
      </v-card>
      <v-toolbar-title class="font-weight-bold">
        <span class="ml-5 no-select">{{ hmi === null ? '' : hmi.name }}</span>
      </v-toolbar-title>
      <v-select
        v-model="lineIdSelected"
        class="ml-5 select-line title font-weight-regular no-select"
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
        <span class="title font-weight-regular no-select">rework</span>
      </v-btn>
      <v-spacer />
      <span class="title mr-3 no-select">
        {{ dateTime }}
      </span>
      <span class="title mr-5 no-select">
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
              <v-layout row class="text-xs-center no-select">
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>settings</v-icon>
                  <span class="title ml-1">Mesin</span>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>mdi-pulse</v-icon>
                  <span class="title ml-1">Aksi</span>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 xl4>
                  <v-icon>mdi-history</v-icon>
                  <span class="title ml-1">Histori</span>
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
                  class="text-xs-center no-select"
                  align-center
                >
                  <v-flex xs6 sm6 md6>
                    <span class="title ml-3">{{ mechine.name }}</span>
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-btn
                      color="primary"
                      class="no-select"
                      @click="showDowntimeDialog(mechine)"
                    >
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
                        ? ' text-xs-left subheading grey-background no-select'
                        : 'text-xs-left subheading no-select'
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
                        {{ '{ ' + histori.duration + ' minutes' + ' }' }}
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
            <span class="title no-select">Setup HMI</span>
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
                  <span class="no-select">{{ item.name }}</span>
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
                <span class="headline font-weight-bold no-select">
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
          <v-layout row justify-center class="no-select">
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
              <v-layout row>
                <v-flex xs1 sm1 md1>
                  <span class="subheading font-weight-regular">
                    Mesin
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
                    Tanggal
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
                    Kategori
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
                    label="Pilih"
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
                    label="Pilih"
                    solo
                    light
                  />
                </v-flex>

                <v-flex xs1 sm1 md1>
                  <span class="subheading font-weight-regular ml-5">
                    Alasan
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
                    label="Pilih"
                    solo
                    light
                  />
                </v-flex>
              </v-layout>
              <v-layout row align-center class="mt-3">
                <v-flex xs1 sm1 md1>
                  <span class="subheading font-weight-regular">Shift</span>
                </v-flex>
                <v-flex xs1 sm1 md1 class="text-xs-center">
                  <span class="subheading">:</span>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-select
                    class="select-option subheading"
                    :items="shiftDowntime"
                    item-text="shift_name"
                    item-value="id"
                    label="Pilih"
                    solo
                    light
                  />
                </v-flex>
                <v-flex xs1 sm1 md1>
                  <span class="subheading font-weight-regular ml-5">
                    Durasi
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
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn
            block
            color="green"
            large
            round
            class="mx-5 no-select mt-3"
            @click="storeDowntime()"
          >
            simpan
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
                <span class="headline font-weight-bold no-select">
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
          <v-layout row justify-center align-center class="no-select px-5">
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
            class="mx-5 no-select"
            @click="storeRework()"
          >
            simpan
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
      reworkValue: 0,
      lines: [],
      lineIdSelected: null,
      mechines: [],
      shiftDowntime: [],
      duration: false
    }
  },
  computed: {
    hmi() {
      return this.$store.getters.hmi
    }
  },
  watch: {
    lineIdSelected(value) {
      this.getDowntimeHistories(value)
    },
    downtimeCategoryId(value) {
      if (value !== null) {
        this.$axios
          .post(process.env.SERVICE_URL + '/downtime-reason-machine', {
            machine_id: value
          })
          .then(res => {
            if (res.status == 201) {
              this.downtimeReasons = res.data
            }
          })
      }
    },
    downtimeDate(value) {
      this.downtimePOList = []
      this.$axios
        .get(
          process.env.SERVICE_URL +
            '/rencana-produksi/find?date=' +
            value +
            '&line_id=' +
            this.lineIdSelected
        )
        .then(res => {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              this.downtimePOList.push({
                id: res.data[i].id,
                po:
                  res.data[i].po_number +
                  ' ( ' +
                  res.data[i].shift.shift_name +
                  ' )'
              })
            }
          }
        })
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
              date: res.data[i].created_at.substring(0, 10),
              time: res.data[i].created_at.substring(11, 19)
            })
          }
        })
    },
    showKeyboard(e) {
      this.input = e.target
      this.downtimeDuration = e.target
      this.reworkValue = e.target
      this.keyboard.layout = e.target.dataset.layout
      this.keyboard.visible = true
    },
    accept(text) {
      this.input = text
      this.downtimeDuration = text
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
      this.downtimeCategoryId = null
      this.downtimeReasons = []
      this.downtimeReasonId = null
      this.keyboard.visible = false
    },
    storeDowntime() {
      if (!this.keyboard.visible) {
        if (
          this.downtimeCategoryId === null ||
          this.downtimeReasonId === null ||
          this.downtimePOId === null ||
          this.downtimeDuration === null
        ) {
          this.alert = {
            status: true,
            type: 'warning',
            message: 'Semua field harus diisi'
          }
        } else {
          this.$axios
            .post(process.env.SERVICE_URL + '/downtime', {
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
                  text: 'Data downtime ditambahkan',
                  color: 'success'
                }
                this.getDowntimeHistories()
              } else {
                this.snackbar = {
                  status: true,
                  text: 'Data downtime gagal ditambahkan',
                  color: 'error'
                }
              }
            })
        }
      } else {
        this.alert = {
          status: true,
          type: 'warning',
          message: 'Tutup Virtual Keyboard dulu baru klik simpan'
        }
      }
    },
    storeRework() {
      if (!this.keyboard.visible) {
        if (this.poActiveId === null) {
          this.alert = {
            status: true,
            type: 'warning',
            message: 'Tidak ada PO Aktif di line ini'
          }
        } else if (this.reworkValue == 0) {
          this.alert = {
            status: true,
            type: 'warning',
            message: 'Rework value harus diisi'
          }
        } else {
          this.$axios
            .post(process.env.SERVICE_URL + '/lakban/rework-line', {
              total: this.reworkValue,
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
          message: 'Tutup Virtual Keyboard dulu baru klik simpan'
        }
      }
    },
    showReworkDialog() {
      this.reworkDialog = true
    },
    resetReworkDialog() {
      this.reworkValue = 0
      this.downtimeDuration = 0
      this.reworkDialog = false
    },
    convertMinutes(time) {
      const temp = time.split(':')
      const minute = temp[0] * 60 + temp[1] + temp[2] / 60
      return minute
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
