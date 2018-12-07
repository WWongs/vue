// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入axios
import Axios from 'axios'
Vue.prototype.$axios = Axios;

// 引入重置文件
import './assets/css/reset.css'
// 引入lib-flexible
import 'lib-flexible'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
