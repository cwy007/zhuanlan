import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import Signup from '@/views/Signup.vue'
import PostDetail from '@/views/PostDetail.vue'
import EditProfile from '@/views/EditProfile.vue'
import store from '@/store'

// github pages
const base = process.env.NODE_ENV === 'production' ? '/zhuanlan' : '/'
const routerHistory = createWebHistory(base)
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    },
    {
      path: '/profile',
      name: 'profile',
      component: EditProfile,
      meta: { requiredLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state // 页面刷新时，这里获取到的是store中的默认值
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        redirectAlreadyLogin ? next('/') : next()
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('/login')
      })
    } else {
      requiredLogin ? next('/login') : next()
    }
  } else {
    redirectAlreadyLogin ? next('/') : next()
  }
})

export default router
