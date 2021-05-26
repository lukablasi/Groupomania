import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddPost from '../views/AddPost.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SinglePost from '../views/SinglePost.vue'
import Dashboard from '../views/Dashboard.vue'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/posts/:id',
    name: 'SinglePost',
    component: SinglePost
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  
  if (to.meta.requiresAuth){
    if (localStorage.token) {
      next()
    } else {
      next({name:'Home'})
    }
  }else {
  next()
  }
})

router.beforeEach((to, from, next) => {
 
  if (to.meta.guest){
    if (!localStorage.token) {
      next()
    } else {
      next({name:'Home'})
    }
  }else {
  next()
  }
})

export default router
