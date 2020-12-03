import Vue from "vue";
import VueRouter from "vue-router";
import VueRouteMiddleware from 'vue-route-middleware';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Stock from "@/views/Stock.vue";
import StockCreate from "@/views/StockCreate.vue";
import StockEdit from "@/views/StockEdit.vue";
import Report from "@/views/Report.vue";
import About from "@/views/About.vue";
import Accounting from "@/views/Accounting.vue";
import Promotion from "@/views/Promotion.vue";
import Employee from "@/views/ManageEmployee.vue";
import EmployeeEdit from "@/views/EmployeeEdit.vue";
import {authRole,authWaiter} from "./middleware/auth"
import WaiterDashboard from '@/views/WaiterDashboard.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta:{
      middlewater: [authWaiter]
    }
  }, 
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/stock",    
    name: "stock",
    component: Stock,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/stock-create",
    name: "stock-create",
    component: StockCreate,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/stock-edit/:id",
    name: "stock-edit",
    component: StockEdit,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/report",
    name: "report",
    component: Report,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    
  },
  {
    path: "/accounting",
    name: "accounting",
    component: Accounting,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/promotion",
    name: "promotion",
    component: Promotion,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/employee",
    name: "employee",
    component: Employee,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: "/employee-edit/:id",
    name: "employee-edit",
    component: EmployeeEdit,
    meta: {
      middleware: [authRole]
    }
  },
  {
    path: '/waiter/:username',
    name: 'waiter',
    component: WaiterDashboard,
    meta: {
      middleware: [authWaiter]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(VueRouteMiddleware({authRole,authWaiter}))
export default router;
