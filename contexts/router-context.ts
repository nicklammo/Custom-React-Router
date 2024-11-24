import { createContext } from "react";

export const RouterContext = createContext<RouterContextType | undefined>(undefined);

export type RouteType = {
  element: React.ReactElement,
  path: string,
  meta?: {
    title?: string;
    description?: string;
  }
  guard?: () => boolean;
  loader?: () => unknown;
  children?: React.ReactNode;
}

export type RouterContextType = {
  currentRoute: React.ReactNode,
  navigateTo: (path: string) => void,
  routes: RouteType[],
};