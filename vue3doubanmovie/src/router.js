import Vue from 'vue'
import Router from 'vue-router'
import Guide from './components/Guide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/search',
      name: 'Search',
      component: resolve => require(['./views/Search'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      component: resolve => require(['./views/About'], resolve)
    },
    {
      path: '/movie',
      name: 'Movie',
      component: resolve => require(['./views/Movie'], resolve)
    },
    {
      path: '/detail',
      name: 'Detail',
      component: resolve => require(['./views/Detail'], resolve)
    }
  ]
})
