 import {
   createRouter,
   createWebHistory
 } from 'vue-router'
 import Layout from '../layout/index';
 import Rent from '../view/rent';
 import Lend from '../view/lend';
 import dashboard from '../view/dashboard';
 import faq from '../view/faq';
 import profile from '../view/profile';


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
     component: Rent
   }, {
     path: '/lend',
     name: 'lend',
     meta: {
       title: 'lend',
       activeMenu: 2
     },
     component: Lend
   }, {
     path: '/dashboard',
     name: 'dashboard',
     meta: {
       title: 'dashboard',
       activeMenu: 3
     },
     component: dashboard
   }, {
     path: '/faq',
     name: 'faq',
     meta: {
       title: 'faq',
       activeMenu: 4
     },
     component: faq
   }, {
     path: '/profile',
     name: 'profile',
     meta: {
       title: 'profile',
       activeMenu: 4
     },
     component: profile
   }]
 }]

 const router = createRouter({
   history: createWebHistory(),
   routes: routes
 })

 export default router;