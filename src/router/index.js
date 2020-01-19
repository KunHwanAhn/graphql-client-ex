import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/main/Main.vue'
import GithubLogin from '@/views/github/GithubLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/github',
    component: GithubLogin,
    props: route => ({
      code: route.query.code,
    }),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
