import types from './mutation-types'

export default {
  [types.SET_HMI_STATE]: (state, payload) => {
    state.hmi = payload
  },
  [types.SET_USER_STATE]: (state, payload) => {
    state.user = payload
  },
  [types.SET_AUTH_STATE]: (state, payload) => {
    state.auth = payload
  }
}
