import {
  createStore
} from 'vuex'
import module from './modules'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: module
})

export default store