import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import LayoutView from '../views/LayoutView.vue'
import MemberLayout from '../views/member/Layout.vue'
import LoginView from '../views/login/LoginView.vue'
import { h } from 'vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    component: LayoutView,
    children: [
      {
        path: '/',
        name: 'IndexView',
        component: () => import('../views/home/IndexView.vue')
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: () => import('../views/category/Category.vue')
      },
      {
        path: '/category/sub/:id',
        name: 'SubCategory',
        component: () => import('../views/category/SubCategory.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/cart/IndexView.vue')
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/product/IndexView.vue')
      },
      // 结算页面
      {
        path: '/member/checkout',
        name: 'PayCheckout ',
        component: () => import('@/views/member/pay/checkout')
      },
      // 支付页面
      {
        path: '/member/pay',
        name: 'PayIndex ',
        component: () => import('@/views/member/pay/index')
      },
      // 支付结果状态页面
      {
        path: '/pay/callback',
        component: () => import('@/views/member/pay/callback')
      },
      // 个人中心
      {
        path: '/member',
        component: MemberLayout,
        name: 'Member',
        children: [
          { path: '/member', component: () => import('../views/member/home') },
          {
            path: '/member/order',
            // vue3.0 需要有嵌套关系才能模糊匹配(创建一个RouterView容器形成嵌套关系)
            component: () => Promise.resolve(h(<RouterView/>)),
            children: [
              { path: '', name: 'Order', component: () => import('../views/member/order') },
              { path: ':id', name: 'OrderDetail', component: () => import('../views/member/order/orderDetail') }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/login/callback',
    component: () => import('../views/login/LoginCallBack.vue')
  },
  // 未匹配路由
  {
    path: '/:pathMatch(.*)',
    name: 'error',
    component: () => import('../views/Error/Error.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL), // H5模式
  history: createWebHashHistory(), // hash模式
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  const { token } = store.state.user.profile // 用户信息
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
