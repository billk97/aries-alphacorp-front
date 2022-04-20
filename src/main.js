import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue} from 'bootstrap-vue'

import router from '@/router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueQRCodeComponent from 'vue-qrcode-component'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
