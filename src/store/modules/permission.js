import {
  constantRoutes,
  asyncRoutes
} from '@/router'
// import {
//   getRouters
// } from '@/api/menu'
import Layout from '@/layout/index'

const permission = {
  state: {
    routes: constantRoutes || [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = constantRoutes
      state.routes = constantRoutes.concat(routes)
    }
  },

  actions: {
    // 生成路由
    // GenerateRoutes({
    //   commit
    // }) {
    //   return new Promise(resolve => {
    //     // 向后端请求路由数据
    //     getRouters().then(res => {
    //       const accessedRoutes = filterAsyncRouter(res.data)
    //       accessedRoutes.push({
    //         path: '*',
    //         redirect: '/404',
    //         hidden: true
    //       })
    //       commit('SET_ROUTES', accessedRoutes)
    //       resolve(accessedRoutes)
    //     })
    //   })
    // }

    generateRoutes({
      commit
    }, roles) {
      return new Promise(resolve => {
        let accessedRoutes = [];
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes)
      })
    }

  }
}
//
// // 遍历后台传来的路由字符串，转换为组件对象
// function filterAsyncRouter(asyncRouterMap) {
//   return asyncRouterMap.filter(route => {
//     if (route.component) {
//       // Layout组件特殊处理
//       if (route.component === 'Layout') {
//         route.component = Layout
//       } else {
//         route.component = loadView(route.component)
//       }
//     }
//     if (route.children != null && route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children)
//     }
//     return true
//   })
// }

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
