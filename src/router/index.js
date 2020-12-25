import Vue from "vue";
import VueRouter from "vue-router";
import VueRouteMiddleware from 'vue-route-middleware';
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Product from "@/views/Manager/Product.vue";
import ProductCreate from "@/views/Manager/ProductCreate.vue";
import ProductEdit from "@/views/Manager/ProductEdit.vue";
import Report from "@/views/Manager/Report.vue";
import About from "@/views/About.vue";
import Accounting from "@/views/Manager/Accounting.vue";
import Promotion from "@/views/Manager/Promotion.vue";
import Employee from "@/views/Manager/ManageEmployee.vue";
import EmployeeEdit from "@/views/Manager/EmployeeEdit.vue";
import PromotionCreate from "@/views/Manager/PromotionCreate.vue";
import WaiterDashboard from '@/views/WaiterDashboard.vue';
import ProductTypeCreate from '@/views/Manager/ProductTypeCreate.vue';
import ChefDashboard from '@/views/ChefDashboard';
import CustomerDashboard from '@/views/Customer/CustomerDashboard';
import productInfo from '@/views/Customer/productInfo';
import CashierDashboard from '@/views/CashierDashboard';
import OrderInfo from '@/views/Manager/OrderInfo'
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
  },
  {
    path: '/order-info/:id',
    name: 'order-info',
    component: OrderInfo
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
    path: '/chef/:username',
    name: 'chef',
    component: ChefDashboard,
  },
  {
    path: '/cashier/:username',
    name: 'cashier',
    component: CashierDashboard,
  },
  {
    path: '/customer/:id',
    name: 'customer',
    component: CustomerDashboard,
  },
  {
    path: '/productInfo/:id',
    name: 'productInfo',
    component: productInfo
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
export default router;
