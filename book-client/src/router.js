import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './components/Detail.vue'
import Articledetail from './components/Articledetail.vue'
Vue.use(Router)
Vue.use(require('vue-moment'));

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      children: [
        {
          path: ':id',
          name: 'articledetail',
          component: Articledetail
        }
      ]
    }
  ]
})
