import types from './mutation-types'

export default {
  nuxtClientInit({ commit }) {
    const token = localStorage.getItem('auth')
    if (token !== null) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (token !== undefined) {
        commit(types.SET_AUTH_STATE, token)
        commit(types.SET_USER_STATE, user)
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },
  checkHMI({ commit }, req) {
    const hmi = JSON.parse(localStorage.getItem('hmi'))
    commit(types.SET_HMI_STATE, hmi)
  },
  setHmi({ commit }, payload) {
    commit(types.SET_HMI_STATE, payload)
  },
  saveHmi({ commit }, payload) {
    localStorage.setItem('hmi', JSON.stringify(payload))
    commit(types.SET_HMI_STATE, payload)
  },
  setAuth({ commit }, payload) {
    commit(types.SET_AUTH_STATE, payload.accessToken)
    commit(types.SET_USER_STATE, payload.user)
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('auth', payload.accessToken)
  },
  logout({ commit }) {
    commit(types.SET_AUTH_STATE, null)
    commit(types.SET_USER_STATE, null)
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
  }
}
