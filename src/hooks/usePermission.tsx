/*
 * @Author: 鲁田文
 * @Date: 2021-06-02 15:44:15
 * @LastEditTime: 2022-03-29 20:23:12
 * @LastEditors: 鲁田文
 * @Description:
 */

import React, { useState, useEffect } from 'react'

import { RoutesOption } from "@/router/index";

export interface usePermissionProps {
  routers: RoutesOption[];
}

function usePermission({ routers }: usePermissionProps) {
  const [routerAuth, setRouterAuth] = useState<RoutesOption[] | []>([]);

  // 递归过滤没有权限路由
  const permission = (routers: RoutesOption[], auth: string): any => {
    return routers?.map(x => {
      const permissions = x?.meta?.permissions; // 当前路由权限组
      const haveAuth = permissions && permissions?.some(y => y === auth); // 权限组匹配
      // 1.存在权限组且权限组匹配时 放行
      // 2.存在权限组且权限组匹配时 放行 有children子路由时递归
      // 3.不存在权限组时 直接放行不判断
      if(haveAuth && x.children) { // 存在权限组且权限组匹配 并存在children子路由时 递归子路由
        return {
          ...x,
          children: permission(x.children, auth)
        }
      } else if(haveAuth) { // 存在权限组且权限组匹配
        return x
      } else if(!permissions && x.children) { // 不存在权限组 并存在children子路由时 递归子路由
        return {
          ...x,
          children: permission(x.children, auth)
        }
      } else if(!permissions) { // 不存在权限组
        return x
      }
    }).filter(z => z)// auth为当前用户角色 当前角色和路由permissions权限匹配 才有返回 否者过滤掉
  }

  useEffect(() => {
    const auth = 'admin';
    const newRouter = permission(routers, auth);
    setRouterAuth(newRouter);
  }, []);
  
  return routerAuth;
}

export default usePermission;

