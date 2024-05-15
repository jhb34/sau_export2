import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mixin from './mixins'
import vueCookies from 'vue-cookies'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

const app = createApp(App)
app.use(vueCookies)
app.use(store)
app.use(router)
app.mixin(Mixin)
app.mount('#app')
