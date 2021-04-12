import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddGif from '../views/AddGif.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SingleGif from '../views/SingleGif.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addgif',
    name: 'AddGif',
    component: AddGif
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/gif/:id',
    name: 'SingleGif',
    component: SingleGif
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router