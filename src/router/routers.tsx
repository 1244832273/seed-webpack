/*
 * @Author: 鲁田文
 * @Date: 2021-03-31 14:22:13
 * @LastEditTime: 2022-03-29 21:00:06
 * @LastEditors: 鲁田文
 * @Description:
 */
import { format } from 'path';
import React, { lazy } from 'react';

import { RoutesOption } from './index';
import Layout from '@/components/layout';

const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));
const Auth = lazy(() => import('@/pages/auth'));
const Auth1 = lazy(() => import('@/pages/auth/index copy'));
const Auth2 = lazy(() => import('@/pages/auth/index copy 2'));

const CesiumGlobal = lazy(() => import('@/pages/cesium/cesium'));

const permissions = ['admin'];

const routes: RoutesOption[] = [
  {
    path: '/login',
    component: Login,
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
        component: Home,
        title: '首页',
        meta: {
          menu: true,
          permissions: [...permissions],
        },
      },
      {
        path: '/home1',
        component: Auth1,
        title: '首页1',
        meta: {
          menu: true,
        },
      },
      {
        path: '/home2',
        component: Auth2,
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
            component: Auth,
            title: '活动',
            meta: {
              menu: true,
              permissions: [...permissions],
            },
          },
          {
            path: '/activity1',
            component: Auth1,
            title: '活动1',
            meta: {
              menu: true,
              permissions: [...permissions],
            },
          },
          {
            path: '/activity2',
            component: Auth2,
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
