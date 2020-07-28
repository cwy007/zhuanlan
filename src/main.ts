import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'
axios.defaults.baseURL = 'http://localhost:7001/api/'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
