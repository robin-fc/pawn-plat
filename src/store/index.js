import { createStore } from 'vuex'
 import {
   header,
   map
 } from './modules'

 const store = createStore({
   state: {},
   mutations: {},
   actions: {},
   modules: {
     map,
     header,
   }
 })

 export default store