import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'A51C3975141CD028' }
  if (config.data instanceof FormData) {
    config.data.append('icode', 'A51C3975141CD028')
  } else {
    config.data = { ...config.data, icode: 'A51C3975141CD028' }
  }
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
