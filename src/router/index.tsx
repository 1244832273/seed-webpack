import React, { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'

import routes from '@/router/routers'
import usePermission from '@/hooks/usePermission'
import { RoutesOption } from './router.types'

function AppRouter() {
  // 过滤权限组路由
  const newRouters = usePermission({ routes }) // 过滤权限后路由
  console.log(`newRouter`, newRouters)

  const tileRouter = (permssionRoutes: RoutesOption[], parentPath = '') =>
    permssionRoutes.map(x => {
      const { path, Component, children } = x
      const newPath = parentPath + path
      return children ? (
        <Route path={newPath} key={newPath} element={<Component />}>
          {tileRouter(children, newPath)}
        </Route>
      ) : (
        <Route key={newPath} path={newPath} element={<Component />} />
      )
    })

  console.log('tileRouter(newRouters) :>> ', tileRouter(newRouters))

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/manage/home' />}></Route>
        {tileRouter(newRouters)}
      </Routes>
    </Router>
  )
}

export default AppRouter
