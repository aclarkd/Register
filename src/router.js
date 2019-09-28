import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Register.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/about/:name',
      name: 'about',
      component: About
    }
  ]
})