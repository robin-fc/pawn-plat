// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias. 
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


// if(window.ethereum && localStorage.token){
//   console.log('MateMask')
//   ethereum.on("accountsChanged", function(accounts) {
//     if(accounts.length){
//       console.log('metamask账户切换',accounts[0]);//一旦切换metamask账号这里就会执行
//       console.log('metamask网络',window.ethereum.networkVersion);
//       if(window.ethereum.networkVersion == Config.networkVersion){
//         localStorage.setItem('token',accounts[0])
//         Util.login(accounts[0])
//       }else{
//         Util.loginOut()
//       }
//     }
//   });
// }

// if(localStorage.token){
//   // 用户切换网络
//   ethereum.on("networkChanged", function(networkIDstring) {
//     console.log('MateMask链接网络')
//     if(networkIDstring !==  Config.networkVersion) {
//       localStorage.removeItem('token')
//       Util.loginOut()
//       console.log('MateMask链接网络', networkIDstring)
//     }
//   })
// }