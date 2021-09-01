import {
  createStore
} from 'vuex'
import {
  header,
  login
} from './modules'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    header,
  }
})

export default store