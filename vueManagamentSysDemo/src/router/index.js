import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/pages/Index.vue'
import AuthorityManagement from '@/pages/AuthorityManagement.vue'
import EmployeeManagement from '@/pages/EmployeeManagement.vue'
import OrderList from '@/pages/OrderList.vue'
import ShopAuthentication from '@/pages/ShopAuthentication.vue'
import ShopList from '@/pages/ShopList.vue'
import StatisticalAnalysis from '@/pages/StatisticalAnalysis.vue'
import UserAuthentication from '@/pages/UserAuthentication.vue'
import UserList from '@/pages/UserList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Index',
      component:Index
    },
    {
      path: '/AuthorityManagement',
      name: 'AuthorityManagement',
      component: AuthorityManagement
    },
    {
      path: '/EmployeeManagement',
      name: 'EmployeeManagement',
      component: EmployeeManagement
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList
    },
    {
        path: '/ShopAuthentication',
        name: 'ShopAuthentication',
        component: ShopAuthentication
    },
    {
        path: '/ShopList',
        name: 'ShopList',
        component: ShopList
    },
    {
        path: '/StatisticalAnalysis',
        name: 'StatisticalAnalysis',
        component: StatisticalAnalysis
    },
    {
        path: '/UserAuthentication',
        name: 'UserAuthentication',
        component: UserAuthentication
    },
    {
        path: '/UserList',
        name: 'UserList',
        component: UserList
    }
    
  ]
})
