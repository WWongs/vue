import Vue from 'vue'
import Router from 'vue-router'
import Guide from '@/components/Guide'

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
      component: resolve => require(['../pages/Search'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      component: resolve => require(['../pages/About'], resolve)
    },
    {
      path: '/movie',
      name: 'Movie',
      component: resolve => require(['../pages/Movie'], resolve)
    },
    {
      path: '/detail',
      name: 'Detail',
      component: resolve => require(['../pages/Detail'], resolve)
    }
  ]
})
