// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';


import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'  
import './assets/styles/main.css'  
import 'bootstrap/dist/js/bootstrap.min.js' 
import 'popper.js/dist/popper.js'
import 'distpicker/dist/distpicker'
import 'zebra_datepicker/dist/zebra_datepicker.min.js'
import 'zebra_datepicker/dist/css/default/zebra_datepicker.css'


Vue.config.productionTip = false
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
