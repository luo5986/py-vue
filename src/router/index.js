import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/dataShow',
    name: 'dataShow',
    component: () => import('../views/dataShow')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
