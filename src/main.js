import Vue from 'vue'
import App from './App.vue'
import { BootstrapVueIcons, BootstrapVue} from 'bootstrap-vue'

import router from '@/router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import VueQRCodeComponent from 'vue-qrcode-component'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
