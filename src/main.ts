import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  config.params = { ...config.params, icode: 'D7EE1A7033012A3C' }
  if (config.data instanceof FormData) {
    config.data.append('icode', 'D7EE1A7033012A3C')
  } else {
    config.data = { ...config.data, icode: 'D7EE1A7033012A3C' }
  }
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
