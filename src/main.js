import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSocketIO from 'vue-socket.io'
import VueTimepicker from 'vue2-timepicker'
import VueGlide from 'vue-glide-js'
import VueCarousel from 'vue-carousel';
import VeeValidate from 'vee-validate';


var socketURL = 'http://localhost:3000'
if (process.env.NODE_ENV !== "development") {
  socketURL = "/";
}



Vue.use(new VueSocketIO({
    debug: true,
    connection: socketURL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC1FhnnrcBKyOeZF9as6Qw89mBzjul9jU4',
    libraries: 'places'
  },
})
Vue.use(VueTimepicker)
Vue.use(VueGlide)
Vue.use(VueCarousel);
Vue.use(ElementUI);
Vue.use(VeeValidate);

Vue.config.productionTip = false
Vue.crossOrigin = 'true'



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
