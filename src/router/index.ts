import * as vueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Stock from "@/views/Stock.vue";
import StockCreate from "@/views/StockCreate.vue";
import StockEdit from "@/views/StockEdit.vue";

import Report from "@/views/Report.vue";
import { useAuthStore } from "@/stores/useAuthStore";

const routes: Array<vueRouter.RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/stock",
    meta: { isSecured: true },
    name: "stock",
    component: Stock,
  },
  {
    path: "/stock-create",
    meta: { isSecured: true },
    name: "stock-create",
    component: StockCreate,
  },
  {
    path: "/stock-edit/:id",
    meta: { isSecured: true },
    name: "stock-edit",
    component: StockEdit,
  },
  {
    path: "/report",
    meta: { isSecured: true },
    name: "report",
    component: Report,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login", // page not found
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => (record.meta.isSecured ? true : false))) {
    // secure route
    if (authStore.session.isLoggedIn) {
      next();
    } else {
      next("/login");
    }

    // console.log("Debug: " + to.name?.toString())
  } else {
    // unsecure route
    if (authStore.session.isLoggedIn) {
      router.push("/stock");
    } else {
      next();
    }
  }
});

export default router;
