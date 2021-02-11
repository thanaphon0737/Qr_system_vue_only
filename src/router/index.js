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
import PromotionEdit from "@/views/Manager/PromotionEdit.vue";
import WaiterDashboard from '@/views/WaiterDashboard.vue';
import ProductTypeCreate from '@/views/Manager/ProductTypeCreate.vue';
import ChefDashboard from '@/views/ChefDashboard';
import CustomerDashboard from '@/views/Customer/CustomerDashboard';
import productInfo from '@/views/Customer/productInfo';
import CashierDashboard from '@/views/Cashier/CashierDashboard';
import OrderInfoCash from '@/views/Cashier/OrderInfoCash';
import CreateCustomer from '@/views/Cashier/CreateCustomer';
import OrderInfo from '@/views/Manager/OrderInfo';
import notFoundPage from '@/views/notFoundPage';
import Dashboard from '@/views/Customer/Dashboard';


import auth from './middleware/auth'
import managerAuth from "./middleware/managerAuth";
import customerValid from "./middleware/customerValid"
import chefAuth from "./middleware/chefAuth"
import cashierAuth from "./middleware/cashierAuth"
import waiterAuth from "./middleware/waiterAuth"
Vue.use(VueRouter);

const routes = [
  //----------------------------guest acces-----------------------------------------
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
    path: "/",
    redirect: "/login"
  },
  {
    path: "/notFoundPage",
    name: "notFoundPage",
    component: notFoundPage
  },
  {
    path: "*",
    redirect: "/notFoundPage"
  },
  //----------------------manager page accesable----------------------------------
  {
    path: "/product",    
    name: "product",
    component: Product,
    meta:{
      middleware:[auth,managerAuth]
    }
    
  },
  {
    path: "/product-create",
    name: "product-create",
    component: ProductCreate,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: "/product-edit/:id",
    name: "product-edit",
    component: ProductEdit,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: "/report",
    name: "report",
    component: Report,
    meta:{
      middleware:[auth,managerAuth]
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
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: '/order-info/:id',
    name: 'order-info',
    component: OrderInfo,
    meta:{
      middleware:[auth]
    }
  },

  {
    path: "/promotion",
    name: "promotion",
    component: Promotion,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: "/promotion-edit/:id",
    name: "promotion-edit",
    component: PromotionEdit,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: "/employee",
    name: "employee",
    component: Employee,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: "/employee-edit/:id",
    name: "employee-edit",
    component: EmployeeEdit,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: "/promotion/promo-create",
    name: "promo-create",
    component: PromotionCreate,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  {
    path: '/productType-create',
    name: 'productType-create',
    component: ProductTypeCreate,
    meta:{
      middleware:[auth,managerAuth]
    }
  },
  //-------------------------------------waiter accesable----------------------------
  {
    path: '/waiter/:id',
    name: 'waiter',
    component: WaiterDashboard,
    meta:{
      middleware:[auth,waiterAuth]
    }
  },
  //-------------------------------------chef accesable----------------------------
  {
    path: '/chef/:id',
    name: 'chef',
    component: ChefDashboard,
    meta:{
      middleware:[auth,chefAuth]
    }
  },
  //-------------------------------------cashier accesable----------------------------
  {
    path: '/cashier/:id',
    name: 'cashier',
    component: CashierDashboard,
    meta:{
      middleware:[auth,cashierAuth]
    }
  },
  {
    path: '/orderinfocash/:id',
    name: 'orderinfocash',
    component: OrderInfoCash,
    meta:{
      middleware:[auth,cashierAuth]
    }
  },
  {
    path: '/createCustomer',
    name: 'createCustomer',
    component: CreateCustomer,
    meta:{
      middleware:[auth,cashierAuth]
    }
  },
  //-------------------------------------customer(all) accesable----------------------------
  {
    path: '/customer/:id',
    name: 'customer',
    component: CustomerDashboard,
    meta:{
      middleware:[customerValid]
    }
    
  },
  {
    path: '/productInfo/:id',
    name: 'productInfo',
    component: productInfo,
    meta:{
      middleware:[customerValid]
    }
    
  },
  {
    path: '/dashboard/:id/:timestamp',
    name:'dashboard',
    component: Dashboard
  },
 
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(VueRouteMiddleware({auth,managerAuth,customerValid,chefAuth}));
export default router;
