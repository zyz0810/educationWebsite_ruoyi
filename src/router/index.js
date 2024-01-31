import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: resolve => require(['@/views/redirect'], resolve)
          // component: () => import('@/views/redirect'),
        }]
    },
    {
        path: '/404',
        component: resolve => require(['@/views/error/404'], resolve),
      // component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: resolve => require(['@/views/error/401'], resolve),
      // component: () => import('@/views/error/401'),
        hidden: true
    },
  {
    path: '/root',
    component: resolve => require(['@/views/index'], resolve),
    // component: () => import('@/views/index'),
  },
  {
    path: '/',
    redirect: '/root',
  },
  {
    path: '/home',
    component: Layout,
    // redirect: 'dashboard',
    redirect: 'noRedirect',
    name: '首页',
    meta: {
      title: '首页',
      icon: '',
    },
    children: [
      {
        path: 'index',
        component: resolve => require(['@/views/home/index'], resolve),
        // component: () => import('@/views/home/index'),
        name: 'home',
        hidden: true,
        meta: {
          title: '首页',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
    ]
  },
  {
    path: '/about',
    component: Layout,
    // redirect: 'dashboard',
    redirect: 'noRedirect',
    name: '关于我们',
    meta: {
      title: '关于我们',
      icon: '',
    },
    children: [
      {
        path: 'index',
        component: resolve => require(['@/views/about/index'], resolve),
        // component: () => import('@/views/about/index'),
        name: 'aboutUs',
        hidden: true,
        meta: {
          title: '关于我们',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
    ]
  },
  {
    path: '/law',
    component: Layout,
    // redirect: 'dashboard',
    redirect: 'noRedirect',
    name: '法律',
    hidden: true,
    meta: {
      title: '法律',
      icon: '',
    },
    children: [
      {
        path: 'privacy',
        component: resolve => require(['@/views/about/privacy'], resolve),
        // component: () => import('@/views/about/privacy'),
        name: 'privacy',
        hidden: true,
        meta: {
          title: '隐私政策',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
      {
        path: 'agreement',
        component: resolve => require(['@/views/about/agreement'], resolve),
        // component: () => import('@/views/about/agreement'),
        name: 'agreement',
        hidden: true,
        meta: {
          title: '用户协议',
          noCache: true,
          icon: '',
          // affix: true,
        }
      },
    ]
  },
]

// 动态路由
export const asyncRoutes = [

  // {
  //   path: '/home',
  //   component: Layout,
  //   // redirect: 'dashboard',
  //   redirect: 'noRedirect',
  //   name: '首页',
  //   meta: {
  //     title: '首页',
  //     icon: '',
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: resolve => require(['@/views/home/index'], resolve),
  //       name: 'data',
  //       hidden: true,
  //       meta: {
  //         title: '首页',
  //         noCache: true,
  //         icon: '',
  //         // affix: true,
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/about',
  //   component: Layout,
  //   // redirect: 'dashboard',
  //   redirect: 'noRedirect',
  //   name: '关于我们',
  //   meta: {
  //     title: '关于我们',
  //     icon: '',
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: resolve => require(['@/views/about/index'], resolve),
  //       name: 'data',
  //       hidden: true,
  //       meta: {
  //         title: '关于我们',
  //         noCache: true,
  //         icon: '',
  //         // affix: true,
  //       }
  //     },
  //   ]
  // },

    ]
const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({
            y: 0
        }),
        routes: constantRoutes
    })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
