import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register";
import CommodityList from "../views/CommodityList";
import ShoppingCar from "../views/ShoppingCar"
import Communication from "../views/Communication";
import PersonPage from "../views/PersonPage";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },{
    path: '/CommodityList',
    name: 'Commodity',
    component: CommodityList
  },{
    path: '/ShoppingCar',
    name: 'ShoppingCar',
    component: ShoppingCar
  },{
    path: '/Communication',
    name: 'Communication',
    component: Communication
  },{
    path: '/PersonPage',
    name: 'PersonPage',
    component: PersonPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
