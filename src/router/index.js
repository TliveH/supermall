import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/Home.vue'),
    meta:{
      title:'首页'
    }
  },
  {
    path: '/category',
    component: () => import('../views/category/Category.vue'),
    meta:{
      title:'分类'
    }
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart.vue'),
    meta:{
      title:'购物车'
    }
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile.vue'),
    meta:{
      title:'我的'
    }
  },
  {
    path: '/detail/:iid',
    component:()=>import('../views/detail/Detail.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to,from,next)=>{
  document.title='商城--'+to.meta.title
  next();
})
export default router
