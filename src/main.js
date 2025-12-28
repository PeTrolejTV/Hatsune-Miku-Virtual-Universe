import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './router'

// Vlastné globálne štýly
import './main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
