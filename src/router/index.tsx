import React, { ReactNode, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Spin } from "antd";
import routers from "@/router/routers";
import usePermission from "@/hooks/usePermission";

export interface Meta {
  menu?: boolean; // 是否在左侧菜单上展示
  permissions?: string[]; // 权限组 没有时直接放行 不校验权限
}

export interface RoutesOption {
  path: string;
  component?:
  | React.LazyExoticComponent<(props: any) => JSX.Element>
  | ((props: any) => JSX.Element);
  title?: string;
  children?: RoutesOption[];
  meta?: Meta;
}

export interface Redirect {
  to: string;
}

interface PrivateRouteProps {
  children: ReactNode;
}

function Redirect({ to }: Redirect) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

function AppRouter() {
  // 过滤权限组路由
  console.log(`Router`, routers);
  const newRouters = usePermission({ routers }); // 过滤权限后路由
  console.log(`newRouter`, newRouters);

  // 权限控制路由
  const PrivateRoute = (props: PrivateRouteProps) => {
    const { children, ...rest } = props;
    const userInfo = true;
    return (
      <Route
        {...rest}
        element={() =>
          userInfo ? (
            children
          ) : (
            <Redirect
              to="/login"
            />
          )
        }
      />
    );
  }

  // 递归路由
  const tileRouter = (routers: RoutesOption[] | undefined, fPath = ''): any => {
    return (
      <Suspense fallback={<Spin tip="加载中..." />}>
        {
          routers?.map(x => {
            const mergePath = fPath + x.path;
            if(x.children && x.children.length > 0) {
              return (
                <Route
                  key={mergePath}
                  path={mergePath}
                  element={() => {
                    return <Suspense fallback={<Spin tip="加载中..." />}>{React.createElement(x.component || Routes, {}, tileRouter(x.children, mergePath))}</Suspense>;
                  }}
                />
              );
            } else {
              return (
                <Route
                  key={mergePath}
                  path={mergePath}
                  element={x.component}
                />
              );
            }
          })
        }
      </Suspense>
    )
  }

  return (
    <Router>
      <Routes>
        {/* <Redirect from="/" to="/login" exact /> */}
        <PrivateRoute>
          <Suspense fallback={<Spin tip="加载中..." />}>
            <Routes>
              {tileRouter(newRouters)}
            </Routes>
          </Suspense>
        </PrivateRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
