import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  getToken
} from '@/utils/auth'

NProgress.configure({
  showSpinner: false
})

// const whiteList = ['/login', '/auth-redirect', '/bind', '/password']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // next()
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
  // const hasToken = sessionStorage.getItem("CRM-Token");
  // const hasToken = getToken();
  // console.log('hasToken',hasToken)
  // if (hasToken) {
  //   /* has token*/
  //   if (to.path === '/login') {
  //     next({
  //       path: '/'
  //     })
  //     NProgress.done()
  //   } else {
  //     if (store.getters.roles.length == 0) {
  //       try {
  //         //   const roles = store.dispatch('GetInfo')
  //         //   const accessRoutes = store.dispatch('permission/generateRoutes', roles)
  //         //   router.addRoutes(accessRoutes);
  //         //   // set the replace: true, so the navigation will not leave a history record
  //         //   next({ ...to, replace: true })
  //         // } catch (error) {
  //         //   // remove token and go to login page to re-login
  //         //   store.dispatch('user/FedLogOut')
  //         //   Message.error(error || 'Has Error')
  //         //   next({path: '/'})
  //         //   NProgress.done()
  //         // }
  //
  //
  //         // 判断当前用户是否已拉取完user_info信息
  //         store.dispatch('GetInfo').then(res => {
  //           // 拉取user_info
  //           const roles = res
  //           store.dispatch('generateRoutes', roles).then(accessRoutes => {
  //             // 测试 默认静态页面
  //             // store.dispatch('permission/generateRoutes', {roles}).then(accessRoutes => {
  //             //   // 根据roles权限生成可访问的路由表
  //             //   router.addRoutes(accessRoutes) // 动态添加可访问路由表
  //             //   next({...to, replace: true}) // hack方法 确保addRoutes已完成
  //             // })
  //             router.addRoutes(accessRoutes) // 动态添加可访问路由表
  //             next({
  //               ...to,
  //               replace: true
  //             }) // hack方法 确保addRoutes已完成
  //           }).catch(err => {
  //             store.dispatch('FedLogOut').then(() => {
  //               Message.error(err)
  //               next({
  //                 path: '/'
  //               })
  //             })
  //           })
  //         })
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         store.dispatch('FedLogOut')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     } else {
  //       if (to.matched.length ===0) {  //如果未匹配到路由
  //         next('/401');
  //         // from.name ? next({ name:from.name }) : next('/401');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  //         } else {
  //         next(); //如果匹配到正确跳转
  //        }
  //
  //       // next()
  //       // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
  //       // if (hasPermission(store.getters.roles, to.meta.roles)) {
  //       //   next()
  //       // } else {
  //       //   next({ path: '/401', replace: true, query: { noGoBack: true }})
  //       // }
  //       // 可删 ↑
  //     }
  //   }
  // } else {
  //   // 没有token
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
  //     NProgress.done()
  //   }
  // }

})

router.afterEach(() => {
  NProgress.done()
})
