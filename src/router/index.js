import Vue from "vue";
import VueRouter from "vue-router";
import VueRouteMiddleware from 'vue-route-middleware';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Product from "@/views/Product.vue";
import ProductCreate from "@/views/ProductCreate.vue";
import ProductEdit from "@/views/ProductEdit.vue";
import Report from "@/views/Report.vue";
import About from "@/views/About.vue";
import Accounting from "@/views/Accounting.vue";
import Promotion from "@/views/Promotion.vue";
import Employee from "@/views/ManageEmployee.vue";
import EmployeeEdit from "@/views/EmployeeEdit.vue";
import PromotionCreate from "@/views/PromotionCreate.vue";
import {authLogIn, authRole,authWaiter} from "./middleware/auth"
import WaiterDashboard from '@/views/WaiterDashboard.vue'
import ProductTypeCreate from '@/views/ProductTypeCreate.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta:{
      
    }
  }, 
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/product",    
    name: "product",
    component: Product,
    
  },
  {
    path: "/product-create",
    name: "product-create",
    component: ProductCreate,
    
  },
  {
    path: "/product-edit/:id",
    name: "product-edit",
    component: ProductEdit,
    
  },
  {
    path: "/report",
    name: "report",
    component: Report,
    
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
      
    }
  },
  {
    path: "/employee",
    name: "employee",
    component: Employee,
    meta: {
      
    }
  },
  {
    path: "/employee-edit/:id",
    name: "employee-edit",
    component: EmployeeEdit,
  },
  {
    path: "/promotion/promo-create",
    name: "promo-create",
    component: PromotionCreate,
    

  },
  {
    path: '/waiter/:username',
    name: 'waiter',
    component: WaiterDashboard,
  },
  {
    path: '/productType-create',
    name: 'productType-create',
    component: ProductTypeCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(VueRouteMiddleware({authLogIn,authRole,authWaiter}))
export default router;
