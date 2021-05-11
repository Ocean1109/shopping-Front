import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import Home from '../views/Home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/register',
    name: Register,
    component: Register
  },
  {
    path: '/home',
    name:Home,
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
