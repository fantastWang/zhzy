import Vue from 'vue'
import App from './App'

import store from 
'./store/index'

//全局服务引入
import http from './http'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = http

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()

