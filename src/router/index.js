 import {
   createRouter,
   createWebHistory
 } from 'vue-router'
 import Layout from '../layout/index'

 const routes = [{
   path: '/',
   name: 'layout',
   redirect: '/rent',
   meta: {
     title: 'layout',
     requireAuth: false
   },
   component: Layout,
   children: [{
     path: '/rent',
     name: 'rent',
     meta: {
       title: 'rent',
       activeMenu: 1
     },
     component: () => import('../view/rent')
   }, {
     path: '/lend',
     name: 'lend',
     meta: {
       title: 'lend',
       activeMenu: 2
     },
     component: () => import('../view/lend')
   }, {
     path: '/myDashboard',
     name: 'myDashboard',
     meta: {
       title: 'myDashboard',
       activeMenu: 3
     },
     component: () => import('../view/myDashboard')
   }, {
     path: '/faq',
     name: 'faq',
     meta: {
       title: 'faq',
       activeMenu: 4
     },
     component: () => import('../view/faq')
   }]
 }]

 const router = createRouter({
   history: createWebHistory(),
   routes: routes
 })

 export default router;