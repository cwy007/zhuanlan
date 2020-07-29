import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'
axios.defaults.baseURL = 'http://localhost:7001/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
