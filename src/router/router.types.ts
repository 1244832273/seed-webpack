import { ReactNode } from 'react'

export interface Meta {
  menu?: boolean; // 是否在左侧菜单上展示
  permissions?: string[]; // 权限组 没有时直接放行 不校验权限
}

export interface RoutesOption {
  path: string;
  Component?:any;
  title?: string;
  children?: RoutesOption[];
  meta?: Meta;
}