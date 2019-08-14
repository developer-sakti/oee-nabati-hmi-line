<template>
  <v-card flat>
    <v-card-title class="title font-weight-regular">
      {{ title }}
    </v-card-title>
    <v-card-text
      v-for="item in po"
      :key="item.po_number"
      class="cyan lighten-2 px-3"
    >
      <v-layout>
        <v-flex xs2 sm2 md3>
          Line
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.line.name }} </v-flex>
        <v-flex xs2 sm2 md3>
          SKU
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.sku.name }} </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 sm2 md3>
          Date
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ formatDate(item.date) }} </v-flex>
        <v-flex xs2 sm2 md3>
          PO Number
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.po_number }} </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 sm2 md3>
          Shift
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.shift.shift_name }} </v-flex>
        <v-flex xs2 sm2 md3>
          Target
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.target_produksi }} Carton </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 sm2 md3>
          Start
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.start_sku }} </v-flex>
        <v-flex xs2 sm2 md3>
          End
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.end_sku }} </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 sm2 md3>
          Standart CT
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.standart_ct }} minutes </v-flex>
        <v-flex xs2 sm2 md3>
          Bottle Neck CT
        </v-flex>
        <v-flex xs3 sm3 md3> : {{ item.bottleneck_ct }} minutes </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs2 sm2 md3>
          Inputed by
        </v-flex>
        <v-flex xs3 sm3 md3>
          : {{ item.supervisor.firstname + ' ' + item.supervisor.lastname }}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import datetime from '~/mixins/datetime'
export default {
  mixins: [datetime],
  props: {
    title: {
      type: String,
      required: true
    },
    po: {
      type: Array,
      required: true
    }
  }
}
</script>
