// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
/* eslint-disable no-new */
// eslint-disable-next-line no-undef
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: {
//     App,
//   },
//   template: '<App/>'
// })
import {
  createApp
} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./style/index.scss";
import App from './App'
import router from './router'
import store from "./store"

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router).mount('#app'); 