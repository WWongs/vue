import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入淘宝rem
import 'lib-flexible/flexible'
// 引入reset.css
import './assets/css/reset.css'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

// 引入axios
import Axios from 'axios'
Vue.prototype.$axios = Axios;

// 注册bus
let eventBus = {
  install(Vue, options) {
    Vue.prototype.$bus = new Vue();
  }
}
Vue.use(eventBus);

// 引入better
import VueBetterScroll from 'vue2-better-scroll'
Vue.use(VueBetterScroll);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
