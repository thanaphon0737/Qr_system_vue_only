import Vue from "vue";
import VueRouter from "vue-router";
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
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  }, 
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/stock",    
    name: "stock",
    component: Stock
  },
  {
    path: "/stock-create",
    name: "stock-create",
    component: StockCreate
  },
  {
    path: "/stock-edit/:id",
    name: "stock-edit",
    component: StockEdit
  },
  {
    path: "/report",
    meta: { isSecured: true },
    name: "report",
    component: Report
  },
  {
    path: "/about",
    meta: { isSecured: false },
    name: "about",
    component: About
  },
  {
    path: "/accounting",
    meta: { isSecured: false },
    name: "accounting",
    component: Accounting
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
    component: Promotion
  },
  {
    path: "/employee",
    name: "employee",
    component: Employee
  },
  {
    path: "/employee-edit/:id",
    name: "employee-edit",
    component: EmployeeEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
