<template>
  <!-- eslint-disable-next-line -->
  <v-alert :value="true" :type="type" dismissible outline text dense @input="onClose">
    {{ message }}
  </v-alert>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
