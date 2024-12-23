import { createRouter, createWebHashHistory } from "vue-router";
// import Layout from "../layout/index";
import Rent from "../view/rent";
import Lend from "../view/lend";
import dashboard from "../view/dashboard";
import faq from "../view/faq"; 
import notFound from "../view/notFound";

const routes = [
  {
    path: "/",
    meta: {
      title: "init",
      activeMenu: 0,
    },
    redirect: {
      name: "rent",
    },
  },
  {
    path: "/rent",
    name: "rent",
    meta: {
      title: "rent",
      activeMenu: 1,
    },
    component: Rent,
  },
  {
    path: "/lend",
    name: "lend",
    meta: {
      title: "lend",
      activeMenu: 2,
    },
    component: Lend,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "dashboard",
      activeMenu: 3,
    },
    component: dashboard,
  },
  {
    path: "/faq",
    name: "faq",
    meta: {
      title: "faq",
      activeMenu: 4,
    },
    component: faq,
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
      activeMenu: 7,
    },
    component: notFound,
  },
  {
    path: "/:pathMatch(.*)", // 此处需特别注意置于最底部
    meta: {
      title: "404",
      activeMenu: 8,
    },
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // 判断该路由是我配置的路由
    next();
    //  next({
    //    query: {
    //      redirect: to.fullPath// 将跳转的路由path作为参数，登录成功后跳转到该路由
    //    }
    //  })
  } else {
    next({
      path: "/404",
    });
  }
});

export default router;
