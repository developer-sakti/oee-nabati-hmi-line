import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = () => ({
  hmi: null,
  user: null,
  auth: null
})

export default {
  state,
  actions,
  getters,
  mutations
}
