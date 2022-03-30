/*
 * @Author: 鲁田文
 * @Date: 2021-06-02 15:44:15
 * @LastEditTime: 2022-03-30 17:53:50
 * @LastEditors: 鲁田文
 * @Description:
 */

import { useState, useEffect } from 'react'

import { RoutesOption } from '@/router/router.types'

export interface usePermissionProps {
  routes: RoutesOption[]
}

function usePermission({ routes }: usePermissionProps) {
  const [routerAuth, setRouterAuth] = useState<RoutesOption[] | []>([])

  useEffect(() => {
    // 递归过滤没有权限路由
    const permission = (routes: RoutesOption[], auth: string): any => {
      return routes
        ?.map(route => {
          const permissions = route?.meta?.permissions // 当前路由权限组
          const haveAuth = permissions?.some(y => y === auth) // 权限组匹配
          // 1.存在权限组且权限组匹配时 放行
          // 2.存在权限组且权限组匹配时 放行 有children子路由时递归
          // 3.不存在权限组时 直接放行不判断
          if (haveAuth && route.children) {
            // 存在权限组且权限组匹配 并存在children子路由时 递归子路由
            return {
              ...route,
              children: permission(route.children, auth),
            }
          } else if (haveAuth) {
            // 存在权限组且权限组匹配
            return route
          } else if (!permissions && route.children) {
            // 不存在权限组 并存在children子路由时 递归子路由
            return {
              ...route,
              children: permission(route.children, auth),
            }
          } else if (!permissions) {
            // 不存在权限组
            return route
          }
        })
        .filter(z => z) // auth为当前用户角色 当前角色和路由permissions权限匹配 才有返回 否者过滤掉
    }

    const auth = 'admin'
    const newRouter = permission(routes, auth)
    setRouterAuth(newRouter)
  }, [])

  return routerAuth
}

export default usePermission
