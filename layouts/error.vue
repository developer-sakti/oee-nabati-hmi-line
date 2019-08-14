<template>
  <v-layout align-center justify-center fill-height class="bg-white">
    <v-flex>
      <v-layout row justify-center class="primary--text">
        <v-flex xs8 sm8 md6 text-xs-center>
          <span class="headline">
            404 Not found
          </span>
        </v-flex>
      </v-layout>
      <v-layout row justify-center class="mt-3">
        <v-flex xs8 sm8 md6 text-xs-center>
          <v-btn large class="primary font-weight-bold text-none" to="/home">
            Back to
            <v-icon right dark size="28">mdi-home</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  layout: 'none'
}
</script>
<style>
.bg-white {
  background: #ffffff !important;
}
</style>
