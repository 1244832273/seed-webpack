/*
 * @Author: 鲁田文
 * @Date: 2021-03-31 14:22:13
 * @LastEditTime: 2022-03-29 20:11:17
 * @LastEditors: 鲁田文
 * @Description:
 */
import { format } from 'path';
import React, { lazy } from 'react';

import { RoutesOption } from './index';
import Layout from '@/components/layout';

const routerMapping = {
  LOGIN: '@/pages/login',
  HOME: '@/pages/home',
  AUTH: '@/pages/auth',
  AUTH1: '@/pages/auth/index copy',
  AUTH2: '@/pages/auth/index copy 2',
}

const CesiumGlobal = lazy(() => import('@/pages/cesium/cesium'));

const permissions = ['admin'];

const routes: RoutesOption[] = [
  {
    path: '/login',
    component: lazy(() => import(routerMapping.LOGIN)),
    title: '登录',
  },
  {
    path: '/404',
    component: () => <div>404</div>,
    title: '404',
  },
  {
    path: '/cesium',
    component: CesiumGlobal,
    title: '地图',
  },
  {
    path: '/manage',
    component: Layout,
    meta: {
      menu: true,
    },
    children: [
      {
        path: '/home',
        component: lazy(() => import(routerMapping.HOME)),
        title: '首页',
        meta: {
          menu: true,
          permissions: [...permissions],
        },
      },
      {
        path: '/home1',
        component: lazy(() => import(routerMapping.AUTH1)),
        title: '首页1',
        meta: {
          menu: true,
        },
      },
      {
        path: '/home2',
        component: lazy(() => import(routerMapping.AUTH2)),
        title: '首页2',
        meta: {
          menu: true,
        },
      },
      {
        path: '/auth',
        title: '活动主体',
        meta: {
          menu: true,
          permissions: [...permissions],
        },
        children: [
          {
            path: '/activity',
            component: lazy(() => import(routerMapping.AUTH)),
            title: '活动',
            meta: {
              menu: true,
              permissions: [...permissions],
            },
          },
          {
            path: '/activity1',
            component: lazy(() => import(routerMapping.AUTH1)),
            title: '活动1',
            meta: {
              menu: true,
              permissions: [...permissions],
            },
          },
          {
            path: '/activity2',
            component: lazy(() => import(routerMapping.AUTH2 )),
            title: '活动2',
            meta: {
              menu: true,
              permissions: ['user1'],
            },
          },
        ],
      },
    ],
  },
];

export default routes;
