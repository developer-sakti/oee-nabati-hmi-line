<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center row wrap>
          <v-flex xs10 sm8 md6>
            <v-card class="elevation-5 px-5 pt-3">
              <v-card-title>
                <v-layout justify-center>
                  <v-flex xs12 sm8 md6>
                    <v-responsive>
                      <v-img
                        src="/mvl.png"
                        max-width="200"
                        max-height="120"
                        class="text-xs-center"
                      />
                    </v-responsive>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text class="py-0">
                <alert
                  v-if="alert.status"
                  :message="alert.message"
                  :type="alert.type"
                />
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="form.username"
                    :rules="[rules.required]"
                    prepend-inner-icon="person"
                    label="Username"
                    type="text"
                    class="grey-field"
                    data-layout="normal"
                    solo
                    flat
                    required
                    @focus="show"
                  />
                  <v-text-field
                    v-model="form.password"
                    :rules="[rules.required]"
                    prepend-inner-icon="lock"
                    solo
                    flat
                    class="grey-field"
                    label="Password"
                    type="password"
                    data-layout="normal"
                    required
                    @focus="show"
                  />
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12 class="pb-3">
                      <v-btn
                        block
                        color="primary"
                        large
                        :loading="loading"
                        @click="login()"
                      >
                        Login
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-layout row wrap>
                  <v-flex xs8 sm9 md10 class="text-xs-right">
                    <span class="mr-3">Supported by</span>
                  </v-flex>
                  <v-flex xs4 sm3 md2>
                    <v-responsive>
                      <v-img src="/logo.png" />
                    </v-responsive>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <vue-touch-keyboard
              v-if="keyboard.visible"
              :options="keyboard.ops"
              :layout="keyboard.layout"
              :cancel="hide"
              :accept="accept"
              :input="input"
              :next="next"
              class="mt-3"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import defaultMixins from '~/mixins/default.mixins'
export default {
  layout: 'none',
  mixins: [defaultMixins],
  data() {
    return {
      keyboard: {
        visible: false,
        ops: {
          useKbEvents: false,
          preventClickEvent: false
        },
        layout: 'normal'
      },
      input: null,
      form: {
        username: null,
        password: null,
        roleId: 2
      },
      valid: true,
      loading: false,
      rules: {
        required: value => !!value || 'Field is required'
      }
    }
  },
  methods: {
    show(e) {
      this.input = e.target
      this.keyboard.layout = e.target.dataset.layout
      this.keyboard.visible = true
    },
    hide() {
      this.keyboard.visible = false
    },
    accept() {
      this.hide()
    },
    login() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.loading = true
        this.$axios
          .post(process.env.SERVICE_URL + '/auth/login', this.form)
          .then(res => {
            if (res.status == 201) {
              this.$store.dispatch('setAuth', res.data)
              this.$router.push('/')
            } else {
              this.alert = {
                status: true,
                message: 'Login failed',
                type: 'error'
              }
            }
            this.loading = false
          })
          .catch(() => {
            this.alert = {
              status: true,
              message: 'Login failed',
              type: 'error'
            }
            this.loading = false
          })
      }
    }
  }
}
</script>
<style lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
.theme--light.v-text-field--solo.grey-field > .v-input__control > .v-input__slot {
  border-radius: 5px !important;
  background: #e0e0e0 !important;
}
</style>
