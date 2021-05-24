import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register";
import CommodityList from "../views/CommodityList";
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
